# frozen_string_literal: true

require 'damerau-levenshtein'
require 'kimurai'

Kimurai.configure do |config|
  config.colorize_logger = false
end

class BookStatusSpider < Kimurai::Base
  @name = 'book_status_spider'
  @engine = :selenium_firefox
  @start_urls = ['https://aleph.uni.opole.pl/F']
  @config = {
    user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
    before_request: { delay: 4..7 }
  }

  def self.process(title)
    @@title = title
    crawl!
  end

  def get_book(title, data: {})
    browser.fill_in 'request', with: title
    browser.find('//*[@id="small"]/input[@name="request"]').native.send_keys(:return)

    sleep 5

    doc = browser.current_response

    browser.save_screenshot

    doc.css('#short_table > tbody > tr').each do |node|
      book_title = node.css('td')[3]&.css('a')&.first&.text
      next unless book_title && DamerauLevenshtein.distance(@@title, book_title) < 10

      year = node.css('td')[4]&.text&.match(/(\d{4})/)&.[](1)

      old_book = Book.find_by_title(title)

      if old_book
        old_book.update(title: book_title, year: year.to_i) unless year.blank?
      else
        Book.create(title: book_title, year: year.to_i) unless year.blank?
      end

      @@title = book_title

      uri = node.css('td')[5]&.css('a')&.first&.[]('href')
      request_to(:parse_book_statuses, url: uri, data: data.merge(book_title: book_title)) unless uri.blank?
    end
  end

  def parse_book_statuses(_response, _url, data: {})
    doc = browser.current_response
    doc.css('body > table')[7].css('tr').each do |row|
      loan_link = row&.css('td')&.[](0)&.css('a')&.count == 2 ? row&.css('td')&.[](0)&.css('a')&.[](0)&.[]('href') : nil
      loan_status = row&.css('td')&.[](2)&.text
      due_date = row&.css('td')&.[](3)&.text
      barcode = row&.css('td')&.[](8)&.text

      unless barcode.blank?
        libbook = LibBook.find_by(
          barcode: barcode
        )
      end

      if libbook
        libbook.update(loan_status: loan_status, loan_link: loan_link, due_date: due_date)
      else
        unless barcode.blank?
          LibBook.create!(
            loan_link: loan_link,
            loan_status: LibBook.parse_status(loan_status, loan_link),
            due_datetime: due_date,
            barcode: barcode,
            book_id: Book.find_or_create_by!(title: @@title).id
          )
        end
      end
    end
  end

  def parse(_response, _url, data: {})
    get_book(@@title)
  end
end

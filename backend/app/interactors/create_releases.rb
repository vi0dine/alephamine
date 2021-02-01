# frozen_string_literal: true

require 'selenium-webdriver'
require 'interactor'
require 'nokogiri'

class CreateReleases
  include Interactor

  def call
    warn "Checking if different releases exists..."
    releases = []
    sleep 3
    doc = Nokogiri::HTML(context.driver.page_source)
    doc.css('#short_table > tbody > tr').each do |node|
      book_title = node.css('td')[3]&.css('a')&.first&.text&.gsub('&nbsp;', '')
      next unless book_title && DamerauLevenshtein.distance(context.search_title, book_title) < 10

      year = node.css('td')[4]&.text&.match(/(\d{4})/)&.[](1)

      puts "\n\n"
      pp "Found book: #{book_title}"
      pp book_title == context.search_title
      pp "Year: #{year}"

      old_book = Book.find_by('title = ? AND year = ?', book_title, year.to_i) unless year.blank?

      if old_book
        pp 'Updating...'
        old_book.update(title: book_title, updated_at: DateTime.now, last_sync_at: DateTime.now)
      else
        pp 'Creating...'
        Book.create(title: book_title, year: year.to_i, last_sync_at: DateTime.now) unless year.blank?
      end

      puts "\n\n"

      uri = node.css('td')[5]&.css('a')&.first&.[]('href')

      releases << { url: uri, book_title: book_title, year: year.to_i } unless uri.blank?
    end

    warn "Found #{releases.count} releases."

    context.releases = releases
  end
end

# frozen_string_literal: true

require 'selenium-webdriver'
require 'interactor'

class FetchEntriesData
  include Interactor

  def call
    context.releases.each_with_index do |release, index|
      warn "Fetching data for release no.#{index+1}"
      context.driver.get release[:url]
      sleep 5
      doc = Nokogiri::HTML(context.driver.page_source)
      doc.css('body > table')[7].css('tr').each do |row|
        loan_link = row&.css('td')&.[](0)&.css('a')&.count == 2 ? row&.css('td')&.[](0)&.css('a')&.[](0)&.[]('href') : nil
        loan_status = row&.css('td')&.[](2)&.text
        due_date = row&.css('td')&.[](3)&.text
        barcode = row&.css('td')&.[](8)&.text

        libbook = nil

        unless barcode.blank? || loan_link&.blank?
          libbook = LibBook.find_by('barcode = ? OR loan_link = ?', barcode, loan_link)
        end

        if libbook
          libbook.update(loan_status: LibBook.parse_status(loan_status, loan_link), loan_link: loan_link,
                         due_datetime: due_date)
        else
          unless barcode.blank?
            LibBook.create!(
              loan_link: loan_link,
              loan_status: LibBook.parse_status(loan_status, loan_link),
              due_datetime: due_date,
              barcode: barcode,
              book_id: Book.find_or_create_by!(title: release[:book_title], year: release[:year]).id
            )
          end
        end
      end
    end
  end
end

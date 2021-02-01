# frozen_string_literal: true

require 'selenium-webdriver'

class BooksSpider
  def initialize(book)
    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument('--no-sandbox')
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--remote-debugin-port=9222')
    options.add_argument('--screen-size=1200x800')
    @driver = Selenium::WebDriver.for(:chrome, options: options)
    @search_title = book.title
    @driver.get 'https://aleph.uni.opole.pl/F'
    @wait = Selenium::WebDriver::Wait.new(timeout: 10)
  end

  def scrape
    begin
      warn "Scraping..."
      BookScrapingOrganizer.call(
        driver: @driver,
        wait: @wait,
        search_title: @search_title
      )
      @driver.quit
    rescue => e
      warn e
    end
  end
end

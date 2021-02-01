# frozen_string_literal: true

require 'selenium-webdriver'
require 'interactor'

class SearchForBook
  include Interactor

  def call
    warn "Searching for books with title #{context.search_title}"
    fill_form(context.driver, context.wait, context.search_title)
    sleep 2
  end

  private

  def fill_form(driver, wait, search_title)
    search_input = wait.until do
      driver.find_element(:name, 'request')
    end

    search_input.send_keys search_title
    sleep 2
    search_input.send_keys(:return)
  end
end

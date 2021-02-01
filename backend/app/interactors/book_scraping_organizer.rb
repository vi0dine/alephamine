# frozen_string_literal: true

require 'selenium-webdriver'
require 'interactor'

class BookScrapingOrganizer
  include Interactor::Organizer

  organize SearchForBook,
           CreateReleases,
           FetchEntriesData
end

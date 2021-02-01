FROM ruby:3.0.0

RUN apt-get install -y wget
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs nano cron lsof

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/
ENV DISPLAY=:99

ENV RAILS_ENV production
RUN mkdir /api && mkdir /api/log && touch /api/log/cron.log
RUN echo "Initialized cron" >> /api/log/cron.log
WORKDIR /api
COPY Gemfile /api/Gemfile

RUN gem install bundler:2.2.5
RUN bundle install


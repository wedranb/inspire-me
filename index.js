'use strict';
const got = require('got');
const ora = require('ora');
const chalk = require('chalk');
const html2txt = require('html-to-text');

const API_URL =
  'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=';

const spinner = ora('Getting inspired...').start();

function getQuote() {
  spinner.color = 'yellow';

  return got(API_URL)
    .then(res => {
      const body = JSON.parse(res.body);
      const quote = html2txt.fromString(body[0].content);
      const author = html2txt.fromString(body[0].title);

      spinner.stop();

      return `"${quote}" - ${author}`;
    })
    .catch(err => {
      spinner.stop();

      console.log(chalk.red('Error talking with https://quotesondesign.com'));
      console.error(err);
    });
}

getQuote().then(printQuote);

function printQuote(quote) {
  console.log(chalk.blue.bold(quote));
}

module.exports = getQuote;

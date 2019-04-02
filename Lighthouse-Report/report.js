/*
  PerfReviews
  https://perf.reviews

  PerfTools - Lighthouse Report
*/
//read https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
const chromeLauncher = require('chrome-launcher');
const lighthouse = require('lighthouse');
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const fs = require('fs');

const sites = require('./data');
const package = require('./package.json');
const dir = './reports';

let links = [];

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

(async () => {
  for (const id of Object.keys(sites)) {
    const URL = sites[id];
    console.log(`Testing ${id} on ${URL}`);
    await (async () => {
      const opts = {
        chromeFlags: ['--headless'],
        logLevel: 'info',
        onlyCategories: ['performance']
      };

      // Launch chrome using chrome-launcher.
      const chrome = await chromeLauncher.launch(opts);
      opts.port = chrome.port;

      // Run Lighthouse.
      const lhr = await lighthouse(URL, opts, null);
      const html = ReportGenerator.generateReport(lhr.lhr, 'html');
      fs.writeFile(`${dir}/${id}.html`, html, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(`The html file for ${id} was saved!`);
        links.push(`<li><a href="${id}.html" target="_blank">${id}</a></li>`)
      });

      await chrome.kill();
    })();
  }

  let ToC = `<html>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
        </head>
        <body style="padding: 2em">
          <h1 class="title">${package.name}</h1>
          <h2 class="subtitle">${package.description}</h2>
          <aside class="menu">
            <p class="menu-label">PerfReviews</p>
            <ul class="menu-list">${links.join('')}</ul>
          </aside>
        </body>
  </html>`;
  
  fs.writeFile(`${dir}/index.html`, ToC, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('---------------------------\n');
    console.log('ToC for sites was saved! 😊');
    console.log('---------------------------\n');
  });
})();
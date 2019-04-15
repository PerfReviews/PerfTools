/*
  PerfReviews
  https://perf.reviews

  PerfTools - Lighthouse Report
*/
//read https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./reports-back');
let data = 'Partido, Puntuación, Numero de peticiones, Tamaño de la página (MiB), Scripts, CSS\r\n';

for (let i = 0; i < files.length; i++) {
  const filename = path.join('./reports-back/', files[i]);

  if (filename.indexOf('.json')>=0) {
      const contents = fs.readFileSync(filename);
      const json = JSON.parse(contents);
      const { numRequests, numScripts, numStylesheets, totalByteWeight} = json.audits.diagnostics.details.items[0];
      const score = json.categories.performance.score * 100;

      data += `${files[i]}, ${score}, ${numRequests}, ${(totalByteWeight / 1024 / 1024).toFixed(2)}, ${numScripts}, ${numStylesheets}\r\n`;
  };
}

fs.writeFileSync('data-table.csv', data, 'utf8');

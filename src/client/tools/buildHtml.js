/* eslint-disable */

// This script copies src/index.html into /dist/index.html
// and adds TrackJS error tracking code for use in production
// when useTrackJs is set to true below and a trackJsToken is provided.
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only want to track errors in the built production code.

// Allowing console calls below since this is a build file.

import fs from 'fs';
import colors from 'colors';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  // make sure the build dir exists
  const dir = `${__dirname}/../../../lib/client/`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized
  // for the production build, need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="/styles.css">');

  // write
  fs.writeFile(`${dir}/index.html`, $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});

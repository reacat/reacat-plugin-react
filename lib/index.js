'use strict';

var path = require('path');
var getDefaultPage = require('reacat-plugin-front-matter/lib/getDefaultPage');
var objectAssign = require('object-assign');

var extnames = ['.jsx', '.react'];

function parseReact() {
  require('babel/register')({
    only: path.resolve(this.cwd, this.config.source_dir),
    extensions: extnames
  });
  Object.keys(this.sources).forEach((function (filePath) {
    var source = this.sources[filePath];
    var extname = path.extname(filePath).toLowerCase();
    if (extnames.indexOf(extname) === -1) return;
    var Content = require(filePath);
    source.page = objectAssign(getDefaultPage.call(this, source, ''), Content.frontMatter);
    source.page.content = Content;
    this.log.verbose('parseReact', source.page.content);
  }).bind(this));
}

module.exports = parseReact;
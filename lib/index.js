'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _requireUncache = require('require-uncache');

var _requireUncache2 = _interopRequireDefault(_requireUncache);

var getDefaultPage = require('reacat-plugin-front-matter/lib/getDefaultPage');

var extnames = ['.jsx'];

var registed = false;

function parseReact() {
  var _this = this;

  if (!registed) {
    require('babel/register')({
      only: _path2['default'].resolve(this.cwd, this.config.source_dir),
      extensions: extnames
    });
    registed = true;
  }
  Object.keys(this.sources).forEach((function (filePath) {
    var source = _this.sources[filePath];
    var extname = _path2['default'].extname(filePath).toLowerCase();
    if (extnames.indexOf(extname) === -1) return;
    var Content = require(filePath);
    (0, _requireUncache2['default'])(filePath);
    source.page = (0, _objectAssign2['default'])(getDefaultPage.call(_this, source, ''), Content.frontMatter);
    source.page.Content = Content;
    _this.log.verbose('parseReact', source.page.Content);
  }).bind(this));
}

exports['default'] = parseReact;
module.exports = exports['default'];
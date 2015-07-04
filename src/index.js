import path from 'path';
import objectAssign from 'object-assign';
import uncache from 'require-uncache';

const getDefaultPage = require('reacat-plugin-front-matter/lib/getDefaultPage');

const extnames = ['.jsx'];

let registed = false;

function parseReact() {
  if (!registed) {
    require('babel/register')({
      only: path.resolve(this.cwd, this.config.source_dir),
      extensions: extnames
    });
    registed = true;
  }
  Object.keys(this.sources).forEach(((filePath) => {
    const source = this.sources[filePath];
    const extname = path.extname(filePath).toLowerCase();
    if (extnames.indexOf(extname) === -1) return;
    const Content = require(filePath);
    uncache(filePath);
    source.page = objectAssign(getDefaultPage.call(this, source, ''), Content.frontMatter);
    source.page.Content = Content;
    this.log.verbose('parseReact', source.page.Content);
  }).bind(this));
}

export default parseReact;

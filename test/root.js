global.expect = require('expect');

const babel = require('@babel/core'); // ✅ Replace 'babel-core' with '@babel/core'
const { JSDOM } = require('jsdom'); // ✅ Update jsdom usage
const path = require('path');

before(function(done) {
  const babelResult = babel.transformFileSync(path.resolve(__dirname, '..', 'index.js'), {
    presets: ['@babel/preset-env'] // ✅ Update Babel preset
  });

  const dom = new JSDOM('<div></div>', { runScripts: "outside-only" });
  const { window } = dom;

  const script = window.document.createElement("script");
  script.textContent = babelResult.code;
  window.document.body.appendChild(script);

  Object.keys(window).forEach(key => {
    if (typeof global[key] === 'undefined') {
      global[key] = window[key];
    }
  });

  done();
});


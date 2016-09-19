'use strict';
const Path = require('path');

module.exports = () => {
  const Houra = require('houra');
  const routes = Path.join(Houra.relativePath('route'), '*.js');
  return {
    plugin: {
      register: 'hapi-router',
      options: {
        routes,
        cwd: Houra.root
      }
    }
  };
};

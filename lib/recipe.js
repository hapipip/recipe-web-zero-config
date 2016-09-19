'use strict';

const internals = module.exports = {};

internals.path = __dirname;

internals.initVision = (server, houra) {
  const Mustache = require('mustache');
  const Nunjucks = require('nunjucks');
  server.views({
    engines: {
      mustache: {
        compile: template => {
          Mustache.parse(template);
          return context => {
            return Mustache.render(template, context);
          };
        }
      },
      hbs: require('handlebars'),
      jade: require('jade'),
      ejs: require('ejs'),
      nunjucks: {
        compile: (src, options) => {
          var template = Nunjucks.compile(src, options.environment);
          return function (context) {
            return template.render(context);
          };
        },
        prepare: function (options, next) => {
            options.compileOptions.environment = Nunjucks.configure(options.path, { watch : false });
            return next();
        }
      }
    },
    path: houra.path('template'),
    compileOptions: {
      pretty: true
    }
  });
};

internals.initInert = (server, houra) {
  server.route({
    method: 'GET',
    path: '/statics/{param*}',
    handler: {
      directory: {
        path: houra.path('static'),
        redirectToSlash: true,
        index: true
      }
    }
  });
};

internals.recipe = {
  name: 'recipe-web-zero-config',
  version: 'vO.1.O'
}

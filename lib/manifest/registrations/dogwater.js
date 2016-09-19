'use strict';

const Path = require('path');
const Fs = require('fs');

module.exports = () => {
  const Houra = require('houra');
  const Bag = Houra.bag;
  const models = Fs.readdirSync(Houra.path('model')).map(file => {
    const model = require(Path.join(Houra.path('model'), file));
    model.connection = Bag.get('orm:adapter');
    console.log(`Model ${model.identity} has been loaded`);
    return model;
  });

  return {
    plugin: {
      register: 'dogwater',
      options: {
        adapters: {
          mysql: require('sails-mysql'),
          disk: require('sails-disk'),
          memory: require('sails-memory'),
          postgresql: require('sails-postgresql'),
          mongo: require('sails-mongo'),
          redis: require('sails-redis')
        },
        connections: {
          mysql: {
            adapter: 'mysql',
            user: Bag.get('orm:connection:user'),
            password: Bag.get('orm:connection:password'),
            host: Bag.get('orm:connection:host'),
            database: Bag.get('orm:connection:database'),
            port: Bag.get('orm:connection:port')
          },
          disk: {
            adapter: 'disk',
            filePath: Path.join(Houra.root, Bag.get('orm:disk:path')),
            schema: Bag.get('orm:disk:schema')
          },
          memory: {
            adapter: 'memory'
          }
        },
        models
      }
    }
  };
};

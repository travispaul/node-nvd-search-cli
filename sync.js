const NVD = require('nvd-search');
const ProgressBar = require('progress');

function main (subcmd, options) {
  let config = {};

  if (options.limit) {
    config.fetchLimit = parseInt(options.limit);
  }

  if (options.all) {
    config.persistAll = true;
  }

  if (options.schema) {
    config.schemaVersion = options.schema;
  }

  if (options.dir) {
    config.cacheDir = options.dir;
  }

  const nvd = new NVD(config);
  config = nvd.getConfig();
  const bar = new ProgressBar('Syncing NIST Feeds [:bar]', config.feeds.length);

  nvd.sync((error, results) => {
    if (error) {
      process.exitCode = 1;
      return console.error(error);
    }
    if (options.verbose) {
      results.forEach((feed) => {
        console.log('%s [%s]', feed.feed, feed.fetchRemote ? 'updated' : 'ok');
      });
    }
  }, () => {
    bar.tick();
  });
}

module.exports = {
  main,
  options: [
    {
      names: ['all', 'a'],
      type: 'bool',
      help: 'Sync all original files'
    },
    {
      names: ['limit', 'l'],
      type: 'number',
      help: 'How many files to fetch at once (default: 2)'
    },
    {
      names: ['schema', 's'],
      type: 'string',
      help: 'Feed schema version (1.0, 1.1)'
    },
    {
      names: ['dir', 'd'],
      type: 'string',
      help: 'Local cache directory.'
    }
  ],
  help: `Sync the remote feeds.
Usage:
  {{name}} {{cmd}}
{{options}}`
};


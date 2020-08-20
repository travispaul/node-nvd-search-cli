const NVD = require('nvd-search');
const ProgressBar = require('progress');

function main (subcmd, options) {
  const nvd = new NVD({
    fetchLimit: (options.limit) ? parseInt(options.limit) : 2,
    persistAll: (options.all) ? true : false,
  });
  const config = nvd.getConfig();
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
  ],
  help: `Sync the remote feeds.
Usage:
  {{name}} {{cmd}}
{{options}}`
};


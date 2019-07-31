const NVD = require('nvd-search');
const ProgressBar = require('progress');

function main (subcmd, options) {
  if (!options._args.length) {
    console.error('No CVE ID provided');
    process.exitCode = 1;
    return;
  }
  const id = options._args[0];
  const nvd = new NVD({
    ttl: options.ttl || 3600
  });
  const config = nvd.getConfig();
  let progressCallback;

  if (!options.json) {
    const bar = new ProgressBar('Syncing NIST Feeds [:bar]', config.feeds.length);
    progressCallback = () => {
      bar.tick();
    };
  }

  const doSearch = (error, results) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
      return;
    }
    if (options.json) {
      console.log(JSON.stringify(results, null, options.pretty ? 2 : null));
    } else {
      // show as something more machine readable?
      console.log(results);
    }
  };

  if (options.nosync) {
    return nvd.search(id, doSearch);
  }

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
    nvd.search(id, doSearch);
  }, progressCallback);
}

module.exports = {
  main,
  options: [
    {
      names: ['nosync', 'n'],
      type: 'bool',
      help: 'Do not fetch remote meta files and attempt a sync operation'
    },
    {
      names: ['json', 'j'],
      type: 'bool',
      help: 'Print results as JSON to stdout'
    },
    {
      names: ['pretty', 'p'],
      type: 'bool',
      help: 'Pretty print JSON'
    },
    {
      names: ['ttl', 't'],
      type: 'number',
      help: 'How many seconds to consider the local cache fresh before checking the remote feeds (default: 3600)'
    }
  ],
  help: `Search for a CVE by ID.
Usage:
  {{name}} {{cmd}} [CVE ID]
{{options}}`
};

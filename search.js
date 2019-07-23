const NVD = require('nvd');
const ProgressBar = require('progress');

function main (subcmd, options) {
  if (!options._args.length) {
    console.error('No CVE ID provided');
    process.exitCode = 1;
    return;
  }
  const id = options._args[0];
  const nvd = new NVD();
  const config = nvd.getConfig();
  const bar = new ProgressBar('Syncing NIST Feeds [:bar]', config.feeds.length);

  if (options.nosync) {
    return nvd.search(id);
  }

  nvd.sync((error, results) => {
    if (error) {
      process.exitCode = 1;
      return console.error(error);
    }
    nvd.search(id, () => {
      
    });
  }, () => {
    bar.tick();
  });
}

module.exports = {
  main,
  options: [
    {
        names: ['nosync', 'n'],
        type: 'bool',
        help: 'Do not fetch remote meta files and attempt a sync operation'
    }
  ],
  help: `Search for a CVE by ID.
Usage:
  {{name}} {{cmd}} [CVE ID]
{{options}}`
};

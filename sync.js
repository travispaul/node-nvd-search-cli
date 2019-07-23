const NVD = require('nvd');
const ProgressBar = require('progress');

function main (subcmd, options) {

  const nvd = new NVD();
  const config = nvd.getConfig();
  const bar = new ProgressBar('Syncing NIST Feeds [:bar]', config.feeds.length);

  nvd.sync((error, results) => {
    if (error) {
      process.exitCode = 1;
      return console.error(error);
    }
  }, () => {
    bar.tick();
  });
}

module.exports = {
  main,
  options: [],
  help: `Sync the remote feeds.
Usage:
  {{name}} {{cmd}}
{{options}}`
};


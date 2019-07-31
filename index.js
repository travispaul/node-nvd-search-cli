const app = require('./package.json');

// Options used by all commands
const commonOptions = [
  {
    names: ['verbose', 'v'],
    type: 'bool',
    help: 'Write more info to stdout'
  }
];

app.options = [
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print help and exit.'
  }
];

app.cmdList = [];
app.addCmd = (cmd) => {
  app[cmd] = require(`./${cmd}`);
  app.cmdList.push(cmd);
  app[cmd].options = app[cmd].options.concat(commonOptions);
};

app.addCmd('search');
app.addCmd('sync');

module.exports = app;
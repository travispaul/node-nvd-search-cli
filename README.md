# node-nvd-search-cli
(Unofficial) program to search a local cache of the NIS National Vulnerability Database.

```
$ ./bin/nvd
(Unofficial) program to search a local cache of the NIS National Vulnerability Database.

Usage:
    nvd [OPTIONS] COMMAND [ARGS...]
    nvd help COMMAND

Options:
    -h, --help      Print help and exit.

Commands:
    help (?)        Help on a specific sub-command.
    search          Search for a CVE by ID.
    sync            Sync the remote feeds.
```

## search

```
$ ./bin/nvd help search
Search for a CVE by ID.
Usage:
  nvd search [CVE ID]
Options:
    -n, --nosync       Do not fetch remote meta files and attempt a sync
                       operation.
    -j, --json         Print results as JSON to stdout.
    -p, --pretty       Pretty print JSON.
    -t NUM, --ttl=NUM  How many seconds to consider the local cache fresh before
                       checking the remote feeds (default: 3600).
    -v, --verbose      Write more info to stdout.
```

## sync

```
$ ./bin/nvd help sync
Sync the remote feeds.
Usage:
  nvd sync
Options:
    -v, --verbose   Write more info to stdout.
```

## See also

- [nvd-search](https://github.com/travispaul/node-nvd-search)

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
    -n, --nosync         Do not fetch remote meta files and attempt a sync
                         operation.
    -j, --json           Print results as JSON to stdout.
    -p, --pretty         Pretty print JSON.
    -a, --all            Sync all original files.
    -l NUM, --limit=NUM  How many files to fetch at once (default: 2).
    -v, --verbose        Write more info to stdout.
```

## sync

```
$ ./bin/nvd help sync
Sync the remote feeds.
Usage:
  nvd sync
Options:
    -a, --all            Sync all original files.
    -l NUM, --limit=NUM  How many files to fetch at once (default: 2).
    -v, --verbose        Write more info to stdout.
```

## See also

- [nvd-search](https://github.com/travispaul/node-nvd-search)

## Example

```
$ ./bin/nvd search -jp CVE-2019-12780
{
  "cve": {
    "data_type": "CVE",
    "data_format": "MITRE",
    "data_version": "4.0",
    "CVE_data_meta": {
      "ID": "CVE-2019-12780",
      "ASSIGNER": "cve@mitre.org"
    },
    "problemtype": {
      "problemtype_data": [
        {
          "description": [
            {
              "lang": "en",
              "value": "CWE-77"
            }
          ]
        }
      ]
    },
    "references": {
      "reference_data": [
        {
          "url": "https://www.exploit-db.com/exploits/46436",
          "name": "https://www.exploit-db.com/exploits/46436",
          "refsource": "MISC",
          "tags": [
            "Exploit",
            "Third Party Advisory",
            "VDB Entry"
          ]
        }
      ]
    },
    "description": {
      "description_data": [
        {
          "lang": "en",
          "value": "The Belkin Wemo Enabled Crock-Pot allows command injection in the Wemo UPnP API via the SmartDevURL argument to the SetSmartDevInfo action. A simple POST request to /upnp/control/basicevent1 can allow an attacker to execute commands without authentication."
        }
      ]
    }
  },
  "configurations": {
    "CVE_data_version": "4.0",
    "nodes": [
      {
        "operator": "AND",
        "children": [
          {
            "operator": "OR",
            "cpe_match": [
              {
                "vulnerable": true,
                "cpe23Uri": "cpe:2.3:o:belkin:crock-pot_smart_slow_cooker_with_wemo_firmware:-:*:*:*:*:*:*:*"
              }
            ]
          },
          {
            "operator": "OR",
            "cpe_match": [
              {
                "vulnerable": false,
                "cpe23Uri": "cpe:2.3:h:belkin:crock-pot_smart_slow_cooker_with_wemo:-:*:*:*:*:*:*:*"
              }
            ]
          }
        ]
      }
    ]
  },
  "impact": {
    "baseMetricV3": {
      "cvssV3": {
        "version": "3.0",
        "vectorString": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        "attackVector": "NETWORK",
        "attackComplexity": "LOW",
        "privilegesRequired": "NONE",
        "userInteraction": "NONE",
        "scope": "UNCHANGED",
        "confidentialityImpact": "HIGH",
        "integrityImpact": "HIGH",
        "availabilityImpact": "HIGH",
        "baseScore": 9.8,
        "baseSeverity": "CRITICAL"
      },
      "exploitabilityScore": 3.9,
      "impactScore": 5.9
    },
    "baseMetricV2": {
      "cvssV2": {
        "version": "2.0",
        "vectorString": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
        "accessVector": "NETWORK",
        "accessComplexity": "LOW",
        "authentication": "NONE",
        "confidentialityImpact": "PARTIAL",
        "integrityImpact": "PARTIAL",
        "availabilityImpact": "PARTIAL",
        "baseScore": 7.5
      },
      "severity": "HIGH",
      "exploitabilityScore": 10,
      "impactScore": 6.4,
      "acInsufInfo": false,
      "obtainAllPrivilege": false,
      "obtainUserPrivilege": false,
      "obtainOtherPrivilege": false,
      "userInteractionRequired": false
    }
  },
  "publishedDate": "2019-06-10T16:29Z",
  "lastModifiedDate": "2019-06-17T13:24Z"
}
```

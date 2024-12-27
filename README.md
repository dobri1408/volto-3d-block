# volto-nextcloud-video-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-nextcloud-video-block)](https://github.com/eea/volto-nextcloud-video-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-nextcloud-video-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-nextcloud-video-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-nextcloud-video-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-nextcloud-video-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-nextcloud-video-block-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-nextcloud-video-block-develop)


[Volto](https://github.com/plone/volto) add-on: NextCloud Video Block

## Features

This add-on only allows playback from Nextcloud videos, from a selection of allowed domains.
![Nextcloud](https://raw.githubusercontent.com/eea/volto-nextcloud-video-block/master/docs/Nextcloud-video.gif)

Add `whitelist`` in **index.js**:

```JSON

const applyConfig = (config) => {
   config.blocks.blocksConfig.nextCloudVideo = {
   ....
      whiteList: [
         'https://cmshare.eea.europa.eu',
         'https://shareit.eea.europa.eu',
      ],
   ....
   };

   return config;
};

```

## Getting started

### Try volto-nextcloud-video-block with Docker

      git clone https://github.com/eea/volto-nextcloud-video-block.git
      cd volto-nextcloud-video-block
      make
      make start

Go to http://localhost:3000

### Add volto-nextcloud-video-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-nextcloud-video-block"
   ],

   "dependencies": {
       "@eeacms/volto-nextcloud-video-block": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-nextcloud-video-block
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-nextcloud-video-block/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-nextcloud-video-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-nextcloud-video-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

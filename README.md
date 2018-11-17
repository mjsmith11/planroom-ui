# planroom-ui [![Master Build Status](https://travis-ci.org/mjsmith11/planroom-ui.svg?branch=master)](https://travis-ci.org/mjsmith11/planroom-ui)

This repository contains a Vue.js front end for the planroom project.
It adheres to [Semantic Versioning](https://semver.org/) and [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Ubuntu Environment Setup
1. Setup an instance of [planroom-api](https://github.com/mjsmith11/planroom-api).
1. Ensure that the URL in .env.development is correct for your instance of planroom-api.
1. Install [npm](https://www.npmjs.com/get-npm).
1. In `public/index.html`, replace `<API_KEY HERE>` with an [api key](https://developers.google.com/maps/documentation/javascript/get-api-key) for the google maps and places apis.
1. Install dependencies `npm install`
1. Check to make sure the url for planroom api is correct in `.env.development`.
1. Run development server `npm run serve`

## Helpful Tools
 - Vue developer tools chrome add on.

### Install Dependencies
```
npm install
```

### Run Development Server
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```



**For details on the contents of this repository, see [GETTING_STARTED](https://github.com/mjsmith11/planroom-ui/blob/master/GETTING_STARTED.md)**
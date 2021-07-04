# Sudoo-License

[![Build Status](https://travis-ci.com/SudoDotDog/License.svg?branch=master)](https://travis-ci.com/SudoDotDog/License)
[![codecov](https://codecov.io/gh/SudoDotDog/License/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/License)
[![npm version](https://badge.fury.io/js/%40sudoo%2Flicense.svg)](https://www.npmjs.com/package/@sudoo/license)
[![downloads](https://img.shields.io/npm/dm/@sudoo/license.svg)](https://www.npmjs.com/package/@sudoo/license)

Package license tools

## Install

```sh
yarn add @sudoo/license --dev
# Or
npm install @sudoo/license --save-dev
```

## CLI Usage

```sh
npx license-package license <PATH> --dependencies --peerDependencies
```

## Package Usage

```ts
import { licensePackage } from "@sudoo/license";

licensePackage({
    
    targetPath: "Path",
    dependencies: true,
    peerDependencies: true,
});
```

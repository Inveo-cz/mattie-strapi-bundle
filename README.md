[![mattie-strapi-bundle](./docs/static/logo.svg)](https://mattie-bundle.mattiebelt.com/)

A modified version of [Mattie Belt's Strapi search plugin](https://mattie-bundle.mattiebelt.com/) that adds reindexing functionality and respect for publication state.

Also updated to support latest Strapi 4.x and Node.js 20.x versions.

# mattie-strapi-bundle

[![Tests](https://github.com/Inveo-cz/mattie-strapi-bundle/actions/workflows/tests.yml/badge.svg)](https://github.com/Inveo-cz/mattie-strapi-bundle/actions)
[![Codecov](https://img.shields.io/codecov/c/github/Inveo-cz/mattie-strapi-bundle?style=flat-square)](https://codecov.io/gh/Inveo-cz/mattie-strapi-bundle)
[![Strapi](https://img.shields.io/npm/dependency-version/@inveo.cz/mattie-strapi-bundle-example/@strapi/strapi)](https://github.com/strapi/strapi)
[![License](https://img.shields.io/github/license/Inveo-cz/mattie-strapi-bundle?style=flat-square)](./LICENSE)

This bundle brings extra easy-to-use features to the Strapi eco-system.

## Included packages ✨

- [Search Plugin](https://mattie-bundle.mattiebelt.com/search/plugin)
- [Algolia Search Provider](https://mattie-bundle.mattiebelt.com/search/providers#algolia)

## Documentation 📚

[mattie-bundle.mattiebelt.com](https://mattie-bundle.mattiebelt.com/)

## Development workflow

### Requirements

- Node.js `12.x` - `20.x`
- NPM `6.x`
- Yarn `1.x`

### Setup bundle mono-repo

```batch
yarn setup
```

### Run example app

```batch
yarn develop
```

### Format & lint

```bash
yarn format && yarn lint
```

### Tests

```bash
yarn test
```

## License

See the [MIT License](./LICENSE) file for licensing information.

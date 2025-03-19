A modified version of [Mattie Belt's Strapi search plugin](https://mattie-bundle.mattiebelt.com/) that adds reindexing functionality and respect for publication state.

# mattie-strapi-bundle

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

The `DATABASE` ENV can be used to choose another [database config](example/config/database.js).

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

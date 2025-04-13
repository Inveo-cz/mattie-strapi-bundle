A modified version of [Mattie Belt's Strapi search plugin](https://mattie-bundle.mattiebelt.com/) that adds reindexing functionality and respect for publication state.

# strapi-search-plugin

The original Search Plugin is part of the Mattie Bundle for Strapi.

The bundle brings extra easy-to-use features to the Strapi eco-system.

This fork adds support for a full reindexing to the Search plugin. This depends on a new `clear()` method adding to search providers, which is available in my fork of the [Algolia Search Provider](https://github.com/richardweaver/mattie-strapi-bundle).

This fork also does not index content items when the draft system is enabled and items are not published.

## Documentation 📚

[mattie-bundle.mattiebelt.com](https://mattie-bundle.mattiebelt.com)

## Other packages ✨

- [Algolia Search Provider](https://github.com/inveo-cz/mattie-strapi-bundle)

## License

See the [MIT License](/LICENSE) file for licensing information.

'use strict';

const { has } = require('lodash/fp');
const { sanitize } = require('../utils/sanitize');

/**
 * Gets lifecycle service
 * @returns {object} Lifecycle service
 */
module.exports = () => ({
  /**
   * Load provider methods into lifecycles
   */
  async loadLifecycleMethods() {
    const provider = strapi.plugin('search').provider;
    const { excludedFields = [], prefix: indexPrefix = '', contentTypes } = strapi.config.get('plugin.search');

    // Loop over configured contentTypes in ./config/plugins.js
    contentTypes &&
      contentTypes.forEach((contentType) => {
        const { name, index, prefix: idPrefix = '', fields = [] } = contentType;

        if (strapi.contentTypes[name]) {
          const indexName = indexPrefix + (index ? index : name);

          const checkPublicationState = (event) => {
            if (event.result && has('publishedAt', event.result) && event.result.publishedAt === null) {
              // Draft
              return false;
            } else {
              // Published OR not enabled for content type
              return true;
            }
          };

          const noop = () => {};

          strapi.db.lifecycles.subscribe({
            models: [name],

            async afterCreate(event) {
              checkPublicationState(event)
                ? provider.create({
                    indexName,
                    data: sanitize(event.result, fields, excludedFields),
                    id: idPrefix + event.result.id,
                  })
                : noop();
            },

            // Todo: Fix `afterCreateMany` event result only has an count, it doesn't provide an array of result objects.
            // async afterCreateMany(event) {
            //   const { result } = event;
            //   await provider.createMany({
            //     indexName,
            //     data: result.map((entity) => ({ ...sanitize(entity), id: idPrefix + entity.id })),
            //   });
            // },

            async afterUpdate(event) {
              checkPublicationState(event)
                ? provider.create({
                    indexName,
                    data: sanitize(event.result, fields, excludedFields),
                    id: idPrefix + event.result.id,
                  })
                : provider.delete({ indexName, id: idPrefix + event.result.id });
            },

            // Todo: Fix `afterUpdateMany` event result only has an count, it doesn't provide an array of result objects.
            // async afterUpdateMany(event) {
            //   const { result } = event;
            //   await provider.updateMany({
            //     indexName,
            //     data: result.map((entity) => ({ ...sanitize(entity), id: idPrefix + entity.id })),
            //   });
            // },

            async afterDelete(event) {
              provider.delete({ indexName, id: idPrefix + event.result.id });
            },

            // Todo: Fix `afterDeleteMany` lifecycle not correctly triggered in `em.deleteMany()`, it also doesn't provide an array of result objects.
            // https://github.com/strapi/strapi/blob/a4c27836b481210d93acf932b7edd2ec1350d070/packages/core/database/lib/entity-manager.js#L325-L340
            // async afterDeleteMany(event) {
            //   const { result } = event;
            //   await provider.deleteMany({
            //     indexName,
            //     ids: result.map((entity) => idPrefix + entity.id),
            //   });
            // },
          });
        } else {
          strapi.log.error(`Search plugin bootstrap failed: Search plugin could not load lifecycles on model '${name}' as it doesn't exist.`);
        }
      });
  },
});

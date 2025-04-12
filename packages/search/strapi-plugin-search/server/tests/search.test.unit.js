'use strict';

const { PROVIDER_METHODS, validateConfig } = require('../utils/validate');
const { wrapMethodWithError } = require('../utils/error');
const { categories, episode } = require('./__mocks__/data');

describe('Search plugin', function () {
  beforeAll(async () => {
    for (let [index, category] of categories.entries()) {
      category = await strapi.entityService.create('api::category.category', { data: category });
      categories[index] = category;
    }
    await strapi.entityService.update('api::category.category', categories[0].id, { data: categories[0] });
    await strapi.entityService.delete('api::category.category', categories[1].id);

    await strapi.entityService.create('api::episode.episode', { data: episode });
  });

  test('Search provider should be initialized with PROVIDER_METHODS', () => {
    PROVIDER_METHODS.forEach((method) => {
      expect(strapi.plugin('search').provider).toHaveProperty(method);
    });
  });

  test('Search provider should iterate all types when rebuilding indices', async () => {
    const pluginInstance = strapi.plugin('search').provider;

    expect(pluginInstance).not.toBeNull();
    expect(pluginInstance).toHaveProperty('clear');
    expect(pluginInstance).toHaveProperty('createMany');

    const spyClear = jest.spyOn(pluginInstance, 'clear').mockImplementation(jest.fn());
    const spyCreateMany = jest.spyOn(pluginInstance, 'createMany').mockImplementation(jest.fn());

    await strapi
      .plugin('search')
      .service('provider')
      .rebuild();

    expect(spyClear).toHaveBeenCalledTimes(3);
    expect(spyClear).toHaveBeenNthCalledWith(1, { indexName: 'running-tests_podcast' });
    expect(spyClear).toHaveBeenNthCalledWith(2, { indexName: 'running-tests_episode' });
    expect(spyClear).toHaveBeenNthCalledWith(3, { indexName: 'running-tests_api::category.category' });

    expect(spyCreateMany).toHaveBeenCalledTimes(3);
    expect(spyCreateMany).toHaveBeenNthCalledWith(1, expect.objectContaining({ indexName: 'running-tests_podcast' }));
    expect(spyCreateMany).toHaveBeenNthCalledWith(2, expect.objectContaining({ indexName: 'running-tests_episode' }));
    expect(spyCreateMany).toHaveBeenNthCalledWith(3, expect.objectContaining({ indexName: 'running-tests_api::category.category' }));
  });

  test('Search provider should not be initialized', async () => {
    return await strapi
      .plugin('search')
      .service('provider')
      .loadProvider({
        provider: 'algolia',
        providerOptions: {},
      })
      .catch(() => {
        expect(strapi.plugin('search').provider).toBeNull();
      });
  });

  test('Mock provider should not be initialized', async () => {
    return expect(
      strapi
        .plugin('search')
        .service('provider')
        .loadProvider({
          instance: require('./__mocks__/provider').init(),
        }),
    ).rejects.toThrow();
  });

  test('Plugin config validation', () => {
    expect(() => validateConfig({})).toThrow('Search plugin ConfigValidationError: provider is a required field');

    expect(() =>
      validateConfig({
        provider: 'string',
        providerOptions: true,
      }),
    ).toThrow();

    expect(() =>
      validateConfig({
        provider: 'string',
        excludedFields: false,
      }),
    ).toThrow();

    expect(() =>
      validateConfig({
        provider: 'string',
        contentTypes: ['api::contentType.contentType'],
      }),
    ).toThrow('Search plugin ConfigValidationError: contentTypes[0] must be a `object` type');

    expect(() =>
      validateConfig({
        provider: 'string',
        contentTypes: [{}],
      }),
    ).toThrow('Search plugin ConfigValidationError: contentTypes[0].name is a required field');

    expect(() =>
      validateConfig({
        provider: 'string',
        contentTypes: [{ name: 'api::contentType.contentType', fields: false }],
      }),
    ).toThrow();
  });

  it('Should throw a wrapped Error with Strapi logger', () => {
    strapi.log.error = jest.fn();
    wrapMethodWithError(() => {
      throw new Error('Inner error');
    })();

    expect(strapi.log.error).toHaveBeenCalledWith('Search plugin: Inner error');
  });
});

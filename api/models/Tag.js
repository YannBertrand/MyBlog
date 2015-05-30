/**
* Tag.js
*
* @description :: Tag
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 2
    },

    // The slug is an unique identifier
    slug: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true,
      minLength: 2
    },

    // A Many-to-Many association with the Article model
    articles: {
      collection: 'Article',
      via: 'tags'
    },

    // A Many-to-Many association with the ArticleHistory model
    articleRevisions: {
      collection: 'ArticleHistory',
      via: 'tags'
    },

  }
};


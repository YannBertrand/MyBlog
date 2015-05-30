/**
* ArticleHistory.js
*
* @description :: Article History
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {

    // A One-to-Many association with the Article model
    article: {
      model: 'Article',
      required: true
    },

    revisionNumber: {
      type: 'integer',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 3
    },

    // The slug is an unique identifier to an Article
    slug: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true,
      minLength: 2
    },

    content: {
      type: 'text',
      required: true,
      minLength: 15
    },

    // Is this article supposed to be shown?
    shown: {
      type: 'boolean',
      required: true,
      defaultsTo: true
    },

    // A Many-to-Many association with the Tag model
    tags: {
      collection: 'Tag',
      via: 'articleRevisions'
    }

  }
};


/**
* Article.js
*
* @description :: Article
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {

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

    // A One-to-Many association with the ArticleHistory model
    revisions: {
      collection: 'ArticleHistory',
      via: 'article'
    },

    // A Many-to-Many association with the Tag model
    tags: {
      collection: 'Tag',
      via: 'articles'
    },

    // A One-to-Many association with the Comment model
    comments: {
      collection: 'Comment',
      via: 'article'
    }

  }
};


/**
* Comment.js
*
* @description :: Comment
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {

    authorName: {
      type: 'text',
      required: true
    },

    authorEmail: {
      type: 'text',
      email: true,
    },

    authorWebsite: {
      type: 'text',
      url: true
    },

    content: {
      type: 'text',
      required: true,
      minLength: 15
    },

    // A One-to-Many association with the Comment model
    article: {
      model: 'Article',
      required: true
    }

  }
};


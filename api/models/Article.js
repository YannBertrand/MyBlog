/**
* Article.js
*
* @description :: Article
* @docs        :: http://sailsjs.org/#!documentation/models
*/

function findLastArticleVersion(articleId, cb) {
  ArticleHistory
    .findOne({ article: articleId })
    .sort('revisionNumber DESC')
    .exec(function (err, lastInstance) {
      return cb(err, lastInstance);
  });
}

function createArticleVersion(values, cb) {
  var data = {
    article: values.id,
    revisionNumber: values.revisionNumber,
    title: values.title,
    slug: values.slug,
    content: values.content,
    shown: values.shown,
    tags: values.tags
  };

  ArticleHistory
    .create(data)
    .exec(function (err, newInstance) {
      return cb(err, newInstance);
  });
}

function destroyArticleVersions(articleId, cb) {
  ArticleHistory
    .destroy({ article: articleId })
    .exec(function (err, oldInstances) {
      return cb(err, oldInstances);
    });
}

function handleError(err, instance, msg, fail, done) {
  if(err)
    return fail(err);
  if(!instance)
    return fail(msg);
  if(typeof instance === 'array' && !instance.length)
    return fail(msg);

  return done();
}

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

  },

  afterCreate: function (values, cb) {
    if(!values.id) return cb('err');

    values.revisionNumber = 1;

    createArticleVersion(values, function (err, newInstance) {
      var msg = 'Error while creating the first article version';
      return handleError(err, newInstance, msg, cb, cb);
    });
  },

  afterUpdate: function (values, cb) {
    if(!values.id) return cb('err');

    findLastArticleVersion(values.id, function (err, lastInstance) {
      var msg = 'No article version found for article id ' + values.id;
      handleError(err, lastInstance, msg, cb, function () {
        values.revisionNumber = lastInstance.revisionNumber + 1;

        createArticleVersion(values, function (err, newInstance) {
          var msg = 'Error while creating this article version';
          return handleError(err, newInstance, msg, cb, cb);
        });
      });
    });
  },

  afterDestroy: function (values, cb) {
    async.each(values, function (value, next) {
      destroyArticleVersions(value.id, function (err, oldInstances) {
        var msg = 'Error while destroying article versions';
        handleError(err, oldInstances, msg, next, next);
      });
    }, function (err) {
      return cb(err);
    });
  }
};

var should = require('should');

describe('ArticleModel', function() {
  this.slow(75);
  this.timeout(2000);

  var id = '';

  describe('#find()', function() {

    it('should return an empty array', function (done) {

      Article.find()
        .exec(function(err, results) {
          should(err).be.null;

          should(results).not.be.undefined;
          results.should.be.an.Array;
          results.should.have.lengthOf(0);

          done();
      });

    });

  });



  describe('#create()', function() {

    it('should return an error when no field is provided', function (done) {

      Article.create({ })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.have.property('content');

          done();
      });

    });

    it('should return an error when only title is provided', function (done) {

      Article.create({
          title: 'My Article'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.have.property('content');

          done();
      });

    });

    it('should return an error when only slug is provided', function (done) {

      Article.create({
          slug: 'my-article'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.have.property('title');
          err.invalidAttributes.should.not.have.property('slug');
          err.invalidAttributes.should.have.property('content');

          done();
      });

    });

    it('should return an error when only content is provided', function (done) {

      Article.create({
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when title and slug are provided', function (done) {

      Article.create({
          title: 'My Article',
          slug: 'my-article'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.not.have.property('slug');
          err.invalidAttributes.should.have.property('content');

          done();
      });

    });

    it('should return an error when title and content are provided', function (done) {

      Article.create({
          title: 'My Article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when slug and content are provided', function (done) {

      Article.create({
          slug: 'my-article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.have.property('title');
          err.invalidAttributes.should.not.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when title is too short', function (done) {

      Article.create({
          title: 'My',
          slug: 'my-article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.have.property('title');
          err.invalidAttributes.should.not.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when slug is too short', function (done) {

      Article.create({
          title: 'My article',
          slug: 'm',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when content is too short', function (done) {

      Article.create({
          title: 'My article',
          slug: 'my-article',
          content: 'Lorem.'
        })
        .exec(function(err) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.not.have.property('slug');
          err.invalidAttributes.should.have.property('content');

          done();
      });

    });

    it('should succeed when all fields are well fullfilled', function (done) {

      Article.create({
          title: 'My Article',
          slug: 'my-article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err, result) {
          should(err).be.null;

          should(result).not.be.undefined;
          result.should.be.an.Object;
          result.should.have.property('id');

          id = result.id;

          done();
      });

    });

    it('should return an error when title is already used', function (done) {

      Article.create({
          title: 'My Article',
          slug: 'my-other-article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err, result) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_UNKNOWN');

          // err.should.have.property('duplicateAttributes');
          // err.duplicateAttributes.should.be.an.Object;
          // err.duplicateAttributes.should.have.property('title');
          // err.duplicateAttributes.should.not.have.property('slug');
          // err.duplicateAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when slug is already used', function (done) {

      Article.create({
          title: 'My Other Article',
          slug: 'my-article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err, result) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_UNKNOWN');

          // err.should.have.property('duplicateAttributes');
          // err.duplicateAttributes.should.be.an.Object;
          // err.duplicateAttributes.should.not.have.property('title');
          // err.duplicateAttributes.should.have.property('slug');
          // err.duplicateAttributes.should.not.have.property('content');

          done();
      });

    });

    it('should return an error when slug is not alpha-numeric-dashed', function (done) {

      Article.create({
          title: 'My Other Article',
          slug: 'My Other Article',
          content: 'Lorem ipsum dolor sit amet.'
        })
        .exec(function(err, result) {
          should(err).not.be.null;

          err.should.have.property('code');
          err.code.should.equal('E_VALIDATION');

          err.should.have.property('invalidAttributes');
          err.invalidAttributes.should.be.an.Object;
          err.invalidAttributes.should.not.have.property('title');
          err.invalidAttributes.should.have.property('slug');
          err.invalidAttributes.should.not.have.property('content');

          done();
      });

    });

  });



  describe('#find()', function() {

    it('should return an array containing the article', function (done) {

      Article.find()
        .exec(function(err, results) {
          should(err).be.null;

          should(results).not.be.undefined;
          results.should.be.an.Array;
          results.should.have.lengthOf(1);

          var result = results[0];

          result.should.be.an.Object;
          result.should.have.property('id');

          done();
      });

    });

  });



  describe('#findOne()', function() {

    it('should return an undefined result when giving an unnexisting id', function (done) {

      Article.findOne(123)
        .exec(function(err, result) {
          should(err).be.null;

          should(result).be.undefined;

          done();
      });

    });

    it('should return undefined result when giving an unnexisting attribute value', function (done) {

      Article.findOne({
          title: 'Fake'
        })
        .exec(function(err, result) {
          should(err).be.null;

          should(result).be.undefined;

          done();
      });

    });

    it('should succeed when giving a real article id', function (done) {

      Article.findOne(id)
        .exec(function(err, result) {
          should(err).be.null;

          should(result).not.be.undefined;
          result.should.be.an.Object;
          result.should.have.property('id');

          done();
      });

    });

  });

});
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

});
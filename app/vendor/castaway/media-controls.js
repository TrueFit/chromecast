// Generated by CoffeeScript 1.7.1
(function() {
  var MediaControls;

  MediaControls = (function() {
    function MediaControls(session, castAway) {
      this.session = session;
      this.castAway = castAway;
      if (!this.session) {
        throw "No session passed";
      }
      if (!this.castAway.cast) {
        throw "CastAway instance not found";
      }
      this.cast = this.castAway.cast;
    }

    MediaControls.prototype.play = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.play(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.pause = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.pause(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.stop = function(cb) {
      if (cb == null) {
        cb = function() {};
      }
      return this.session.stop(null, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    MediaControls.prototype.seek = function(time, cb) {
      var seekRequest;
      if (cb == null) {
        cb = function() {};
      }
      seekRequest = this.cast.session.SeekRequest(time);
      return this.session.seek(seekRequest, function(data) {
        return cb(null, data);
      }, function(err) {
        return cb(err);
      });
    };

    return MediaControls;

  })();

  module.exports = MediaControls;

}).call(this);

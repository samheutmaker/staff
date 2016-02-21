module.exports = exports = {
  // Basic Dif
  diff: function(a, b) {
    var seen = [],
      diff = [];
    for (var i = 0; i < b.length; i++)
      seen[b[i]] = true;
    for (var i = 0; i < a.length; i++)
      if (!seen[a[i]])
        diff.push(a[i]);
    return diff;
  },
  // MapBox Marker Dif Function
  modified: function(mapped, incoming) {
    var toRemove = [];
    var toAdd = [];
    var inBoth = [];
    var h = {};
    incoming.forEach(function(marker, markerIndex) {
      h[marker._id] = true;
      toAdd.push(marker);
    });

    mapped.forEach(function(marker, markerIndex) {
      if (h.hasOwnProperty(marker._id)) {
        toAdd.splice(toAdd.indexOf(marker), 1);
      } else {

        toRemove.push(marker);
      }
    });
    return {
      remove: toRemove,
      add: toAdd
    }
  },
  // Compose Connect Middleware
  connectCompose: function combineMiddleware(mids) {
    return mids.reduce(function(a, b) {
      return function(req, res, next) {
        a(req, res, function(err) {
          if (err) {
            return next(err);
          }
          b(req, res, next);
        });
      };
    });
  },
  // Remove Duplicated from array
  removeDuplicates: function(array) {
    var length = array.length;
    var toReturn = [];
    var helper = {};
    array.forEach(function(link, index) {
      helper[link] = 0;
    });
    for (var i in helper) {
      toReturn.push(i);
    }
    return toReturn;
  },
  // Executes Callback every one second
  waitAndFire: function(min, max, callback) {
    if (min < max) {
      setTimeout(function() {
        callback(min);
        inside(++min, max, callback);
      }, 1000);
    }
  }

};
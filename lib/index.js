var path = require('path');

module.exports = function(opts) {
  opts = opts || {};

  var acceptExt = opts.acceptExt || ['.jade', '.html'];
  var rejectExt = opts.rejectExt || [];

  return function(files, metalsmith, done) {
    var fileTree = {
      root: [],
      path: {}
    };

    function fetch(p) {
      p = path.dirname('/' + p).replace(/\\/g,"/");

      if (fileTree.path[p]) {
        return fileTree.path[p];
      }

      return fileTree.path[p] = {
        name: path.basename(p),
        path: p,
        children: [],
        files: []
      };
    }

    var tmp = fetch('/');
    fileTree.root.push(tmp);

    Object.keys(files)
      .filter(function(d) {
        return acceptExt.indexOf(path.extname(d)) > -1;
      })
      .filter(function(d) {
        return rejectExt.indexOf(path.extname(d)) === -1;
      })
      .forEach(function(d) {
        var p = d.replace(/\.(jade|md)$/, '.html');

        var tmp = fetch(p);
        files[d].path = p;

        // tmp.files.push(files[d]);
        tmp.files.push(d);
      });

    for (k in fileTree.path) {
      if ('/' === k) continue;

      var tmp = fileTree.path[k];
      var p = k.split('/').slice(0, -1).join('/') || '/';

      var parent = fileTree.path[p];
      tmp.parentName = parent.name;
      parent.children.push(tmp);
    }

    metalsmith._metadata.fileTree = fileTree;
    done();
  }
};

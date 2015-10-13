#!/usr/bin/env node
var fs = require("fs");

(function npdiff() {
  var currentPackages = JSON.parse(fs.readFileSync('./package.json', "utf8"));
  var packagesList = new Object();
  for (key in currentPackages.dependencies) {
      packagesList[key] = currentPackages.dependencies[key];
  }
  for (key in currentPackages.devDependencies) {
      packagesList[key] = currentPackages.devDependencies[key];
  }
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var json = JSON.parse(data);
              if (typeof packagesList[json.name] !== 'undefined') {
                  var packageVersion = packagesList[json.name].match(/[0-9\.]/g).join('');
                  if (packageVersion !== json.version.toString()) {
                      console.log(json.name + ' version is different. package.json:' + packageVersion + ', node_modules:' + json.version);
                  }
              } else {
                  console.log(json.name + ' is not in your package.json file');
              }
            }
          });
        }
      }
    });
  });
})();

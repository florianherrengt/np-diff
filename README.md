# np-diff
Get diff between you node_modules folder and package.json

```
npm install np-diff -g
```

Example:

```
- my-project
  - package.json
  - node_modules
```

```
$ cd my-project && np-diff
body-parser version is different. package.json:1.13.3, node_modules:1.14.1
chai version is different. package.json:3.2.0, node_modules:3.3.0
mocha is not in your package.json file
```

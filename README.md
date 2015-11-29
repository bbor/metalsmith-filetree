# metalsmith-filetree

This is a plugin for [Metalsmith](http://metalsmith.io/) that creates a tree
of all matching files in your project and adds a `link` property to each page
that contains the file path of the page.

## Usage

```javascript
var Metalsmith = require('metalsmith');
var filetree = require('metalsmith-filetree');

var metalsmith = new Metalsmith(__dirname)
  .use(filetree({
    pattern: ':title'
  }));
```

Give a folder structure like this

```
example/
├── file1.html
├── file2.html
└── folder1
    ├── file3.html
    ├── file4.html
    ├── folder2
    │   ├── file5.html
    │   └── file5.thml
    └── folder3
        └── file6.html
```

You will get an object called `filetree` added metadata which has two properties, `root` and `path. `root` is a nested array of all the directories and files, and path is a object which has the full path of each folder as a key pointing to the relevant directory object. An example is printed below with `path` simplified since each object contains all children it gets very large to print out. `parentName` is include so that the parent can be referenced through `path` if required, it is not an reference so as to prevent making a cyclical data structure.

```json
{
  "root": [
    {
      "name": "",
      "path": "/",
      "children": [
        {
          "name": "example",
          "path": "/example",
          "children": [
            {
              "name": "folder1",
              "path": "/example/folder1",
              "children": [
                {
                  "name": "folder2",
                  "path": "/example/folder1/folder2",
                  "children": [],
                  "files": [
                    "example/folder1/folder2/file5.html"
                  ],
                  "parentName": "folder1"
                },
                {
                  "name": "folder3",
                  "path": "/example/folder1/folder3",
                  "children": [],
                  "files": [
                    "example/folder1/folder3/file6.html"
                  ],
                  "parentName": "folder1"
                }
              ],
              "files": [
                "example/folder1/file3.html",
                "example/folder1/file4.html"
              ],
              "parentName": "example"
            }
          ],
          "files": [
            "example/file1.html",
            "example/file2.html",
          ],
          "parentName": ""
        }
      ]
    }
  ],
  "path": {
    "/": { },
    "/example/folder1": { },
    "/example/folder1/folder2": { },
    "/example/folder1/folder3": { },
  }
}
```

## CLI

You can also use the plugin with the Metalsmith CLI by adding a key to your metalsmith.json file:

```json
{
  "plugins": {
    "metalsmith-fileTree": { }
  }
}
```


## License

MIT, see [LICENSE](LICENSE).
System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "RubaXa/Sortable": "github:RubaXa/Sortable@1.2.1",
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-touch": "github:angular/bower-angular-touch@1.4.5",
    "angular-ui/ui-date": "github:angular-ui/ui-date@0.0.8",
    "animate.css": "npm:animate.css@3.4.0",
    "babel": "npm:babel-core@5.8.23",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "chieffancypants/angular-hotkeys": "github:chieffancypants/angular-hotkeys@1.5.0",
    "core-js": "npm:core-js@1.1.4",
    "jquery": "github:components/jquery@2.1.4",
    "lodash": "npm:lodash@3.10.1",
    "moment": "github:moment/moment@2.10.6",
    "velocity": "github:julianshapiro/velocity@1.2.2",
    "github:angular/bower-angular-touch@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:chieffancypants/angular-hotkeys@1.5.0": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

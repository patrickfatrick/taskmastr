System.config({
  "baseURL": "src/",
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
		"to-date": "modules/to-date",
		"to-yyyy": "modules/to-yyyy",
		"to-yy": "modules/to-yy",
		"to-mmm": "modules/to-mmm",
		"to-mm": "modules/to-mm",
		"to-MMM": "modules/to-_mmm_",
		"to-MM": "modules/to-_mm_",
		"to-ddd": "modules/to-ddd",
		"to-dd": "modules/to-dd",
		"to-DDD": "modules/to-_ddd_",
		"to-DD": "modules/to-_dd_",
		"to-hhh": "modules/to-hhh",
		"to-hh": "modules/to-hh",
		"to-ttt": "modules/to-ttt",
		"to-tt": "modules/to-tt",
		"to-ap": "modules/to-ap",
		"to-AP": "modules/to-_ap_",
		"to-mll": "modules/to-mll",
		"to-ml": "modules/to-ml",
		"to-zz": "modules/to-zz",
		//"to-string": "modules/to-string",
		//"to-iso": "modules/to-iso",
		//"to-isoShort": "modules/to-iso-short",
		//"to-utc": "modules/to-utc",
		//"to-utcShort": "modules/to-utc-short",
		//"to-unix": "modules/to-unix",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "core-js": "npm:core-js@1.1.4",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

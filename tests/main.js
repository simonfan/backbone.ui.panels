require.config({
	urlArgs: "bust=" + Math.random(),
	baseUrl: '',
	paths: {
		// basic libraries
		'jquery': 'components/jquery/jquery',
		'underscore': 'components/underscore/underscore',
		'backbone': 'components/backbone/backbone',

		'backbone.modelview': 'components/backbone.modelview/backbone.modelview',
		'backbone.ui.resizable': 'components/backbone.ui.resizable/backbone.ui.resizable',
		'backbone.collectionview': 'components/backbone.collectionview/backbone.collectionview',

		'jquery.fill': 'components/jquery.fill/jquery.fill',
		'_.asynch': 'components/_.asynch/_.asynch',

		// jquery ui -> base stuff
		'jquery.ui.core': 'components/jquery-ui/ui/jquery.ui.core',
		'jquery.ui.widget': 'components/jquery-ui/ui/jquery.ui.widget',
		'jquery.ui': 'components/jquery-ui/ui/jquery-ui',

		// jquery ui interactions
		'jquery.ui.mouse': 'components/jquery-ui/ui/jquery.ui.mouse',

		// jquery ui widgets
		'jquery.ui.resizable': 'components/jquery-ui/ui/jquery.ui.resizable',
		'jquery.ui.draggable': 'components/jquery-ui/ui/jquery.ui.draggable',

		// the module files go here
		'backbone.ui.panels.model': '../backbone.ui.panels.model',
		'backbone.ui.panels.view': '../backbone.ui.panels.view',
		'backbone.ui.panels.collection': '../backbone.ui.panels.collection',
		'backbone.ui.panels': '../backbone.ui.panels',

		// DEMO
		'demo-main': 'demo',	// the main file for the demo

		// UNIT TESTS
		'tests-main': 'tests',	// the main file for tests

		// other tests go here
		'example-tests': 'tests/example-tests',
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		// jquery-ui dependency tree
		// widgets
		'jquery.ui.resizable': {
			deps: ['jquery.ui.widget','jquery.ui.mouse','jquery']
		},

		'jquery.ui.draggable': {
			deps: ['jquery.ui.widget','jquery.ui.mouse','jquery']
		},
		
		// interactions
		'jquery.ui.mouse': {
			deps: ['jquery.ui.widget']
		},

		// base
		'jquery.ui.widget': {
			deps: ['jquery.ui.core','jquery']
		},
		'jquery.ui.core': {
			deps: ['jquery']
		},

		'jquery.ui': {
			deps: ['jquery']
		}
	}
});
	
if (window.__unit) {

	// load the tests
	require(['tests-main'], function(undef) {

		// tests were already run in the main tests file

		// QUnit was set not to autostart inline in tests.html
		// finally start the QUnit engine.
		QUnit.load();
		QUnit.start();
	});

} else {

	require(['demo-main'], function(demo) {

	});

}
define(['backbone.ui.panels','backbone','jquery'], function(Panels, Backbone, $) {
	
	var panels = window.panels = new Panels({
		el: $('#panels'),
	});


	panels.addPanel([
		{ id: 1, width: 100, height: 300, name: 'first' },
		{ id: 2, width: 200, height: 300, name: 'second', minWidth: 30 },
		{ id: 3, width: 400, height: 300, name: 'third', minWidth: 100 }
	]);

});
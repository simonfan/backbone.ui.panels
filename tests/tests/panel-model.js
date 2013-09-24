define(['backbone.ui.panels.model'], function(PanelModel) {

return function() {
	module('Panel Model')

	test('changes on panel width and height (test autosetting right and bottom attribites)', function() {
		var panel = new PanelModel({
			height: 100,
			width: 200,
			top: 0,
			left: 1000
		}, {
			minWidth: 100,
			minHeight: 100,
		});

		equal(panel.get('right'), undefined, 'expect panel\'s right property not to be set yet')
		panel.set('width', 500);
		equal(panel.get('right'), panel.get('left') + panel.get('width'), 'expect right attribute to be changed after setting the panel\'s width');

		equal(panel.get('bottom'), undefined, 'expect panel\'s bottom property not to be set yet');
		panel.set('height', 10);
		equal(panel.get('bottom'), panel.get('top') + panel.get('height'), 'expect bottom attribute to have been updated');


		window.panel = panel;

	});
}
});
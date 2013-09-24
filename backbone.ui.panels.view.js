define(['backbone.ui.resizable'],
function(Resizable             ) {

	/**
	 * Resizable extends Backbone.ModelView
	 */
	var PanelView = Resizable.extend({

		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		map: {
			'.->css:left': 'left',
			'.->css:top': 'top',

			'.->css:width': 'width',
			'.->css:height': 'height',
		},

		/**
		 * Called when the $el fires a resize event
		 */
		handleResize: function(e, ui) {

			this.model.set({
				top: ui.position.top,
				bottom: ui.position.top + ui.size.height,
				height: ui.size.height,

				left: ui.position.left,
				right: ui.position.left + ui.size.width,
			});
		},
	});


	return PanelView;
});
define(['backbone','backbone.ui.panels.model'], function(Backbone, PanelModel) {

	return Backbone.Collection.extend({
		initialize: function(panels, options) {
			_.bindAll(this,'arrange');

			this.axis = options.axis || this.axis;

			// listen to add, remove, reset
			this.on('add remove reset',this.arrange)
		},

		axis: 'x',

		model: PanelModel,

		nextTo: function(panel, distance) {
			distance = distance || 1;
			var nextIndex = this.indexOf(panel) + distance;
			return this.at( nextIndex );
		},

		prevTo: function(panel, distance) {
			distance = distance || 1;
			var prevIndex = this.indexOf(panel) - distance;
			return this.at( prevIndex );
		},

		before: function(panel) {
			var index = this.indexOf(panel);
			return this.first(index);
		},

		after: function(panel) {
			var index = this.indexOf(panel);
			return this.rest(index + 1);
		},

		reduceBefore: function(panel, iter, memo, context) {
			var before = this.before(panel);
			return _.reduce(before, iter, memo, context);
		},

		reduceAfter: function(panel, iter, memo, context) {
			var after = this.after(panel);
			return _.reduce(after, iter, memo, context);
		},


		/**
		 * distance reducers.
		 */
		getPanelLeftPos: function(targetPanel) {
			return this.reduceBefore(targetPanel, function(memo, panel) {
				return memo + panel.get('width') + 1;
			}, 0);
		},

		getPanelTopPos: function(targetPanel) {
			return this.reduceBefore(targetPanel, function(memo, panel) {
				return memo + panel.get('height') + 1;
			}, 0);
		},

		/**
		 * returns the top and left positionPanels at which a given panel should be.
		 */
		positionPanel: function(panel) {
			if (this.axis === 'x') {
				var left = this.getPanelLeftPos(panel),
					right = left + panel.get('width');

				return { left: left, right: right };
			} else {
				var top = this.getPanelTopPos(panel),
					bottom = top + panel.get('height');

				return { top: top, bottom: bottom };
			}
		},

		arrange: function() {
			var _this = this;
			this.each(function(panel, index) {
				var pos = _this.positionPanel(panel);
				panel.set(pos);
			});
		},
	});
});
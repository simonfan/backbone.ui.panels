define(['backbone.collectionview','backbone.ui.panels.collection','backbone.ui.panels.view'],
function(CollectionView          , PanelsCollection              , PanelView               ) {

	var PanelsView = CollectionView.extend({

		initialize: function(options) {
			// start a new panel collection
			this.collection = new PanelsCollection([], options);

			CollectionView.prototype.initialize.call(this, options);
		},

		itemData: function(panel) {
			return panel.attributes;
		},

		itemTemplate: function(data) {
			return '<div class="panel" id="'+ data.id +'">' + data.name + '</div>';
		},

		itemView: PanelView,

		/**
		 * Proxy method to the collection's add.
		 */
		addPanel: function(data, options) {
			this.collection.add(data, options);

			this.collection.arrange();
		},
	});

	return PanelsView;
});
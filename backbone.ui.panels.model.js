define(['backbone'], function(Backbone) {

	return Backbone.Model.extend({
		defaults: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,

			height: 0,
			width: 0,

			minWidth: 0,
			minHeight: 0,
		},

		initialize: function(attributes, options) {

			_.bindAll(this,'_widthChange','_leftChange','_rightChange');

			// axis: 
			this.axis = options ? options.axis || this.axis : this.axis;

			if (this.axis === 'x') {
				// L and R
				this.on('change:width', this._widthChange)
					.on('change:left', this._leftChange)
					.on('change:right', this._rightChange);

			} else if (this.axis === 'y') {
				// T and B
				this.on('change:height', this._heightChange)
					.on('change:top', this._topChange)
					.on('change:bottom', this._bottomChange);
			}
		},

		axis: 'x',

		/**
		 * Event handlers
		 */

		/**
		 * x Axis
		 */
		_widthChange: function(model) {

			console.log(this.get('name') + '_widthChange: width: ' + this.get('width'))

			// set the right attibute
		//	this.set('right', this.get('left') + this.get('width'));
		},

		_leftChange: function(model) {

			console.log(this.get('name') + '_leftChange: left: ' + this.get('left'));

			// _updateWidth
			this._updateWidth();

			// influence the panel before this one.
			var prevRight = this.get('left'),
				prev = this.prev();

			if (prev) {
				prev.changeRight(prevRight);
			}
		},

		_rightChange: function(model) {
			console.log(this.get('name') + '_rightChange: right: ' + this.get('right'));

			this._updateWidth();

			// influence panel nextTo this one
			var nextLeft = this.get('right'),
				next = this.next();

			if (next) {
				next.changeLeft(nextLeft);
			}
		},

		_updateWidth: function() {
			this.set('width', this.get('right') - this.get('left'));
		},

		/**
		 * Pass in a width value. This method will return a valid width.
		 */
		getValidWidth: function(width) {
			var minWidth = this.get('minWidth'),
				maxWidth = this.get('maxWidth');
			return (width >= minWidth) ? (!maxWidth || width <= maxWidth) ? width : maxWidth : minWidth;
		},


		/**
		 * Retrieve next panel
		 */
		next: function() {
			return this.collection ? this.collection.nextTo(this) : undefined;
		},

		/**
		 * Retrieve previous panel
		 */
		prev: function() {
			return this.collection ? this.collection.prevTo(this) : undefined;
		},




		/**
		 * Methods to be overwritten for custom behaviour.
		 */
		changeLeft: function(left) {
			var delta = left - this.get('left'),
				width = this.getValidWidth( this.get('width'));

			this.set('left', left);
			this.set('width', width);
			this.set('right', left + width);

			console.log(this.get('name') + ' changeLeft delta ' + delta / 2);
		},

		changeRight: function(right) {
			var delta = this.get('right') - right,
				width = this.getValidWidth( this.get('width'));

			this.set('right', right);
			this.set('width', width);
			this.set('left', right - width);

			console.log(this.get('name') + ' changeRight delta ' + delta);
		},
	});

});
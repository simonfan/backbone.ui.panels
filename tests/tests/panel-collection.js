define(['backbone.ui.panels.collection'], function(PanelCollection) {

return function() {

	module('basic methods', {
		setup: function() {
			window.xpanels = new PanelCollection([
				{ name: 'first', width: 200, height: 122 },
				{ name: 'second', width: 300, height: 143 },
				{ name: 'third', width: 500, height: 110 },
				{ name: 'fourth', width: 600, height: 900 }
			], {
				axis: 'x',
			});

			window.ypanels = new PanelCollection([
				{ name: 'first', width: 200, height: 122 },
				{ name: 'second', width: 300, height: 143 },
				{ name: 'third', width: 500, height: 110 },
				{ name: 'fourth', width: 600, height: 900 }
			], {
				axis: 'y',
			})
		},

		teardown: function() {
			delete window.xpanels;
			delete window.ypanels;
		}
	});

	test('.nextTo(panel), prevTo(panel)', function() {
		// get 3rd panel
		var third = xpanels.at(2);

		equal(third.get('name'), 'third');
		equal(xpanels.nextTo(third).get('name'), 'fourth');
		equal(xpanels.prevTo(third).get('name'), 'second');
	});
	
	test('.getPanelLeftPos(panel), .getPanelTopPos(panel)', function() {


		// get 3rd panel
		var third = xpanels.at(2);

		equal(third.get('width'), 500);
		equal(xpanels.getPanelLeftPos(third), 200 + 1 + 300 + 1);


		var fourth = ypanels.at(3);

		equal(fourth.get('height'), 900);
		equal(ypanels.getPanelTopPos(fourth), 122 + 1 + 143 + 1 + 110 + 1);
	});





	test('.arrange()', function() {

		// call arrange method
		xpanels.arrange();

		var first = xpanels.at(0),
			second = xpanels.at(1),
			third = xpanels.at(2);

		equal(first.get('left'), 0);
		equal(second.get('left'), first.get('left') + first.get('width') + 1);
		equal(third.get('left'), first.get('left') + first.get('width') + 1 + second.get('width') + 1);
	});




	module('Panel interactions', {
		setup: function() {
			window.xpanels = new PanelCollection([
				{ name: 'first', width: 200, height: 122 },
				{ name: 'second', width: 300, height: 143 },
				{ name: 'third', width: 500, height: 110 },
				{ name: 'fourth', width: 600, height: 900 }
			], {
				axis: 'x',
			});

			window.ypanels = new PanelCollection([
				{ name: 'first', width: 200, height: 122 },
				{ name: 'second', width: 300, height: 143 },
				{ name: 'third', width: 500, height: 110 },
				{ name: 'fourth', width: 600, height: 900 }
			], {
				axis: 'y',
			})
		},

		teardown: function() {
			delete window.xpanels;
			delete window.ypanels;
		}
	});

	test('change width attribute', function() {

		// arrange panels
		xpanels.arrange();

		// get panels
		var first = xpanels.at(0),
			second = xpanels.at(1),
			third = xpanels.at(2),
			fourth = xpanels.at(3);

		equal(second.get('width'), 300);
		equal(second.get('left'), xpanels.getPanelLeftPos(second))




		// set second's width
		second.set('right', second.get('left') + 450);
		// expect seconds width to have changed
		equal(second.get('width'), 450, 'second\'s width');

		// expect the third's pos LEFT to have changed
		equal(third.get('left'), xpanels.getPanelLeftPos(third),'expect the third\'s pos LEFT to have changed');

		// expect the fourth's pos LEFT to have changed
		equal(fourth.get('left'), xpanels.getPanelLeftPos(fourth));

		console.log(xpanels.getPanelLeftPos(fourth));





		console.log(second.get('left'))
		second.set('left', 300);
		equal(first.get('right'), 299);
	});
}
});
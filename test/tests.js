var defineContainer = function(){
	container = $('#focusMovedDivContainer');
	containerElement = container[0];
}

var lifecyclePlainContainer = {
	setup: function () {
		defineContainer();
	}
};

var lifecycleNoInitialHandlers = {
	setup: function () {
		defineContainer();
		container.focusMoved();
	}
};


/* ---------------------------------------------------------------------- */
module('Defining Handlers at Construction', lifecyclePlainContainer);

test( 'focusmovedin', function() {
	expect(1);
	// set up event handler
	container.focusMoved({
		focusmovedin: function(){ ok(true,'focusmovedin event fired'); }
	});
	// focus child field to trigger the event
	container.find('input').first().focus();
});

test( 'focusmovedwithin', function() {
	expect(1);
	// set up event handler
	container.focusMoved({
		focusmovedwithin: function(){ ok(true,'focusmovedwithin event fired'); }
	});
	// focus child field to trigger the event
	container.find('input').first().focus();
	container.find('input').last().focus();
});

asyncTest( 'focusmovedout', function() {
	expect(1);
	// set up event handler
	container.focusMoved({
		focusmovedout: function(){
			ok(true,'focusmovedout event fired');
			start();
		}
	});
	// focus child field to trigger the event
	container.find('input').first().focus();
	container.find(':focus').blur();
});


/* ---------------------------------------------------------------------- */
module('Defining Handlers after Construction', lifecycleNoInitialHandlers);

test( 'focusmovedin', function() {
	expect(1);
	// set up event handler
	container.on('focusmovedin', function(){
		ok(true,'focusmovedin event fired');
	});
	// focus child field to trigger the event
	container.find('input').first().focus();
});

test( 'focusmovedwithin', function() {
	expect(1);
	// set up event handler
	container.on('focusmovedwithin', function(){
		ok(true,'focusmovedwithin event fired');
	});
	// focus child field, then another child field to trigger the event
	container.find('input').first().focus();
	container.find('input').last().focus();
});

asyncTest( 'focusmovedout', function() {
	expect(1);
	// set up event handler
	container.on('focusmovedout', function(){
		ok(true,'focusmovedout event fired');
		start();
	});
	// focus then blur child field to trigger the event
	container.find('input').first().focus();
	container.find(':focus').first().blur();
});



/* ---------------------------------------------------------------------- */
module('Event Properties/Context', lifecyclePlainContainer);

asyncTest( 'Container element should be passed into event handler', function() {
	expect(3);
	// set up event handler
	container.focusMoved({
		focusmovedin: function(event, param){
			strictEqual( param, containerElement, "Container element passed into focusmovedin handler" );
		},
		focusmovedwithin: function(event, param){
			strictEqual( param, containerElement, "Container element passed into focusmovedwithin handler" );
		},
		focusmovedout: function(event, param){
			strictEqual( param, containerElement, "Container element passed into focusmovedout handler" );
			start();
		}
	});
	
	container.find('input').first().focus(); // trigger focusmovedin
	container.find('input').last().focus(); // trigger focusmovedwithin
	container.find(':focus').blur(); // trigger focusmovedout
});

asyncTest( 'Container element should be the "this" context in the handler', function() {
	expect(3);
	// set up event handler
	container.focusMoved({
		focusmovedin: function(event, param){
			strictEqual( this, containerElement, "Container element is 'this' context in focusmovedin handler" );
		},
		focusmovedwithin: function(event, param){
			strictEqual( this, containerElement, "Container element is 'this' context in focusmovedwithin handler" );
		},
		focusmovedout: function(event, param){
			strictEqual( this, containerElement, "Container element is 'this' context in focusmovedout handler" );
			start();
		}
	});
	
	container.find('input').first().focus(); // trigger focusmovedin
	container.find('input').last().focus(); // trigger focusmovedwithin
	container.find(':focus').blur(); // trigger focusmovedout
});


/* ---------------------------------------------------------------------- */
module('Multiple Handlers', lifecyclePlainContainer);

asyncTest( 'Multiple Event Handlers All Fire', function() {
	expect(6);
	// set up initial event handlers
	container.focusMoved({
		focusmovedin: function(){
			ok( true, 'focusmovedin initial handler fired' );
		},
		focusmovedwithin: function(){
			ok( true, 'focusmovedwithin initial handler fired' );
		},
		focusmovedout: function(){
			ok( true, 'focusmovedout initial handler fired' );
			start();
		}
	});
	// set up additional handlers
	container.on('focusmovedin', function(){
		ok( true, 'focusmovedin additional handler fired' );
	}).on('focusmovedwithin', function(){
		ok( true, 'focusmovedwithin additional handler fired' );
	}).on('focusmovedout', function(){
		ok( true, 'focusmovedout additional handler fired' );
		start();
	});
	
	container.find('input').first().focus(); // trigger focusmovedin
	container.find('input').last().focus(); // trigger focusmovedwithin
	container.find(':focus').blur(); // trigger focusmovedout
});









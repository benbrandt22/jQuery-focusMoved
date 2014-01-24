#focusMoved jQuery Plugin

## Synopsis

This plugin, when applied to a DOM element, adds new events to that element that will fire:

- when focus first moves into a child element
- when focus moves within the element (from one child element to another)
- when focus moves out of the element

## Code Example

Choose one or more DOM elements, and apply the plugin to get the new event behavior

```javascript
$('#myTable').focusMoved();
```

Then bind to these events as you would normally bind to jQuery events:

```javascript
$('#myTable')
.on('focusmovedin', function(){
  console.log('focus has just entered into ' + this.id);
})
.on('focusmovedout', focusmovedoutHandler);
```

Event handlers can also be applied when the plugin is first instantiated, by passing in the handler functions: 

```javascript
$('#myTable').focusMoved({
  focusmovedin: focusMovedHandler,
  focusmovedwithin: focusMovedHandler,
  focusmovedout: focusMovedHandler
});
```

**Working in ASP.Net Web Forms?** Here's an interesting application. Let's say we have an UpdatePanel that we don't want to refresh until the user "tabs-out" of it (thus moving the focus out). Use `focusMoved` to detect when focus moves out, then trigger an async postback:

```javascript
$().ready(function () {
  $('#<%= myUpdatePanel.ClientID %>')
    .focusMoved({ focusmovedout: function () {
      // refresh the UpdatePanel after the user moves focus out of it
      __doPostBack('<%= myUpdatePanel.ClientID %>', '');
    }
  });
});
```

## Motivation

What is this useful for? Let's say you have a large table full of editable fields (textboxes, checkboxes, etc). You want to perform some action (ajax calls, calculations, etc) *after* the user finishes making edits to the table. How do we know when they're done working in this table? By detecting when the focus goes from an element within the table to an element outside the table.

You can detect when an individual field gains or loses focus with jQuery's `focus` and `blur` events, but these don't apply to non-focusable elements such as tables, divs, etc. The `focusin` and `focusout` events come closer, but they fire every time a child element gains or loses focus. What if the table gets rows dynamically added? We'd rather not have to add event behavior to every new element. We just want to know when focus first moves *into* the table and *out of* the table.

This is where **focusMoved** comes in. Simply apply this plugin to a parent element, and you can subscribe to new events that tell you when focus first moves into the element, within the element, and out of the element. 

## Installation

First, make sure to include jQuery in your project, then include the "jQuery.focusMoved-1.0.js" script file. From that point forward, the focusMoved method will be available on the jQuery object.

## API Reference

To apply the plugin to your element(s), select them via jQuery and call `focusMoved()`:

```javascript
$('#myTable').focusMoved();
```

To bind to event handlers, they can be passed inside a setup object. The valid properties have the same names as the three events:

- focusmovedin
- focusmovedwithin
- focusmovedout

```javascript
$('#myTable').focusMoved({
  focusmovedin: focusMovedHandler,
  focusmovedwithin: focusMovedHandler,
  focusmovedout: focusMovedHandler
});
```

Event handlers can also be bound individually using jQuery's `on` method:

```javascript
$('#myTable')
.on('focusmovedin', function(){
  console.log('focus has just entered into ' + this.id);
})
.on('focusmovedout', focusmovedoutHandler);
```

Each event is executed with two parameters: the jQuery event object, and the DOM element it originated from. The originating element is also the `this` context in the event handler.

```javascript
function focusMovedHandler(event, element){
  var moveDescription = '';
  if( event.type === 'focusmovedin' ){ moveDescription = 'focus entered: '; }
  if( event.type === 'focusmovedwithin' ){ moveDescription = 'focus moved within: '; }
  if( event.type === 'focusmovedout' ){ moveDescription = 'focus exited: '; }
  console.log(moveDescription + element.id);
}
```

## Tests

Unit tests (built on qUnit) are available in the test folder, by opening index.htm. 

## Contributors

(c) 2014 Ben Brandt

twitter: @b2ben

## License

Licensed under the MIT License

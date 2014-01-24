/*!
 * jQuery focusMoved plugin
 * Copyright (c) 2014 Ben Brandt
 * Version 1.0 - Jan 22, 2014
 * Licensed under the MIT license
 */

(function ($, window, document, undefined) {
    'use strict';

    // define plugin defaults and strings
    var pluginName = "focusMoved",
        defaults = {
            focusmovedin: undefined,
            focusmovedwithin: undefined,
            focusmovedout: undefined
        },
        datakey_focusinside = 'focusinside',
        eventnames = {
            focusmovedin: 'focusmovedin',
            focusmovedwithin: 'focusmovedwithin',
            focusmovedout: 'focusmovedout'
        };

    // Constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
		
		// If events were defined in the initial setup, bind them now
        if (this.options.focusmovedin instanceof Function) {
            $(this.element).on(eventnames.focusmovedin, this.options.focusmovedin);
        }
        if (this.options.focusmovedwithin instanceof Function) {
            $(this.element).on(eventnames.focusmovedwithin, this.options.focusmovedwithin);
        }
        if (this.options.focusmovedout instanceof Function) {
            $(this.element).on(eventnames.focusmovedout, this.options.focusmovedout);
        }
    }

    Plugin.prototype = {

        init: function () {
            this.applyFocusMovedBehavior(this.element);
        },

        applyFocusMovedBehavior: function (element) {

            var thisPlugin = this; // create a reference back to this plugin

            // set initial state
            var initialFocusInsideState = ($(element).find(':focus').length === 0) ? false : true;
            this.setFocusInsideState(element, initialFocusInsideState);

            // apply focusout behavior
            $(element).focusout(function () {
                // something within the element lost focus
                // is our focus still inside the element?
                setTimeout(function () {
                    if ($(element).find(':focus').length === 0) {
                        // Focus has moved outside the parent element
                        thisPlugin.setFocusInsideState(element, false);
                    }
                }, 0); // short delay to allow browser to move focus when tabbing
            });

            // apply focusin behavior
            $(element).focusin(function () {
                // something within the element gained focus
                thisPlugin.setFocusInsideState(element, true);
            });
        },

        setFocusInsideState: function (element, newValue) {
            // compare the new value to the old, and fire events as needed
			var oldValue = $.data(element, datakey_focusinside);
            // see if the focus state is changing
            if (oldValue === false && newValue === true) {
                $(element).trigger(eventnames.focusmovedin, [element]);
            }
            if (oldValue === true && newValue === false) {
                $(element).trigger(eventnames.focusmovedout, [element]);
            }
            // did focus just move within the element?
            if (oldValue === true && newValue === true) {
                $(element).trigger(eventnames.focusmovedwithin, [element]);
            }
            // save the focus state to the element
            $.data(element, datakey_focusinside, newValue);
        }
    };

    // Lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery, window, document));
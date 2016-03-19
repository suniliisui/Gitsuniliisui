//  att.base.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 09/09/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.base', {
        _create: function () {
            return this._bootstrap();
        },

        _bootstrap: function () {
            this._initializeOptions();

            return this._checkDependencies();
        },

        _initializeOptions: function () {
            var self = this;

            $.each(this.options || {}, function (key, value) {
                self._setOption(key, value);
            });
        },

        _checkDependencies: function () {
            var self     = this,
                goodToGo = true;

            if (!this.dependencies) {
                return true;
            }

            $.each(this.dependencies['required'] || [], function (i, params) {
                if (!params.test) {
                    if (console && console.error) {
                        console.error(self.fullname + ' requires "' + params.name + '" to be loaded.' + (params.url ? ' (' + params.url + ')' : ''));
                    }

                    goodToGo = false;
                }
            });

            $.each(this.dependencies['optional'] || [], function (i, params) {
                if (!params.test) {
                    if (console && console.warn) {
                        console.warn(self.fullname + ' works better with "' + params.name + '" loaded.' + (params.url ? ' (' + params.url + ')' : ''));
                    }
                }
            });

            return goodToGo;
        },

        _setOption: function (name, value) {
            this.option(name, this.$callingElement.data(name) !== undefined ? this.$callingElement.data(name) : (this.option('name') !== undefined ? this.option(name) : value));
        }
    }, false);
}(jQuery, window, document));

//
//  att.radio.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.radio', {
        _super: $.att.base,

        name: '',
        disabled: false,

        _events: {
            'click': 'select'
        },

        _create: function () {
            var self = this;

            if (!this._superMethod('_bootstrap')) {
                return;
            }

            this.name = this.$callingElement.attr('name');
        },

        _render: function() {
            this.$container = $('<div>', { 'class': 'att-radio' }),

            this.$container.append($('<div>', { 'class': 'att-radio-indicator' }));

            this.$callingElement
                .after(this.$container)
                .appendTo(this.$container);

            this.$element = this.$container;

            this.$callingElement.on('change', $.proxy(this, '_update'));

            if (this.$callingElement.parent().is('label')) {
                this.$callingElement.parent().on('click', $.proxy(this, 'select'));
            } else {
                $('label[for=' + this.name + ']').on('click', $.proxy(this, 'select'));
            }

            this._update();
        },

        _update: function() {
            this.$container.toggleClass('on', this.$callingElement.prop('checked'));

            this.disabled = this.$callingElement.prop('disabled');

            this[this.disabled ? 'disable' : 'enable']();
        },

        select: function () {
            if (this.disabled) {
                return;
            }

            if (this.name.length) {
                $(':radio[name=' + this.name + ']').not(this.$callingElement)
                    .prop('checked', false)
                    .trigger('change');
            }

            this.$callingElement
                .prop('checked', true)
                .trigger('change');

            this.$container.addClass('on');
        },

        enable: function () {
            this.disabled = false;

            this.$callingElement.prop('disabled', false);

            this.$container.removeClass('disabled');
        },

        disable: function () {
            this.disabled = true;

            this.$callingElement.prop('disabled', true);

            this.$container.addClass('disabled');
        }
    }, false);

    $('[data-radio]').each(function () {
        var el = $(this);

        if (!$(this).is(':radio')) {
            el = $(this).find(':radio');
        }

        el.radio();
    });

}(jQuery, window, document));

//
//  att.tooltip.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document, Hammer) {
    $.jqfactory('att.tooltip', {
        _super: $.att.base,

        title: null,
        timeout: null,
        tooltip: null,

        _create: function() {
            this.title = this.$callingElement.attr('title');

            this._superMethod('_create');

            this.$callingElement.attr('title', '');

            if (this.option('trigger') !== 'manual') {
                if (this.option('trigger') === 'hover') {
                    this.$callingElement.on('mouseenter', $.proxy(this, 'show'));
                    this.$callingElement.on('mouseleave', $.proxy(this, 'hide'));
                } else {
                    this.$callingElement.on('click', $.proxy(this, 'toggle'));
                }
            }
        },

        _resetPosition: function () {
            var elPosition = this.option('container') === 'body' ? this.$callingElement.offset() : { top: 0, left: 0 },
                position   = {};

            if (!this.tooltip) {
                return;
            }

            switch (this.option('position')) {
                case 'above': {
                    position.top  = elPosition.top - this.tooltip.outerHeight();
                    position.left = elPosition.left - this.tooltip.outerWidth() / 2 + this.$callingElement.outerWidth() / 2;
                } break;

                case 'below': {
                    position.top  = elPosition.top + this.$callingElement.outerHeight();
                    position.left = elPosition.left - this.tooltip.outerWidth() / 2 + this.$callingElement.outerWidth() / 2;
                } break;

                case 'left': {
                    position.top  = elPosition.top + this.$callingElement.outerHeight() / 2 - this.tooltip.outerHeight() / 2;
                    position.left = elPosition.left - this.tooltip.outerWidth();
                } break;

                case 'right': {
                    position.top  = elPosition.top + this.$callingElement.outerHeight() / 2 - this.tooltip.outerHeight() / 2;
                    position.left = elPosition.left + this.$callingElement.outerWidth();
                } break;
            }

            position.left += this.option('offsetX') ? parseFloat(this.option('offsetX')) : 0;
            position.top  += this.option('offsetY') ? parseFloat(this.option('offsetY')) : 0;

            this.tooltip
                .css(position)
                .addClass(this.option('position'));
        },

        show: function() {
            var self = this;

            if (this.tooltip) {
                this._resetPosition();

                return this;
            }

            clearTimeout(this.timeout);

            this.tooltip = $('<div>', { 'class': 'att-tooltip' })
                .text((this.title !== undefined ? this.title + '' : null) || (this.option('title') !== undefined ? this.option('title') + '' : null) || '')
                .addClass([this.option('style') ? 'att-tooltip-' + this.option('style').replace('att-tooltip-', '') : '' , this.option('position')].join(' '))
                .appendTo(this.option('container') === 'body' ? $('body') : this.$callingElement);

            this._resetPosition();

            if (this.option('delay') && (this.option('trigger') === 'hover')) {
                this.timeout = setTimeout(function() {
                    self.tooltip.addClass('on');
                }, self.option('delay'));
            } else {
                self.tooltip.addClass('on');
            }

            return this;
        },

        hide: function() {
            var self = this;

            if (!this.tooltip) {
                return this;
            }

            clearTimeout(this.timeout);

            if (this.option('delay') && (this.option('trigger') === 'hover')) {
                this.timeout = setTimeout(function() {
                    self.tooltip.removeClass('on');
                    self.tooltip = null;
                }, this.option('delay'));
            } else {
                this.tooltip.remove();
                this.tooltip = null;
            }

            return this;
        },

        toggle: function(e) {
            if (this.tooltip) {
                return this.hide();
            } else {
                return this.show();
            }
        },

        update: function() {
            this._resetPosition();

            return this;
        },

        setTitle: function (title) {
            this.title = title;

            if (this.tooltip) {
                this.tooltip.text(this.title);
            }

            return this;
        },

        position: function(position) {
            return this.option('position');
        },

        setPosition: function(position) {
            this.option('position', position);

            if (this.tooltip) {
                this.hide()
                    .show();
            }

            return this;
        },

        tooltipElement: function() {
            return $(this.tooltip);
        },

        options: {
            /**
             * The time in milliseconds before showing the tooltip
             *
             * @type {Number}
             * @default 0
             */
            delay: 0,

            /**
             * The tooltip style. The available ones are:
             * * gray:    light gray background. The default look
             * * light:   white background
             * * dark:    dark gray background
             * * primary: the primary blue color background
             *
             * @type {Number}
             * @default 'gray'
             */
            style: 'gray',

            /**
             * The tooltip position relative to the element. Possible values:
             * * above
             * * below
             * * left
             * * right
             *
             * @type {String}
             * @default 'above'
             */
            position: 'above',

            /**
             * A jQuery selector that will be the tooltip's container
             *
             * @type {String}
             * @default 'body'
             */
            container: 'body',

            /**
             * The amount to offset the tooltip position in the horizontal axis
             *
             * @type {Number}
             * @default 0
             */
            offsetX: 0,

            /**
             * The amount to offset the tooltip position in the vertical axis
             *
             * @type {Number}
             * @default 0
             */
            offsetY: 0,

            /**
             * The event that triggers the tooltip. Can be any DOM/jQuery event
             *
             * @type {String}
             * @default 'hover'
             */
            trigger: 'hover'
        }
    }, false);
    $('[data-tooltip]').each(function () {
        var el = $(this);
        console.log(el);

        if (!$(this).attr('title')) {
            el = $(this).find('[title]');
        }

        el.tooltip();
    });

}(jQuery, window, document, window.Hammer));

//
//  att.accordion.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

// (function($, window, document) {

//     $.jqfactory('att.accordion', {
//         _super: $.att.base,

//         _create: function () {
//             if (!this._superMethod('_bootstrap')) {
//                 return;
//             }

//             this.$callingElement.find('[href]').on('click', $.proxy(this, '_toggle'));

//             this.$callingElement.find('.att-accordion-body.open').each(function() {
//                 var inner = $(this).find('> .att-accordion-inner');

//                 $(this).height(inner.get(0).scrollHeight);
//             });
//         },

//         _toggle: function(e) {
//             var group   = $(e.currentTarget).parents('.att-accordion-group:first'),
//                 body    = group.find('> .att-accordion-body'),
//                 inner   = body.find('> .att-accordion-inner'),
//                 hidding = body.hasClass('open');

//             if (!group.size()) {
//                 return false;
//             }

//             if (!this.option('multiple')) {
//                 this.$callingElement.find('.att-accordion-body.open').not(body).each(function() {
//                     var heading = $(this).prev('.att-accordion-heading'),
//                         inner   = $(this).find('> .att-accordion-inner');

//                     heading.removeClass('open');

//                     $(this).height(0).removeClass('open');
//                 });
//             }

//             body.height(hidding ? 0 : inner.get(0).scrollHeight).toggleClass('open');

//             group.find('> .att-accordion-heading').toggleClass('open');

//             e.preventDefault();
//         },

//         options: {
//             /**
//              * Allow multiple accordion panels to be open at the same time
//              *
//              * @type {Boolean}
//              * @default true
//              */
//             multiple: true
//         }
//     }, false);

//     $('[data-accordion]').accordion();

// }(jQuery, window, document));

//
//  att.alert.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 02/09/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.alert', {
        _super: $.att.base,

        _create: function () {
            if (!this._superMethod('_bootstrap')) {
                return;
            }

            setTimeout($.proxy(this, 'show'), this.option('showDelay'));
        },

        _init: function (option) {
            if (option !== 'hide') {
                this.show();
            }
        },

        _render: function () {
            this.$callingElement.find('[data-role=close], [data-close]')
                .off('click.att-close')
                .on('click.att-alert', $.proxy(this, 'hide'));
        },

        show: function () {
            var self = this;

            this._clearTimeout();

            this.$callingElement.animate({ top: this.option('top') }, this.option('showDuration'), function () {
                if (!self.option('sticky')) {
                    self.$callingElement.data('att.alert.hideTimeout', setTimeout($.proxy(self, 'hide'), self.option('hideDelay')));
                }
            });
        },

        hide: function (e) {
            var self = this;

            this._clearTimeout();

            this.$callingElement.animate({ top: 0 }, this.option('hideDuration'), function () {
                if (self.option('remove')) {
                    self.$callingElement.remove();
                }
            });

            if (e) {
                e.preventDefault();
            }
        },

        _clearTimeout: function () {
            clearTimeout(this.$callingElement.data('att.alert.hideTimeout'));
        },

        options: {
            /**
             * The time in milliseconds to wait before showing the alert
             *
             * @type {Number}
             * @default 0
             */
            showDelay: 0,

            /**
             * * The time in milliseconds to wait before hidding the alert
             *
             * @type {Number}
             * @default 10000 (10 seconds)
             */
            hideDelay: 10000,

            /**
             * The show animation duration in milliseconds
             *
             * @type {Number}
             * @default 200
             */
            showDuration: 200,

            /**
             * The hide animation duration in milliseconds
             *
             * @type {Number}
             * @default 200
             */
            hideDuration: 200,

            /**
             * If the alert element should be removed after hidding.
             * Useful if the alert is to be shown more than once.
             *
             * @type {Boolean}
             * @default true
             */
            remove: true,

            /**
             * The Y offset from the document's top.
             *
             * @type {Number}
             * @default 50
             */
            top: 50,

            /**
             * Controls if the alert hides automatically
             *
             * @type {Boolean}
             * @default false
             */
            sticky: false
        }
    }, false);

    $('[data-alert]').alert();

}(jQuery, window, document));

//
//  att.autosuggest.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 06/09/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document, Handlebars) {

    $.jqfactory('att.autosuggest', {
        _super: $.att.base,

        dependencies: {
            required: [ { name: 'Twitter Typeahead', test: $.fn.typeahead, url: 'https://github.com/twitter/typeahead.js' } ],
            optional: [ { name: 'Handlebarsjs', test: Handlebars, url: 'http://handlebarsjs.com' } ]
        },

        _create: function () {
            var self     = this,
                el       = this.$callingElement,
                params   = [],
                defaults = {},
                urls,
                template;

            if (!this._superMethod('_bootstrap')) {
                return;
            }

            urls = (this.option('url') || '').replace(' ', '').split(',');
            template = $(this.option('template'));

            if (Handlebars) {
                defaults.template = Handlebars.compile($(template).size() ? template.html() : '<div class="att-autosuggest-result">{{value}}</div>');
                defaults.engine = Handlebars;
            }

            $.each(urls, function (i, url) {
                params.push($.extend({}, defaults, {
                    remote: { url: url + '&' + self.option('queryParam') + '=%QUERY' },
                    footer: (self.option('seeMoreUrl') && i === urls.length -1) ? '<div class="att-autosuggest-footer"><a href="' + self.option('seeMoreUrl') + '" class="att-autosuggest-seemore">' + self.option('seeMoreText') + '</a></div>' : null
                }));
            });

            el.typeahead(params)
                .on('typeahead:opened', function () {
                    self.container.addClass('att-autosuggest-open');
                })
                .on('typeahead:closed', function () {
                    self.container.removeClass('att-autosuggest-open');
                });

            this.container = el.parents('.twitter-typeahead:first').addClass('att-autosuggest');

            $(document).on('click', '.att-autosuggest-seemore', function(e) {
                var el    = $(this),
                    query = el.parents('.att-autosuggest').find('.tt-query').val();

                el.attr('href', unescape(el.attr('href')).replace('%QUERY', query));
            });
        },

        options: {
            /**
             * The comma separated URLs used to make the ajax calls that should return the search results.
             * The dropdown will list the results grouped by URL.
             * See the "remote" section of Twitter Typeahed's documentation for more info.
             *
             * @type {String}
             * @default null
             */
            url: null,

            /**
             * The query param to append to the URLs.
             * This is the parameter that the server will use the find the results.
             *
             * @type {String}
             * @default 'q'
             */
            queryParam: 'q',

            /**
             * A jQuery selector used to find an element whose HTML will be used as an
             * Handlebars template. If null, the "value" property of the search results
             * will be used.
             *
             * @type {String}
             * @default null
             */
            template: null,

            /**
             * The URL for the link in the dropdown's footer.
             * The '%QUERY' text will be replaced by the searching string.
             * If null, the footer will be hidden.
             *
             * @type {String}
             * @default null
             */
            seeMoreUrl: null,

            /**
             * The text to display in the dropdown footer
             *
             * @type {String}
             * @default 'Sell all results'
             */
            seeMoreText: 'See all results'
        }
    }, false);

    $('[data-autosuggest]').autosuggest();

}(jQuery, window, document, window.Handlebars));

//
//  att.checkbox.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.checkbox', {
        _super: $.att.base,

        checked: false,
        disabled: false,

        _events: {
            'click': 'toggle'
        },

        _render: function() {
            if (this.$callingElement.parent().is('label')) {
                this.$callingElement.parent().on('click', $.proxy(this, 'toggle'));
            } else {
                $('label[for=' + this.$callingElement.attr('id') + ']').on('click', $.proxy(this, 'toggle'));
            }

            this.$container = $('<div>', { 'class': 'att-checkbox' });

            this.$container.append($('<div>', { 'class': 'att-checkbox-indicator' }));

            this.$callingElement
                .after(this.$container)
                .appendTo(this.$container);

            this.$element = this.$container;

            this.$callingElement.on('change', $.proxy(this, '_update'));

            if (this.option('checked')) {
                this.$callingElement
                    .prop('checked', true)
                    .trigger('change');
            } else {
                this._update();
            }
        },

        _update: function() {
            this.checked = this.$callingElement.prop('checked');
            this.disabled = this.$callingElement.prop('disabled');

            this.$container.toggleClass('on', this.checked);

            this[this.disabled ? 'disable' : 'enable']();
        },

        switchOn: function () {
            this.$callingElement
                .prop('checked', true)
                .trigger('change');

            this.$container.addClass('on');
            this.checked = true;
        },

        switchOff: function () {
            this.$callingElement
                .prop('checked', false)
                .trigger('change');

            this.$container.removeClass('on');
            this.checked = false;
        },

        toggle: function (e) {
            if ($.type(e) === 'boolean') {
                if (e) {
                    this.switchOn();
                } else {
                    this.switchOff();
                }
            } else {
                e.stopPropagation();

                if (this.disabled) {
                    return;
                }

                this[this.checked ? 'switchOff' : 'switchOn']();
            }
        },

        enable: function () {
            this.disabled = false;

            this.$callingElement.prop('disabled', false);

            this.$container.removeClass('disabled');
        },

        disable: function () {
            this.disabled = true;

            this.$callingElement.prop('disabled', true);

            this.$container.addClass('disabled');
        },

        options: {
            /**
             * Force initial state of the checkbox regardless of the element's current state.
             * If null, the element's current state will be used.
             *
             * @type {Boolean}
             * @default null
             */
            checked: null
        }
    }, false);

    $('[data-checkbox]').each(function () {
        var el = $(this);

        if (!$(this).is(':checkbox')) {
            el = $(this).find(':checkbox');
        }

        el.checkbox();
    });

}(jQuery, window, document));

//
//  att.close.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.close', {
        _super: $.att.base,

        _events: {
            'click.att-close': 'close'
        },

        close: function (e) {
            var self   = this,
                el     = $(e.currentTarget),
                target = this.option('target') ? $(this.option('target')) : el.parent();

            if (this.option('fade')) {
                target.fadeOut(this.option('fadeDuration') || 200, function() {
                    if (self.option('remove')) {
                        $(this).remove();
                    }
                });
            } else {
                if (self.option('remove')) {
                    target.remove();
                } else {
                    target.hide();
                }
            }

            e.preventDefault();
        },

        options: {
            /**
             * A jQuery selector that return the element to be close/removed
             *
             * @type {String}
             * @default null
             */
            target: null,

            /**
             * Controls if the element is faded out before removed
             *
             * @type {Boolean}
             * @default true
             */
            fade: true,

            /**
             * The fadeOut animation duration in milliseconds
             *
             * @type {Number}
             * @default 200
             */
            fadeDuration: 200,

            /**
             * Whether to remove the element after fading
             *
             * @type {Boolean}
             * @default true
             */
            remove: true
        }
    }, false);

    $('[data-role="close"], [data-close]').close();

}(jQuery, window, document));

//
//  att.select.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.select', {
        _super: $.att.base,

        dependencies: {
            required: [ { name: 'Select2', test: $.fn.select2, url: 'http://ivaynberg.github.io/select2/' } ]
        },

        _create: function () {
            var select2Options,
                className;

            if (!this._superMethod('_bootstrap')) {
                return;
            }

            if (!this.$callingElement.is('select')) {
                if (console && console.error) {
                    console.error('att.select must be called on select elements', this.$callingElement);
                }

                return;
            }

            className = (this.option('showSearch') ? 'show-search': '') + (this.option('className') ? this.option('className') : '');

            if (this.option('width') === 'full') {
                this.option('width', function() {
                    return '100%';
                });
            }

            select2Options = {
                width:             this.option('width'),
                dropdownCssClass:  className,
                containerCssClass: className,
                dropdownContainer: this._getContainer()
            }

            if (this.option('allowHtml') !== null) {
                // Override select2's escapeMarkup to return the unescaped markup
                select2Options.escapeMarkup = function (m) { return m; }
            }

            this.$callingElement.select2(select2Options);
        },

        _getContainer: function () {
            var self      = this,
                container = null,
                option    = this.option('container');

            if ($.type(option) === 'function') {
                return option;
            }

            if (this.option('container') !== null) {
                container = function () {
                    this.dropdown.addClass('in-place');

                    if (option === 'parent') {
                        container = self.$callingElement.parent();
                    } else if (option.indexOf('parent:') === 0) {
                        return $(this.containerSelector).parents(self.option('container').replace('parent:', ''));
                    } else {
                        container = option;
                    }
                }
            }

            return container;
        },

        options: {
            /**
             * Extra class to add to the select2 element
             *
             * @type {String}
             * @default null
             */
            className: null,

            /**
             * Controls the width style attribute of the Select2 container div. The following values are supported:
             * * null:    No width attribute will be set;
             * * full:    100%;
             * * element: Uses javascript to calculate the width of the source element;
             * * copy:    Copies the value of the width style attribute set on the source element;
             * * resolve: First attempts to copy than falls back on element.
             * Can also be a function that will be evaluated.
             *
             * @type {null|String|Function}
             * @default full
             */
            width: 'full',

            /**
             * The dropdown container element. This is useful when using the select inside modals.
             * The following values are supported:
             * * null:              The container will be "body"
             * * parent:            The container will be the select element's parent
             * * parent:{selector}: Will be the result of $(select2element).parents({selector});
             *
             * @type {null|String|Function}
             * @default null
             */
            container: null,

            /**
             * Whether to show a text input inside the dropdown
             * that allows searching it's values. Searching is still
             * possible even if no input is shown.
             *
             * @type {Boolean}
             * @default false
             */
            showSearch: false,

            /**
             * Whether to allow the dropdown values to be HTML.
             * Note: the select options HTML will need to be encoded
             * so the browser doen't try to render it.
             * Potentially dangerous. Use with caution.
             *
             * @type {Boolean}
             * @default false
             */
            allowHtml: false
        }
    }, false);

    $('[data-select]').each(function () {
        var el = $(this);

        if (!$(this).is('select')) {
            el = $(this).find('select');
        }

        if (el.size()) {
            el.select();
        }
    });

}(jQuery, window, document));

//
//  att.slider.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document, Hammer) {

    $.jqfactory('att.slider', {
        _super: $.att.base,

        dependencies: {
            required: [ { name: 'att.tooltip', test: $.att.tooltip } ]
        },

        currentValues: [],
        readonlyValues: [],
        maxX: 0,

        _create: function () {
            if (!this._superMethod('_bootstrap')) {
                return;
            }

            this.container = this._newEl().insertAfter(this.$callingElement);
            this.track     = this._newEl('track');
            this.handles   = this._newEl('handles-container');
            this.handleEls = { editable: [], disabled: [] };

            this.$callingElement.appendTo(this.container).hide();

            this.container
                .append(this.track)
                .append(this.handles);

            if (this.option('minLabel') !== null) {
                this.container.append(this._newEl('label').text(this.option('minLabel')).addClass('att-slider-label-min ' + this.option('labelsPosition')));
            }

            if (this.option('maxLabel') !== null) {
                this.container.append(this._newEl('label').text(this.option('maxLabel')).addClass('att-slider-label-max ' + this.option('labelsPosition')));
            }

            this.maxX = this.track.outerWidth();

            if (this.option('readonlyValues')) {
                this.readonlyValues = ('' + this.option('readonlyValues')).replace(/\s/g, '').split(',').splice(0, 2);
            }

            if (this.$callingElement.val()) {
                this.values(this.$callingElement.val().replace(/\s/g, '').split(',').splice(0, 2));
            } else {
                this.value(0);
            }
        },

        _reset: function () {
            this._resetRanges();
            this._resetHandles();
        },

        _resetRanges: function () {
            this.editableRange = this._newEl('range');

            this.track.empty();

            if (this.readonlyValues.length) {
                this.disabledRange = this._newEl('range').addClass('att-slider-range-disabled');

                if (this.readonlyValues.length > 1) {
                    this.disabledRange.css({
                        left:  this._positionForValue(this.readonlyValues[0]),
                        width: this._positionForValue(this.readonlyValues[1] - this.readonlyValues[0])
                    });
                } else {
                    this.disabledRange.width(this._positionForValue(this.readonlyValues[0]));
                }

                this.track.append(this.disabledRange);
            }

            if (this.currentValues.length > 1) {
                this.editableRange.css({
                    left:  this._positionForValue(this.currentValues[0]),
                    width: this._positionForValue(this.currentValues[1] - this.currentValues[0])
                });
            } else {
                this.editableRange.width(this._positionForValue(this.currentValues[0]));
            }
            this.track.append(this.editableRange);

            if (this.disabledRange) {
                if (this.currentValues.length > 1) {
                    if (this.currentValues[0] >= this.readonlyValues[0] || this.currentValues[1] <= this.readonlyValues[1]) {
                        this.disabledRange.css('z-index', 0);
                        this.editableRange.css('z-index', 1);
                    } else {
                        this.disabledRange.css('z-index', 1);
                        this.editableRange.css('z-index', 0);
                    }
                } else {
                    if (this.currentValues[0] >= this.readonlyValues[0]) {
                        this.disabledRange.css('z-index', 1);
                        this.editableRange.css('z-index', 0);
                    } else {
                        this.disabledRange.css('z-index', 0);
                        this.editableRange.css('z-index', 1);
                    }
                }
            }
        },

        _resetHandles: function () {
            var self       = this,
                handleDrag = $.proxy(self, '_handleDrag');

            this.handles.empty();

            if (this.readonlyValues.length) {
                $.each(this.readonlyValues, function (i, value) {
                    var handle = self._newEl('handle');

                    handle
                        .css('left', (value / self.option('max') * 100) + '%')
                        .addClass('att-slider-handle-disabled');

                    self.handles.append(handle);

                    if (self.option('tooltip')) {
                        handle.tooltip({
                            style:     'textonly',
                            title:     self._formatValue(value),
                            trigger:   'manual',
                            container: 'self'
                        }).tooltip('show');
                    }
                });
            }

            if (this.currentValues.length) {
                $.each(this.currentValues, function (i, value) {
                    var handle = self._newEl('handle').css('left', (value / self.option('max') * 100) + '%');

                    self.handles.append(handle);

                    if (self.option('tooltip')) {
                        handle.tooltip({
                            style:     self.option('tooltipStyle'),
                            title:     self._formatValue(value),
                            trigger:   'manual',
                            container: 'self',
                            position:  self.option('labelsPosition') === 'above' ? 'below' : 'above'
                        }).tooltip('show');
                    }

                    handle
                        .data('att-slider-value', value)
                        .hammer({ correct_for_drag_min_distance: false, drag_block_horizontal: true })
                        .on('dragstart drag dragend', handleDrag)
                        .on('mousedown', function() { self._resetTooltipsPosition(handle) });
                });
            }

            this.handleEls = {
                editable: this.handles.children(':not(.att-slider-handle-disabled)'),
                disabled: this.handles.children('.att-slider-handle-disabled'),
            };
        },

        _handleDrag: function (e) {
            var self = this,
                handle = $(e.currentTarget);

            if (e.type === 'dragstart') {
                this.initialDragPosition = handle.position().left;
                this.otherHandleValue    = $(this.handleEls.editable).not(handle).data('att-slider-value');

                handle.addClass('dragging');

                this._resetTooltipsPosition(handle);
            } else if (e.type === 'drag') {
                var position = Math.max(0, Math.min(this.initialDragPosition + e.gesture.deltaX, this.maxX)),
                    value    = this._valueForPosition(position);

                handle
                    .css({ left: position })
                    .data('att-slider-value', value);

                if (this.option('tooltip')) {
                    handle
                        .tooltip('setTitle', this._formatValue(value))
                        .tooltip('update');

                    this._resetTooltipsPosition(handle);
                }

                this.currentValues = this.otherHandleValue ? this._sortArray([value, this.otherHandleValue]) : [value];

                this.$callingElement.val(this.currentValues.join(', '));

                this._resetRanges();
            } else if (e.type === 'dragend') {
                handle.removeClass('dragging');
            }

            return false;
        },

        _formatValue: function (value) {
            if (this.option('valueFormat') && this.option('valueFormat') !== 'none') {
                if ($.isFunction(this.option('valueFormat'))) {
                    value = this.option('valueFormat')(value);
                } else if (this.option('valueFormat') === 'round') {
                    value = Math.round(value);
                }
            }

            return (this.option('valuePrefix') || '') + value + (this.option('valueSuffix') || '');
        },

        _newEl: function (className) {
            return $('<div />', { 'class': 'att-slider' + (className ? '-' + className : '') });
        },

        _positionForValue: function (value) {
            return Math.round(this.track.width() * (value / this.option('max')));
        },

        _valueForPosition: function (position) {
            return position / this.track.width() * this.option('max');
        },

        _sortArray: function (array) {
            return array.sort(function(a, b) {
                return a - b;
            });
        },

        _resetTooltipsPosition: function(draggingHandle) {
            if (this.currentValues.length === 1 || !this.option('tooltip')) {
                return;
            }

            var handle1Tooltip = $(this.handleEls.editable).not(draggingHandle).data('attTooltip'),
                handle2Tooltip = $(draggingHandle).data('attTooltip');

            if (!handle1Tooltip.tooltipElement().size() || !handle2Tooltip.tooltipElement().size()) {
                return;
            }

            var labelsPosition    = this.option('labelsPosition'),
                altLabelsPosition = (labelsPosition === 'above' ? 'below' : 'above'),
                handle1Left       = handle1Tooltip.tooltipElement().offset().left,
                handle1Width      = handle1Tooltip.tooltipElement().outerWidth(),
                handle2Left       = handle2Tooltip.tooltipElement().offset().left,
                handle2Width      = handle2Tooltip.tooltipElement().outerWidth();

            if ( (handle1Left >= handle2Left - handle1Width) && (handle1Left <= handle2Left + handle2Width) ) {
                if (handle2Tooltip.position() !== handle1Tooltip.position()) {
                    return;
                }

                if (handle2Tooltip.position() === labelsPosition) {
                    handle1Tooltip.setPosition(altLabelsPosition);
                }

                if (handle1Tooltip.position() === altLabelsPosition) {
                    handle1Tooltip.setPosition(labelsPosition);
                }
            } else {
                if (handle2Tooltip.position() === labelsPosition) {
                    handle2Tooltip.setPosition(altLabelsPosition);
                }

                if (handle1Tooltip.position() === labelsPosition) {
                    handle1Tooltip.setPosition(altLabelsPosition);
                }
            }
        },

        value: function () {
            var args = [].slice.call(arguments);

            if (!args.length) {
                return this.currentValues.length === 1 ? this.currentValues[0] : this.currentValues;
            }

            this.values([args[0]]);

            return this
        },

        values: function () {
            var args = [].slice.call(arguments),
                values = args[0];

            if (!args.length) {
                return this.currentValues;
            }

            for (i = 0; i < values.length; i++) {
                values[i] = Math.min(this.option('max'), Math.max(values[i], this.option('min')));
            }

            this.currentValues = this._sortArray(values);

            this._reset();

            return this
        },

        readonlyValues: function() {
            var args = [].slice.call(arguments),
                values = args[0];

            if (!args.length) {
                return this.readonlyValues;
            }

            for (i = 0; i < values.length; i++) {
                values[i] = Math.min(this.option('max'), Math.max(values[i], this.option('min')));
            }

            this.readonlyValues = this._sortArray(values);

            this._reset();

            return this
        },

        options: {
            /**
             * The minimum value
             *
             * @type {Number}
             * @default 0
             */
            min: 0,

            /**
             * The maximum value
             *
             * @type {Number}
             * @default 100
             */
            max: 100,

            /**
             * The text to display at the start of the slider
             *
             * @type {String}
             * @default null
             */
            minLabel: null,

            /**
             * The text to display at the end of the slider
             *
             * @type {String}
             * @default null
             */
            maxLabel: null,

            /**
             * The position of the min and max labels. They can be:
             * * 'below': will show the labels below the slider
             * * 'above': will show the labels above the slider
             *
             * @type {String}
             * @default 'below'
             */
            labelsPosition: 'below',

            /**
             * Whether to display a tooltip on the slider handles
             *
             * @type {Boolean}
             * @default true
             */
            tooltip: true,

            /**
             * The tooltip style. See att.tooltip for options
             *
             * @type {String}
             * @default 'light'
             */
            tooltipStyle: 'light',

            /**
             * The comma separated values to use as 'previously selected' values
             *
             * @type {String}
             * @default ''
             */
            readonlyValues: '',

            /**
             * The text to prepend to the handles tooltip value
             *
             * @type {String}
             * @default null
             */
            valuePrefix: null,

            /**
             * The text to append to the handles tooltip value
             *
             * @type {String}
             * @default null
             */
            valueSuffix: null,

            /**
             * Controls how the handles values are formatted.
             * If 'round' is passed, the value will be rounded.
             * If a function is passed, it receives the full unformatted value and it's return value will be used.
             * If null, the unformatted value will be used.
             *
             * @type {String|Function}
             * @default 'round'
             */
            valueFormat: 'round'
        }
    }, false);

    $('[data-slider]').slider();

}(jQuery, window, document, window.Hammer));

//
//  att.switch.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document, Hammer) {

    $.jqfactory('att.toggleSwitch', {
        _super: $.extend(true, {}, $.att.base, $.att.checkbox),

        dependencies: {
            optional: [ { name: 'Hammer.js', test: Hammer, url: 'http://eightmedia.github.io/hammer.js/' } ]
        },

        initialDragPosition: 0,

        _render: function() {
            var container = $('<div>', { 'class': 'att-switch' }),
                wrapper   = $('<div>', { 'class': 'att-switch-content' }),
                showLabels = this.option('labels') || (this.$callingElement.data('labels') != undefined);

            this.$container = container;
            this.$wrapper = wrapper;

            this.$container
                .toggleClass('att-switch-alt', showLabels)
                .append(wrapper);

            this.$callingElement.after(this.$container);
            this.$callingElement.appendTo(this.$container);

            wrapper.append($('<div>', { 'class': 'att-switch-onText' }).text(showLabels ? this.option('onText') : ''));
            wrapper.append($('<div>', { 'class': 'att-switch-thumb' }));
            wrapper.append($('<div>', { 'class': 'att-switch-offText' }).text(showLabels ? this.option('offText') : ''));

            this.$element = this.$container;

            if (Hammer) {
                var handleDrag = $.proxy(this, '_handleDrag');

                this.$wrapper
                    .hammer({ correct_for_drag_min_distance: false, drag_block_horizontal: true })
                    .on('dragstart drag dragend', handleDrag);
            }

            if (this.option('checked')) {
                this.$callingElement
                    .prop('checked', true)
                    .trigger('change');
            }

            this._update();
        },

        _handleDrag: function(e) {
            var self = this;

            if (e.type === 'dragstart') {
                this.initialDragPosition = this.$wrapper.position().left;

                this.$wrapper.addClass('dragging');
            } else if (e.type === 'drag') {
                var left = Math.min(0, Math.max(this.initialDragPosition + e.gesture.deltaX, -30));

                this.$wrapper.css({ left: left });
            } else if (e.type === 'dragend') {
                var isOn = this.$wrapper.position().left > -15;
                this.$wrapper.removeClass('dragging');

                this.$wrapper.animate({ left: isOn ? 0 : -30 }, 100, function() {
                    self.toggle(isOn);
                    self.$wrapper.css({ left: '' });
                });
            }

            return false;
        },

        options: {
            /**
             * Whether to use labels inside the switch
             *
             * @type {Boolean}
             * @default false
             */
            labels:  false,

            /**
             * The label for the ON state
             *
             * @type {String}
             * @default 'YES'
             */
            onText:  'YES',

            /**
             * The label for the OFF state
             *
             * @type {String}
             * @default 'NO'
             */
            offText: 'NO'
        }
    }, false);

    $('[data-switch]').each(function () {
        var el = $(this);

        if (!$(this).is(':checkbox')) {
            el = $(this).find(':checkbox');
        }

        el.toggleSwitch();
    });

}(jQuery, window, document, window.Hammer));

//
//  att.tabs.js
//  AT&T Style Guide
//
//  Created by AndrÃ© Neves on 01/05/13.
//  Copyright (c) 2013 Gen. All rights reserved.
//

(function($, window, document) {

    $.jqfactory('att.tabs', {
        _super: $.att.base,

        _create: function () {
            if (!this._superMethod('_create')) {
                return;
            }

            this.$tabsContainer = $(this.$callingElement.data('tabs'));

            this.$callingElement.find('[href]:not([href="#"])').on('click', $.proxy(this, '_show'));
        },

        _show: function(e) {
            var el      = $(e.currentTarget),
                tabPane = this.$tabsContainer.find(el.attr('href'));

            this.$callingElement.find('.active').removeClass('active');
            el.parent().addClass('active');

            this.$tabsContainer.find('.tab-pane.active').removeClass('active');
            tabPane.addClass('active');

            if (this.option('change') && $.isFunction(this.option('change'))) {
                this.option('change').apply(this, [el.attr('href').replace('#', '')]);
            }

            e.preventDefault();
        },

        options: {
            /**
             * The function to call when the active tab changes.
             * The functionreceives the active tabPane id
             *
             * @type {Function}
             * @default null
             */
            change: null
        }
    }, false);

    $('[data-tabs]').tabs();

}(jQuery, window, document));


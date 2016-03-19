/*Begin of jQuery plug-in for sticky elements to page header */

(function ($) {
    $.sticky = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        var clonedStickyElement;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("sticky", base);
        $(base).data("stickyEnabled", true);

        base.init = function () {

            base.options = $.extend({}, $.sticky.defaultOptions, options);

            // Put your initialization code here
            clonedStickyElement = $(base.$el, base.$el.closest("." + base.options.OuterWprClassName));
            clonedStickyElement.before("<div class='bui-sticky-elem-clone'></div>");
            
            base.$el.closest("." + base.options.OuterWprClassName).find(".bui-sticky-elem-clone")
            .css({
              'position': 'fixed',
              'width': "100%",
              'top': 0,
              'left': 0,
              'visibility': 'hidden',
              'z-index': base.options.zIndex ? base.options.zIndex : 10
            })
            .html(clonedStickyElement.clone());

            $(window)
                .scroll(base.UpdateStickyElements)
                .trigger("scroll");

        };

        //Verfiy if the sticky elements are ready to stick on the top or not.. (private function)
        base.UpdateStickyElements = function () {

            $("." + base.options.OuterWprClassName).each(function () {

                var stickyTabHeight = base.options.verticalOffsetValue;

                var el = $(this),
                    offset = el.offset(),
                    scrollTop = $(window).scrollTop(),
                    floatingHeader = $(".bui-sticky-elem-clone", el.parent()),
                    offsetTopAdjustedValue = (offset.top - stickyTabHeight);

                if (scrollTop > offsetTopAdjustedValue) {
                    floatingHeader.css({
                        "visibility": "visible",
                            "top": stickyTabHeight + "px"
                    });
                } else {
                    floatingHeader.css({
                        "visibility": "hidden"
                    });
                };
            });
        };

       // Run initializer
       base.init();

    };

    $.sticky.defaultOptions = {
        OuterWprClassName: "bui-sticky-elem-wpr",
        verticalOffsetValue: 0
    };

    $.fn.sticky = function (options) {
        return this.each(function () {
            (new $.sticky(this, options));
        });
    };

})(jQuery);;

/*End of jQuery plug-in for sticky elements to page header */
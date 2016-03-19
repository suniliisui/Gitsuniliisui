/**
 * Created with IntelliJ IDEA.
 * User: tl2451
 * Date: 6/8/13
 * Time: 10:04 AM
 * To change this template use File | Settings | File Templates.
 */
( function ( $ ) {

    $.fn.attcheckbox = function ( options ) {
        var defaultOpt = {
            checkboxClass: "att-checkbox",
            checkboxClassActive: "att-checkbox-active",
            checkboxHighLightText: null,
            hideClass: "att-hide"
        };

        options = $.extend( true, {}, defaultOpt, options );

        return this.each( function () {
            var $this = $(this),
                wrapTag = '<div class="' + options.checkboxClass + '">';

            if ( $this.attr('type') === 'checkbox' ) {
                $this.addClass( options.hideClass ).wrap( wrapTag );

                $this.parent().removeClass( options.checkboxClassActive );

                if ( $this.is(':checked')) {
                    $this.parent().addClass( options.checkboxClassActive );
                } else {
                    $this.parent().removeClass( options.checkboxClassActive );
                }

                $this.change( function() {
                    console.log("triggle change event: attcheckbox");
                    $this.parent().toggleClass( options.checkboxClassActive );
                    if ( options.checkboxHighLightText !== null ) {
                        $this.parent().nextAll('label').toggleClass(options.checkboxHighLightText);
                    }
                });
            }
        });
    };
})(jQuery);

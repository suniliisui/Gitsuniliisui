/**
 * Created with IntelliJ IDEA.
 * User: tl2451
 * Date: 10/21/13
 * Time: 10:04 AM
 * To change this template use File | Settings | File Templates.
 */
( function ( $ ) {

    $.fn.attradio = function ( options ) {
        var defaultOpt = {
            radioClass: "form-element-sprite-radio",
            radioClassActive: "form-element-sprite-radio-on",
            radioHighLightText: null,
            hideClass: "att-hide",
            isCallbackExeFirstTime: true,
            data: {},
            callBack: function( inputEle ) {
            }
        };

        options = $.extend( true, {}, defaultOpt, options );

        return this.each( function () {
            var $this = $(this),
                    wrapTag = '<div class="form-element-sprite radio-button ' + options.radioClass + '">',
                    $thisWrap = $this.addClass( options.hideClass ).wrap( wrapTag );

            if ( $this.attr( 'type' ) === 'radio' ) {

                if ( $( this ).is( ':checked' ) ) {
                    $( this ).parent().addClass( defaultOpt.radioClassActive );
                    if ( options.isCallbackExeFirstTime ) {
                        options.callBack( $this, options.data );
                    }
                } else {
                    $( this ).parent().removeClass( defaultOpt.radioClassActive );
                }

                //$this.addClass( options.hideClass ).wrap( wrapTag ).change( function() {
                $thisWrap.change( function () {
                    // radio button may contain groups! - so check for group
                    $( 'input[name="' + $( this ).attr( 'name' ) + '"]' ).each( function () {
                        if ( $( this ).is( ':checked' ) ) {
                            $( this ).parent().addClass( defaultOpt.radioClassActive );
                            options.callBack( $this, options.data );
                        } else {
                            $( this ).parent().removeClass( defaultOpt.radioClassActive );
                        }
                    } );
                } );
            }
        });
    };
    
})(jQuery);

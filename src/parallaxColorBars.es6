(function ($) {

    $.fn.parallaxColorBars = function (method) {

        let methods = {

            getY: function(){

            },


            init: function (options) {

                // let settings = $.extend({
                //     duration: 1.5,
                //     shift: 10
                // }, options);


                // let scrollTop = 0,
                //     windowHeight = 0,
                //     triggerPosition = 0;
                //
                //
                // $(window).on('scroll load', function () {
                //     scrollTop = $(window).scrollTop();
                //     windowHeight = $(window).height();
                //
                //     triggerPosition = scrollTop + windowHeight;
                // });


                this.each(function () {

                    let $this_parallax_section = $(this),
                        $color_bars = $this_parallax_section.find('.parallax-color-bar'),
                        parallax_section_width = $this_parallax_section.outerWidth(),
                        parallax_section_height = $this_parallax_section.outerHeight();

                    $color_bars.bind('parallaxContentMove', function(){

                    });


                    $color_bars.each(function(){

                        let $this_bar = $(this),
                            $color_bar_background = $color_bars.find('.parallax-color-bar-background'),
                            $color_bar_options = $color_bars.data('parallax-color-bar');

                        $this_bar.css({
                            left: $color_bar_options.left + 'px',
                            top: $color_bar_options.top + 'px'
                        });

                        $color_bar_background.css({
                            left: - $color_bar_options.left + 'px',
                            top: - $color_bar_options.top + 'px',
                            width: parallax_section_width + 'px',
                            height: parallax_section_height + 'px',
                            position: 'absolute'
                        });
                    })


                    // let $this = $(this),
                    //     thisHeight = $this.outerHeight(),
                    //     animationTriggerStart = 0,
                    //     animationTriggerEnd = 0,
                    //     offset = 0,
                    //     animationLength = 0,
                    //
                    //     dataOptions = $this.data('parallax-content'),
                    //
                    //     animateDuration = settings.duration,
                    //     animateShift = settings.shift;
                    //
                    //
                    // if (dataOptions != undefined) {
                    //     if (dataOptions.hasOwnProperty('duration')) {
                    //         animateDuration = dataOptions.duration;
                    //     }
                    //
                    //     if (dataOptions.hasOwnProperty('shift')) {
                    //         animateShift = dataOptions.shift;
                    //     }
                    // }
                    //
                    //
                    // $(window).on('load resize', function () {
                    //
                    //     offset = $this.offset();
                    //
                    //     animationTriggerStart = offset.top;
                    //
                    //     animationTriggerEnd = animationTriggerStart + windowHeight;
                    //
                    //     animationLength = animationTriggerEnd - animationTriggerStart;
                    // });
                    //
                    //
                    // $(window).on('scroll resize load', function () {
                    //
                    //     if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + thisHeight) {
                    //
                    //         $this.addClass('active');
                    //
                    //         let centerPixelShift = triggerPosition - offset.top - (animationLength * 0.5);
                    //
                    //         let centerPercentShift = centerPixelShift / (animationLength / 100) * 2;
                    //
                    //         let y = animateShift / 100 * centerPercentShift;
                    //
                    //         TweenLite.to($this, animateDuration, {y: y + 'px'});
                    //
                    //     }
                    //
                    //     else {
                    //         $this.removeClass('active');
                    //     }
                    //
                    // })

                });
              
            }
        };


        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('There is no method with the name ' + method + ', for jQuery.parallaxContent');
        }
    };


})(jQuery);

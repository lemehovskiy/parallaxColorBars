(function ($) {

    $.fn.parallaxColorBars = function (method) {

        let methods = {

            init: function (options) {

                let settings = $.extend({
                    duration: 1.5,
                    shift: 10
                }, options);


                let scrollTop = 0,
                    windowHeight = 0,
                    triggerPosition = 0;


                $(window).on('scroll load', function () {
                    scrollTop = $(window).scrollTop();
                    windowHeight = $(window).height();

                    triggerPosition = scrollTop + windowHeight;
                });


                this.each(function () {

                    let $this_parallax_section = $(this),
                        $color_bars = $this_parallax_section.find('.parallax-color-bar'),
                        parallax_section_width = $this_parallax_section.outerWidth(),
                        parallax_section_height = $this_parallax_section.outerHeight();


                    $(window).on('resize', function () {
                        parallax_section_width = $this_parallax_section.outerWidth();
                        parallax_section_height = $this_parallax_section.outerHeight();
                    });

                    $color_bars.each(function(){

                        let $this_bar = $(this),

                            color_bar_height = $this_bar.outerHeight(),
                            animationTriggerStart = 0,
                            animationTriggerEnd = 0,
                            offset = 0,
                            animationLength = 0,

                            animateDuration = settings.duration,
                            animateShift = settings.shift,

                            $color_bar_background = $this_bar.find('.parallax-color-bar-background'),

                            color_bar_options = $this_bar.data('parallax-color-bar');

                        $this_bar.css({
                            left: color_bar_options.left + '%',
                            top: color_bar_options.top + '%',
                            position: 'absolute',
                            overflow: 'hidden',
                            width: color_bar_options.width + 'px',
                            height: color_bar_options.height + 'px'
                        });


                        console.log(parallax_section_width);


                        $color_bar_background.css({
                            position: 'absolute'
                        });


                        if (color_bar_options != undefined) {
                            if (color_bar_options.hasOwnProperty('duration')) {
                                animateDuration = color_bar_options.duration;
                            }

                            if (color_bar_options.hasOwnProperty('shift')) {
                                animateShift = color_bar_options.shift;
                            }
                        }


                        $(window).on('resize load', function () {

                            $color_bar_background.css({
                                width: parallax_section_width + 'px',
                                height: parallax_section_height + 'px',
                                left: - (parallax_section_width / 100 * color_bar_options.left) + 'px',
                                top: - (parallax_section_height / 100 * color_bar_options.top) + '%'
                            });

                            offset = $this_bar.offset();

                            animationTriggerStart = offset.top;

                            animationTriggerEnd = animationTriggerStart + windowHeight;

                            animationLength = animationTriggerEnd - animationTriggerStart;
                        });


                        $(window).on('scroll resize load', function () {

                            if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + color_bar_height) {

                                $this_bar.addClass('active');

                                let centerPixelShift = triggerPosition - offset.top - (animationLength * 0.5);

                                let centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                                let y = animateShift / 100 * centerPercentShift;

                                TweenLite.to($this_bar, animateDuration, {y: y + 'px'});
                                TweenLite.to($color_bar_background, animateDuration, {y: - y + 'px'});

                            }

                            else {
                                $this_bar.removeClass('active');
                            }

                        })
                    })

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

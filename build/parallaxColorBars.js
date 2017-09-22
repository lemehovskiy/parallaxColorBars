'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*

Parallax Color Bars

Author: lemehovskiy
Website: https://github.com/lemehovskiy

 */

;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {

    $.fn.parallaxColorBars = function (method) {

        var methods = {

            init: function init(options) {

                var settings = $.extend({
                    duration: 1.5,
                    shift: 10,
                    top: 50,
                    left: 50,
                    width: 10,
                    height: 20
                }, options);

                var scrollTop = 0,
                    windowHeight = 0,
                    triggerPosition = 0;

                $(window).on('scroll load', function () {
                    scrollTop = $(window).scrollTop();
                    windowHeight = $(window).height();

                    triggerPosition = scrollTop + windowHeight;
                });

                this.each(function () {

                    var $this_parallax_section = $(this),
                        $color_bars = $this_parallax_section.find('.color-bar'),
                        parallax_section_width = $this_parallax_section.outerWidth(),
                        parallax_section_height = $this_parallax_section.outerHeight();

                    $(window).on('resize', function () {
                        parallax_section_width = $this_parallax_section.outerWidth();
                        parallax_section_height = $this_parallax_section.outerHeight();
                    });

                    $color_bars.each(function () {

                        var $this_bar = $(this),
                            color_bar_height = $this_bar.outerHeight(),
                            animationTriggerStart = 0,
                            animationTriggerEnd = 0,
                            offset = 0,
                            animationLength = 0,
                            bar_position_top = settings.top,
                            bar_position_left = settings.left,
                            bar_width = settings.width,
                            bar_height = settings.height,
                            animateDuration = settings.duration,
                            animateShift = settings.shift,
                            $color_bar_background = $this_bar.find('.color-bar-background'),
                            color_bar_options = $this_bar.data('parallax-color-bar');

                        if (color_bar_options != undefined) {
                            if (color_bar_options.hasOwnProperty('duration')) {
                                animateDuration = color_bar_options.duration;
                            }

                            if (color_bar_options.hasOwnProperty('shift')) {
                                animateShift = color_bar_options.shift;
                            }

                            if (color_bar_options.hasOwnProperty('top')) {
                                bar_position_top = color_bar_options.top;
                            }

                            if (color_bar_options.hasOwnProperty('left')) {
                                bar_position_left = color_bar_options.left;
                            }

                            if (color_bar_options.hasOwnProperty('width')) {
                                bar_width = color_bar_options.width;
                            }

                            if (color_bar_options.hasOwnProperty('height')) {
                                bar_height = color_bar_options.height;
                            }
                        }

                        $this_bar.css({
                            top: bar_position_top + '%',
                            left: bar_position_left + '%',
                            position: 'absolute',
                            overflow: 'hidden',
                            width: bar_width + '%',
                            height: bar_height + '%'

                        });

                        $color_bar_background.css({
                            position: 'absolute'
                        });

                        $(window).bind('resizeEnd load', function () {
                            $color_bar_background.css({
                                width: parallax_section_width + 'px',
                                height: parallax_section_height + 'px',
                                left: -(parallax_section_width / 100 * color_bar_options.left) + 'px',
                                top: -(parallax_section_height / 100 * color_bar_options.top) + 'px'
                            });

                            offset = $this_bar.offset();

                            animationTriggerStart = offset.top;

                            animationTriggerEnd = animationTriggerStart + windowHeight;

                            animationLength = animationTriggerEnd - animationTriggerStart;
                        });

                        $(window).resize(function () {
                            if (this.resizeTO) clearTimeout(this.resizeTO);
                            this.resizeTO = setTimeout(function () {
                                $(this).trigger('resizeEnd');
                            }, 500);
                        });

                        $(window).on('scroll resize load', function () {

                            if (triggerPosition > animationTriggerStart && triggerPosition < animationTriggerEnd + color_bar_height) {

                                $this_bar.addClass('active');

                                var centerPixelShift = triggerPosition - offset.top - animationLength * 0.5;

                                var centerPercentShift = centerPixelShift / (animationLength / 100) * 2;

                                var y = animateShift / 100 * centerPercentShift;

                                TweenLite.to($this_bar, animateDuration, { y: y + 'px' });
                                TweenLite.to($color_bar_background, animateDuration, { y: -y + 'px' });
                            } else {
                                $this_bar.removeClass('active');
                            }
                        });
                    });
                });
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('There is no method with the name ' + method + ', for jQuery.parallaxColorBars');
        }
    };
});
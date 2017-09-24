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
                    duration: 2,
                    shift: 100,
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

                $(window).resize(function () {
                    if (this.resizeTO) clearTimeout(this.resizeTO);
                    this.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd');
                    }, 500);
                });

                this.each(function () {

                    var $this_parallax_section = $(this),
                        $color_bars = $this_parallax_section.find('.color-bar'),
                        parallax_section_width = $this_parallax_section.outerWidth(),
                        parallax_section_height = $this_parallax_section.outerHeight(),
                        animation_progress = 0,
                        mirror_animation_progress = 0;

                    $(window).on('resize', function () {
                        parallax_section_width = $this_parallax_section.outerWidth();
                        parallax_section_height = $this_parallax_section.outerHeight();
                    });

                    $(window).on('scroll resize load', function () {
                        animation_progress = get_scroll_progress({
                            element: $this_parallax_section,
                            duration: 'viewport',
                            window_height: windowHeight

                        });

                        mirror_animation_progress = get_mirror_progress(animation_progress);

                        // console.log(mirror_animation_progress);
                    });

                    $color_bars.each(function () {

                        var $this_bar = $(this);

                        var color_bar_options = $this_bar.data('parallax-color-bar');
                        settings = $.extend({}, settings, color_bar_options);

                        var bar_position_top = settings.top,
                            bar_position_left = settings.left,
                            bar_width = settings.width,
                            bar_height = settings.height,
                            animateDuration = settings.duration,
                            animateShift = settings.shift,
                            $color_bar_background = $this_bar.find('.color-bar-background');

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
                                left: -(parallax_section_width / 100 * bar_position_left) + 'px',
                                top: -(parallax_section_height / 100 * bar_position_top) + 'px'
                            });
                        });

                        $(window).on('scroll resize load', function () {

                            var y = animateShift * mirror_animation_progress;

                            TweenLite.to($this_bar, animateDuration, { y: y + 'px' });
                            TweenLite.to($color_bar_background, animateDuration, { y: -y + 'px' });
                        });
                    });
                });

                function get_mirror_progress(progress) {

                    var mirror_progress = 0;

                    if (progress > 0.5) {
                        mirror_progress = -(1 - 1 / 0.5 * progress);
                    } else {
                        mirror_progress = -(1 - 1 / 0.5 * progress);
                    }

                    return mirror_progress;
                }

                function get_scroll_progress(settings) {

                    var $element = settings.element;

                    var trigger = $(window).scrollTop() + settings.window_height;

                    var element_animation_start = $element.offset().top;

                    var element_animation_end = element_animation_start + settings.window_height + $element.outerHeight();

                    var animation_length = element_animation_end - element_animation_start;

                    var animation_progress = void 0;

                    // if (trigger > element_animation_start && trigger < element_animation_end){
                    animation_progress = (trigger - element_animation_start) / animation_length;
                    // }

                    if (animation_progress > 1) {
                        animation_progress = 1;
                    } else if (animation_progress < 0) {
                        animation_progress = 0;
                    }

                    return animation_progress;
                }
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
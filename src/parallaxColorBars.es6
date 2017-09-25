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
})
(function ($) {

    $.fn.parallaxColorBars = function (method) {

        let methods = {

            init: function (options) {

                let settings = $.extend({
                    duration: 2,
                    shift: 100,
                    top: 50,
                    left: 50,
                    width: 10,
                    height: 20
                }, options);


                let scrollTop = 0,
                    window_height = 0,
                    trigger;


                $(window).on('scroll load', function () {
                    scrollTop = $(window).scrollTop();
                    window_height = $(window).height();

                    trigger = $(window).scrollTop() + window_height;
                });


                $(window).resize(function () {
                    if (this.resizeTO) clearTimeout(this.resizeTO);
                    this.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd');
                    }, 500);
                });


                this.each(function () {

                    let $this_parallax_section = $(this),
                        $color_bars = $this_parallax_section.find('.color-bar'),
                        parallax_section_width = $this_parallax_section.outerWidth(),
                        parallax_section_height = $this_parallax_section.outerHeight(),
                        animation_progress = 0,
                        mirror_animation_progress = 0,
                        element_animation_start,
                        element_animation_end,
                        animation_length;


                    $(window).on('resize', function () {
                        parallax_section_width = $this_parallax_section.outerWidth();
                        parallax_section_height = $this_parallax_section.outerHeight();
                    });


                    $(window).on('scroll resize load', function () {
                        element_animation_start = $this_parallax_section.offset().top;
                        element_animation_end = element_animation_start + window_height + $this_parallax_section.outerHeight();
                        animation_length = element_animation_end - element_animation_start;

                        if (trigger > element_animation_start && trigger < element_animation_end) {
                            update_progress();
                        }

                    });


                    update_progress();

                    function update_progress() {
                        animation_progress = get_scroll_progress({
                            element: $this_parallax_section,
                            trigger: trigger,
                            window_height: window_height,
                            element_animation_start: element_animation_start,
                            animation_length: animation_length
                        });

                        mirror_animation_progress = get_mirror_progress(animation_progress);
                    }

                    $color_bars.each(function () {

                        let $this_bar = $(this);

                        let color_bar_options = $this_bar.data('parallax-color-bar');

                        settings = $.extend({}, settings, color_bar_options);

                        let bar_position_top = settings.top,
                            bar_position_left = settings.left,
                            bar_width = settings.width,
                            bar_height = settings.height,

                            animateDuration = settings.duration,
                            animateShift = settings.shift,

                            $color_bar_background = $this_bar.find('.color-bar-background'),
                            y = animateShift * mirror_animation_progress;

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

                        $(window).on('scroll resize load', function (e) {

                            if (e.type == 'load') {
                                set_init_position();
                            }
                            animate();
                        });

                        function set_init_position(){
                            y = animateShift * mirror_animation_progress;

                            TweenLite.set($this_bar, {y: y + 'px'});
                            TweenLite.set($color_bar_background, {y: -y + 'px'});
                        }

                        function animate(){
                            y = animateShift * mirror_animation_progress;

                            TweenLite.to($this_bar, animateDuration, {y: y + 'px'});
                            TweenLite.to($color_bar_background, animateDuration, {y: -y + 'px'});
                        }

                    })
                });


                function get_mirror_progress(progress) {

                    let mirror_progress = 0;

                    if (progress > 0.5) {
                        mirror_progress = -(1 - 1 / 0.5 * progress)
                    }
                    else {
                        mirror_progress = -(1 - 1 / 0.5 * progress)
                    }

                    return mirror_progress;
                }


                function get_scroll_progress(settings) {

                    let animation_progress;

                    animation_progress = (settings.trigger - settings.element_animation_start) / settings.animation_length;

                    if (animation_progress > 1) {
                        animation_progress = 1;
                    }
                    else if (animation_progress < 0) {
                        animation_progress = 0;
                    }

                    return animation_progress;

                }
            }
        };


        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('There is no method with the name ' + method + ', for jQuery.parallaxColorBars');
        }
    };

});
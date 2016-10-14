/* jQuery Nxeed's Card Slider v1 | (c) 2014 Nxeed | https://github.com/nxeed */

(function($) {
    var defaults = {
        animationSpeed: 400,
        indent: 'auto',
        resizeAdaptation: true,
        useTimerForResizeAdaptation: false,
        autoWidth: true,
        autoHeight: true,
        active: 0,
        activeOnClick: false,
        offset: 32
    };

    var methods = {
        init: function(params) {
            if (this.data('ncs')) {
                return;
            }

            var $this = this;

            var options = $.extend({}, defaults, params);
            var cards = $('.ncs-card', this);

            var count = cards.length;
            var slideWidth = parseInt($(cards[0]).outerWidth());
            var slideHeight = parseInt($(cards[0]).outerHeight());
            var containerWidth = parseInt(this.outerWidth());

            var z = this.css('zIndex');
            var containerZ = (z === 'auto') ? 0 : z;

            if (!this.hasClass('ncs-container')) {
                this.addClass('ncs-container');
            }

            $.each(cards, function(num, card) {
                card = $(card);

                cards[num] = card;
                card.data('num', num);

                card.css({
                    zIndex: (count - 1) - num + containerZ
                });

                var e = (options.activeOnClick) ? 'click' : 'mouseover';

                card.bind(e + ".ncs",function() {
                    $this.ncs('set', $(this).data('num'));
                });
            });

            if (options.autoHeight === true) {
                this.css('height', slideHeight);
            }

            if (options.indent !== 'auto' && options.autoWidth === true) {
                this.css({
                    maxWidth: slideWidth + options.indent * (count - 1)
                });
            }

            this.data({
                options: options,
                cards: cards,
                count: count,
                slideWidth: slideWidth,
                slideHeight: slideHeight,
                containerWidth: containerWidth,
                lastContainerWidth: containerWidth,
                active: options.active,
                ncs: true
            });

            if (options.resizeAdaptation !== false && options.indent === 'auto') {
                if (options.useTimerForResizeAdaptation === false) {
                    $(window).bind('resize.ncs', function() {
                        $this.ncs('resize');
                    });
                } else {
                    setInterval(function() {
                        $this.ncs('resize');
                    }, 300);
                }
            }

            this.ncs('refresh');
        },
        getPos: function(num) {
            var options = this.data('options');
            var cards = this.data('cards');
            var containerWidth = this.data('containerWidth');
            var slideWidth = this.data('slideWidth');
            var count = this.data('count');
            var active = this.data('active');
            var indent = this.data('indent');

            if (options.indent === 'auto') {
                indent = (containerWidth - slideWidth) / (count - 1);
            } else {
                indent = options.indent
            }

            if (num < active) {
                indent = num*indent - (slideWidth - indent) + options.offset;
            } else {
                indent = num*indent;
            }

            return indent;
        },
        set: function(num) {
            var $this = this;

            var options = this.data('options');
            var cards = this.data('cards');
            var containerWidth = this.data('containerWidth');
            var slideWidth = this.data('slideWidth');
            var count = this.data('count');
            var active = this.data('active');

            if (active === num) {
                return;
            }

            if (num === false) {
                num = active;
            }

            if (num < 0) {
                num = count - 1;
            }

            if (num >= count) {
                num = 0;
            }

            this.data('active', num);

            $.each(cards, function(num, card) {
                card = $(card);
                var right = $this.ncs('getPos', num) + 'px';

                card.stop(true, false).animate({
                    right: right
                }, options.animationSpeed);
            });
        },
        next: function() {
            var active = this.data('active');
            this.ncs('set', active+1);
        },
        prev: function() {
            var active = this.data('active');
            this.ncs('set', active-1);
        },
        getActive: function() {
            return this.data('active');
        },
        getCount: function() {
            return this.data('count');
        },
        refresh: function() {
            this.ncs('set', false);
        },
        resize: function() {
            var options = this.data('options');
            var width = parseInt(this.outerWidth());
            var lastContainerWidth = this.data('lastContainerWidth');

            if (width === lastContainerWidth || options.resizeAdaptation === false) {
                return;
            }

            this.data({
                containerWidth : width,
                lastContainerWidth: width
            });

            this.ncs('refresh');
        }
    };

    $.fn.ncs = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist for jQuery.ncs.");
        }
    };
})(jQuery);

(function (jQuery) {
    /**
     * @function external:"jQuery.fn".overlabel
     * @param targField
     * @returns {jQuery}
     */
    jQuery.fn.overlabel = function (targField) {

        this.each(function () {
            var label = jQuery(this),
                field = targField || jQuery("#" + (label.data("target") || label.attr("for")));
            label.removeClass("overlabel").addClass("overlabel-apply").click(function (e) {
                if (!field.attr('disabled')) {
                    field.focus();
                }
                e.preventDefault();
            });

            if (field.width()) {
                // will be 0 if the field hasn't been added to the DOM yet. e.g., the screen editor.
                label.width(field.width());
            }

            field.on({
                "focus": function focus() {
                    label.addClass("hidden");
                },
                "blur change": function blurChange() {
                    var $el = jQuery(this);
                    if ($el.val() === "") {
                        label.removeClass("hidden");
                    } else {
                        label.addClass("hidden");
                    }
                }
            });

            if (field.val() && field.val() !== "") {
                label.addClass("hidden");
            }
        });
        return this;
    };
})(jQuery);
define('jira/ajs/select/multi-select/lozenge-group', ['jira/ajs/group'], function (Group) {
    'use strict';

    /**
     * A lozenge group is a group with key handling for shifting focus and removing lozenge items.
     *
     * @class MultiSelect.LozengeGroup
     * @extends Group
     */

    return Group.extend({
        keys: {
            "Left": function Left() {
                if (this.index > 0) {
                    this.shiftFocus(-1);
                }
            },
            "Right": function Right() {
                if (this.index === this.items.length - 1) {
                    this.items[this.index].trigger("blur");
                } else {
                    this.shiftFocus(1);
                }
            },
            "Backspace": function Backspace() {
                var index = this.index;
                if (index > 0) {
                    this.shiftFocus(-1);
                } else {
                    if (this.items.length > 1) {
                        this.shiftFocus(1);
                    }
                }
                this.items[index].trigger("remove");
            },
            "Return": function Return() {
                this.items[this.index].trigger("blur");
            },
            "Del": function Del() {
                var index = this.index;
                if (index + 1 < this.items.length) {
                    this.shiftFocus(1);
                }
                this.items[index].trigger("remove");
            }
        }
    });
});

AJS.namespace('AJS.MultiSelect.LozengeGroup', null, require('jira/ajs/select/multi-select/lozenge-group'));
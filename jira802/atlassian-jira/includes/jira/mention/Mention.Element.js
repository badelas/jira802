define('jira/mention/mention-element', ['jira/mention/mention', 'jira/skate', 'underscore'], function (Mention, skate, _) {

    function initMentionsFor(el) {
        var issueKey = el.getAttribute('data-issuekey');
        if (!el._controller) {
            el._controller = new Mention(issueKey);
        }
        el._controller.textarea(el);
    }

    return skate('mentionable', {
        type: skate.type.CLASSNAME,
        created: function created(el) {},
        attached: function attached(el) {
            if (document.activeElement === el) {
                initMentionsFor(el);
            }
        },
        events: {
            'focus': function focus(el, e) {
                initMentionsFor(el);
            }
        }
    });
});
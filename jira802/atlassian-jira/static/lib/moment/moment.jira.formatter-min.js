define("jira/moment/moment.jira.formatter",["underscore","exports"],function(t,e){"use strict";function r(e){return u[e]||t.reduce(e,function(t,e){return t+(u[e]||e)},"")}function n(e){var n=!1,u=!1,a="",o=t.reduce(e,function(t,e,o,i){return u?u=!1:"'"===e?(a&&(t+=r(a),a=""),"'"===i[o+1]?(t+=e,u=!0):(t+=n?"]":"[",n=!n)):n?t+=e:/[a-zA-Z]/.test(e)?a&&a[a.length-1]!==e?(t+=r(a),a=e):a+=e:(a&&(t+=r(a),a=""),t+=e),t},"");return a&&(o+=r(a)),o}var u={d:"D",y:"Y",a:"A",E:"d",u:"d",Z:"ZZ",z:"[GMT]ZZ",XX:"ZZ",XXX:"Z"};e.translateSimpleDateFormat=n});
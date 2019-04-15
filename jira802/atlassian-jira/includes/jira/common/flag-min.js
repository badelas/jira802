define("jira/flag",["jira/util/logger","aui/flag","jira/data/session-storage","jira/ajs/ajax/smart-ajax","underscore","jquery","wrm/data","wrm/context-path"],function(s,e,t,i,n,a,r,o){"use strict";function u(s){var e=f();if(!n.contains(e,s)){e.push(s);try{t.setItem("dismissedFlags",JSON.stringify(e))}catch(s){}}}function c(s){var e=n.without(f(),s);try{t.setItem("dismissedFlags",JSON.stringify(e))}catch(s){}}function f(){return JSON.parse(t.getItem("dismissedFlags"))||[]}function d(){return n.union(v(),f())}function g(e){u(e),i.makeRequest({type:"PUT",url:o()+"/rest/flags/1.0/flags/"+encodeURIComponent(e)+"/dismiss"}).done(function(){c(e)}).always(function(){s.trace("flag.dismiss.finished:"+e)})}function l(s,t,i){i=i||{};var r=n.extend({},w,j[i.type],i,{title:s||"",body:t||""}),o=r.dismissalKey;if(o&&n.contains(d(),o))return!1;var u=e(r);o?(u.dismiss=function(){g(o)},u.addEventListener("aui-flag-close",u.dismiss)):u.dismiss=function(){};var c=a(u).find(".title");return""===a.trim(c.text())&&c.remove(),u}function m(s,e,t){return l(s,e,n.extend({},t,{type:"error"}))}function y(s,e,t){return l(s,e,n.extend({},t,{type:"warning"}))}function h(s,e,t){return l(s,e,n.extend({},t,{type:"success"}))}function p(s){s.forEach(function(s){l(s.title,s.htmlMessage,{close:s.auiClosingPolicy,type:s.auiMessageType})})}var w={type:"info",title:"",body:""},j={success:{close:"auto"}},v=n.once(function(){return(r.claim("com.atlassian.jira.jira-header-plugin:dismissedFlags.flags")||{}).dismissed||[]}),x=f();return setTimeout(function(){n.each(x,g)},1e3),{showMsg:l,showMessages:p,showInfoMsg:l,showErrorMsg:m,showWarningMsg:y,showSuccessMsg:h}});
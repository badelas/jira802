require(["jira/util/logger","jira/admin/view-user/view-user","wrm/context-path","jquery","aui/inline-dialog2","jira/admin/application-selector"],function(e,i,a,n){"use strict";var t=a();n(function(){var a=n(".view-user-applications-and-groups-module"),r=a.attr("data-username"),o=new i({el:a,username:r});o.listenTo(o,"application-trigger",function(i){var a=i.application.isSelected()?"POST":"DELETE";n.ajax({type:a,url:t+"/rest/internal/2/viewuser/application/"+encodeURI(i.application.getApplicationKey())+"?username="+encodeURIComponent(r),contentType:"application/json",dataType:"json"}).done(function(i){o.update(i),e.trace("view-user-select")}).fail(function(e){o.onError(e.responseText,e.status)})})})});
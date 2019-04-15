define("jira/share/entities/share-type/project-share",["jira/share/entities/display","jira/share/entities/share-permission","jira/share/i18n","jquery"],function(e,t,r,s){"use strict";function i(e){this.roleMap={},this.projectMap={},this.type="project",this.singleton=!1,this.parentElement=document.querySelector("."+e),this.dirty=!1}return i.prototype={initialise:function(){var e=this;if(this.projectSelect=this.getSubElement("project-share"),this.roleSelect=this.getSubElement("role-share"),this.roleSelectGroup=this.getSubElement("role-group-share"),this.roleSelect&&this.projectSelect&&this.roleSelectGroup){var t,r;for(r=1;r<this.roleSelect.options.length;r++)t=this.roleSelect.options[r],this.roleMap[t.value]=t.text;for(r=0;r<this.projectSelect.options.length;r++)t=this.projectSelect.options[r],this.projectMap[t.value]=t.text;this.setRoles(),s(this.projectSelect).change(function(t){e.dirty=!0,e.changeCallbackForProject(t)})}},getDisplayFromUI:function(){if(this.projectSelect&&this.roleSelect){var s,i=this.projectSelect.options[this.projectSelect.selectedIndex],o=i.value,l=i.text,a=this.roleSelect.options[this.roleSelect.selectedIndex],n=a.value,c=a.text;""===n?(s=r.getMessage("share_project_display_all"),s=r.formatMessage(s,l)):(s=r.getMessage("share_project_display"),s=r.formatMessage(s,l,c));var p=new t(this.type,o,n);return new e(s,this.getDescriptionString(l,n,c,!0),this.singleton,p)}},inputChangesExist:function(){return this.dirty},getDisplayDescriptionFromUI:function(){if(!this.projectSelect||!this.roleSelect)return"";var e=this.projectSelect.options[this.projectSelect.selectedIndex],t=e.text,r=this.roleSelect.options[this.roleSelect.selectedIndex],s=r.value,i=r.text;return this.getDescriptionString(t,s,i,!1)},getDescriptionString:function(e,t,s,i){var o;return t&&""!==t?(o=r.getMessage("share_role_description"),o=i?r.formatMessageUnescaped(o,s,e):r.formatMessage(o,s,e)):(t=null,o=r.getMessage("share_project_description"),o=i?r.formatMessageUnescaped(o,e):r.formatMessage(o,e)),o},getDisplayFromPermission:function(s){var i,o,l,a,n;return s&&s.type===this.type&&s.param1?(s.param2?(a=this.getProject(s.param1),n=this.getRole(s.param2),i=r.getMessage("share_project_display"),i=r.formatMessage(i,a,n),o=new t(this.type,s.param1,s.param2),l=this.getDescriptionString(a,s.param2,n,!0)):(a=this.getProject(s.param1),i=r.getMessage("share_project_display_all"),i=r.formatMessage(i,a),o=new t(this.type,s.param1,null),l=this.getDescriptionString(a,null,null,!0)),new e(i,l,this.singleton,o)):null},getDisplayWarning:function(){return""},changeCallbackForProject:function(){this.setRoles()},setProject:function(e){if(this.projectSelect)for(var t=this.projectSelect.options,r=0;r<t.length;r++)t[r].value===e&&(t[r].selected=!0)},setRoles:function(e){if(this.projectSelect&&this.roleSelect&&this.roleSelectGroup){var t,r=this.projectSelect.options[this.projectSelect.selectedIndex],s=r.getAttribute("roles");if(s)try{t=JSON.parse(s),t||(t=[])}catch(e){t=[]}else t=[];this.roleSelectGroup.parentNode&&(this.roleSelect.removeChild(this.roleSelectGroup),this.roleSelectGroup=this.roleSelectGroup.cloneNode(!1));var i=null;if(t.length>0){for(var o=0;o<t.length;o++){var l=document.createElement("OPTION");l.appendChild(document.createTextNode(this.roleMap[t[o]]));var a=t[o];l.value=a,a===e&&(i=l),this.roleSelectGroup.appendChild(l)}this.roleSelect.appendChild(this.roleSelectGroup)}i&&(i.selected=!0)}},getProject:function(e){var t=this.projectMap[e];return t||(t=r.getMessage("share_invalid_project"))||(t="[Invalid Project]"),t},getRole:function(e){var t=this.roleMap[e];return t||(t=r.getMessage("share_invalid_role"))||(t="[Invalid Role]"),t},updateSelectionFromPermission:function(e){this.setProject(e.param1),this.setRoles(e.param2)},getSubElement:function(e){return this.parentElement.querySelector("."+e)}},i});
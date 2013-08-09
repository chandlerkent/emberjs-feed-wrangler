Ember.TEMPLATES["_feed_items"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n	<br />\n	<br />\n	<br />\n	<br />\n	<center>Loading...</center>\n");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "loadError", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n		<br />\n		<br />\n		<br />\n		<br />\n		<center>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "loadError", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</center>    \n	");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n		");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "model", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n			");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.FeedItemView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n			<br />\n			<br />\n			<br />\n			<br />\n			<center>No articles found.</center>\n		");
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isLoading", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"content\">\n	<div id=\"header\">\n		<div id=\"notices\"></div>\n	</div>\n	<br />\n	\n	<div id=\"left-column\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet || depth0.outlet),stack1 ? stack1.call(depth0, "sidebar", options) : helperMissing.call(depth0, "outlet", "sidebar", options))));
  data.buffer.push("</div>\n		\n	<div id=\"right-column\" style=\"min-height: 500px;\">\n		");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n	</div>\n	\n	<div>\n		<div class=\"footer\" id=\"footer\">\n			<center>&copy; 2013 Developing Perspective, LLC. &#8226; <a href=\"/privacy.html\">Privacy Policy and Terms</a> &#8226;  <a href=\"mailto:support@feedwrangler.net\" title=\"Click to Email Us\">Contact Us</a>\n			</center>\n			<br><br>\n			<center>\n				&#8226; Keyboard Shortcuts &#8226; <br> \n				<b>J</b>:Next&nbsp;&nbsp;\n				<b>K</b>:Previous&nbsp;&nbsp;\n				<b>L</b>:Star&nbsp;&nbsp;\n				<b>M</b>:(Un)Read&nbsp;&nbsp;\n				<b>I</b>:Read Later&nbsp;&nbsp;\n				<b>O</b>:Open Link \n			</center>\n			<br><br>\n		</div>\n	</div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["feed_item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n						<img alt=\"Sendtoinstapaper@2x\" height=\"20\" src=\"/fw/assets/check@2x.png\" width=\"25\">\n					");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n						<img alt=\"Sendtoinstapaper@2x\" height=\"20\" src=\"/fw/assets/sendToInstapaper@2x-2e4b97029458fcad4cdd1e875d5693d8.png\" width=\"25\">\n					");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n						<img alt=\"Empty_star@2x\" height=\"20\" src=\"/fw/assets/full_star@2x-f75dbdd4fa02f4d13d8c24e904d4b65c.png\" width=\"20\">\n					");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n						<img alt=\"Empty_star@2x\" height=\"20\" src=\"/fw/assets/empty_star@2x-e77dea070919f570bf69ebd9b0c9067c.png\" width=\"20\">\n					");
  }

function program9(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "feed_name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\n		<div class=\"stream_item_body\">\n			");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "body", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</div>\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"stream_item\">\n	<div ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'class': (":stream_item-title read")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n		<div class=\"container\">\n\n			<div class=\"stream_item-right\">\n				<span class=\"stream_item-link\" ");
  hashContexts = {'bubbles': depth0};
  hashTypes = {'bubbles': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "openUrl", "url", {hash:{
    'bubbles': (false)
  },contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n					<img alt=\"Box_expand@2x\" height=\"20\" src=\"/fw/assets/box_expand@2x-ef4b2444c9ab5953ef0de9af26f059e9.png\" width=\"20\">\n				</span>\n				<span class=\"stream_item-link\" ");
  hashContexts = {'bubbles': depth0};
  hashTypes = {'bubbles': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleReadLater", "", {hash:{
    'bubbles': (false)
  },contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" tag=\"Read Later\">\n					");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "read_later", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</span>\n				<span class=\"stream_item-link\" ");
  hashContexts = {'bubbles': depth0};
  hashTypes = {'bubbles': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleStar", "", {hash:{
    'bubbles': (false)
  },contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n					");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "starred", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</span>\n			</div>\n\n			<div class=\"stream_item-title-text\">\n				");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n			</div>\n			<div class=\"stream-item-subtitle\">\n				");
  hashContexts = {'bubbles': depth0};
  hashTypes = {'bubbles': "BOOLEAN"};
  options = {hash:{
    'bubbles': (false)
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "feed", "feed", options) : helperMissing.call(depth0, "linkTo", "feed", "feed", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n				<span class=\"stream_item-time\">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.timeAgo || depth0.timeAgo),stack1 ? stack1.call(depth0, "published_at", options) : helperMissing.call(depth0, "timeAgo", "published_at", options))));
  data.buffer.push("</span>\n			</div>\n		</div>\n	</div>\n	\n	");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "view.isShowingBody", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["feed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"edit-button\">\n	<a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "markAllRead", "model", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mark All Read</a>\n	:\n	<a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "unsubscribe", "model", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Unsubscribe</a>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  return buffer;
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n	<div class=\"error\">\n		<h2>Login Failed!</h2>\n		<h3>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errorMessage", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n	</div>\n");
  return buffer;
  }

  data.buffer.push("<form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n	<h2>Log In</h2>\n	");
  hashContexts = {'value': depth0,'type': depth0,'placeholder': depth0};
  hashTypes = {'value': "ID",'type': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'value': ("email"),
    'type': ("text"),
    'placeholder': ("Email")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n	");
  hashContexts = {'value': depth0,'type': depth0,'placeholder': depth0};
  hashTypes = {'value': "ID",'type': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'value': ("password"),
    'type': ("password"),
    'placeholder': ("Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n	");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'value': "STRING"};
  options = {hash:{
    'type': ("submit"),
    'value': ("Log In")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</form>\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "errorMessage", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  return buffer;
  
});

Ember.TEMPLATES["newsfeed_search"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  
});

Ember.TEMPLATES["newsfeed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"edit-button\">\n  <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "markAllRead", "model", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mark All Read</a>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  return buffer;
  
});

Ember.TEMPLATES["sidebar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n	<img alt=\"Banner@2x\" class=\"banner\" height=\"30\" src=\"/fw/assets/banner@2x-5354fc7860f2bfd098d1b30f4c332236.png\" width=\"170\">\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Unread");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("All Feeds");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("Starred");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n				");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("regular_link")
  },inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "stream", "", options) : helperMissing.call(depth0, "linkTo", "stream", "", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n				<br />\n			");
  return buffer;
  }
function program10(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "index", options) : helperMissing.call(depth0, "linkTo", "index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n<div class=\"stream-config\">\n		<h4>Feeds</h4>\n		<p>\n			");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "unread", options) : helperMissing.call(depth0, "linkTo", "unread", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			<br />\n			");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "newsfeed", options) : helperMissing.call(depth0, "linkTo", "newsfeed", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			<br />\n			");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo || depth0.linkTo),stack1 ? stack1.call(depth0, "starred", options) : helperMissing.call(depth0, "linkTo", "starred", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			<br />\n		</p>\n</div>\n\n<div class=\"stream-config\">\n		<h4>Smart Streams</h4>\n		<p>\n			");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "streams", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n		</p>\n		<center>\n			<a href=\"/streams/new\">Create</a>\n		</center>\n</div>\n\n<div class=\"stream-config\">\n	<form accept-charset=\"UTF-8\" ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "didSearch", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" method=\"post\">\n		");
  hashContexts = {'valueBinding': depth0,'placeholder': depth0,'class': depth0};
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("searchTerm"),
    'placeholder': ("Search subscribed feeds."),
    'class': ("search_field")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n		<center>\n			<input name=\"commit\" type=\"submit\" value=\"Search\">\n		</center>\n	</form>\n</div>\n\n<br />\n\n<a href=\"/feeds/add\" class=\"regular_link\">Add Feeds</a><br>\n<a href=\"/feeds\" class=\"regular_link\">Manage Feeds</a><br><br>\n<a href=\"/settings\" class=\"regular_link\">Manage Read Later</a><br>\n<a href=\"/filters\" class=\"regular_link\">Manage Filters</a><br><br>\n<a href=\"/settings/account\" class=\"regular_link\">Account</a><br>\n<a ");
  hashContexts = {'bubbles': depth0};
  hashTypes = {'bubbles': "BOOLEAN"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logOut", {hash:{
    'bubbles': (false)
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" href=\"#\">Log out</a><br>  ");
  return buffer;
  
});

Ember.TEMPLATES["starred"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"edit-button\">\n  <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "markAllRead", "model", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mark All Read</a>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  return buffer;
  
});

Ember.TEMPLATES["stream"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n		<a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "markAllRead", "model", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mark All Read</a>\n		:\n	");
  return buffer;
  }

  data.buffer.push("<div class=\"edit-button\">\n	");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	<a href=\"/streams/9274/edit\">Edit</a>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  return buffer;
  
});

Ember.TEMPLATES["unread"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"edit-button\">\n  <a href=\"#\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "markAllRead", "model", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Mark All Read</a>\n</div>\n\n");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "feed_items", options) : helperMissing.call(depth0, "partial", "feed_items", options))));
  return buffer;
  
});
// FIXME to be cleaned up - potentially converted to coffeescript
Handlebars.registerHelper("blogTimestamp", function(post) {
  return jQuery.timeago(this.date);
});

Handlebars.registerHelper("blogDay", function(post) {
  return new Date(this.date).getDate();
});

Handlebars.registerHelper("blogMonth", function(post) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = new Date(this.date).getMonth();
  return months[month];
});

var MYBLOG_LIMIT = 5;
var MYWRAPPER_ID = '#recent_blog_posts';

if($(MYWRAPPER_ID).length) {
  $.ajax({
    url: "http://juliepagano.com/blog/api/get_recent_posts/?count=" + MYBLOG_LIMIT,
    dataType: 'jsonp',
    success: function(data, textStatus, jqXHR) {
      $(MYWRAPPER_ID).handlebars($('#blog-posts-template'), data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // FIXME - add error handling
    }
  });
}
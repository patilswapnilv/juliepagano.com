// FIXME to be cleaned up - potentially converted to coffeescript
Handlebars.registerHelper("blogTimestamp", function(post) {
  return jQuery.timeago(new Date(this.date));
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
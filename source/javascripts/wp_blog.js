// FIXME to be cleaned up - potentially converted to coffeescript

var MYBLOG_LIMIT = 3;
var MYWRAPPER_ID = '#recent_blog_posts';

$.ajax({
  url: "http://juliepagano.com/blog/api/get_recent_posts?count=" + MYBLOG_LIMIT,
  dataType: 'jsonp',
  success: function(data, textStatus, jqXHR) {
    console.log(data);
    var container = $(MYWRAPPER_ID);
    var posts = data.posts;
    for(var i=0; i < posts.length; i++) {
      var post = posts[i];
      console.log(post.title);
      var post_html = "<a href='" + post.url + "'>";
      post_html += "<h4>" + post.title + "</h4>";
      post_html += "</a>";
      post_html += "<p>" + post.excerpt + "</p>";
      container.append(post_html);
    }
  },
  error: function(jqXHR, textStatus, errorThrown) {
    // FIXME - add error handling
  }
});
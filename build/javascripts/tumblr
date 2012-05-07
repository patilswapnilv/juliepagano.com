(function() {

  Handlebars.registerHelper("tumblrTimestamp", function(post) {
    return jQuery.timeago(new Date(this.timestamp * 1000));
  });

  Handlebars.registerHelper("tumblrPhoto", function(post) {
    var images, post_image;
    if (this.photos.length > 0) {
      images = this.photos[0].alt_sizes;
      post_image = images.length > 1 ? images[images.length - 2] : images[0];
      return "<img src='" + post_image.url + "'/>";
    } else {
      return "";
    }
  });

  Handlebars.registerHelper("tumblrVideo", function(post) {
    if (this.player.length > 0) {
      return this.player[0].embed_code;
    } else {
      return "";
    }
  });

  this.tumblrCallback = function(tumblr) {
    var statusHTML;
    statusHTML = [];
    if (tumblr.meta.status === 200) {
      $("#recent_tumblr_posts").handlebars($('#tumblr-posts-template'), tumblr.response);
      return $("#recent_tumblr_posts .post p").ThreeDots({
        text_span_class: "body",
        max_rows: 8
      });
    }
  };

}).call(this);

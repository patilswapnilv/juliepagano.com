Handlebars.registerHelper "tumblrTimestamp", (post) ->
  jQuery.timeago(new Date(this.timestamp * 1000))

Handlebars.registerHelper "tumblrPhoto", (post) ->
  if this.photos.length > 0
    images = this.photos[0].alt_sizes
    post_image = if images.length > 1 then images[images.length - 2] else images[0]
    "<img src='" + post_image.url + "'/>"
  else
    ""

Handlebars.registerHelper "tumblrVideo", (post) ->
  if this.player.length > 0
    this.player[0].embed_code
  else
    ""

@tumblrCallback = (tumblr) ->
  statusHTML = []

  if tumblr.meta.status == 200
    $("#recent_tumblr_posts").handlebars($('#tumblr-posts-template'),
      tumblr.response)
    $("#recent_tumblr_posts .post p").ThreeDots({
      text_span_class: "body",
      max_rows: 8
    });

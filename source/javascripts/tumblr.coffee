@tumblrCallback = (tumblr) ->
  statusHTML = []

  if tumblr.meta.status == 200
    for post in tumblr.response.posts
      statusHTML.push(prepare_post post)

  $("#recent_tumblr_posts").html statusHTML.join("")

prepare_post = (post) ->
  post_html = "<div class='post clearfix'>"
  console.log post
  switch post.type
    when "text"  then post_html += text_post post
    when "photo" then post_html += photo_post post
    when "video" then post_html += video_post post
  post_html += "<a href='" + post.post_url + "'>"
  post_html += timestamp(post)
  post_html += "</a>"
  post_html += "</div>"

timestamp = (post) ->
  timestamp_html = "<span class='timestamp'>"
  timestamp_html += jQuery.timeago(new Date(post.timestamp * 1000))
  timestamp_html += "</span>"

text_post = (post) ->
  post_html = ""
  post_html += "<strong>" + post.title + "</strong>"
  post_html += post.body

photo_post = (post) ->
  post_html = ""
  if post.photos
    images = post.photos[0].alt_sizes
    post_image = if images.length > 1 then images[images.length - 2] else images[0]
    post_html += "<img src='" + post_image.url + "'/>"
  post_html += post.caption
  post_html

video_post = (post) ->
  post_html = ""
  if post.player
    post_html += post.player[0].embed_code
  post_html += post.caption
  post_html

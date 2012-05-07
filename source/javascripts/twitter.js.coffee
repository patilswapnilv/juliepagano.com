@twitterCallback = (twitters) ->
  statusHTML = []
  i = 0

  while i < twitters.length
    li_class = if ((i + 1) % 2 is 0) then "even" else "odd"
    username = twitters[i].user.screen_name
    status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, (url) ->
      "<a href=\"" + url + "\">" + url + "</a>"
    ).replace(/\B@([_a-z0-9]+)/g, (reply) ->
      reply.charAt(0) + "<a href=\"http://twitter.com/" + reply.substring(1) + "\">" + reply.substring(1) + "</a>"
    )
    statusHTML.push "<li class='" + li_class + "'><div class='left'></div><div class='tweet'><span>" + status + "</span> <a style=\"font-size:85%\" href=\"http://twitter.com/" + username + "/statuses/" + twitters[i].id_str + "\">" + relative_time(twitters[i].created_at) + "</a></div><div class='right'></div></li>"
    i++
  document.getElementById("twitter_update_list").innerHTML = statusHTML.join("")
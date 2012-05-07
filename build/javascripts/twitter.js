(function() {

  this.twitterCallback = function(twitters) {
    var i, li_class, status, statusHTML, username;
    statusHTML = [];
    i = 0;
    while (i < twitters.length) {
      li_class = (i + 1) % 2 === 0 ? "even" : "odd";
      username = twitters[i].user.screen_name;
      status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
        return "<a href=\"" + url + "\">" + url + "</a>";
      }).replace(/\B@([_a-z0-9]+)/g, function(reply) {
        return reply.charAt(0) + "<a href=\"http://twitter.com/" + reply.substring(1) + "\">" + reply.substring(1) + "</a>";
      });
      statusHTML.push("<li class='" + li_class + "'><div class='left'></div><div class='tweet'><span>" + status + "</span> <a style=\"font-size:85%\" href=\"http://twitter.com/" + username + "/statuses/" + twitters[i].id_str + "\">" + relative_time(twitters[i].created_at) + "</a></div><div class='right'></div></li>");
      i++;
    }
    return document.getElementById("twitter_update_list").innerHTML = statusHTML.join("");
  };

}).call(this);

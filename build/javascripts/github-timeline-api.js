(function() {
  var GitHubTimelineApi;

  GitHubTimelineApi = (function() {

    function GitHubTimelineApi() {}

    GitHubTimelineApi.prototype._strongify = function(string) {
      return '<strong>' + string + '</strong>';
    };

    GitHubTimelineApi.prototype.formatAsTimeAgo = function(date) {
      var day_diff, diff;
      diff = ((new Date).getTime() - date.getTime()) / 1000;
      day_diff = Math.floor(diff / 86400);
      if ((isNaN(day_diff)) || (day_diff < 0)) {
        return null;
      }
      if (day_diff === 0) {
        if (diff < 60) {
          return "just now";
        } else if (diff < 120) {
          return "1 minute ago";
        } else if (diff < 3600) {
          return "" + (Math.floor(diff / 60)) + " minutes ago";
        } else if (diff < 7200) {
          return "1 hour ago";
        } else if (diff < 86400) {
          return "" + (Math.floor(diff / 3600)) + " hours ago";
        }
      } else if (day_diff === 1) {
        return "Yesterday";
      } else if (day_diff < 7) {
        return "" + day_diff + " days ago";
      } else {
        return "" + (Math.ceil(day_diff / 7)) + " weeks ago";
      }
    };

    GitHubTimelineApi.prototype._parseGitHubEvent = function(event) {
      var branch, icon_url, repository, text, timestamp, url, _ref;
      url = (event.url != null ? event.url : void 0) || (((_ref = event.payload) != null ? _ref.url : void 0) != null ? event.payload.url : void 0) || 'https://github.com';
      url = url.replace('github.com//', 'github.com/');
      timestamp = new Date((event.created_at != null ? event.created_at : void 0) || 0).valueOf();
      if (event.repository != null) {
        repository = this._strongify("" + event.repository.owner + "/" + event.repository.name);
      }
      switch (event.type) {
        case 'CreateEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/create.png';
          switch (event.payload.object) {
            case 'repository':
              text = "created repo " + repository;
              break;
            case 'tag':
              text = "created tag " + (this._strongify(event.payload.object_name)) + " at " + repository;
              break;
            case 'branch':
              text = "created branch " + (this._strongify(event.payload.object_name)) + " at " + repository;
          }
          break;
        case 'MemberEvent':
          switch (event.payload.action) {
            case 'added':
              icon_url = 'https://github.com/images/modules/dashboard/news/member_add.png';
              text = "added " + (this._strongify(event.payload.member)) + " to " + repository;
          }
          break;
        case 'PushEvent':
          branch = event.payload.ref.substr(event.payload.ref.lastIndexOf('/') + 1);
          icon_url = 'https://github.com/images/modules/dashboard/news/push.png';
          text = "pushed to " + (this._strongify(branch)) + " at " + repository;
          break;
        case 'ForkApplyEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/merge.png';
          text = "merged to " + repository;
          break;
        case 'ForkEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/fork.png';
          text = "forked " + repository;
          break;
        case 'WatchEvent':
          switch (event.payload.action) {
            case 'started':
              icon_url = 'https://github.com/images/modules/dashboard/news/watch_started.png';
              text = "started watching " + repository;
              break;
            case 'stopped':
              icon_url = 'https://github.com/images/modules/dashboard/news/watch_stopped.png';
              text = "stopped watching " + repository;
          }
          break;
        case 'FollowEvent':
          text = null;
          break;
        case 'IssuesEvent':
        case 'PullRequestEvent':
          switch (event.payload.action) {
            case 'opened':
            case 'reopened':
              icon_url = 'https://github.com/images/modules/dashboard/news/issues_opened.png';
              text = "opened issued on " + repository;
              break;
            case 'closed':
              icon_url = 'https://github.com/images/modules/dashboard/news/issues_closed.png';
              text = "closed issue on " + repository;
          }
          break;
        case 'GistEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/gist.png';
          switch (event.payload.action) {
            case 'create':
              text = "created " + (this._strongify(event.payload.name));
              break;
            case 'update':
              text = "updated " + (this._strongify(event.payload.name));
              break;
            case 'fork':
              text = "forked " + (this._strongify(event.payload.name));
          }
          break;
        case 'WikiEvent':
        case 'GollumEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/wiki.png';
          switch (event.payload.action) {
            case 'created':
              text = "created a wiki page on " + repository;
              break;
            case 'edited':
              text = "edited a wiki page on " + repository;
          }
          break;
        case 'CommitCommentEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/comment.png';
          text = "commented on " + repository;
          break;
        case 'DeleteEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/delete.png';
          switch (event.payload.ref_type) {
            case 'branch':
              text = "deleted branch " + (this._strongify(event.payload.ref)) + " at " + repository;
          }
          break;
        case 'PublicEvent':
          icon_url = 'https://github.com/images/modules/dashboard/news/public.png';
          text = "open sourced " + repository;
          break;
        case 'DownloadEvent':
          text = null;
      }
      if (text != null) {
        return [url, icon_url, timestamp, text];
      } else {
        return [];
      }
    };

    GitHubTimelineApi.prototype._parseGitHubTimeline = function(data, callback) {
      var event, event_data, events, _i, _len;
      events = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        event = data[_i];
        event_data = this._parseGitHubEvent(event);
        if (event_data.length) {
          events.push(event_data);
        }
      }
      return callback(events);
    };

    GitHubTimelineApi.prototype.getTimelineForUser = function(user, callback) {
      var _this = this;
      jQuery.ajaxSetup({
        cache: true
      });
      return jQuery.getJSON('https://github.com/' + user + '.json?callback=?', function(data) {
        return _this._parseGitHubTimeline(data, callback);
      });
    };

    GitHubTimelineApi.prototype.getUserIdForUser = function(user, callback) {
      var _this = this;
      jQuery.ajaxSetup({
        cache: true
      });
      return jQuery.getJSON('https://github.com/api/v2/json/user/show/' + user + '?callback=?', function(data) {
        return callback(data.user.id);
      });
    };

    return GitHubTimelineApi;

  })();

}).call(this);

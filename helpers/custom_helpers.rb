module CustomHelpers
  require 'oembed_links'

  def tweet_html_id(id)
    tweet_html("https://twitter.com/user/statuses/#{id}")
  end

  def tweet_html(url)
    OEmbed.register(
      {:method => "NetHTTP"},
      {:twitter => "https://api.twitter.com/1/statuses/oembed.{format}"},
      {:twitter =>
        {:format => "json",
         :schemes => "https://twitter.com/*/statuses/*"}
      }
    )
    OEmbed.transform(url, false, {
        "omit_script" => "1"
      })
  end

  def tweet_script
    '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>'
  end
end
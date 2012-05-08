module CustomHelpers
  def nav_link(label, path, class_name = nil)
    class_name ||= path.delete("/")

    current_path = request.path.match(/\/.*?\//) || "index"
    current_path = current_path.to_s.gsub("/", "")

    link_class = [class_name]
    link_class << "active" if current_path == path

    path = "/" if path == "index"
    link_to label, path, :class => link_class.join(" ")
  end
end
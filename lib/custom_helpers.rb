module CustomHelpers
  def nav_link(label, path, class_name = nil)
    class_name ||= path.delete("/")

    link_class = [class_name]
    link_class << "active" if request.path.split(".").first == path
    link_to label, path, :class => link_class.join(" ")
  end
end
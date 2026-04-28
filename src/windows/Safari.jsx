import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { blogPosts } from "../constants";

const Safari = ({ target }) => {
  return (
    <>
      <div id="window-header">
        <WindowControls target={target} />

        {/* Left controls */}
        <div className="flex items-center gap-2">
          <PanelLeft className="icon ml-2" size={20} />
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        {/* Search bar */}
        <div className="flex flex-1 items-center gap-2 mx-4">
          <ShieldHalf className="icon" size={20} />
          <div className="search flex flex-1 items-center gap-2">
            <Search className="icon" size={20} />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">  {/* ✅ added flex */}
          <Share className="icon" size={18} />
          <Plus className="icon" size={18} />
          <Copy className="icon" size={18} />
        </div>
      </div>

      <div className="blog">
          <h2>My Developer Blog</h2>

          <div className="space-y-8">
              {blogPosts.map(({ id, image, title, date, link}) => (
                <div key={id} className="blog-post">
                  <div className="col-span-2">
                    <img src={image} alt={title} />
                  </div>
                  <div className="content">
                    <p>{date}</p>
                    <h3>{title}</h3>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Read more
                    </a>
                  </div>
                </div>
              ))}
          </div>
      </div>
    </>
  );
};
const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;

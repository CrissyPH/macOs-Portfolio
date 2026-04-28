import { Search } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import useWindowStore from "../store/window";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();

const  { openWindow } = useWindowStore()


  const openItem = (item) => {
    if(item.fileType === 'pdf') return openWindow('resume', item);
    if(item.kind === 'folder') return setActiveLocation(item);
    if(['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank');
    
    openWindow(`${item.fileType || item.kind}${item.id}`, item);
  };

  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation?.id && "active",
          "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
        <p className="text-sm truncate">{item.name}</p>
      </li>
    ));

 return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="flex h-full bg-white overflow-hidden">  {/* ✅ bg-white + overflow-hidden */}
        
        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white overflow-auto">  {/* ✅ bg-white */}
          <ul className="content">
            {activeLocation?.children?.map((item) => (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;

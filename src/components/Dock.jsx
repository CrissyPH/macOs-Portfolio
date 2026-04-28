import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/Welcome.jsx";
import { dockApps } from "#constants";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import  useWindowStore  from "#store/window.js";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow } = useWindowStore();
  const docRef = useRef(null);

  useGSAP(() => {
    const dock = docRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft + width / 2;
        const distance = Math.abs(mouseX - center);
        const instensity = Math.exp(-(distance ** 2.5) / 20000);
        gsap.to(icon, {
          scale: 1 + 0.25 * instensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };
    const handleMouseMove = (e) => {
      animateIcons(e.clientX);
    };
    const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
      scale: 1, duration: 0.2, ease: "power1.out"
    }))
    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', resetIcons);
    }
  });


  const toogleApp = (app) => {
    if (!app.canOpen) return;

    const windows = useWindowStore.getState().windows;
    const window = windows[app.id];
    if (window?.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
    console.log(windows)

  };

  return (
    <section id="dock">
      <div ref={docRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toogleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip"
          variant="info"
        />
      </div>
    </section>
  );
};

export default Dock;

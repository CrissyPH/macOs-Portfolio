import gsap from "gsap";
import { Dock, Navbar, Welcome } from "./components";
import { Draggable } from "gsap/Draggable";
import Terminal from "./windows/Terminal";
import Safari from "./windows/Safari";
import { Resume } from "./windows";
import Finder from "./windows/Finder";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
    </main>
  );
};

export default App;

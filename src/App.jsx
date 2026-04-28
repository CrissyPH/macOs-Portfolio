import gsap from "gsap";
import { Dock, Navbar, Welcome } from "./components"
import { Draggable } from "gsap/Draggable"
import Terminal from "./windows/Terminal";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
        <Navbar />
        <Welcome />
        <Dock />
        <Terminal />
    </main>
  )
}

export default App
import WindowWrapper from "../hoc/WindowWrapper";
import { techStack } from "../constants";
import { Check, Flag } from "lucide-react"; // ✅ fixed
import WindowControls from "../components/WindowControls";

const Terminal = ( { target }) => {
  return (
    <>
      <div id="window-header">
        <WindowControls target={target} />
        <h2>Tech Stacks</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@Cris % </span>
          show tech stacks
        </p>
        <div className="label"> 
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li className="flex items-center" key={category}>
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item}{index < items.length - 1 ? "," : ""} {/* ✅ fixed */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully (100%)
          </p>

          <p className="text-black">
                <Flag size={15} fill="black" />
                Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
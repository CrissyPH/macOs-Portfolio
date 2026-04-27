import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const FONT_WEIGHTS = {
  subTitle: { min: 300, max: 400, default: 300 },
  title: { min: 400, max: 900, default: 400 }
};


const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
        display: 'inline-block',
        minWidth: char === ' ' ? '0.5em' : undefined,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};


const setUpTextHover = (container, type) => {
  if(!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {duration, ease: "power2.out", fontVariationSettings: `"wght" ${weight}`})
  }

  const handleMouseMove = (e) => {
     const { left } = container.getBoundingClientRect();
     const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  }
  const handleMouseLeave = () => letters.forEach(letter => animateLetter(letter, base, 0.3)); 
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);


  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  }

}



const Welcome = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  useGSAP(() => {
    const titleCleanUp = titleRef.current ? setUpTextHover(titleRef.current, "title") : () => {};
    const subTitleCleanUp = subTitleRef.current ? setUpTextHover(subTitleRef.current, "subTitle") : () => {};
    return () => {
      if (typeof titleCleanUp === "function") titleCleanUp();
      if (typeof subTitleCleanUp === "function") subTitleCleanUp();
    };
  }, []);

  return (
    <section id="welcome">
      <p
        ref={subTitleRef}
        aria-label="Hey, I'm Cris! welcome to my"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.05em' }}
      >
        {renderText("Hey, I'm Cris! welcome to my", "text-3xl font-georama", 300)}
      </p>
      <h1 ref={titleRef} className="mt-7" aria-label="Portfolio">
        {renderText("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>
      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only</p>
      </div>
    </section>
  );
};

export default Welcome;

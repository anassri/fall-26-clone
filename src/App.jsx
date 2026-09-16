import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      className="counter"
      onClick={() => setCount((count) => count + 1)}
    >
      Count is {count}
    </button>
  );
}

//   isSvg === true ? svg : <img className="logo" src={logo} alt="" />;

// if(isSvg === true){
//   return svg;
// } else {
//   return <img className="logo" src={logo} alt="" />;
// }

function SectionHeader(props) {
  const { logo, title, link, svg } = props;
  return (
    <li>
      <a href={link} target="_blank">
        {svg ? svg : <img className="logo" src={logo} alt="" />}
        {title}
      </a>
    </li>
  );
}

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Counter />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <SectionHeader
              title="Explore Vite"
              logo={viteLogo}
              link="https://vite.dev/"
            />
            <SectionHeader
              title="Learn more"
              logo={reactLogo}
              link="https://react.dev/"
            />
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <SectionHeader
              title="GitHub"
              svg={
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
              }
              link="https://github.com/vitejs/vite"
            />
            <SectionHeader
              title="Discord"
              svg={
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
              }
              link="https://chat.vite.dev/"
            />
            <SectionHeader
              title="X.com"
              svg={
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
              }
              link="https://x.com/vite_js"
            />
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;

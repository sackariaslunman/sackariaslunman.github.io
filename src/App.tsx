import styled from "styled-components";
import Game from "./Game";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSnowflake, faFire, faSun, faWind, faSnowman, faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faSnowflake, faFire, faSun, faWind, faSnowman, faXmark);

// Wrapper for the game area beneath the title
const Main = styled.div`
  background-color: black;
  height: 100vh;
`;

// Wrapper for the title at the top of the page
const Title = styled.div`
  display: grid;
  justify-content: center;
  width: 100vw;
  text-align: center;

  h1 {
    font-size: 4em;
    padding: 0 0.5em;
    color: white;
    .warm {
      color: #DA9A1B;
    }
    .cold {
      color: #36F9FC;
    }
  }

  h3 {
    font-size: 1em;
    padding: 0 0.5em;
    color: white;
  }
`;

// Wrapper for the entire web page
const App = () => {
  return (
    <Main>
      <Title>
        <h1><span className="warm"> Warmer</span> or <span className="cold">Colder</span>?</h1>
        <h3>(right now...?)</h3>
      </Title>
      <Game />
    </Main>
  )
};

export default App;
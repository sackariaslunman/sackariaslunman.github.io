import styled from "styled-components";
import { useState, useEffect } from "react";
import { City, WOC } from "./WOC/WOC";
import CityCard from "./CityCard";

// Wrapper around the game area
const GameWrapper = styled.div`
    display: grid;
    padding-top: 1em;
    justify-items: center;

    & > h1 {
        text-align: center;
        color: white;
        padding: 0 1em;
        font-size: 2em;
    }

    & > button {
        border: 5px solid white;
        border-radius: 0.5em;
        font-size: 2em;
        padding: 1em;
        background: red;
        color: white;
        &:hover {
            color: yellow;
            border: 5px solid yellow;
            transition: all 0.1s;
        }
    }

    @media only screen and (max-width: 1000px) {
        & > h1 {
            font-size: 1em;
        }
        & > button {
            font-size: 1em;
        }
    }
`;

// Wrapper around the two city cards
const CardWrapper = styled.div`
    display: grid;
    place-content: center;
    grid-template-columns: 1fr 1fr;
`;

const ErrorMessage = styled.div`
    background: red;
    border: 5px solid white;
    border-radius: 1em;
    padding: 1em;
    h1 {
        font-size: 1em;
        text-align: center;
        color: white;
    }
`;

// Logic of the game
const woc = new WOC();

// State of the game
interface GameData {
    score: number,
    currentCity: City | null,
    nextCity: City | null,
    hasLost: boolean,
    hidden: boolean,
    hasInitialized: boolean,
    error: string | null
}

// Component that encapsulates the entire game
const Game = () => {
    // Initializing the game state
    const [gameData, setGameData] = useState<GameData>({
        score: 0,
        currentCity: null,
        nextCity: null,
        hasLost: false,
        hidden: true,
        hasInitialized: false,
        error: null
    });

    // Resets the cities, score and other data of the game
    const reset = async () => {
        // Getting random cities, which connects to OpenWeather which could cause an error
        try {
            setGameData({
                score: 0,
                currentCity: await woc.getRandomCity(),
                nextCity: await woc.getRandomCity(),
                hasLost: false,
                hidden: true,
                hasInitialized: true,
                error: null
            });
        // If there's a 401 or 429 error, give a generic error message
        } catch(error) {
            setGameData({ ...gameData, error: "Ooops! The server had trouble connecting to the OpenWeather API. Try again later!" });
        }
    };

    // After starting the game for the first time, resets and initiazes the game state
    useEffect(() => {
        if (!gameData.hasInitialized) {
            reset();
        }
    }, []);

    // Called when a player guesses warmer or lower
    const guess = (higher: boolean) => {
        // If the game hasn't loaded yet, return...
        if (!gameData || !gameData.currentCity || !gameData.nextCity)
            return

        // Else, check if the guess was correct
        const guessCorrect = (gameData.nextCity?.temperature >= gameData.currentCity?.temperature) == higher || (gameData.nextCity?.temperature == gameData.currentCity?.temperature);

        // Unhide the right city's temperature
        setGameData({ ...gameData, hidden: false });

        // After 1 second
        setTimeout(async () => {
            // Create new game data
            const nextGameData = { ...gameData, hidden: false };

            // If the guess was correct, increase the score, 
            // make the right city the left city, get a new right city and hide it's temperature
            if (guessCorrect) {
                nextGameData.score += 1;
                nextGameData.currentCity = nextGameData.nextCity;

                // Try to get a random city, which connects to OpenWeather which could cause an error
                try {
                    // If it succeeds, add the next city
                    nextGameData.nextCity = await woc.getRandomCity();
                }
                // If there's an 401 or 429 error
                catch (error) {
                    // Set an error with a generic message
                    setGameData({ ...gameData, error: "Ooops! The server had trouble connecting to the OpenWeather API. Try again later!" });
                }
                nextGameData.hidden = true;
            }
            // Else, game over
            else
                nextGameData.hasLost = true;

            // Update the game state
            setGameData(nextGameData);
        }, 1000);
    };
    
    return (
        <GameWrapper>
            { gameData.error ?
            <>
                <ErrorMessage>
                    <h1>{ gameData.error }</h1>
                </ErrorMessage>
            </> : 
            <>
                <h1>
                    Score: { gameData.score }
                </h1>
                <CardWrapper>
                    <CityCard 
                        onClick={ () => {} }
                        city={ gameData?.currentCity } 
                        hidden={false} 
                    />
                    <CityCard
                        onClick={guess}
                        city={ gameData?.nextCity } 
                        hidden={gameData.hidden} 
                    />
                </CardWrapper>
                { gameData.hasLost && (
                    <button onClick={ reset }>
                        Try again?
                    </button>
                )}
            </>
            }
        </GameWrapper>
    )
};

export default Game;
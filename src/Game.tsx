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
        padding: 0 0.5em;
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
`;


// Wrapper around the two city cards
const CardWrapper = styled.div`
    display: grid;
    place-content: center;
    grid-template-columns: 1fr 1fr;
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
    hasInitialized: boolean
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
        hasInitialized: false
    });

    // Resets the cities, score and other data of the game
    const reset = async () => {
        setGameData({
            score: 0,
            currentCity: await woc.getRandomCity(),
            nextCity: await woc.getRandomCity(),
            hasLost: false,
            hidden: true,
            hasInitialized: true
        });
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
        const guessCorrect = (gameData.nextCity?.temperature >= gameData.currentCity?.temperature) == higher;

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
                nextGameData.nextCity = await woc.getRandomCity();
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
        </GameWrapper>
    )
};

export default Game;
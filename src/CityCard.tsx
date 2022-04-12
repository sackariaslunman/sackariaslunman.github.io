import styled from "styled-components";
import { City } from "./WOC/WOC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Card that holds a city and the warmer or lower buttons
const Card = styled.div`
    margin: 2em;
    padding: 4em;
    border: 5px solid white;
    border-radius: 1em;
    display: grid;
    justify-content: center;
    row-gap: 0.5em;

    h1, h2 {
        text-align: center;
        color: white;
        padding: 0 0.5em;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 2em;
    }

    button {
        border: 5px solid white;
        border-radius: 0.5em;
        font-size: 1.5em;
        padding: 0.5em;
        color: white;
        &.higher {
            background: #DA9A1B;
        }
        &.lower {
            background: #0d4d7a;
        }
        &:hover {
            border: 5px solid yellow;
            color: yellow;
            transition: all 0.1s;
        }
    }
`;

// Passed in props
// city: the name, country and temperature of the city
// hidden: if the temperature is hidden or not
// onClick: passes up any click events to parent component
type CardProps = {
    city: City | null,
    hidden: boolean,
    onClick: (higher: boolean) => void
};

// Icon and it's accociated color, for display beside the temperature
// icon: the possible types of icons
// color: an RGB hexcode in the form of a string
interface IconColor {
    icon: "xmark" | "fire" | "sun" | "wind" | "snowflake" | "snowman",
    color: string
};

// Encapsulates the functions and structure of a city card
const CityCard = ({city, hidden, onClick}: CardProps) => {

    // Sets the icon type and color beside the temperature
    // temperatyre >= 25: orange fire
    // 25 >= temperature > 15: yellow sun
    // 15 >= temperature > 5: grey wind
    // 5 >= temperature > -5: blue snowflake
    // -5 >= temperature: cyan snowman
    const iconColor: IconColor  = 
        city == null ?              { icon: "xmark", color: "white" }
        : city?.temperature >= 25 ? { icon: "fire", color: "#DA9A1B"} 
        : city?.temperature >= 15 ? { icon: "sun", color: "#dbd334"} 
        : city?.temperature >= 5  ? { icon: "wind", color: "#7795be"} 
        : city?.temperature >= -5 ? { icon: "snowflake", color: "#3f82cf"} 
        :                           { icon: "snowman", color: "#36F9FC" };
        
    return (
        <Card style={{ background: city?.color }}>
            {
                !city ? 
                <>
                    <h1>Loading...</h1>
                </>
                :
                <>
                    <h1>{ city?.name }, { city?.country }</h1>
                    {
                        !hidden ? 
                        <>
                            <h2>
                                <FontAwesomeIcon 
                                    icon={["fas", iconColor?.icon ]} 
                                    color={ iconColor?.color }
                                />
                                &nbsp;
                                { city?.temperature } °C
                            </h2>
                        </>
                        :
                        <>
                            <button className="higher" onClick={ () => onClick(true) }>Warmer</button>
                            <button className="lower" onClick={ () => onClick(false) }>Colder</button>
                        </>
                    }
                </>
            }
        </Card>
    )
};

export default CityCard;
import ListOfCapitals from "./ListOfCapitals";
import axios from "axios";

// The key to the openweather api
// TODO: hide key in secret file. 
// It's okay for now since it's a free plan and the website is in testing mode, and it's easy to just get another api key
const WeatherApiKey = "afae56ddf369a915fea030672b89f6fd";

// Functions that generates the hexcode for a random color
const GenerateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
};

// The data necessary for a city
interface City {
    name: string,
    country: string,
    latitude: number,
    longitude: number,
    temperature: number,
    color: string
}

// Class for the Warmer Or Colder game
class WOC
{
    // Returns a random city
    async getRandomCity(): Promise<City> {
        // Generates a random index for a capital in the list of capitals
        const capitalIndex = Math.floor(Math.random() * (ListOfCapitals.length + 1) );

        // Gets the name, country, latitude and longitude of a random capital
        const { 
            CapitalName, 
            CountryName, 
            CapitalLatitude, 
            CapitalLongitude
        } = ListOfCapitals[capitalIndex];

        // Url for the openweather api
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${CapitalLatitude}&lon=${CapitalLongitude}&appid=${WeatherApiKey}`
        
        // Response from the weather api at the capital's location
        const response = await axios.get(weatherUrl);

        // The current temperature at the capital in Celsius
        const temperature: number = Math.round((response.data.main.temp - 273.15) * 10) / 10.0;

        // Condenses the city data into one data structure with a random associated background color
        const city: City = {
            name: CapitalName,
            country: CountryName,
            latitude: CapitalLatitude,
            longitude: CapitalLongitude,
            temperature: temperature,
            color: GenerateRandomColor()
        }

        return city;
    };
}

export type { City };
export { WOC };
import axios from"axios";


async function getAllCountries() {
    try {
        const result = await axios.get("https://restcountries.com/v2/all");
        const countries = result.data;
        console.log(countries)

        countries.sort((a, b) =>  a.population - b.population);

        const listElement = document.getElementById("country-list");
        const allCountries = countries.map((country) => {
            return `
            <li>
                <img src="${country.flag}" alt="country flag" id="flag">
                <p id="country-name" class=${country.region}>${country.name}</p>
                <p id="population">Has e population of ${country.population}</p>
            </li>    
            `;
        });
        listElement.innerHTML = allCountries.join("");

    }catch (e) {
        console.error(e);
    }
}

getAllCountries();





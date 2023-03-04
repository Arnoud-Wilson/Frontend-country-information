import axios from"axios";

const countryDisplayElement = document.getElementById("single-country");
const inputData = document.getElementById("search-input");
const searchForm = document.getElementById("country-search-form");

function getInputData() {
    const inputData = document.getElementById("search-input");
    return inputData.value;
}

function getCurrency(result) {
    let currencyInput = result.currencies;

    if (currencyInput[0] && currencyInput[1]) {
        return `${currencyInput[0].name} and ${currencyInput[1].name}`;
    }
    else if (currencyInput[0]) {
        return currencyInput[0].name;
    }
}

async function getCountryInfo() {
    try {
        const inputText = getInputData();
        const countryResult = await axios.get("https://restcountries.com/v2/name/"+ inputText);
        let result = countryResult.data[0];

        countryDisplayElement.innerHTML = `
        <img src="${result.flag}" alt="country flag" id="single-country-flag">
        <h2>${result.name}</h2>
        <p>${result.name} is situated in ${result.subregion}. It has a population of ${result.population} people.</p>
        <p class="p-bottom">The capital is ${result.capital} and you can pay with ${getCurrency(result)}'s.</p>
`;
        }
    catch (e) {
        countryDisplayElement.innerHTML = `
        <h2 id="warning">Land niet gevonden, probeer opnieuw.</h2>
        `
    }
}

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    getCountryInfo();
    inputData.value = "";
});




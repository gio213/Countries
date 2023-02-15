const input = document.querySelector(".input"),
  button = document.querySelector(".button"),
  result = document.querySelector(".resultDiv"),
  flag = document.querySelector(".resultFlag"),
  card = document.querySelector(".card"),
  errorCountry = document.querySelector(".error"),
  img = document.getElementById("img"),
  country = document.querySelector(".country"),
  capital = document.querySelector(".capital"),
  borders = document.querySelector(".borders"),
  currencie = document.querySelector(".currencie"),
  languages = document.querySelector(".languages"),
  population = document.querySelector(".population");

let search;

input.addEventListener("input", (e) => {
  const { value } = e?.target;

  search = value;
});

async function getData(searchKey) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${searchKey}?fullText=true`
  );
  const data = await response.json();

  return data;
}

button.addEventListener("click", async () => {
  const countryData = await getData(search);

  if (!countryData.length) {
    errorCountry.style.display = "block";
    errorCountry.innerHTML = "Please enter a  country name";
    card.style.display = "none";
    return;
  } else {
    img.src = countryData[0].flags.png;
    card.style.display = "flex";
  }

  country.innerHTML = `Country: ${countryData[0].name.common}`;
  capital.innerHTML = `Capital: ${countryData[0].capital}`;
  borders.innerHTML = `Borders: ${countryData[0].borders}`;
  currencie.innerHTML = `Currency: ${Object.keys(countryData[0].currencies)}`;
  languages.innerHTML = `Languages: ${Object.values(countryData[0].languages)}`;
  population.innerHTML = `Population: ${countryData[0].population}`;
});

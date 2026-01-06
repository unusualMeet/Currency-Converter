const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Update flag image
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].toLowerCase();
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagcdn.com/w40/${countryCode}.png`;
};

// Fetch & update exchange rate
const updateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();

  // 🔑 ONLY base currency file
  let url = `${BASE_URL}/${from}.json`;
  console.log("Fetching:", url);

  let response = await fetch(url);
  let data = await response.json();

  let rate = data[from][to];
  let finalAmount = (amount * rate).toFixed(2);

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// On page load
window.addEventListener("load", updateExchangeRate);

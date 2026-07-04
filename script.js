const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const theme_toggle = document.querySelector(".theme_toggle");
const arrowExchange = document.querySelector(".arrowExchange");


window.addEventListener("load",()=>{
    updateExchangeRate();
})



for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}



const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // it will off the default refresh of form when clicking button.
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal<1) {
        amountVal = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); 
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate)

    let finalAmount = amountVal * rate;
    // console.log(finalAmount);
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const themeLight = (i) => {
    i.className = "fa-regular fa-moon";
    document.querySelector("body").style.background = "#f4e4ba";
    theme_toggle.style.background = "#fff";
}

const themeDark = (i) => {
    i.className = "fa-solid fa-moon ";
    document.querySelector("body").style.background = "#121212";
    theme_toggle.style.background = "#fff";
}

const theme = () => {
    theme_toggle.addEventListener("click",() => {
        const i = theme_toggle.firstElementChild;
        if(i.className === "fa-regular fa-moon"){
            themeDark(i);
        }
        else{
            themeLight(i);
        }
    })
}

theme();

arrowExchange.addEventListener("click",() => {
    let tempfrom = fromCurr.value;
    let tempto = toCurr.value;
    toCurr.value = tempfrom;
    fromCurr.value = tempto;
    console.log(tempfrom)
    updateFlag(fromCurr);
    updateFlag(toCurr);
})
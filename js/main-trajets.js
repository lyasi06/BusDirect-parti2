// import {test} from "./store.js";
// test(); 

import {rederStatistique } from "./render.js";
import {savehh} from "./store.js";
import {handleFilter, initialisePagination} from "./filter.js"
savehh().then(trips =>{
    // trajetsrendrer(trips);
    initialisePagination(trips);
    rederStatistique(trips);
})


const searchCity = document.getElementById("recherch");
const searchSelector = document.getElementById("status");

searchCity.addEventListener("input", handleFilter);
searchSelector.addEventListener("change", handleFilter);



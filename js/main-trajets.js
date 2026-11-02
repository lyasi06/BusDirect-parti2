// import {test} from "./store.js";
// test(); 

import { trajetsrendrer, rederStatistique } from "./render.js";
import {savehh} from "./store.js";

savehh().then(trips =>{
    trajetsrendrer(trips);
    rederStatistique(trips);
})

import {handleFilter} from "./filter.js"
const searchCity = document.getElementById("recherch");
const searchSelector = document.getElementById("status");

searchCity.addEventListener("input", handleFilter);
searchSelector.addEventListener("change", handleFilter);
// import {test} from "./store.js";
// test(); 

import { trajetsrendrer, rederStatistique } from "./render.js";
import {savehh} from "./store.js";

savehh().then(trips =>{
    trajetsrendrer(trips);
    rederStatistique(trips);
})
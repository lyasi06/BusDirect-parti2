// import {test} from "./store.js";
// test(); 

import { savetEMP } from "./store.js";
async function afficher()
{
    const trips = await savetEMP();
    console.table(trips);
}
afficher();
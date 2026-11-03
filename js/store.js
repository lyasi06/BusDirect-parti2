// export const test = () => console.log("store OK");
export function save(trips){
    localStorage.setItem("trips", JSON.stringify(trips));
}

export function savehh(){
    const saveget = localStorage.getItem("trips")
if (saveget){
    console.log("donner charge depuit localstorage");
    return Promise.resolve(JSON.parse(saveget));
}
console.log("chargement depuit trips.json");

return fetch("./data/trips.json")
.then(response =>{
    if(!response.ok){
        throw new Error("Error de chargemnet");
    }
    return response.json();
})
.then(trips =>{
    save(trips);
    return trips;
})
.catch(error => {
    console.error("errur: error");
    return [];
})
}


export function getTrips(){
    const data = localStorage.getItem("trips");
    if (data){
        return JSON.parse(data);
    }
    return [];
}
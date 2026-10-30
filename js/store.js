// export const test = () => console.log("store OK");
export function save(trips){
    localStorage.setItem("trips", JSON.stringify(trips));
}

export async function savetEMP() {
    const savedonner = localStorage.getItem("trips");
    if(savedonner){
        return JSON.parse(savedonner);
    }

try{
    const reponse = await fetch("./data/trips.json");
    const trips = await reponse.json();
    save(trips);
    return trips;
}
catch (error){
    return [];
}
}
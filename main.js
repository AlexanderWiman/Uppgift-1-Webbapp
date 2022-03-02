/* Den här applikationen hämtar information om ankommande och avgående flyg från Dubais flygplats. 
*  Ett anrop för avgående, och ett för ankommande. 
*  
*
*/


window.onload = fetchData();

async function fetchData() {

    try {
        const depData = await fetch('http://api.aviationstack.com/v1/flights?access_key=63432a741f5c56a3bd86fe74bb1d67de&limit=10&dep_iata=dxb');
        const arrData = await fetch('http://api.aviationstack.com/v1/flights?access_key=63432a741f5c56a3bd86fe74bb1d67de&limit=10&arr_iata=dxb');

        if(!depData.ok || !arrData.ok) {
            throw new Error('Something went wrong with the server');
        }

        const arrivals = document.getElementById('arrivals');
        const arrFlights = await arrData.json();
        arrivals.innerHTML = arrHTMLContent(arrFlights.data);
        
        const departures = document.getElementById('departures');
        const depFlights = await depData.json();
        departures.innerHTML = depHTMLContent(depFlights.data);

    } catch(error) {
        console.log(error);
    }

}

function depHTMLContent(flights) {
    let departureList = '';
    
    for (let flight of flights) {
        
        departureList += `
        
            <li>${flight.departure["scheduled"].slice(11,16)} ${flight.arrival["airport"]} ${flight.flight["iata"]}</li>
        
    `        
    }return departureList;
}

function arrHTMLContent(flights) {
    let arrivalList = '';
    
    for (let flight of flights) {
        
        arrivalList += `
        
            <li>${flight.arrival["scheduled"].slice(11,16)} ${flight.departure["airport"]} ${flight.flight["iata"]}</li>
        
    `        
    } return arrivalList;
}
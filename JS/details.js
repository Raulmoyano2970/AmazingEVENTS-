//location en consola para abrir datos
//pathname
//obetener contenedor
const detailContainer = document.getElementById("detailCard");
//obtener los eventos del data
const totalEvents = data.events;
//obtener el id del location,slice decimos cuiantas palabras queremos sacar del strings
let idLocation = location.search.slice(4);
//filtrar array (events ) para que solo devuelñva 1 evento y conincida con el id obtenido por el location
let filteredEvent = totalEvents.filter((event) => idLocation == event._id);
filteredEvent = filteredEvent[0];
//
//Imprimimos el evento que muestre lo que filtro
cardDetail(filteredEvent);

//crear funcion para obtener la info de la card
function cardDetail(event) {
  detailContainer.innerHTML = `
  <section id="cont-detail">
    <div>
      <img src="${event.image}" alt="cine" width="480" height="300" class="carta">
    </div>
    <div class="datosdetail">
      <h2>${event.name}</h2>
      <h3>Description</h3>
      <p>${event.description}</p>
      <h3>Date</h3>
      <p>${event.date}</p>
      <h3>Category</h3>
      <p>${event.category}</p>
      <h3>Place</h3>
      <p>${event.place}</p>
    </div>

  `;
}

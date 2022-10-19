const container = document.getElementById("main-content"); //obtengo contenedor donde  van los checkbox
const containerCheckbox = document.getElementById("containerCheck"); //contenedor de checkbox
const title = document.getElementById("title"); //cartas con respectiva pagina  poniendo home past upcom
const searchId = document.getElementById("searchId"); //guarda el search es un id del input y busqueda

const date = data.currentDate; //fecha que brinda el data

const card = [...data.events].map((createCard) => createCard); //mapeamos eventos en una variable

const homeCards = card.filter(() => title.text.includes("Home")); //si el texto incluye la palabra home filtra todas

const upcomingCards = card
  .filter(() => title.text.includes("Upcoming"))
  .filter((card) => card.date > date); //filtra misma tabla con el titulo upcoming y compara fecha mayor a la de hoy filter recorre todo el array

const pastEventCards = card
  .filter(() => title.text.includes("Past"))
  .filter((card) => card.date < date);
//filtra misma tabla con el titulo past y compara fecha menor a la de hoy

let fullEvents = [...homeCards, ...upcomingCards, ...pastEventCards];
fullEvents.forEach(createCard); //creamos un array que imprime las cartas  bajamos los elementos ,que ya estan filtradas, con el for each las creamos
//... te copia los elementos

//filtrar categoria y mapear los checkboks
const categorys = card.reduce(
  (allCategory, event) => Array.from(new Set([...allCategory, event.category])),
  [] //recoremos el event data (que es array)y le hacemos reduce para guardar todo lo que vamos recorriendo,new set no se repita primera vuelta food fair  food fair //segunda vuelta food fair , cinema cinema, el array del array  me los traes como string ...
);
categorys.forEach(createCheckbox); //recorrra categoria y me cree lla categoria

function createCheckbox(category) {
  // aca le pido que recorra y siempre creea una nueva categoria,con el inner para que cree en html
  containerCheckbox.innerHTML += `
<div class="form-check form-check-inline m-3 id="cajitas">
    <input
     class="form-check-input checkId"
     type="checkbox"
     id="${category}"
     value="${category}"
    />
    <label
      class="form-check-label texto_check fw-semibold"
      for="inlineCheckbox1"
    >${category}</label
    >
 </div>

`;
} //obtenemos checkbox

let checkId = document.querySelectorAll(".checkId"); //datos de checkbox y busqueda , check id obtenemos todos con el All, converrtimos en array
checkId = Array.from(checkId); //convertimos en arrays, todos los input
checkId.forEach((checkbox) => checkbox.addEventListener("click", Checks)); //cada check que recorre un evento que escucha "click en elemento ejecuta la funcion de check y cuando lo deseleccionamos"

searchId.addEventListener("input", Checks); //

function Checks() {
  let filteredCheck = checkEvents(fullEvents); //filtra los checkbox en todo el evento
  let filteredSearch = filterCardsBySearch(filteredCheck, searchId.value); //filtrar por busqueda filtererdcheck es array tocas las cartas
  if (filteredSearch.length !== 0) {
    container.innerHTML = ``;
  }
  filteredSearch.forEach(createCard);
}

function checkEvents(array) {
  let checkboxChecked = checkId
    .filter((check) => check.checked)
    .map((checkCategory) => checkCategory.value); //array de solo los tildados
  if (checkboxChecked.length > 0) {
    //crea nuevo array donde filtra y por cada evento retorna cara evento que esta con click coincidan con la categoria y los va a volver a tirar
    let filteredCheckbox = array.filter((events) =>
      checkboxChecked.includes(events.category)
    );
    return filteredCheckbox; //si estan destildado vuelve a poner a todos de nuevos siempre escucha vuelve a verificar cada vez que lo toquemos seria un true
  }
  return array; //si no hay nada vuelve a mostrarnos el arrays false
}

function filterCardsBySearch(array, texto) {
  let cardFilterForSearch = array.filter((events) =>
    events.name.toLowerCase().includes(texto.toLowerCase())
  ); //busca en array cada evento lo filtra  incluye el texto y en minuscusla
  if (cardFilterForSearch.length === 0) {
    searchEmpy();
    return [];
  }
  return cardFilterForSearch;
}

function searchEmpy() {
  container.innerHTML = `
  <div d-flex align-items-center>
<h3 style="
    text-align: center">Result not found</h3>
<img src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif" alt="gifftravolta" class="gif">
</div>
  `;
}

function createCard(arrays) {
  container.innerHTML += `
    <div id #sombra class="card" style="width: 20rem;" style="margin: 3rem;" >
    <img src="${arrays.image}" class="card-img-top" alt="${arrays.name}">
    <div class="card-body">
      <h4 class="card-title">${arrays.name}</h4>
      <p class="card-text">${arrays.description}
      </p>
      <div class="botonsecu d-flex justify-content-around ">
        <h5>$${arrays.price}</h5>
        <a href="./details.html?id=${arrays._id}" class="btn btn-primary" id="visit">Read More</a>
      </div>
    </div>
  </div>
  
  `;
}

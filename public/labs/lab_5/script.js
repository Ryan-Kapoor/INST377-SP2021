function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmthcG9vcjQyMTg3IiwiYSI6ImNrbTc5OW54ZjB3MHcydXBieHVuZjhxdzMifQ.izNXh2t613NKqXUjnvkZXA'
}).addTo(mymap);
  console.log('mymap', mymap);
  return mymap;
}

async function dataHandler(mapFromLeaflet) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('form submitted');
    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    console.table(filtered);

    filtered.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">$(item.address_line_1)</address>`;
      targetList.append(appendItem);
    });
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;


//   const request = await fetch('/api',{ method: 'post' });
//     const arrayName = await request.json()
//     console.table(arrayName)

  
//     function findMatches(wordToMatch, arrayName) {
//       return arrayName.filter(place => {
//           const regex = new RegExp(wordToMatch, 'gi');
//           return place.zip.match(regex) || place.category.match(regex) || place.name.match(regex)
//       });
//     }
  
//     function displayMatches(event) {

//       const matchArray = findMatches(event.target.value, arrayName);
//       const html = matchArray.map(place => {
//           const regex = new RegExp(event.target.value, 'gi');
//           const Name = place.name.replace(regex, `<span class="h1">${event.target.value}</span>`);
//           const Category = place.category.replace(regex, `<span class="h1">${event.target.value}</span>`);
//           const Address = place.address_line_1.replace(regex, `<span class="h1">${event.target.value}</span>`);
//           const City = place.city.replace(regex, `<span class="h1">${event.target.value}</span>`);
//           const Zip = place.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
//           return `
//               <li>
//               <span class = "name">${Name}</span>
//               <span class = "category">${Category}</span>
//               <span class = "address">${(Address).italics()}</span>
//               <span class = "city">${(City).italics()}</span>
//               <span class = "zip">${(Zip).italics()}</span>
//               </li>
          
//           `;
//       }).join('');
//       suggestions.innerHTML = html.toUpperCase();
//     }
  
//     const userInputs = document.querySelector('#search-form');
//     const suggestions = document.querySelector('.suggestions');
  
  
//     userInputs.addEventListener('submit', async (event) => {
//       event.preventDefault()
//       console.log('form submitted')
//       displayMatches(event)
//       console.table('filtered');
//    })
    
//   }



// window.onload = windowActions;
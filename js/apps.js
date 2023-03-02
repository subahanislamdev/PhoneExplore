const loading = async (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    DisplayPhones (data.data)

}
const DisplayPhones = phones =>{
const displayContainer = document.getElementById('phones-container')
displayContainer.innerHTML =``;
// only display 0 to 21 phones 
phones = phones.slice(0, 21)

// display not found phones start
const noPhone = document.getElementById('notFound-message')
if(phones.length === 0){

   noPhone.classList.remove('d-none')
}
else{
  noPhone.classList.add('d-none')
}
// display not found phones end
for(phone of phones){
console.log(phone)
  const DivContainer = document.createElement('div')
  DivContainer.classList.add('col')
  DivContainer.innerHTML =`
  <div class="card p-4">
      <img src="${phone.image}" class="card-img-top w-75 d-block m-auto" alt="...">
      <div class="card-body">
      <h5 class="card-title">${phone.phone_name} </h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
     </div>
 </div>
  `
  displayContainer.appendChild(DivContainer)
}
// stop loading 
  loadingSping(false)
}

// for each search items 
var searchphone = () =>{
  var SearchField = document.getElementById('search-field')
  // start loading 
     loadingSping(true)
    var searchText = SearchField.value ;
    loading(searchText) 
    SearchField.value = '';
}
// toogle button 
const loadingSping = isloading =>{

  const toggleSection = document.getElementById('toggle-btn')
  if(isloading){
    toggleSection.classList.remove('d-none')
  }
  else{
    toggleSection.classList.add('d-none')
  }
}
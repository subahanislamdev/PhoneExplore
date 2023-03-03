const loading = async (searchText, datalimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    DisplayPhones (data.data, datalimit)

}
const DisplayPhones = (phones, datalimit) =>{
const displayContainer = document.getElementById('phones-container')
displayContainer.innerHTML =``;

// only display show all-button or hide 
const showbtn = document.getElementById('show-all') 
if(datalimit && phones.length > 12){
  phones = phones.slice(0, 12)
  showbtn.classList.remove('d-none')
}
else{
  showbtn.classList.add('d-none')
}


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
      <button  type="button" onclick="LoadingDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
     </div>
 </div>
  `
  displayContainer.appendChild(DivContainer)
}
// stop loading 
  loadingSping(false)
}

// display showall button and all value 

const showprocess = (datalimit) =>{
  var SearchField = document.getElementById('search-field')
  // start loading 
     loadingSping(true)
    var searchText = SearchField.value ;
    loading(searchText, datalimit) 
    SearchField.value = '';
}
// for each search and show 12
var searchphone = () =>{
  showprocess(12)
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
// unlimited data show 

document.getElementById('show-all-btn').addEventListener('click', function(){
   showprocess()
})


// show phone informations details
 const LoadingDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res =>res.json())
  .then(data => displayphoneDetails(data.data))
 }

const displayphoneDetails = phone =>{
  console.log(phone)
  const modalTile = document.getElementById('exampleModalLabel')
  modalTile.innerText = phone.name;
  const modalBody = document.getElementById('phone-body')
  modalBody.innerHTML = `
  <p> Memory Info: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'not information'} </p>
  <p> Chipset Info: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'not information'} </p>
  <p> Display Info: ${phone.mainFeatures.displaySize} </p>
  <p> Bluetooth Info: ${phone.others.Bluetooth} </p>
  <p> GPS Info: ${phone.others.GPS} </p>
  <p> WLAN Info: ${phone.others.WLAN} </p>
  `
}

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

const loadPhone = async(search, dataLimit) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, dataLimit)

}   

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    
    
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
        document.getElementById('load-more').classList.remove('d-none')
    }else{
        document.getElementById('load-more').classList.add('d-none')
    }

    // if  no phone founds 
    if(phones.length <= 0){
       document.getElementById('no-found-msg').classList.remove('d-none')        
    }else{
        document.getElementById('no-found-msg').classList.add('d-none')   
    }

    // display all phones 
    phones.forEach(phone => {
        phoneContainer.innerHTML += `
                <div class="col p-3">
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                     Show Details 
                                </button>
                        </div>
                        
                    </div>
                </div>
        `
    })

    // spinner stop here 
    spinner(false)

}


document.getElementById('search-btn').addEventListener('click', function(){
  searchPhone(10)
})

document.getElementById('text-field').addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        searchPhone(10)
    }
})

// show all the data 
document.getElementById('show-all-btn').addEventListener('click', function(){
    searchPhone()
})

const spinner = isLoading =>{
    if(isLoading){
        document.getElementById('loader').classList.remove('d-none')
    }else{
        document.getElementById('loader').classList.add('d-none')
    }
}


const searchPhone = (dataLimit) => {
 // start loading element and leader status true 
 spinner(true)
    
 const userText = document.getElementById('text-field').value 
 // console.log(userText)
 loadPhone(userText, dataLimit)
}



// show details mobile 
const showDetails = slug =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then(res => res.json())
    .then(data => displayShowDetails(data.data))
}

const displayShowDetails = mobile =>{
    const modalBody = document.getElementById('modal-body')
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = mobile.name
    modalBody.innerHTML = `
        <p><strong>Release Data: </strong>${mobile.releaseDate ? mobile.releaseDate : 'No Release date found!'}</p>
        <p><strong>Bluetooth: </strong>${mobile.others.Bluetooth ? mobile.others.Bluetooth : 'No Bluetooth Found!'}</p>
        <p><strong>Storage: </strong>${mobile.mainFeatures.storage ? mobile.mainFeatures.storage : 'No Storage Found!'}</p>
        <p><strong>Chipset: </strong>${mobile.mainFeatures.chipSet ? mobile.mainFeatures.chipSet : 'chipSet Not Found!'}</p>
        <p><strong>Display-size: </strong>${mobile.mainFeatures.displaySize ? mobile.mainFeatures.displaySize : 'Display size not Found!'}</p>
        <p><strong>Wifi: </strong>${mobile.others.WLAN ? mobile.others.WLAN : 'WIFI not Found!'}</p>
    `
    console.log(mobile)
}


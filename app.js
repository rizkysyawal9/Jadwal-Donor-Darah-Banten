//Url API
import './src/script/components/app-header.js'
import './src/script/components/date-picker.js'

const baseUrl = "https://sites.google.com/macros/exec?service=AKfycbxENZUqbOHUz7c7CevxlMJMkjxRMtP5rRim-SjFwcLSO9UDiBk"
const provinsi = "&provinsi=Banten"

let date = ''
const searchButton = document.querySelector('#datebtn')
let placeListElement = document.querySelector('#placeList')

//Fungsi mengambil Date
const myfunction = function(){
    const x = document.getElementById("datePicker").value
    date = changeDateFormat(x)
    console.log(date)
    getDates(date)
}

const getDates = async (keyword) => {
    try{   
        let loader = `<div class="loader"></div>`
        placeListElement.innerHTML = loader
        //Proxy digunakan karena API tidak memiliki Access-Control-Allow-Origin
        const proxy = "https://cors-anywhere.herokuapp.com/"
        const response = await fetch(proxy + `${baseUrl}&tanggal=${keyword}${provinsi}`)
        const responseJson = await response.json()
        //Tanggal yang tidak tersedia di API mengembalikan status:error
        if(responseJson.status == "error"){
            showResponse("Tanggal Tidak Tersedia")
            renderEmpty()
        }
        else if(responseJson.error){
            showResponse(responseJson.message)
        }else {
            render(responseJson.data)
        }
    } catch(error){
        showResponse(error)
    }
}



const showResponse = (message = "Check your internet Connection") =>{
    alert(message)
}

const renderEmpty = () => {
    placeListElement.innerHTML = `<p>Tanggal tersebut tidak tersedia</p>`
}


const render = (data) => { 
    placeListElement.innerHTML = ""
    data.forEach(place=>{
        console.log(`instasi: ${place.instansi}`)
        console.log(`alamat: ${place.alamat}`)
        console.log(`jam: ${place.jam}`)
        const instansi = place.instansi
        const alamat = place.alamat
        const jam = place.jam

        const placeElement = document.createElement("div")
        placeElement.setAttribute("class", "place")

        placeElement.innerHTML = `
        <h3>${instansi}</h3>
        <p>Alamat: ${alamat}</p>
        <p>Jam: ${jam}</p>
        `
        placeListElement.appendChild(placeElement)
    })
}

function changeDateFormat(inputDate){  // expects Y-m-d
    var splitDate = inputDate.split('-');
    if(splitDate.count == 0){
        return null;
    }
    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2]; 
    return month + '/' + day + '/' + year;
}

searchButton.addEventListener('click', myfunction);
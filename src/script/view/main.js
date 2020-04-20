const main = () => {  
    const baseUrl = "https://sites.google.com/macros/exec?service=AKfycbxENZUqbOHUz7c7CevxlMJMkjxRMtP5rRim-SjFwcLSO9UDiBk"
    const provinsi = "&provinsi=Banten"
    let date = ''
    const searchButton = document.querySelector('#datebtn')
    let placeListElement = document.querySelector('#placeList')
    
     //Ubah Format Tanggal
     const changeDateFormat = (date) => { 
        const splitDate = date.split('-');
        if(splitDate.count == 0){
            return null;
        }
        const year = splitDate[0];
        const month = splitDate[1];
        const day = splitDate[2]; 
        return `${month}/${day}/${year}`
    }
    
    //Fungsi mengambil Jadwal
    const getSchedule = () => {
        const date_wrong = document.querySelector("#datePicker").value
        date = changeDateFormat(date_wrong)
        console.log(date)
        renderAll(date)
    }
    
    //Fetch API
    const renderAll = async (keyword) => {
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
    
    //JSON Response
    const showResponse = (message = "Tidak Bisa Connect") =>{
        alert(message)
    }
    
    //Empty Response
    const renderEmpty = () => {
        placeListElement.innerHTML = `<p>Tanggal tersebut tidak tersedia</p>`
    }
     
    //Render Data
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
    searchButton.addEventListener('click', getSchedule);

   
}

export default main;
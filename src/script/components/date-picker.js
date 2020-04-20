class DatePicker extends HTMLElement{
    connectedCallback(){
        this.render()
    }
    render(){
        this.innerHTML = `
        <div class="container">
            <p>Pilih Tanggal</p>
            <br>
            <input type="date" name="dateofbirth" id="datePicker">
            <input type="button" value="Search" id="datebtn">
            <p class="getDate"></p>
        </div>
        `
    }  
}

customElements.define("date-picker", DatePicker)
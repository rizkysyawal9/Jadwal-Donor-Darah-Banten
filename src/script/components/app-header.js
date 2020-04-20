class AppHeader extends HTMLElement{
    connectedCallback(){
        this.render()
    }
    render(){
        this.innerHTML=`<h1>Jadwal Donor Darah Daerah Banten</h1>`
    }
}

customElements.define("app-header", AppHeader)
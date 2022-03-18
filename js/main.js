const pais = document.querySelector('#pais')
const ciudad = document.querySelector('#ciudad')
const btnResultado = document.querySelector('#btnResultado')
const resultados = document.querySelector('#resultados')
const error = document.querySelector('#error')

const api = 'a663bb7826d14d4a7ad5cda479f89f60 '


const buscador = {
    country : '',
    city : '',
}

pais.addEventListener('change', (e) => {
    let pais = e.target.value
    if(pais == ""){
    }else{
        fetch(`https://restcountries.com/v3.1/name/${pais}?fullText=true`)
            .then( respuesta => {
            return respuesta.json()
            }) 
            .then(resultado => {
                if(resultado.length == 1){
                    buscador.country = resultado[0].cca2
                }else{
                    error.innerHTML = `
                    <p class="error">Error en el pais, porfavor elegir uno valido</p>
                    `
                    setTimeout(() =>{
                        error.innerHTML = ""
                    }, 3000)
                    return
                }
            })
    }
})
ciudad.addEventListener('change', (e) => {
    buscador.city = e.target.value
})

btnResultado.addEventListener('click', (e) =>{
    e.preventDefault()
    if((buscador.country == "") || (buscador.city == "")){
        error.innerHTML = `
        <p class="error">Error, faltan campos por rellenar o hay un error</p>
        `
        setTimeout(() =>{
            error.innerHTML = ""
        }, 3000)
        return
    }else{
        apiClima()
    }
})






function apiClima(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${buscador.city},${buscador.country}&appid=${api}`)
    .then( respuesta => {
    return respuesta.json()
    }) 
    .then(resultado => {
        console.log(resultado)
        if(resultado.cod === '404'){
            error.innerHTML = `
            <p class="error">Error en la ciudad, por favor poner una valida</p>
            `
            setTimeout(() =>{
                error.innerHTML = ""
            }, 3000)
            return
        }else{
            temperatura = resultado.main.temp
            temperaturaMin = resultado.main.temp_min
            temperaturamax = resultado.main.temp_max
            mostrarHTML(temperatura, temperaturaMin, temperaturamax)
        }
    })  
}


function mostrarHTML(temperatura, temperaturaMin, temperaturamax){
    temperaturaCelcius = parseInt(temperatura - 273)
    temperaturaMinima = parseInt(temperaturaMin - 273)
    temperaturaMaxima = parseInt(temperaturamax - 273)
    console.log(temperaturaCelcius)
    resultados.innerHTML = `
    <div class="card">
    <div class="flex__grados"><p class="p__card">La temperatura en ${buscador.city} es:</p><p>${temperaturaCelcius}℃</p></div>
    <div class="flex__card">
    <p>Min:${temperaturaMinima}℃</p>
    <p>Max:${temperaturaMaxima}℃</p>
    </div>
    
    </div>
       
    `
}


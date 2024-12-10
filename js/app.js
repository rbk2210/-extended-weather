const apikey = '66e93fa4308f4c2c9d9361df59066ef1'
const api = 'https://api.weatherbit.io/v2.0/current'
const apidaily = 'https://api.weatherbit.io/v2.0/forecast/daily'
const weathericon = 'https://www.weatherbit.io/static/img/icons/'

const entry = document.querySelector('.entry')
const entryBtn = document.querySelector('.entry__btn')
let city = ''


const container = document.querySelector('.container')
const area = document.querySelector('.area')
const icon = document.querySelector('.icon')
const description = document.querySelector('.description')
const todayTemp = document.querySelector('.today__temp')
const temp = document.querySelector('.temp')

/* extends */
const extendsinfo = document.querySelector('.extend__info')
const days = document.querySelector('.days')
const day1 = document.querySelector('#day1')
const day2 = document.querySelector('#day2')
const day3 = document.querySelector('#day3')

const iconextend1 = document.querySelector('.iconextend1')
const iconextend2 = document.querySelector('.iconextend2')
const iconextend3 = document.querySelector('.iconextend3')

const spanmin1 = document.querySelector('.spanmin1')
const spanmax1 = document.querySelector('.spanmax1')
const spanmin2 = document.querySelector('.spanmin2')
const spanmax2 = document.querySelector('.spanmax2')
const spanmin3 = document.querySelector('.spanmin3')
const spanmax3 = document.querySelector('.spanmax3')

entryBtn.addEventListener('click',()=>{
    city = entry.value
    fetch(`${api}?city=${city}&key=${apikey}&lang=es`)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        const weather = data.data[0]
        area.textContent = weather.city_name
        const code = weather.weather.icon
        icon.src = `${weathericon}/${code}.png`
        todayTemp.textContent = weather.temp
        temp.style.display = 'block'
        description.textContent = weather.weather.description
        
    })
    entry.value = ''
    daily()
    days.style.display = 'blcok'
})

function daily(){
    fetch(`${apidaily}?city=${city}&key=${apikey}&lang=es`)
        .then(datadaily => datadaily.json())
        .then(datadaily => {
            console.log(datadaily)
            const tomorrow = datadaily.data[0]
            const afterTomorrow = datadaily.data[1]
            const third = datadaily.data[2]
            const daysOfWeek = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
            const today = new Date()
            const todayIndex = today.getDay()

            day1.textContent = daysOfWeek[todayIndex + 1]
            day2.textContent = daysOfWeek[todayIndex + 2]
            day3.textContent = daysOfWeek[todayIndex + 3]

            iconextend1.src = `${weathericon}/${tomorrow.weather.icon}.png`
            iconextend2.src = `${weathericon}/${afterTomorrow.weather.icon}.png`
            iconextend3.src = `${weathericon}/${third.weather.icon}.png`

            spanmin1.textContent = tomorrow.app_min_temp
            spanmax1.textContent = tomorrow.app_max_temp
            spanmin2.textContent = afterTomorrow.app_min_temp
            spanmax2.textContent = afterTomorrow.app_max_temp
            spanmin3.textContent = third.app_min_temp
            spanmax3.textContent = third.app_max_temp
            console.log(tomorrow)
            console.log(afterTomorrow)
            console.log(third)
        })
}
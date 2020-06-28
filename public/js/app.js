const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    geocode(location)
})

const geocode = (location) => {

    if (!location) {
        messageTwo.textContent ='Please type in a location'
    } else {

        // const url = 'https://localhost:3000/weather?q='+ location +'&appid=70f143079afb3b8a7f97e8a5abfcf317'

        // const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ location +'&appid=70f143079afb3b8a7f97e8a5abfcf317'

        const url = '/weather?q='+ location +'&appid=70f143079afb3b8a7f97e8a5abfcf317'

        fetch(url).then((response) => {
                response.json().then((data) => {
                if (data.cod !== 200) {
                    messageTwo.textContent = data.message
                    // console.log(data.message)
                } else {
                    messageOne.textContent = data.name
                    messageTwo.textContent = data.weather[0].description
                    // console.log(data.name)
                }
            })
        })
    }

}
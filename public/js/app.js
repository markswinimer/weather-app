console.log('Client side javascript loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
              return messageOne.textContent = data.error
            }
            messageOne.textContent = "Location: " + data.address
            messageTwo.textContent = data.weather.forecast
            messageThree.textContent = "Hourly: " + data.weather.hourly
        })
    })
})
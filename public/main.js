const btn1 = document.getElementById('button1')
const btn2 = document.getElementById('button2')

const bag = document.getElementById('bag')

let firstBox = document.getElementById('pokemon-content1')
let secondBox = document.getElementById('pokemon-content2')

const pokeURL = `https://pokeapi.co/api/v2/pokemon`
const baseURL = `http://localhost:4050`



let firstBodyObj = {}
let secondBodyObj = {}

function buildPokeCard1(res) {
    firstBox.innerHTML = ''
    let name = res.data.name
    name = name.charAt(0).toUpperCase() + name.slice(1)

    let image = res.data.sprites.other['official-artwork']['front_default']

    let total = (+res.data.stats[0]['base_stat'] + +res.data.stats[1]['base_stat'] + +res.data.stats[2]['base_stat'] + +res.data.stats[3]['base_stat'] + +res.data.stats[4]['base_stat'] + +res.data.stats[5]['base_stat'])
    
    firstBodyObj = {
        name,
        image,
        total
    }

    firstBox.innerHTML = `<img src=${image} alt="" class='pokemon-image'/>
    <p class="pokemon-name">${name}</p>
    <p class="total-stats">Total Stats: ${total}</p>
    <p class="hp">HP: ${res.data.stats[0]['base_stat']}</p>
    <p class="Attack">Attack: ${res.data.stats[1]['base_stat']}</p>
    <p class="Defense">Defense: ${res.data.stats[2]['base_stat']}</p>
    <p class="sp-attack">Special Attack: ${res.data.stats[3]['base_stat']}</p>
    <p class="sp-defense">Special Defense: ${res.data.stats[4]['base_stat']}</p>
    <p class="speed">Speed: ${res.data.stats[5]['base_stat']}</p>
    <button id="add-1">Add to Bag</button>`

    const addBtn1 = document.getElementById('add-1')
    addBtn1.addEventListener('click', addPokemon1)
}

function buildPokeCard2(res) {
    secondBox.innerHTML = ''
    let name = res.data.species.name
    
    name = name.charAt(0).toUpperCase() + name.slice(1)

    let image = res.data.sprites.other['official-artwork']['front_default']

    let total = (+res.data.stats[0]['base_stat'] + +res.data.stats[1]['base_stat'] + +res.data.stats[2]['base_stat'] + +res.data.stats[3]['base_stat'] + +res.data.stats[4]['base_stat'] + +res.data.stats[5]['base_stat'])

    secondBodyObj = {
        name,
        image,
        total
    }

    secondBox.innerHTML = `<img src=${image} alt="" class='pokemon-image'/>
    <p class="pokemon-name">${name}</p>
    <p class="total-stats">Total Stats: ${total}</p>
    <p class="hp">HP: ${res.data.stats[0]['base_stat']}</p>
    <p class="Attack">Attack: ${res.data.stats[1]['base_stat']}</p>
    <p class="Defense">Defense: ${res.data.stats[2]['base_stat']}</p>
    <p class="sp-attack">Special Attack: ${res.data.stats[3]['base_stat']}</p>
    <p class="sp-defense">Special Defense: ${res.data.stats[4]['base_stat']}</p>
    <p class="speed">Speed: ${res.data.stats[5]['base_stat']}</p>
    <button id="add-2">Add to Bag</button>`

    const addBtn2 = document.getElementById('add-2')
    addBtn2.addEventListener('click', addPokemon2)
}

const addPokemon1 = () => {
    console.log(firstBodyObj)
    axios.post(`${baseURL}/bag`, firstBodyObj)
    .then((res) => {
        addToBag(res)
    })
    .catch((err) => console.log(err))
}
const addPokemon2 = () => {
    console.log(secondBodyObj)
    axios.post(`${baseURL}/bag`, secondBodyObj)
    .then((res) => {
        addToBag(res)
    })
    .catch((err) => console.log(err))
}

const getPokemon1 = (poke) => {
    axios.get(`${pokeURL}/${poke.toLowerCase()}`)
    .then((res) => {
        buildPokeCard1(res)
    })
    .catch((err) => console.log(err))
}

const getPokemon2 = (poke) => {
    axios.get(`${pokeURL}/${poke.toLowerCase()}`)
    .then((res) => {
        buildPokeCard2(res)
    })
    .catch((err) => console.log(err))
}

const deletePokemon = id => {
    axios.delete(`${baseURL}/bag/${id}`)
    .then((res) => {
        addToBag(res)
    })
    .catch((err) => console.log(err))
}

const deleteAll = () => {
    axios.delete(`${baseURL}/bag`)
    .then((res) => console.log('all pokemon are deleted'))
    .catch((err) => console.log(err))
}

function addToBag(res) {
    console.log(res.data)
    bag.innerHTML = ''
    for(let i = 0; i < 6; i++) {
        
        let newCard = document.createElement('div')
        newCard.classList.add('bagCard')

        newCard.innerHTML = `<h3>${res.data[i].name}</h3>
        <img src='${res.data[i].image}' alt="" >
        <h4>Total: ${res.data[i].total}</h4>
        <button class='delete-btn' onclick='deletePokemon(${res.data[i].id})'>Remove from bag</button>`

        bag.appendChild(newCard)  
    }
}

function formHandler1(e) {
    e.preventDefault()

    let pokemon = document.getElementById('first-pokemon').value

    getPokemon1(pokemon)
}

function formHandler2(e) {
    e.preventDefault()

    let pokemon = document.getElementById('second-pokemon').value

    getPokemon2(pokemon)
}

deleteAll()
btn1.addEventListener('click', formHandler1)
btn2.addEventListener('click', formHandler2)

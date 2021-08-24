let express = require('express')
let cors = require('cors')
let app = express()
let path = require('path')
const ctrl = require('./controller')
const port = process.env.PORT || 4050

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))
app.use(express.static('public'));

app.post('/bag', ctrl.addPokemon)
app.delete('/bag/:id', ctrl.deletePokemon)
app.delete('/bag', ctrl.deleteAll)

app.listen(port, () => console.log(`Go, pokemon number ${port}!`))
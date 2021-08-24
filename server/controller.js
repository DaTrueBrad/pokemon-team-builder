let bag = []
let id = 0

module.exports = {
    addPokemon: (req, res) => {
        if(bag.length < 6) {
           let { name, image, total } = req.body
            let newPokemon = {
                id,
                name,
                image,
                total
                }
            id++
            bag.push(newPokemon)
            console.log(bag)
            res.status(200).send(bag) 
        }
    },
    deletePokemon: (req, res) => {
        let { id } = req.params
        let index = bag.findIndex(pokemon => pokemon.id === +id)
        bag.splice(index, 1)
        res.status(200).send(bag)
    },
    deleteAll: (req, res) => {
        bag = []
        res.status(200).send(bag)
    }
}
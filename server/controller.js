let team = []
let id = 0

module.exports = {
    addPokemon: (req, res) => {
        if(team.length < 6) {
           let { name, image, total } = req.body
            let newPokemon = {
                id,
                name,
                image,
                total
                }
            id++
            team.push(newPokemon)
            res.status(200).send(team) 
        }
    },
    deletePokemon: (req, res) => {
        let { id } = req.params
        let index = team.findIndex(pokemon => pokemon.id === +id)
        team.splice(index, 1)
        res.status(200).send(team)
    },
    deleteAll: (req, res) => {
        team = []
        res.status(200).send(team)
    }
}
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
    }
}
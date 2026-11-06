const express = require("express")
const cors = require("cors")

function createApp(models) {
    const app = express()
    app.use(cors())
    app.use(express.json())
    const route = handler => (req, res, next) => Promise.resolve(handler(req, res)).catch(next)

    app.get("/api/books", route(async (req, res) => {
        res.json(await models.Books.findAll())
    }))

    app.post("/add-book", route(async (req, res) => {
        const book = await models.Books.create({
            title: req.body.title,
            genre: req.body.genre,
            publisher: req.body.author,
            year: req.body.year,
            imageURL: req.body.imageURL
        })
        res.status(201).json(book)
    }))

    app.post("/delete-book/:id", route(async (req, res) => {
        await models.Books.destroy({ where: { id: req.params.id } })
        res.json({ message: "book deleted" })
    }))

    app.post("/update-book", route(async (req, res) => {
        const [updated] = await models.Books.update({
            title: req.body.title,
            genre: req.body.genre,
            publisher: req.body.author,
            year: req.body.year,
            imageURL: req.body.imageURL
        }, { where: { id: req.body.id } })
        res.json({ updated })
    }))

    app.use((error, req, res, next) => {
        res.status(500).json({ error: "Unable to save or load books. Please try again." })
    })
    return app
}

module.exports = { createApp }
if (require.main === module) {
    createApp(require("./models")).listen(8008, () => {
        console.log("Server running on http://localhost:8008")
    })
}

const express = require("express")
const app = express()
const models = require("./models")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/api/books", async (req, res) => {
    let allBooks = await models.Books.findAll()
    res.json(allBooks)
})

app.post("/add-book", async (req, res) => {
    let newBook = await models.Books.build({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.author,
        year: req.body.year,
        imageURL: req.body.imageURL
    })

    await newBook.save()
})

app.post("/delete-book/:id", async (req, res) => {
    let passedBookId = req.body.id

    models.Books.destroy({
        where: {
            id: passedBookId
        }
    })
})

app.post("/update-book", async (req, res) => {
    await models.Books.update({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.author,
        year: req.body.year,
        imageURL: req.body.imageURL
    }, {
        where: {
            id: req.body.id
        }
    })
})


app.listen(8008, () => {
    console.log("Server running on http://localhost:8008")
})

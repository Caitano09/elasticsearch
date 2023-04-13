import express, { Request, Response, response } from "express"
import getClient from "./client/elasticsearch"
import DBController from "./DBController"
import PhotoController from "./PhotoController"

const app = express()

app.get("/", async (req: Request, res: Response) => {
    const client = getClient()

    const result = await client.index({
        index: 'elastic_test',
        body: {
            user: 'Daniele', 
            password: 'password',
            email: 'dani@mail.com'
        }
    })
    return res.json(result)
}) 

app.get('/db/create', DBController.create)
app.get('/photos/create', PhotoController.create);
app.get('/photos/findAll', PhotoController.findAll);
app.get('/photos/findById/:id', PhotoController.findById);
app.get('/photos/createPhoto', PhotoController.createPhoto);
app.get('/photos/findByQuery', PhotoController.findByQuery);

app.listen(3333, ()=> console.log("running"))
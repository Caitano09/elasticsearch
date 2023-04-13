import { Request, Response } from "express";
import mysql from 'mysql2';
import getClient from "./client/elasticsearch";

class PhotoController {
    async create(req: Request, res: Response) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'elasticsearch'
        });

        connection.query(
            'SELECT * FROM mock_data',
            async function (err, results: any, fields) {
                for await (const result of results) {
                    await getClient().index({
                        index: 'photos',
                        body: result
                    })
                }
                return res.json({ message: 'Index Ok!' })
            }
        );
    }

    async findAll(req: Request, res: Response) {
        const dataInicial = new Date().getTime()

        const data = await getClient().search({
            index: 'photos',
            size: 6000
        })

        const dataFinal = new Date().getTime()
        console.log('O resultado do elasticsearch foi', (dataFinal - dataInicial))
        return res.json(data)
    }

    async findById(req: Request, res: Response) {
        const data = await getClient().search({
            index: 'photos',
            q: `id:${req.params.id}`
        })
        return res.json(data.hits.hits)
    }

    async createPhoto(req: Request, res: Response) {
        const photo = {
            "id": 99999,
            "title": "Title De Teste",
            "url": "https://via.placeholder.com/600/bf37f1",
          }
      
          const data = await getClient().index({
            index: 'photos',
            body: photo
          })

          return res.json(data)
    }

    async findByQuery(req: Request, res: Response) {
        const data = await getClient().search({
            index: 'photos',
            body: {
                query:{
                    match:{
                        title: 'sea' //busca tudo que tiver sea no nome
                        //"title.keyword": 'Across the Sea of Time'//busca exatamente o texto
                    }
                }
            }
        })
        return res.json(data)
    }
}

export default new PhotoController
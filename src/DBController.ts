import { Request, Response } from 'express';
import mysql from 'mysql2';

class DBController {
    async create(req: Request, res: Response) {
        const dataInicial = new Date().getTime()
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'elasticsearch'
        });

        connection.query(
            'SELECT * FROM mock_data',
            function (err, results, fields) {
                const dataFinal = new Date().getTime()
                 console.log('O resultado foi', (dataFinal - dataInicial))
                return res.json(results)
            }
        );

       
    }
}

export default new DBController
import DBConfig from './../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class UsersRepository
{


    createAsync = async (entity) => {
        console.log(`UsersRepository.createAsync(${JSON.stringify(entity)})`);
        const client = new Client(DBConfig);
        let rowsAffected = 0;
        //console.log(entity)
        try{
            await client.connect();
            const sql = 'INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
            const values = [entity.first_name, entity.last_name, entity.username, entity.password];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
        }catch (error){
            
            console.log(error)
        }

        return rowsAffected;

    }

    getByUsername = async (entity) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM public.users
                    WHERE username = $1
                    AND password = $2
        `;
        const values = [entity.username, entity.password]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }

}
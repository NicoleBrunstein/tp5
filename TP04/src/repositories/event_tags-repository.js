import DBConfig from '../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class event_tagsRepository
{

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM provinces WHERE id = $1`;
        const values = [id]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }
    
}
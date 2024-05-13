import DBConfig from './../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class event_categoriesRepository
{

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_categories`;
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
        const sql = `SELECT * FROM event_categories WHERE id = $1`;
        const values = [id]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }
    createAsync = async (entity) => {
        console.log('event_categoriesRepository.createAsync(${JSON.stringify(entity)})');
        const client = new Client(DBConfig);
        let rowsAffected = 0;

        try{
            await client.connect();
            const sql = 'INSERT INTO event_categories(id, name, display_order) VALUES ($1, $2, $3)';
            const values = [entity.id, entity.name, entity.display_order];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
        }catch (error){
            
            console.log(error)
        }

        return rowsAffected;

    }
    updateAsync = async (entity) => {
        const client = new Client(DBConfig);
        await client.connect();
        let rowsAffected;
            const sql = 'UPDATE event_categories SET name = $2, display_order = $3 WHERE id = $1';
            const values = [entity.id,entity.name, entity.display_order];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
            return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let  rowsAffected;
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'DELETE FROM event_categories WHERE id=$1';
        const values = [id]
        const result = await client.query(sql, values);
        rowsAffected = result.affectedRows;
    }

}
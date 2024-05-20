import DBConfig from './../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class event_locationsRepository
{

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_locations`;
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
        const sql = `SELECT * FROM event_locations WHERE id = $1`;
        const values = [id]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }
    createAsync = async (entity) => {
        console.log('event_locationsRepository.createAsync(${JSON.stringify(entity)})');
        const client = new Client(DBConfig);
        let rowsAffected = 0;

        try{
            await client.connect();
            const sql = 'INSERT INTO event_locations(id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            const values = [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user];
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
            const sql = 'UPDATE event_location SET name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = 7 WHERE id_location = $1';
            const values = [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
            return rowsAffected;
    }
    deleteByIdAsync = async (id_location) => {
        let  rowsAffected;
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'DELETE FROM event_location WHERE id_location=$1';
        const values = [id_location]
        const result = await client.query(sql, values);
        rowsAffected = result.affectedRows;
    }

}
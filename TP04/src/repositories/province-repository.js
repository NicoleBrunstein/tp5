import DBConfig from './../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class ProvinceRepository
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


    createAsync = async (entity) => {
        console.log('ProvinceRepository.createAsync(${JSON.stringify(entity)})');
        const client = new Client(DBConfig);
        let rowsAffected = 0;

        try{
            await client.connect();
            const sql = 'INSERT INTO Provinces(name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)';
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
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
            const sql = 'UPDATE Provinces SET name = $2, full_name = $3, latitude = $4, longitude = $5, display_order = $6 WHERE id = $1';
            const values = [entity.id,entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
            return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let  rowsAffected;
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'DELETE FROM Provinces WHERE id=$1';
        const values = [id]
        const result = await client.query(sql, values);
        rowsAffected = result.affectedRows;
    }

}
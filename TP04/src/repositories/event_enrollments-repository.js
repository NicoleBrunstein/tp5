import DBConfig from '../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class event_enrollmentsRepository
{
    
    createAsync = async (entity) => {
        console.log('event_categoriesRepository.createAsync(${JSON.stringify(entity)})');
        const client = new Client(DBConfig);
        let rowsAffected = 0;

        try{
            await client.connect();
            const sql = 'INSERT INTO event_enrollments(id, id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            const values = [entity.id, entity.id_event, entity.id_user, entity.description, entity.registration_date_time, entity.attended, entity.observations, entity.rating];
            const result = await client.query(sql, values);
            rowsAffected = result.affectedRows;
        }catch (error){
            
            console.log(error)
        }

        return rowsAffected;
    }

    getByName = async (id, first_name) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM event_enrollments WHERE first_name = $1`;
        const values = [first_name]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }

    
    getByLastName = async (id, last_name) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;


        let  sql = `SELECT * FROM event_enrollments`;
        sql  =  sql + `AND firsnamt=asdasd`;



        sql  =  sql + `AND latsName=asdasd`;


        const sql = `SELECT * FROM event_enrollments WHERE last_name = $1`;
        
        const values = [last_name]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }

    getByUsername = async (id, username) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM event_enrollments WHERE username = $1`;
        const values = [username]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }
    getByUsername = async (id, attended) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM event_enrollments WHERE attended = $1`;
        const values = [attended]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }

    getByUsername = async (id, rating) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM event_enrollments WHERE rating = $1`;
        const values = [rating]
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows[0];
        }
        return  returnEntity;
    }

    deleteByIdAsync = async (id) => {
        let  rowsAffected;
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'DELETE FROM event_enrollments WHERE id=$1';
        const values = [id]
        const result = await client.query(sql, values);
        rowsAffected = result.affectedRows;
    }
    
}


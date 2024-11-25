import DBConfig from '../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class event_enrollmentsRepository
{
    
    createAsync = async (entity) => {
        console.log('event_categoriesRepository.createAsync(${JSON.stringify(entity)})');
        const client = new Client(DBConfig);
        let rowsAffected = 0;
        console.log('createAsync sssssssssssssssssssssssss', entity)
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

    getByLastName = async (id,first_name, last_name,username, attended, rating) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            let sql =  `SELECT
                            json_build_object(
                                'id', u.id,
                                'username', u.username,
                                'first_name', u.first_name,
                                'last_name', u.last_name
                            ) AS user,
                            ee.attended,
                            ee.rating,
                            ee.description
                        FROM
                            event_enrollments ee
                        INNER JOIN users u ON ee.id_user = u.id
                        WHERE ee.id_event = ${id} `; 
    
            if (first_name!=null){
                sql += `AND lower(u.first_name) LIKE lower('%${first_name}%') `; 
            }
            if (last_name!=null){
                sql += `AND lower(u.last_name) LIKE lower('%${last_name}%')  `; 
            }
            if (username!=null){
                sql += `AND lower(u.username) LIKE lower('%${username}%') `;
            }
            if (attended!=null){
                 sql += `AND ee.attended = '${attended}' `;
            }
            if (rating!=null){
                sql += `AND  ee.rating = '${rating}' `;
            }

            let result = await client.query(sql);
            returnArray = result.rows;
    
        } catch (error){
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
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
        let  rowsAffected = 0;
        const client = new Client(DBConfig);
        await client.connect();
        const sql = 'DELETE FROM event_enrollments WHERE id=$1';
        const values = [id]
        const result = await client.query(sql, values);
        rowsAffected = result.affectedRows;
    }
    
    updateAsync = async (eventId, entity, rating) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = 'UPDATE event_enrollments SET observations = $1, rating = $2 WHERE id_event = $3';
          const values = [
            entity.observations, 
            rating, 
            eventId
          ]; 
          console.log("Executing SQL:", sql);
          console.log("With values:", values);
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log(error);
        } 
        return returnArray;
      }

      async isUserRegistered(eventId, userId) {
        // Implementación para verificar si el usuario ya está registrado
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_enrollments WHERE id_event = $1 AND id_user = $2';
            const values = [eventId, userId];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error en isUserRegistered:', error);
            throw error;
        }
    }

    getByEventId = async (id_evento, first_name, last_name, username, attended, rating) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        let values = [];
    
        try {
            await client.connect();
            let query = `
            SELECT 
                ee.id_event, 
                u.first_name, 
                u.last_name, 
                u.username, 
                ee.attended, 
                ee.rating 
            FROM 
                users AS u 
            INNER JOIN 
                event_enrollments AS ee 
            ON 
                ee.id_user = u.id
            WHERE 
                ee.id_event = $1`;
    
            const params = [];
            let cont = 1;
            values.push(id_evento);
    
            if (first_name) {
                params.push(`lower(u.first_name) = lower($${++cont})`);
                values.push(first_name);
            }
            if (last_name) {
                params.push(`lower(u.last_name) = lower($${++cont})`);
                values.push(last_name);
            }
            if (username) {
                params.push(`lower(u.username) = lower($${++cont})`);
                values.push(username);
            }
            if (attended !== undefined) {
                params.push(`ee.attended = $${++cont}`);
                values.push(attended);
            }
            if (rating !== undefined) {
                params.push(`ee.rating = $${++cont}`);
                values.push(rating);
            }
    
            if (params.length > 0) {
                query += ' AND ' + params.join(' AND ');
            }
    
            const result = await client.query(query, values);
            returnArray = result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    
        return returnArray;
    }
}



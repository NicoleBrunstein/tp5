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

    getByLastName = async (id,first_name, last_name,username, attended, rating) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        let values = [];
        let indice;
        
        let  sql = `SELECt * FROM public.event_enrollments
        INNER JOIN public.users ON event_enrollments.id_User = users.Id
        where 1=1`;

        if(id != null ){
            sql  =  sql + ` AND   event_enrollments.id_event = '${id}'`;
        }


        if(last_name != null && length(last_name)>3){
            indice = values.length + 1;
            sql  =  sql + ` AND lower(users.last_name) like $${indice}`;
            values.push("%" + last_name.toLowerCase()+ "%");
        }

        if(first_name != null && length(first_name)>3 ){
            indice = values.length + 1;
            sql  =  sql + ` AND  lower(users.first_name) like $${indice}`;
            values.push("%" + first_name.toLowerCase()+ "%");
        }
        

        if(username != null ){
            indice = values.length + 1;
            sql  =  sql + ` AND  lower(users.username) like $${indice}`;
            values.push("%" + username.toLowerCase()+ "%");
        }
        
        if(attended != null ){
            sql  =  sql + ` AND   event_enrollments.attended = '${attended}'`;
        }

        if(rating != null ){
            sql  =  sql + ` AND event_enrollments.rating = 'rating'`;
        }

        console.log("XXXX",sql )
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows;
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
}



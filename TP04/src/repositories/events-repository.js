import DBConfig from './../configs/db-configs.js';
import pkg from 'pg'
const {Client, Pool}=pkg;

export default class eventsRepository
{

    
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM events`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    
    getByAsync = async (name, category, tags, startDate) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        let values = [];
        let indice;
        let  sql = `SELECT * FROM public.events
        INNER JOIN public.event_categories ON events.id_event_category = event_categories.id
        LEFT JOIN public.event_tags ON events.id = event_tags.id_event
        LEFT JOIN public.tags on event_tags.id_tag = tags.id
        WHERE 1=1 `;
        

        if(name != null ){
            indice = values.length + 1;
            sql  =  sql + `AND lower(events.name) like $${indice}`;
            values.push("%" + name.toLowerCase()+ "%");
        }
         
        if(category != null ){
            indice = values.length + 1;
            sql  =  sql + `AND lower(event_categories.name) like $${indice}`;
            values.push("%" + category.toLowerCase()+ "%");
        }


        if(tags != null ){
            indice = values.length + 1;
            sql  =  sql + `AND lower(tags.name) like $${indice}`;
            values.push("%" + tags.toLowerCase()+ "%");
        }
       

        if(startDate != null ){
            indice = values.length + 1;
            sql  =  sql + `AND events.start_date = $${indice}`;
            values.push("%" + startDate.toLowerCase()+ "%");
        }
         
        console.log(sql)
        console.log('values', values)
        console.log('indice', indice)
        const result = await client.query(sql, values);
        if (result.rows.length > 0){
            returnEntity = result.rows;
        }
        return  returnEntity;
    }

    getByIdAsync = async (id) => {
        const client = new Client(DBConfig);
        await client.connect();
        let returnEntity = null;
        const sql = `SELECT * FROM events WHERE id = $1`;
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
            const sql = 'INSERT INTO event_enrollments(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
            const values = [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id_creator_user];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.affectedRows;
        }catch (error){
            
            console.log(error)
        }

        return rowsAffected;

    }

    updateAsync = async(entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
          await client.connect();
          const sql = `UPDATE events SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9, id_creator_user = $10 WHERE id = $11;`;
          const values = [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment ? '1': '0', entity.max_assistance, entity.id_creator_user, entity.id]
          console.log("Executing SQL:", sql);
          console.log("With values:", values);
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows
        } catch (error) {
          console.log("Error in updateAsync:", error);
        }
    
        return returnArray;
      }
    
      deleteAsync = async(id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = "DELETE FROM events WHERE id = $1";
          const values = [id];
          console.log("Executing SQL:", sql);
          console.log("With values:", values);
    
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log("Error in deleteAsync:", error);
        }
    
        return returnArray;
      }

      registrationAsync = async(id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = "SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1;";
          const values = [id];
          console.log("Executing SQL:", sql);
          console.log("With values:", values);
    
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows[0].count > 0;
        } catch (error) {
          console.log("Error in registrationAsync:", error);
        }
        return returnArray;
    }
}

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
        let returnArray = null;
        try {
            await client.connect();
            let sql =  `SELECT 
            e.id, 
            e.name, 
            e.description, 
            e.id_event_category,
            json_build_object( 
                'id',            ec.id, 
                'name',          ec.name, 
                'display_order', ec.display_order
            ) AS ec,
            e.id_event_location,
            json_build_object(
                'id',            el.id, 
                'id_location',   el.id_location, 
                'location',      json_build_object(
                    'id',            l.id,
                    'name',          l.name,
                    'id_province',   l.id_province,
                    'province',      json_build_object(
                        'id',            pr.id,
                        'name',          pr.name,
                        'full_name',     pr.full_name,
                        'latitude',      pr.latitude, 
                        'longitude',     pr.longitude,
                        'display_order', pr.display_order
                    ),
                    'latitude',      l.latitude,
                    'longitude',     l.longitude
                ),
                'name',           el.name,
                'full_address',   el.full_address,
                'max_capacity',   el.max_capacity,
                'latitude',       el.latitude, 
                'longitude',      el.longitude,
                'id_creator_user',el.id_creator_user
            ) AS el,
            e.start_date, 
            e.duration_in_minutes, 
            e.price, 
            e.enabled_for_enrollment, 
            e.max_assistance, 
            e.id_creator_user,
            json_build_object(
                'id',            u.id,
                'first_name',    u.first_name,
                'last_name',     u.last_name,
                'username',      u.username,
                'password',      u.password
            ) AS creator_user,
            ARRAY(
                SELECT 
                    json_build_object(
                        'id',   t.id,
                        'name', t.name
                    ) 
                FROM tags t 
                INNER JOIN event_tags et ON t.id = et.id_tag
                WHERE et.id_event = e.id
            ) AS t
        FROM public.events e
        LEFT JOIN public.event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN public.event_locations el ON e.id_event_location = el.id
        LEFT JOIN public.locations l ON el.id_location = l.id
        LEFT JOIN public.provinces pr ON l.id_province = pr.id
        LEFT JOIN public.users u ON e.id_creator_user = u.id
        WHERE 1=1
        `; 
    
            if (name!=null){
                sql += `AND lower(e.name) LIKE lower('%${name}%') `; 
            }
            if (category!=null){
                sql += `AND lower(ec.name) LIKE lower('%${category}%') `; 
            }
            if (tags!=null){
                sql += `AND lower(t.name) LIKE lower('%${tags}%') `;
            }
            if (startDate!=null){
                 sql += `AND e.start_date = '${startDate}' `;
             }
    
            // Sacamos el and del final
            
            let result = await client.query(sql);
            returnArray = result.rows;
    
        } catch (error){
            console.log(error);
        } finally {
            await client.end();
        }
        //console.log(returnArray)
        return returnArray;
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
    
      deleteAsync = async(eventToEliminate) => {
        let returnValue = null;
        const client = new Client(DBConfig);
        
        try {
            await client.connect();
            let sql = 'DELETE from events WHERE id=$1'; // Array con los valores. 
            const values = [eventToEliminate];

            const output = await client.query(sql, values); 
            return output.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return returnValue;
    
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
        }   return returnArray;
 }
}



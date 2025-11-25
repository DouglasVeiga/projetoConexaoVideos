import { randomUUID } from "crypto";
import { sql } from "./sql.js";

export class databasePostgres{
    async list(search){
        let result;
        if(search){
            result = await sql`select * FROM videos WHERE title
            ILIKE ${'%' + search + '%'}`;
        }else{
            result = await sql`SELECT * FROM VIDEOS`;
        }

        //GARANTE QUE SEMPRE RETORNA UM ARRAY
        return Array.isArray(result) ? result : result.rows || []
    }

        async create(video) {
            const videoId = randomUUID();
            const {title, description, duration} = video;

            await sql`
                INSERT INTO videos(id, title, description, duration)
                VALUES (${videoId}, ${title}, ${description}, ${duration})
            `;
        }

        async update (id, video){
            const {title, description, duration } = video;
            await sql`
                UPDATE VIDEOS
                SET title = ${title}, description = ${description}, duration = ${duration}
                WHERE id = ${id}
        
            `
        }

        async delete(id){
            await sql`DELETE FROM videos WHERE id = ${id}`;
        }
}
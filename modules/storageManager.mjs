import pg from "pg";
import SuperLogger from "./SuperLogger.mjs";

//const dbConnectorString = "postgressql://abcdef@localhost/abcdef:1234";

// - does contain a password (?), do not do this


// We are using an enviorment variable to get the db credentials 
if (process.env.DB_CONNECTIONSTRING == undefined) {
    throw ("you forgot the db connection string");
}

// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {
    
    #credentials = {};

    constructor(connectionstring) {
        this.#credentials = {
            connectionstring,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false
        };
    }


    async createUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`INSERT INTO "public"."users"("name", "email", "password") 
            VALUES($1::Text, $2::Text, $3::Text) RETURNING id;`, [user.name, user.email, user.pswHash]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.
            if (output.rows.length == 1) {
                //We started the user in the DB
                user.id = output.rows[0].id;
            }
        } catch (error) {
            console.error(error);
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }
        return user;
    }

    async updateUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`Update "public"."users" set "name" = $1, "email" = $2, "password" = $3 where id = $4;`, [user.name, user.email, user.pswHash]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            //TODO Did we update the user?

        } catch (error) {
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;
    }

    async deleteUser(user) {
        const client = new Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`Delete from "public"."users"  where id = $1;`, user.id);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            //TODO: Did the user get deleted?

        } catch (error) {
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;
    }

}

export default new DBManager(process.env.DB_CONNECTIONSTRING);
import pg from "pg"
import SuperLogger from "./SuperLogger.mjs";



/// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {

    #credentials = {};

    constructor(connectionString) {
        this.#credentials = {
            connectionString,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false
        };

    }

    async getUser(user){
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('SELECT * FROM "public"."Users" WHERE "username" = $1 AND "pswHash" = $2', [username, password]);

            if (output.rows.length == 1) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Error logging in. ' + error.message);
        } finally {
            client.end();
        }
    }

    async updateUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('Update "public"."Users" set "username" = $1, "pswHash" = $2, "email" = $3 where id = $4;', [user.name, user.email, user.pswHash, user.id]);

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
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('Delete from "public"."Users"  where id = $1;', [user.id]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.
            if (output.rowCount === 1) {
                console.log(`User ${user.id} deleted.`);
            } else {
                console.log(`User ${user.id} doesn't exist.`);
            }

            //TODO: Did the user get deleted?

        } catch (error) {
            //TODO : Error handling?? Remember that this is a module seperate from your server
            console.error(error);
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;
    }

    async createUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            console.log("Connected to the database");

            /* const query = 'INSERT INTO "public"."users"("username", "pswHash", "email") VALUES($1::Text, $2::Text, $3::Text) RETURNING id;';
            console.log('Executing query:', query); */

            const output = await client.query('INSERT INTO "public"."users"("username", "pswHash", "email") VALUES($1::Text, $2::Text, $3::Text) RETURNING id;', [user.name, user.pswHash, user.email]);
            console.log('Query executed successfully');

            console.log('Output:', output);

            if (output.rows.length == 1) {
                // We stored the user in the DB.
                user.id = output.rows[0].id;
                console.log(user.id);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user. ' + error.message);
        } finally {
            try {
                await client.end(); // Always disconnect from the database.
                console.log('Disconnected from the database');
            } catch (e) {
                console.error('Error closing database connection:', e);
            }
        }

        return user;

    }

}

// The following is thre examples of how to get the db connection string from the enviorment variables.
// They accomplish the same thing but in different ways.
// It is a judgment call which one is the best. But go for the one you understand the best.


let connectionString = process.env.ENVIORMENT == "local" ? process.env.DB_CONNECTIONSTRING_LOCAL : process.env.DB_CONNECTIONSTRING_PROD;

// We are using an enviorment variable to get the db credentials 
if (connectionString == undefined) {
    throw ("You forgot the db connection string");
} 

export default new DBManager(connectionString);

//
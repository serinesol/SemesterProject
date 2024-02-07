import pg from "pg";

//const dbConnectorString = "postgressql://abcdef@localhost/abcdef:1234";

// - does contain a password (?), do not do this



if (process.env.DB_CONNECTIONSTRING == undefined) {
    throw ("you forgot the db connection string");
}

const dbConnectionString = process.env.DB_CONNECTIONSTRING;


class DBManager {
    
    #credentials = "";

    constructor(connectionstring) {
        this.#credentials = {
            connectionstring,
            ssl: {
                rejectUnauthorized: process.env.LIVE || false,
            }
        }
    }


    async createUser(user) {
        const client = new Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`INSERT INTO "public"."users"("name", "email", "password") 
            VALUES($1::Text, $2::Text, $3::Text) RETURNING id;`, user.name, user.email, user.pswHash);

            if (output.rows.length == 1) {
                //We started the user in the DB
                user.id = output.rows[0].id;
            }
        } catch (error) {
            //TODO: error handeling 
        }
        return user;
    }

    async updateUser(user) {
        const client = new Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`Update "public"."users" set "name" = $1, "email" = $2, "password" = $3 where id = $4;`, user.name, user.email, user.pswHash);

            if (output.rows.length == 1) {
                //We started the user in the DB
                user.id = output.rows[0].id;
            }
        } catch (error) {
            //TODO: error handeling 
        }
        return user;
    }

    async deleteUser(user) {
        const client = new Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query(`Delete from "public"."users"  where id = $1;`, user.id);

            if (output.rows.length == 1) {
                //We started the user in the DB
                user.id = output.rows[0].id;
            }
        } catch (error) {
            //TODO: error handeling 
            user = null; // "Det minste av det minste" = bad
        }
        return user;
    }

}

export default new DBManager(process.env.DB_CONNECTIONSTRING)
import pg from "pg";

//const dbConnectorString = "postgressql://abcdef@localhost/abcdef:1234";

// - does contain a password (?), do not do this



if (dbConnectorString = process.env.DB_CONNECTIONSTRING == undefined) {
    throw ("you forgot the db connection string");
}

const dbConnectionString = process.env.DB_CONNECTIONGSTRING;


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
            client.query(`INSERT INTO "public"."users"("name", "email", "password") 
            VALUES($1::Text, $2::Text, $3::Text) RETURNING id;`, user.name, user.email, user.pswHash);

            if (output) 
        } catch (error) {

        }
    }

}

export default new DBManager(process.env.DB_)
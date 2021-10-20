import pgPromise from "pg-promise";
import config from "../config";

export class PgSingleton {
    static instance;
    db;

    static async getInstance() {
        if (!PgSingleton.instance) {
            PgSingleton.instance = new PgSingleton();
            const pgb = pgPromise({
                promiseLib: Promise
            });
            this.db = pgb({
                connectionString: config.PG_URI,
                ssl: {rejectUnauthorized: false}
            });
        }
        return PgSingleton.instance;
    }

    static async findOne(query){
        await this.getInstance();
        try {
            const result = await this.db.oneOrNone(query);
            return result;
        } catch (error) {
            console.log(`Error al realizar la consulta!\n${error}`);
        }
    }

    static async find(query){
        await this.getInstance();
        try {
            const result = await this.db.manyOrNone(query);
            return result;
        } catch (error) {
            console.log(`Error al realizar la consulta!\n${error}`);
        }
    }
}
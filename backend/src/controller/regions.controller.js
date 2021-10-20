//Imports
import { PgSingleton } from "../Singleton/pgSingleton";
import EStatus from "../model/enums/EStatus";

export const getAll = async () => {
    try {
        const result = await PgSingleton.find(`SELECT r.* FROM regions r WHERE r.status = ${EStatus.ACTIVE}`);
        console.log(`Controller: ${result}`);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
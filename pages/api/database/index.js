import knex from "knex";
import {config} from 'dotenv'

config()
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE}=process.env
const connection={host:DB_HOST,user:DB_USER,password:DB_PASSWORD,database:DB_DATABASE}

class DB{
    knex
    constructor(){
        this.knex=knex({client: 'mysql2', connection})
    }
    select(table, data, where){
        return this.knex.select(data).from(table).where(where).catch(error=>'niestety nie udało się pobrać owych rekordów z bazy danych');
    }
    insert(table, data){
        return this.knex(table).insert(data).catch(error=>'niestety nie udało się wprowadzić nowych rekordów do bazy danych');
    }
    update(table, data, where){
        return this.knex(table).where(where).update(data).catch(error=>'niestety nie udało się zaktualizować owych rekordów z bazy danych');
    }
    delete(table, where){
        return this.knex(table).where(where).del().catch(error=>'niestety nie udało się usunąć owych rekordów z bazy danych');
    }
    count(table){
        return this.knex(table).count('* as count').then(res=>res[0]).catch(error=>'niestety nie udało się policzyć rekordów');
    }
    selected_page(table, page, limit){
        return this.knex(table).select('*').limit(limit).offset(page * limit).catch(error=>'niestety nie udało się pobrać rekordów z bazy danych');
    }
    SHA2(toHash){
        return this.knex.raw('SHA2(?, 256)', [toHash])
    }
}

const DB_instance=new DB()
export default DB_instance
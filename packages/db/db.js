import { Database } from "bun:sqlite";

export default () => new Database(process.env.DATABASE_PATH, { 
    create: true,
    strict: true 
})
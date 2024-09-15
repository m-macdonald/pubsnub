import { Lucia } from "lucia";
import { BunSQLiteAdapter } from "@lucia-auth/adapter-sqlite";
import { dev } from "$app/environment";
import db from "db";


const adapter = new BunSQLiteAdapter(db(), {
    user: 'user',
    session: 'session'
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    }
});
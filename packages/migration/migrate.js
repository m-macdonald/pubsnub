import { migrate } from "bun-migrate";
import dbConnection from "db";
import { generateIdFromEntropySize } from "lucia";

const db = dbConnection();
await migrate(db, {
    migrations: './migrations'
});
await registerUser(db);
db.close();

/**
 * @param {import('bun:sqlite').Database} db
 */
async function registerUser(db) {
    /**@type {number} */
    const existingUser = db.prepare(`
        SELECT COUNT(*) FROM user
        `).get();

    if (existingUser >= 1) {
        console.log('User already exists, skipping insert.');
        return;
    }

    const userId = generateIdFromEntropySize(10);
    const passwordHash = await Bun.password.hash(process.env.PASSWORD);

    await db.run(`
        INSERT INTO user(id, username, password_hash)
        VALUES (?, ?, ?)`, [userId, process.env.USERNAME, passwordHash]);
}
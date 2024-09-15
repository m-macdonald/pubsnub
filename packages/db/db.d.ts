import { Database } from 'bun:sqlite';

declare module 'db' {
    export default function(): Database
}

declare module "bun" {
	interface Env {
		USERNAME: string;
		PASSWORD: string;
		DATABASE_PATH: string;
	}
}
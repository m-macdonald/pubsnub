import { Database } from 'bun:sqlite';

declare module 'db' {
    export = function(): Database {}
}
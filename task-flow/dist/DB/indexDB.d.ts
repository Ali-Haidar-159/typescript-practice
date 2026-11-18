import type { Task } from "../models/task.js";
declare function openDB(dbName: string, ObjectStoreName: string): Promise<IDBDatabase>;
declare function dataStore(db: IDBDatabase, task: Task): Promise<void>;
declare function deleteData(db: IDBDatabase, id: string): Promise<void>;
declare function readData(db: IDBDatabase): Promise<Task[]>;
export { dataStore, deleteData, readData, openDB };
//# sourceMappingURL=indexDB.d.ts.map
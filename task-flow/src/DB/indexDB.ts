import type { Task } from "../models/task.js";

function openDB(dbName: string, ObjectStoreName: string): Promise<IDBDatabase> {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function () {
      reject(request.error ?? new Error("Failed to open the tasks database"));
    };

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onupgradeneeded = function () {
      const db = request.result;

      if (!db.objectStoreNames.contains(ObjectStoreName)) {
        const objStore: IDBObjectStore = db.createObjectStore(ObjectStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });
        objStore.createIndex("titleIndex", "title", { unique: true });

        console.log("Object Store Created Successfully");
      }
    };
  });
}

function dataStore(db: IDBDatabase, task: Task): Promise<void> {
  return new Promise(function (resolve, reject) {
    const transaction = db.transaction(["tasks"], "readwrite");
    transaction.objectStore("tasks").put(task);

    transaction.oncomplete = function () {
      resolve();
    };

    transaction.onerror = function () {
      reject(transaction.error ?? new Error("Failed to save task"));
    };

    transaction.onabort = function () {
      reject(transaction.error ?? new Error("Task save was aborted"));
    };
  });
}

function deleteData(db: IDBDatabase, id: string): Promise<void> {
  return new Promise(function (resolve, reject) {
    const transaction = db.transaction(["tasks"], "readwrite");
    transaction.objectStore("tasks").delete(id);

    transaction.oncomplete = function () {
      resolve();
    };

    transaction.onerror = function () {
      reject(transaction.error ?? new Error("Failed to delete task"));
    };

    transaction.onabort = function () {
      reject(transaction.error ?? new Error("Task deletion was aborted"));
    };
  });
}

function readData(db: IDBDatabase): Promise<Task[]> {
  return new Promise(function (resolve, reject) {
    const transaction = db.transaction(["tasks"], "readonly");

    const objectStore = transaction.objectStore("tasks");

    const request = objectStore.getAll();

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error ?? new Error("Failed to read tasks"));
    };
  });
}

export { dataStore, deleteData, readData, openDB };

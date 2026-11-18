function openDB(dbName, ObjectStoreName) {
    return new Promise(function (resolve, reject) {
        const request = indexedDB.open(dbName, 1);
        request.onerror = function () {
            var _a;
            reject((_a = request.error) !== null && _a !== void 0 ? _a : new Error("Failed to open the tasks database"));
        };
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onupgradeneeded = function () {
            const db = request.result;
            if (!db.objectStoreNames.contains(ObjectStoreName)) {
                const objStore = db.createObjectStore(ObjectStoreName, {
                    keyPath: "id",
                    autoIncrement: true,
                });
                objStore.createIndex("titleIndex", "title", { unique: true });
                console.log("Object Store Created Successfully");
            }
        };
    });
}
function dataStore(db, task) {
    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(["tasks"], "readwrite");
        transaction.objectStore("tasks").put(task);
        transaction.oncomplete = function () {
            resolve();
        };
        transaction.onerror = function () {
            var _a;
            reject((_a = transaction.error) !== null && _a !== void 0 ? _a : new Error("Failed to save task"));
        };
        transaction.onabort = function () {
            var _a;
            reject((_a = transaction.error) !== null && _a !== void 0 ? _a : new Error("Task save was aborted"));
        };
    });
}
function deleteData(db, id) {
    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(["tasks"], "readwrite");
        transaction.objectStore("tasks").delete(id);
        transaction.oncomplete = function () {
            resolve();
        };
        transaction.onerror = function () {
            var _a;
            reject((_a = transaction.error) !== null && _a !== void 0 ? _a : new Error("Failed to delete task"));
        };
        transaction.onabort = function () {
            var _a;
            reject((_a = transaction.error) !== null && _a !== void 0 ? _a : new Error("Task deletion was aborted"));
        };
    });
}
function readData(db) {
    return new Promise(function (resolve, reject) {
        const transaction = db.transaction(["tasks"], "readonly");
        const objectStore = transaction.objectStore("tasks");
        const request = objectStore.getAll();
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            var _a;
            reject((_a = request.error) !== null && _a !== void 0 ? _a : new Error("Failed to read tasks"));
        };
    });
}
export { dataStore, deleteData, readData, openDB };
//# sourceMappingURL=indexDB.js.map
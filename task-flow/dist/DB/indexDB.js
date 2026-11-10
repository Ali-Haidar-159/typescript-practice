let DB = null;
function openDB(dbName) {
    return new Promise(function (resolve, reject) {
        const request = indexedDB.open(dbName, 1);
        request.onerror = function () {
            reject(request.error);
        };
        request.onsuccess = function () {
            DB = request.result;
            resolve(request.result);
        };
        request.onupgradeneeded = function (e) { };
    });
}
export {};
//# sourceMappingURL=indexDB.js.map
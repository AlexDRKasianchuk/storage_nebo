const DB_NAME = 'storeD1';
const DB_VERSION = 1;

export const dropDb = () => {
    indexedDB.deleteDatabase(DB_NAME);
  }

export const createTable = () => {
    
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function (evt) {
      console.log("openDb DONE");
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        var objectStore = db.createObjectStore("Store", { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("author", "author", { unique: false });
        objectStore.createIndex("price", "price", { unique: false });
    };

    request.onsuccess = function(event) {
        console.log("Table was created", );
    };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };
  }
export const dropTable = () => {
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        var objectStore = db.deleteObjectStore("Store");
    };

    request.onsuccess = function(event) {
        console.log("Table was dropped", );
    };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };
  }

  export const addRecord = (title, author, price) => {
    var request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = function(event) {
        var db = event.target.result;

        addDataToTable(db);
    };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };

    function addDataToTable(db) {
        var transaction = db.transaction(["Store"], "readwrite");

        var objectStore = transaction.objectStore("Store");

      
            var request = objectStore.add({
              title: title,
              author: author,
              price: price,
            });

            request.onsuccess = function(event) {
                console.log("Дані успішно додано до таблиці!");
            };

            request.onerror = function(event) {
                console.error("Помилка додавання даних:", event.target.error);
            };
    }
  }

  export const getAllRecords = () => {
    var request = indexedDB.open(DB_NAME, DB_VERSION);
    const records = [];
    request.onsuccess = function(event) {
        var db = event.target.result;

        var transaction = db.transaction(["Store"], "readonly");
        var objectStore = transaction.objectStore("Store");
        var cursorRequest = objectStore.openCursor();

        cursorRequest.onsuccess = function(event) {
            var cursor = event.target.result;

            if (cursor) {
                records.push(cursor.value);
                cursor.continue();
            } 
        };
    };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };
    return records;
  }
  export const updateRecord = (id, title, author, price) => {
    var request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = function(event) {
        var db = event.target.result;

        updateRecord(db);
    };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };

    function updateRecord(db) {
        var transaction = db.transaction(["Store"], "readwrite");

        var objectStore = transaction.objectStore("Store");

      
            var request = objectStore.put({
              id:id,
              title: title,
              author: author,
              price: price,
            });

            request.onsuccess = function(event) {
                console.log("Дані успішно оновлено");
            };

            request.onerror = function(event) {
                console.error("Помилка оновлення даних:", event.target.error);
            };
    }
  }
  export const removeItem = (id) => {
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function(event) {
        var db = event.target.result;

        var transaction = db.transaction(["Store"], "readwrite");

        // Get the object store
        var objectStore = transaction.objectStore("Store");
        
        // Use the delete method to remove the item
        var deleteRequest = objectStore.delete(id);
        
        // Handle the success event when the item is successfully deleted
        deleteRequest.onsuccess = function(event) {
            console.log("Item with key " + id + " deleted successfully");
        };
        
        // Handle the error event for the delete operation
        deleteRequest.onerror = function(event) {
            console.error("Error deleting item:", event.target.error);
        };
        
        // Handle the completion event for the transaction
        transaction.oncomplete = function(event) {
            console.log("Transaction completed");
        };
        };

    request.onerror = function(event) {
        console.error("Помилка відкриття бази даних:", event.target.error);
    };
  };

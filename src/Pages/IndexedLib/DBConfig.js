export const DBConfig = {
    name: "LibDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "books",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "title", keypath: "title", options: { unique: false } },
          { name: "author", keypath: "author", options: { unique: false } },
          { name: "year", keypath: "year", options: { unique: false } },
        ],
      },
    ],
  };
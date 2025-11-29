const DB_KEY = 'chat-storage';

// Storage Db set and get functions
export const getDb = () => {
  var db = localStorage.getItem(DB_KEY);
  if (!db) setDb({});

  return db ? JSON.parse(db) : {};
};

const setDb = (db = {}) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db || {}));
};

// Storage Db helper functions
const storeData = (key) => (value) => setDb({ ...getDb(), [key]: value });

export const getStoredItem = (key) => getDb()[key];

export const removeStoredItem = (key) => {
  const newDb = {};
  const db = getDb();

  Object.keys(db).forEach((k) => {
    if (k !== key) newDb[k] = db[k];
  });

  setDb(newDb);
};

// Storage Creater function
export const newStorage = (key, defaultValue = '') => ({
  set: storeData(key),
  get: () => getStoredItem(key) || defaultValue,
  remove: () => removeStoredItem(key),
});

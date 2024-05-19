let con_string_dev = "mongodb://localhost:27018/nodejsdb";
let con_string_pro = "mongodb://mongo_db_service:27017/nodejsdb";
export let mongoConnectionString =
  process.env.NODE_ENV === "production" ? con_string_pro : con_string_dev;

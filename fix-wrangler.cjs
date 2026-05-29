"use strict";
const fs = require("fs");
const filePath = "dist/server/wrangler.json";
console.log("fix-wrangler: starting");
const raw = fs.readFileSync(filePath, "utf8");
const config = JSON.parse(raw);
if (config.assets && config.assets.binding === "ASSETS") {
  config.assets.binding = "STATIC_ASSETS";
}
delete config.pages_build_output_dir;
config.kv_namespaces = [{ binding: "SESSION", id: "c091027116584d5d854db2db15ef8fef" }];
if (!config.d1_databases || config.d1_databases.length === 0) {
  config.d1_databases = [{ binding: "DB", database_name: "kris-rodriguez-db", database_id: "e22002d0-5896-4295-95e2-94e4b375f52f" }];
} else {
  config.d1_databases = config.d1_databases.map(function(db) { db.database_id = "e22002d0-5896-4295-95e2-94e4b375f52f"; return db; });
}
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
console.log("fix-wrangler: done");

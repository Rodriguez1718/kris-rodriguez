const fs = require('fs');
const path = 'dist/server/wrangler.json';

if (!fs.existsSync(path)) process.exit(0);

const config = JSON.parse(fs.readFileSync(path, 'utf8'));

// Remove reserved ASSETS binding
if (config.assets) {
  delete config.assets;
}

// Fix KV namespaces - remove ones without id or add placeholder
if (config.kv_namespaces) {
  config.kv_namespaces = config.kv_namespaces.filter(kv => kv.id);
  if (config.kv_namespaces.length === 0) delete config.kv_namespaces;
}

// Fix triggers
if (config.triggers && Object.keys(config.triggers).length === 0) {
  delete config.triggers;
}

// Remove unknown fields that Pages rejects
const knownFields = ['name', 'main', 'compatibility_date', 'compatibility_flags', 'd1_databases', 'r2_buckets', 'vars', 'routes', 'placement'];
const unknownFields = ['definedEnvironments', 'ai_search_namespaces', 'ai_search', 'images', 'secrets_store_secrets', 'artifacts', 'unsafe_hello_world', 'flagship', 'worker_loaders', 'ratelimits', 'vpc_services', 'vpc_networks', 'python_modules', 'previews'];
unknownFields.forEach(f => delete config[f]);

// Remove dev-only fields
if (config.dev) delete config.dev;

// Add D1 binding if not present
if (!config.d1_databases || config.d1_databases.length === 0) {
  config.d1_databases = [{
    binding: "DB",
    database_name: "kris-rodriguez-db",
    database_id: "e22002d0-5896-4295-96e2-94e4u375f52f"
  }];
}

// Ensure D1 has database_id
config.d1_databases = config.d1_databases.map(db => {
  if (!db.database_id) db.database_id = "e22002d0-5896-4295-96e2-94e4u375f52f";
  return db;
});

fs.writeFileSync(path, JSON.stringify(config, null, 2));
console.log('Fixed dist/server/wrangler.json');

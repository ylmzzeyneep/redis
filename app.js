const redis = require('redis');

async function main() {
  const client = redis.createClient();

  client.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

  await client.connect();

  // SET
  const setResult = await client.set("user_name", "zeynep");
  console.log("SET result:", setResult);

  // GET
  const getUser = await client.get("user_name");
  console.log("GET result:", getUser);

  // DEL
  const delResult = await client.del("last_name");
  console.log("DEL result:", delResult);

  // EXISTS
  const exists = await client.exists("user_name");
  console.log("EXISTS result:", exists);

  // APPEND
  const appendResult = await client.append("last_name", "yilmaz");
  console.log("APPEND result:", appendResult);
  const lastName = await client.get("last_name");
  console.log("last_name:", lastName);

  // SUBSCRIBE için ayrı bir client gerekiyor!
  const subscriber = redis.createClient();
  await subscriber.connect();
  await subscriber.subscribe("ZGY", (message) => {
    console.log(`ZGY kanalından mesaj geldi: ${message}`);
  });

  // Yayın dinlemek için client'ı kapatma
  // await client.quit();
}

main();

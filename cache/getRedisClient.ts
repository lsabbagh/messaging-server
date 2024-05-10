import { createClient } from "redis";


export default async (url) => {

  const client = createClient({
    url
  });
  
  client.on("error", (err) => console.log("Redis Client Error", err));
  
  await client.connect();

  return client;
};

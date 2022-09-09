import { client } from "./db"

// Closing connection to database after all tests are completed
// global.afterAll(async () => {
//     await client.close();
// });
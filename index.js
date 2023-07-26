import dotenv from 'dotenv';
import * as database from './src/database/database.js';
import express from 'express'
import * as route from './src/route/route.js'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();
database.SetDB();

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.set("views", path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
app.use(route.Init())

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}!`)
})
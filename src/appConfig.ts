import express from "express";
import * as dotenv from "dotenv";
import routesSetter from "./routes/routesAccess";
import expressEjsLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT as string, 10);

app.use(express.static('./assets'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/midea', express.static(__dirname + 'public/midea'));

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', './layout/layout');

if (!process.env.PORT){
    console.log(`No port value specified...`);
}

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(routesSetter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
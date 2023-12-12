import express from "express";
import * as dotenv from "dotenv";
import routesSetter from "./routes/routesAccess";
import expressEjsLayouts from "express-ejs-layouts";
import cookie_parser from "cookie-parser";
import express_session from "express-session";
import http from "http";

const app = express();
const server = http.createServer(app);
require('./routes/socketRouter')(server);

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10);

app.use(express.static('./assets'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/midea', express.static(__dirname + 'public/midea'));

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', './layout/layout');

app.use(cookie_parser('NotSoSecret'));
app.use(express_session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

if (!process.env.PORT){
    console.log(`No port value specified...`);
}

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(routesSetter);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
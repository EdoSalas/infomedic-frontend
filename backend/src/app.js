//Imports
import config from './config';
import express from 'express';
import test from './routes/test.routes';
import morgan from 'morgan';

//Settings
const app = express();
app.set('port', config.BACKEND_PORT);

//Middlewares
app.use(morgan('dev'));

//Routers
const port = app.get('port');
app.listen(port);
app.use('/api/test', test);
console.log("View http://localhost:4001/api/test");

//Init
console.log("Server listen on port ", port);
app.get('/', (req, res) => {
    res.json({
        message: "Welcome!",
        description: `Listening in port: ${port}`
    });
});
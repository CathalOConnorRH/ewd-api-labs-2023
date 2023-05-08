import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
const logger = require("./src/utils/Winston");
const morganMiddleware = require("./src/utils/Morgan");

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

dotenv.config();
db.init(); //add BELOW dotenv.config();
const dependencies = buildDependencies();

const app = express();
app.use(morganMiddleware);
app.use(express.json());
const port = process.env.PORT;

app.use(errorHandler.successHandler);
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler.errorHandler);

app.listen(port, () => {
  logger.info(`Server running at ${port}`);
});

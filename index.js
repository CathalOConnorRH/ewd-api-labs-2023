import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';

dotenv.config();
db.init(); //add BELOW dotenv.config();
const dependencies = buildDependencies();

const app = express();
app.use(express.json())
const port = process.env.PORT;

app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';
import genresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import db from './src/config/db';

dotenv.config();
db.init(); //add BELOW dotenv.config();
const dependencies = buildDependencies();

const app = express();
app.use(express.json())
const port = process.env.PORT;

app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', genresRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

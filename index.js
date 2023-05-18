import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from "./src/config/dependencies";
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';
import createTvShowsRouter from './src/tvShows/routes';
import createReviewsRouter from './src/reviews/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
import successHandler from './src/utils/SuccessHandler';
import createPeopleRouter from './src/people/routes';
import { collectDefaultMetrics, register } from 'prom-client';
import analytics from './src/utils/Analytics';

const logger = require("./src/utils/Winston");
const morganMiddleware = require("./src/utils/Morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

logger.info("Starting to collect runtime metrics");
collectDefaultMetrics();

dotenv.config();
db.init();
const dependencies = buildDependencies();
const app = express();

app.use(morganMiddleware);
app.use(express.json());

const port = process.env.PORT;

app.use(successHandler);
app.use(errorHandler);
app.use(express.static('tests'));
app.get('/metrics', async (_req, res) => {
  analytics.track({
    event: 'metrics gathering',
    userId: 'grafana'
  });
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use('/api/movies', createMoviesRouter(dependencies, analytics));
app.use('/api/genres', createGenresRouter(dependencies, analytics));
app.use('/api/accounts', createAccountsRouter(dependencies, analytics));
app.use('/api/reviews', createReviewsRouter(dependencies, analytics));
app.use('/api/tvshows', createTvShowsRouter(dependencies, analytics));
app.use('/api/person', createPeopleRouter(dependencies, analytics));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  logger.info(`Server running at ${port}`);
});

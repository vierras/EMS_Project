import express from 'express';
import bodyParser from 'body-parser';
import config from './configs/config';
import connectDb from './database/dbConnection';
import cors from 'cors';
import routes from './routes';

const app = express();
connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.enable('trust proxy');
app.use(cors());
app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
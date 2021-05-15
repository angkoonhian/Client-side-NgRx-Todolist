import * as express from 'express';
import * as mongoose from 'mongoose';
import config from './environments/environment';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as xss from 'xss-clean';
import * as rateLimit from 'express-rate-limit';
import * as hpp from 'hpp';
import * as cors from 'cors';
//const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
import { apiRouter } from './app/routes/api.route';
import { errorHandler } from './app/middleware';

dotenv.config({ path: 'config/config.env' });

// Init express
const app = express();

// Connect Database
const db = config.mongoURI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure message
    process.exit(1);
  }
};

connectDB();

// Use cors
app.use(cors());

// Express json parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Swagger documentation
//app.use(express.static(pathToSwaggerUi));

// Mount routers
app.use('/api', apiRouter);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

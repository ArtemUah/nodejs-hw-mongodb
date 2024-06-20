import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import "dotenv/config";

const {PORT = 3000} = process.env;

const setupServer = () => {
const app = express();
app.use(cors());

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );


app.use('*', (err, req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

app.listen(PORT, ()=> console.log(`Server is running in PORT ${PORT}`))

};

export default setupServer;

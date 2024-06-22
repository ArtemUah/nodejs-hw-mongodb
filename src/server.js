import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const port = env('PORT', '3000');

const setupServer = () => {

const app = express();

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use(cors());



  app.get('/contacts', async(req,res)=>{
    const data = await getAllContacts();
    res.json({
      status:200,
      message:"Successfully found contacts!",
      data
    });
  });

  app.get('/contacts/:id', async(req, res)=>{
   try {
    const {id} = req.params;
    const data = await getContactById(id);
    if(!data) {
     return res.status(404).json({
        message: `Error 404.Contact with ID ${id} is not found.`
      });
    }
    res.json({
      status: 200,
      message:"Successfully found contact with id {contactId}!",
      data
    });
   } catch (error) {
    res.status(400).json({
      message: `Contact is not found`,
    });
   }
  });

app.use('*', (err, req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

app.listen(port, ()=> console.log(`Server is running in PORT ${port}`));

};

export default setupServer;

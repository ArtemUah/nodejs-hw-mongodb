import express from 'express';

const setupServer = () => {
const app = express();

app.get('/', (req,res)=>{
    res.json({
        message: "HEllo"
    });
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server is running in PORT ${PORT}`))

};

export default setupServer;

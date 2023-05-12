import express  from "express";
import AIPcontroller from '../controller/AIPcontroller';
let router = express.Router();

const initAIPRouter = (app) => {
    router.get('/users', AIPcontroller.getAllUsers); // method GET - READ data
    router.post('/create-user', AIPcontroller.createNewUser); // method POST -> CREATe data
    router.put('/update-user', AIPcontroller.updateUser); // method PUT -> UPDATE data
    router.delete('/delete-user/:id', AIPcontroller.deleteUser); // method DELETE -> DELETE data 
    return app.use('/api/v1/', router);
}


export default initAIPRouter;

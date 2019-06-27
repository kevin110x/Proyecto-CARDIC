import { Router } from 'express';
import datosController from '../Controllers/datosController';

class DataRoutes {

    public router : Router = Router();

    constructor(){
      this.config();
    }

    config(): void{
      this.router.get('/',datosController.list);
      this.router.get('/:fech',datosController.getOne);
      this.router.post('/', datosController.create);
      this.router.post('/message', datosController.sendAlert)
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;
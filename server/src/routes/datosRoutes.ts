import { Router } from 'express';
import datosController from '../Controllers/datosController';

class DataRoutes {

    public router : Router = Router();

    constructor(){
      this.config();
    }

    config(): void{
      this.router.get('/',datosController.list);
      this.router.get('/:Id_U',datosController.getOne);
      this.router.post('/', datosController.create);
    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;
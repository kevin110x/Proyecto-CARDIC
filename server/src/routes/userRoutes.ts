import { Router } from 'express';
import userController from '../Controllers/userController';

class UserRoutes {

    public router : Router = Router();

    constructor(){
      this.config();
    }

    config(): void{
      this.router.get('/',userController.list);
      this.router.post('/user',userController.getOne);
      this.router.post('/', userController.create);
      this.router.put('/:Id_U', userController.update);
      this.router.delete('/:Id_U', userController.delete);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;

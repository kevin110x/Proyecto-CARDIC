import {Request,Response} from 'express';
import pool from '../database';

class UserController{
  public async list (req: Request, res: Response){
    const usuarios = await pool.query('Select * from tbl_usuarios');
    res.json(usuarios);
  }

  public async getOne (req: Request, res: Response){
    const  body =  req.body;
    const usuarios = await pool.query(`Select * from tbl_usuarios where Id_U = ${body.id} and Clave_U = ${body.clave}`);
    let user = usuarios[0];
    console.log('usuario', usuarios);
    if(usuarios.length >0){
      if(user)
      return res.json({
        ok: true,
        user:usuarios[0]
      });
    }else{
      res.json({
        ok: false,
        text: 'No existe tal usuario'
      });
    }
  }

  public async create (req: Request, res: Response){
    await pool.query('Insert into tbl_usuarios set ?', [req.body]);
    res.json({message: 'Usuario Guardado'});
    
  }

  public async delete (req: Request, res: Response){
    const { Id_U } = req.params;
    const usuarios = await pool.query('delete from tbl_usuarios where Id_U = ?',[Id_U]);
    res.json({text: 'Usuario eliminado correctamente.'});
}

  public async update (req: Request, res: Response){
    const { Id_U } = req.params;
    const usuarios = await pool.query('update tbl_usuarios set ? where Id_U = ?',[req.body,Id_U])
    if(usuarios.length >0){
      res.json({text: 'No existe tal usuario'});
    }else{
      res.json({ text: 'Actualizado correctamente' });
    }

  }

}

export const userController = new UserController();
export default userController;

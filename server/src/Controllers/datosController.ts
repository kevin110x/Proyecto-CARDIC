import {Request,Response} from 'express';
import pool from '../database';

class DataController{
  public async list (req: Request, res: Response){
    const datos = await pool.query('Select * from tbl_datos');
    res.json(datos);
  }

  public async getOne (req: Request, res: Response){
    const { Id_U } = req.params;
    const datos = await pool.query(`Select * from tbl_datos where Id_U = ?`,[Id_U]);;
    if(datos.length >0){
      return res.json(datos);
    }else{
      res.json({
        ok: false,
        text: 'No contiene datos'
      });
    }
  }

  public async create (req: Request, res: Response){
    await pool.query('Insert into tbl_datos set ?, fecha_D=now()', [req.body]);
    res.json({message: 'Dato Guardado'});
    
  }

  public async delete (req: Request, res: Response){
    const { Id_U } = req.params;
    const datos = await pool.query('delete from tbl_datos where Id_U = ?',[Id_U]);
    res.json({text: 'Dato eliminado correctamente.'});
}

}

export const dataController = new DataController();
export default dataController;

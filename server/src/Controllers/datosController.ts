import {Request,Response} from 'express';
import pool from '../database';

class DataController{
  public async list (req: Request, res: Response){
    const datos = await pool.query('Select * from tbl_datos');
    res.json(datos);
  }

  public async getOne (req: Request, res: Response){
    const body =  req.body;
    const datos = await pool.query(`Select * from tbl_datos where Id_U = ${body.id} and Fecha_D = ${body.fecha}`);
    let data = datos[0];
    console.log('Dato', datos);
    if(datos.length >0){
      if(data)
      return res.json({
        ok: true,
        user:datos[0]
      });
    }else{
      res.json({
        ok: false,
        text: 'No existe tal Dato'
      });
    }
  }

  public async create (req: Request, res: Response){
    await pool.query('Insert into tbl_datos set ?', [req.body]);
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

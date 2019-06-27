import { Request, Response } from 'express';
import pool from '../database';

class DataController {
  public async list(req: Request, res: Response) {
    const datos = await pool.query('Select * from tbl_datos');
    res.json(datos);
  }

  public async getOne(req: Request, res: Response) {
    const { fech } = req.params;
    console.log(fech);
    const datos = await pool.query(`Select * from tbl_datos where Fecha_D LIKE ?`,['%'+fech+'%']);;
    if (datos.length > 0) {
      return res.json(datos);
    } else {
      res.json({
        ok: false,
        text: 'No contiene datos'
      });
    }
  }

  public async create(req: Request, res: Response) {
    await pool.query('Insert into tbl_datos set ?, fecha_D=now()', [req.body]);
    res.json({ message: 'Dato Guardado' });

  }
  public async sendAlert(req: Request, res: Response) {

    console.log('body', req.body)
    const accountSid = 'ACd00d2aa20a9fc7df2147462d79966009';
    const authToken = '7fb9d7fd9eaeb3f15b227f8e4f884835';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: req.body.message,
        from: '+13342923810',
        to: req.body.to
      })
      .then((message: any) => {
        console.log(message.sid)
        res.json({ sid: message.sid });
      });

  }

  public async delete(req: Request, res: Response) {
    const { Id_U } = req.params;
    await pool.query('delete from tbl_datos where Id_U = ?', [req.body]);
    res.json({ text: 'Dato eliminado correctamente.' });
  }

}

export const dataController = new DataController();
export default dataController;

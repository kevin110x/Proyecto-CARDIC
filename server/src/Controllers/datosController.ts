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
    const accountSid = 'ACd65516ec994893596592b73f2a77b863';
    const authToken = 'd55e072b32b0a857a7d73b7e56451741';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: req.body.message,
        from: '+12094424289',
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

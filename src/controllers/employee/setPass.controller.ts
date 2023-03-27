import { Request, Response } from "express";
import { encrypt} from "../../functions/passwordEncrypt";

export function setPass(req: Request, res: Response){

    const pass = req.body.password;
    const store_id = parseInt(req.params.store_id)

    console.log(pass);
    console.log(store_id);

    encrypt(store_id, pass);

    return res.status(201).send(`Password set for store ${store_id}`);

}
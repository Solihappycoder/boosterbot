import { Request, Response } from 'express';
import path from 'path';

type PathRequest = Request & {
    params: {
        path: string[]
    }
}

const get = (req: PathRequest, res: Response) => {
    const filePath = path.join(__dirname, '../../../assets', path.join(...req.params.path).replace(/\.\./g, ''));
    res.sendFile(filePath)
}

export default get

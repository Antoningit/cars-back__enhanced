import { Router, Response } from 'express'
import { Request } from '../Request'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json(null)
})

export default router
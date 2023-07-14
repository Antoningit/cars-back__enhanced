import { Router, Response } from 'express'
import { Request } from '../Request'
import { Admin } from '../entity/Admin'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { login, password } = req.body
  try{
    if(!await req.connect.getRepository(Admin).findOne({
      login, password
    }))
      return res.status(400).end()
    req.session.isAuth = true
    res.json(null)
  }catch(e) {
    res.status(500).send(e.stack)
  }
})

export default router
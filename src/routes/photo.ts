import { Router, Response } from 'express'
import { Request } from '../Request'
import { resolve } from 'path'
import { unlink } from 'fs/promises'

export const path = resolve('uploads')

const router = Router()

export async function del(name: string) : Promise<void> {
  try{
    await unlink(resolve(path, name))
  }catch(e) {

  }
}

router.post('/', async (req: Request, res: Response) => {
  try{
    if(!req.files || !req.files.length)
      return res.status(400).end()
    res.json(req.files[0])
  }catch(e) {
    res.status(500).send(e.stack)
  }
})
router.delete('/:name', async (req: Request, res: Response) => {
  try{
    await del(req.params.name)
    res.json(null)
  }catch(e) {
    res.status(500).send(e.stack)
  }
})

export default router
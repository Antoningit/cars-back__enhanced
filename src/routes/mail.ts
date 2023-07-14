import { Router, Response } from 'express'
import { Request } from '../Request'
import * as mailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const formTitle = req.body ? req.body.formTitle : ''
  const phone = req.body ? req.body.phone : ''
  const title = req.body ? req.body.title : ''
  const id = req.body ? req.body.id : ''
  const model = req.body ? req.body.model : ''
  const mod = req.body ? req.body.mod : ''

  const mail: Mail.Options = {
    from: 'carmessages666@gmail.com',
    html: `Имя: ${formTitle} <br> Телефон: ${phone} <br> Id: ${id} <br> Марка: ${title} <br> Модель: ${model} <br> Мод: ${mod}`,
    subject: 'Заявка с сайта Автосалон',
    to: 'atrofimov2016@gmail.com,djonlions@gmail.com,sutiner666@gmail.com',
  }

  const smtpTransport = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'carmessages666@gmail.com',
      pass: 'fykbdiupywqzixwh'
    }
  })
  try{
    await new Promise<boolean>((ok, err) => {
      smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
          err(false)
        } else {
          ok(true)
        }
        smtpTransport.close()
      })
    })
    res.json(null)
  }catch(e) {
    res.status(500).send(e.stack)
  }
})

export default router
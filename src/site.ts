import express from "express";
import { resolve } from "path";
import { createConnection } from "./createConnection";
import { setConnect, AppUse, Request } from "./Request";
import * as car from "./routes/car";
import mail from "./routes/mail";
import { path } from "./routes/photo";

// const distPath = resolve('..', 'cars', 'dist')//путь до билда фронта админки
(async () => {
  const connect = await createConnection();
  const app = express();

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  setConnect(connect);
  app.set("port", process.env.SITE_PORT || 3001);
  app.use(AppUse);

  app.use("/mail.php", mail);
  app.use("/car", car.user);

  // app.use(express.static(distPath))
  app.use("/uploads", express.static(path));
  // app.use('/', (req: express.Request, res: express.Response) => res.sendFile(resolve(distPath, 'index.html')))

  app.listen(3333, () => {
    console.log("Application listening on port 3333!");
  });
})();

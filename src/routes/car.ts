import { Router, Response, query } from "express";
import { Request } from "../Request";
import { Car } from "../entity/Car";
import { del } from "../routes/photo";
import { Brackets, IsNull, Not } from "typeorm";

const admin = Router();
const user = Router();

user.get("/", async (req: Request, res: Response) => {
  const take = req?.query?.take ?? null;
  const skip = req?.query?.skip ?? null;
  if (take === null || skip === null) {
    res.json(await req.connect.getRepository(Car).find());
    return;
  }
  // @ts-ignore
  res.json(await req.connect.getRepository(Car).find({ take, skip }));
});

user.get("/partial", async (req: Request, res: Response) => {
  const partialCars = await req.connect
    .getRepository(Car)
    .createQueryBuilder("car")
    .select(["car.id", "car.title"])
    .getMany();
  const reducedCount = partialCars.reduce((acc, obj) => {
    acc[obj.title] = (acc[obj.title] || 0) + 1;
    return acc;
  }, {});
  res.json(reducedCount);
});

interface Queries {
  title?: number;
  model?: string;
  car_engine?: number;
  kpp?: number;
  body?: number;
  year_from?: number;
}

const filterQueries = (queries: Queries): Queries => {
  return Object.fromEntries(
    Object.entries(queries).filter(([_, v]) => v !== "" && v !== null)
  );
};

user.get("/filter", async (req: Request, res: Response) => {
  const queries: Queries = {
    title:
      Number(req?.query?.title ?? -1) !== -1
        ? Number(req.query.title) + 1
        : null,
    model:
      String(req?.query?.model) !== "undefined"
        ? String(req?.query?.model)
        : "",
    car_engine:
      Number(req?.query?.car_engine ?? -1) !== -1
        ? Number(req.query.car_engine) + 1
        : null,
    kpp:
      Number(req?.query?.kpp ?? -1) !== -1 ? Number(req.query.kpp) + 1 : null,
    body:
      Number(req?.query?.body ?? -1) !== -1 ? Number(req.query.body) + 1 : null,
    year_from:
      Number(req?.query?.year_from ?? -1) !== -1
        ? Number(req.query.year_from)
        : null,
  };
  const filteredQueries = filterQueries(queries);
  /* const title = req?.query?.title ?? null;
  const model = req?.query?.model ?? null;
  const car_engine = req?.query?.car_engine ?? null;
  const kpp = req?.query?.kpp ?? null;
  const body = req?.query?.body ?? null;
  const year_from = req?.query?.year_from ?? null; */
  const take = req?.query?.take ?? null;
  const skip = req?.query?.skip ?? null;
  if (take !== null && skip !== null) {
    res.json(
      await req.connect.getRepository(Car).find({
        // @ts-ignore
        where: [filteredQueries],
        take,
        skip,
      })
    );
    return;
  }
  res.json(
    await req.connect.getRepository(Car).find({
      where: [filteredQueries],
    })
    /* .createQueryBuilder("car") */
    /* .where("car.title = :title", { title: filteredQueries.title + 1 })
      .andWhere("car.model = :model", { model: filteredQueries?.model ?? "" }) */

    /* .andWhere("car.car_engine = :car_engine", {
        car_engine: queries.car_engine,
      })
      .andWhere("car.kpp = :kpp", { kpp: queries.kpp })
      .andWhere("car.body = :body", { body: queries.body })
      .andWhere("car.year_from = :year_from", {
        year_from: queries.year_from,
      }) */
    /* .andWhere(
        new Brackets((qb) => {
          Object.entries(filteredQueries).forEach(([key, value]) => {
            qb.where(`car.${key} = :${key}`, {
              key: value,
            });
          });
        })
      )
      .getMany() */
  );
});

user.get("/find", async (req: Request, res: Response) => {
  const id = req.query.id;
  res.json(
    await req.connect.getRepository(Car).find({
      where: { id },
    })
  );
});

admin.post("/", async (req: Request, res: Response) => {
  try {
    const car: Car = req.body;

    res.json(await req.connect.getRepository(Car).save(car));
  } catch (e) {
    res.status(500).send(e.stack);
  }
});

/* admin.delete("/:id(\\d+)", async (req: Request, res: Response) => {
  try {
    const repo = req.connect.getRepository(Car);
    const car = await repo.findOne(req.params.id);
    if (!car) return res.status(400).end();
    const arr = [car.image, ...car.images];
    for (let i = 0; i < arr.length; ++i) await del(arr[i]);
    await repo.delete(req.params.id);
    res.json(null);
  } catch (e) {
    res.status(500).send(e.stack);
  }
}); */

export { admin, user };

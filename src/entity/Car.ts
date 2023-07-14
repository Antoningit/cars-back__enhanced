import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

//#region body
export enum body {
  BORTOVOY_GRUZOVIK,
  VNEDOROZHNIK,
  IZOTERM,
  KABRIOLET,
  KOMPACT_VEN,
  KUPE,
  LIMUZIN,
  LIFTBEK,
  MIKROAVTOBUS,
  MINIVEN,
  PICKUP,
  PROMTOVARNYI_AVTOFURGON,
  REFRIZHERATOR,
  SEDAN,
  UNIVERSAL,
  FURGON,
  HATCHBACK,
  FURGON_METAL,
}
//#endregion

//#region car_engine
export enum car_engine {
  BENZIN,
  DIZEL,
  GAZ,
  GAZ_BENZIN,
  GIBRID,
}
//#endregion

//#region drive
export enum drive {
  PEREDNIY,
  ZADNIY,
  POLNIY,
}
//#endregion

//#region kpp
export enum kpp {
  AUTOMAT,
  AUTOMAT_VARIATOR,
  AUTOMAT_ROBOT,
  HAND,
}
//#endregion

//#region title
export enum title {
  ACURA,
  AUDI,
  BMW,
  BRILLIANCE,
  BUICK,
  BYD,
  CADILLAC,
  CHANGAN,
  CHERY,
  CHEVROLET,
  CHRYSLER,
  CITROEN,
  DAEWOO,
  DATSUN,
  DODGE,
  DONGFENG,
  DW_HOWER,
  FAW,
  FIAT,
  FORD,
  GEELY,
  GREAT_WALL,
  HAIMA,
  HAVAL,
  HONDA,
  HYUNDAI,
  INFINITI,
  IVECO,
  JAC,
  JAGUAR,
  JEEP,
  KIA,
  LADA,
  LAND_ROVER,
  LEXUS,
  LIFAN,
  LUXGEN,
  MAZDA,
  MERCEDES,
  MINI,
  MITSUBISHI,
  NISSAN,
  OPEL,
  PEUGEOT,
  PORSCHE,
  RAVON,
  RENAULT,
  SEAT,
  SKODA,
  SSANG_YONG,
  SUBARU,
  SUZUKI,
  TOYOTA,
  VOLKSWAGEN,
  VOLVO,
  VORTEX,
  ZOTYE,
  ГАЗЕЛЬ,
  ЗАЗ,
  УАЗ,
}
//#endregion

//#region wheel
export enum wheel {
  RIGHT,
  LEFT,
}
//#endregion

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: "bool",
  })
  auction: boolean;

  @Column("enum", {
    enum: body,
  })
  body: body;

  @Column("enum", {
    enum: car_engine,
  })
  car_engine: car_engine;

  @Column({
    type: "varchar",
    length: 50,
  })
  car_mod: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  color: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  customs: string;

  @Column("enum", {
    enum: drive,
  })
  drive: drive;

  @Column({
    type: "varchar",
    length: 50,
  })
  engine_volume: string;

  @Column({
    type: "varchar",
    length: 55,
  })
  image: string;

  @Column("enum", {
    enum: kpp,
  })
  kpp: kpp;

  @Column({
    type: "bool",
  })
  latest: boolean;

  @Column({
    unsigned: true,
  })
  mileage: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  model: string;

  @Column({
    unsigned: true,
  })
  old_price: number;

  @Column({
    type: "smallint",
    unsigned: true,
  })
  owners_by_pts: number;

  @Column({
    unsigned: true,
  })
  price: number;

  @Column({
    type: "bool",
  })
  promo: boolean;

  @Column({
    type: "varchar",
    length: 25,
  })
  pts: string; //wtf? может быть только - оригинал, дубликат, электронный

  @Column("enum", {
    enum: title,
  })
  title: title;

  @Column("enum", {
    enum: wheel,
  })
  wheel: wheel;

  @Column({
    type: "smallint",
    unsigned: true,
  })
  year_from: number;

  @Column({
    type: "text",
  })
  description: string;
}

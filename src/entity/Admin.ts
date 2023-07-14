import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number

  @Column({
    type: 'varchar',
    unique: true,
    length: 20
  })
  login: string

  @Column({
    type: 'varchar',
    length: 20
  })
  password: string
}
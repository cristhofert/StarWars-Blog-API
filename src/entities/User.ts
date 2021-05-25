  
import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
  import {Favorite} from "./Favorite"

  @Entity()
  export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    user_name: string;

    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Favorite, favorite => favorite.id)
    favorites: Favorite[];
    
  }
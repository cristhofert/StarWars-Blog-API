import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable, ManyToOne, OneToMany
  } from 'typeorm';
import { Favorite } from './Favorite';
  
  // import {Planet} from "./Planet"
  @Entity()
  export class Planet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    diameter: string;
  
    @Column()
    rotation_period: string;
  
    @Column()
    orbital_period: string;
  
    @Column()
    gravity: string;

    @Column()
    population: string;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column()
    url: string;

    @OneToMany(() => Favorite, favorite => favorite.id)
    favorites: Favorite[];

  }
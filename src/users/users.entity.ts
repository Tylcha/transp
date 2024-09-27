import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('users')
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable:false })
    tc:string;

    @Column({ nullable:false })
    password:string;

    // @Column()
    // postition:string;


}
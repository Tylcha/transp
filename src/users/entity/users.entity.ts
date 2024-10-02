import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "../enum/users.role.enum";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    tc: string;

    @Column({ nullable: false, unique: true })
    password: string;

    //create time
    @Column('datetime')
    create_time: Date;

    //users picture
    @Column({ nullable: true })
    picture: string;

    @Column('simple-array', { nullable: false })
    position: Role[];
}
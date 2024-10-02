import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "../enum/users.role.enum";
import { Exclude } from "class-transformer";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    tc: string;

    @Exclude()
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

    //dont show password
    //https://docs.nestjs.com/techniques/serialization
    constructor(partial: Partial<UsersEntity>) {
        Object.assign(this, partial);
    }
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
}

export default Patient;
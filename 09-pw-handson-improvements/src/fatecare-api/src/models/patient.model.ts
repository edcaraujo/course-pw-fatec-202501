import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Hospitalization } from "../models/hospitalization.model";

@Entity()
class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => Hospitalization, (hospitalization) => hospitalization.patient)
    hospitalizations: Hospitalization[];

    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
}

export default Patient;
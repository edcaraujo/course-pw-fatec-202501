import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Patient from "./patient.model";

@Entity()
export class Hospitalization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    admissionDate: Date;

    @Column({ nullable: true })
    dischargeDate: Date;

    @Column()
    diagnosis: string;

    @ManyToOne(() => Patient, (patient) => patient.hospitalizations)
    @JoinColumn({ name: "patientId" })
    patient: Patient;
}
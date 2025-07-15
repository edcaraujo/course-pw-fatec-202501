import Patient from "../models/patient.model";
import PatientRepository from "../repositories/patient.repository";
import { Request,Response, NextFunction } from "express";

async function getPatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const patient = await PatientRepository.getPatient(id);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

async function getPatients(req: Request, res: Response, next: NextFunction) {
    const patients = await PatientRepository.getPatients();

    res.status(200).json(patients);
}

async function addPatient(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Patient;
    const patient = await PatientRepository.addPatient(data);

    res.status(201).json(patient);
}

async function updatePatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = req.body as Patient;

    const patient = await PatientRepository.updatePatient(id, data);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

async function deletePatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (await PatientRepository.deletePatient(id))
        res.sendStatus(204);
    else
        res.sendStatus(404);    
}

export default {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient
}
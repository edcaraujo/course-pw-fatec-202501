import Patient from "../models/patient.model";
import PatientRepository from "../repositories/patient.repository";
import { Request,Response, NextFunction } from "express";

function getPatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const patient = PatientRepository.getPatient(id);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

function getPatients(req: Request, res: Response, next: NextFunction) {
    const patients = PatientRepository.getPatients();

    res.status(200).json(patients);
}

function addPatient(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Patient;
    const patient = PatientRepository.addPatient(data);

    res.status(201).json(patient);
}

function updatePatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = req.body as Patient;

    const patient = PatientRepository.updatePatient(id, data);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

function deletePatient(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (PatientRepository.deletePatient(id))
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
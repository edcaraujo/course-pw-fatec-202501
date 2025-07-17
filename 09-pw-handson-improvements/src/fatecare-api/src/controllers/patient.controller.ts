import Patient from "../models/patient.model";
import PatientRepository from "../repositories/patient.repository";
import { Request,Response, NextFunction } from "express";

async function getPatient(req: Request, res: Response, next: NextFunction) {
    /* #swagger.tags = ['Patients']
       #swagger.description = 'Get a specific patient by ID.'
       #swagger.security = [{ "bearerAuth": [] }]
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Patient ID',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Patient data.',
           schema: { $ref: "#/definitions/PatientResponse" }
       }
       #swagger.responses[404] = { description: 'Patient not found.' }
    */
    const id = Number(req.params.id);
    const patient = await PatientRepository.getPatient(id);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

async function getPatients(req: Request, res: Response, next: NextFunction) {
    /* #swagger.tags = ['Patients']
       #swagger.description = 'Get all patients.'
       #swagger.security = [{ "bearerAuth": [] }]
       #swagger.responses[200] = {
           description: 'A list of patients.',
           schema: [{ $ref: "#/definitions/PatientResponse" }]
       }
    */
    
    const patients = await PatientRepository.getPatients();

    res.status(200).json(patients);
}

async function addPatient(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Add a new patient.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Patient data to add.',
                required: true,
                schema: { $ref: "#/definitions/Patient" }
        }
        #swagger.responses[201] = {
            description: 'Patient added successfully.',
            schema: { $ref: "#/definitions/PatientResponse" }
        }
    */
    
    const data = req.body as Patient;
    const patient = await PatientRepository.addPatient(data);

    res.status(201).json(patient);
}

async function updatePatient(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Update an existing patient.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Patient ID',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Patient data to update.',
                required: true,
                schema: { $ref: "#/definitions/Patient" }
        }
        #swagger.responses[200] = {
            description: 'Patient updated successfully.',
            schema: { $ref: "#/definitions/PatientResponse" }
        }
        #swagger.responses[404] = { description: 'Patient not found.' }
    */
    
    const id = Number(req.params.id);
    const data = req.body as Patient;

    const patient = await PatientRepository.updatePatient(id, data);

    if (patient)
        res.status(200).json(patient);
    else
        res.sendStatus(404);
}

async function deletePatient(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Delete a patient.'
        #swagger.security = [{ "bearerAuth": [] }]
        #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer' }
        #swagger.responses[204] = { description: 'Patient deleted successfully.' }
        #swagger.responses[404] = { description: 'Patient not found.' }
    */
    
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
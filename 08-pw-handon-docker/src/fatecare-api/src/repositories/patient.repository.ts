import { AppDataSource } from "../data-source";
import Patient from "../models/patient.model";

const repository = AppDataSource.getRepository(Patient);

async function getPatient(id: number) : Promise<Patient | null> {
    return await repository.findOneBy({"id": id});
}

async function getPatients() : Promise<Patient[]> {
    return await repository.find();
}

async function addPatient(data: Patient) : Promise<Patient> {
    const patient = repository.create({
        name: data.name,
        code: data.code
    });
    
    return await repository.save(patient);
}

async function updatePatient(id: number, data: Patient) : Promise<Patient | null> {
    const patient = await getPatient(id);

    if (patient !== null){
        patient.name = data.name;
        patient.code = data.code;

        return await repository.save(patient);
    }
    
    return null;
}

async function deletePatient(id: number) : Promise<boolean> {
    const result = await repository.delete({"id": id});

    if (result.affected != null && result.affected != undefined) {
        return true;
    } 

    return false;
}

export default {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
}
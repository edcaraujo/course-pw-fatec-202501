import Patient from "../models/patient.model";

const patients: Patient[] = []; // Used to simulate database

function getPatient(id: number) : Patient | undefined {
    const patient = patients.find(item => item.id === id);

    return patient;
}

function getPatients() : Patient[] {
    return patients;
}

function addPatient(data: Patient) : Patient {
    const patient = new Patient(data.code, data.name);
    patients.push(patient);
    
    return patient;
}

function updatePatient(id: number, data: Patient) : Patient | undefined {
    const index = patients.findIndex(item => item.id === id);

    if (index === -1)
        return undefined;

    patients[index].code = data.code;
    patients[index].name = data.name;

    return patients[index];
}

function deletePatient(id: number) : boolean {
    const index = patients.findIndex(item => item.id === id);

    if (index === -1)
        return false;

    patients.splice(index, 1);
    
    return true;
}

export default {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
}
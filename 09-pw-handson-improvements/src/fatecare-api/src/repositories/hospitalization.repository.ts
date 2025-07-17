import { AppDataSource } from "../data-source";
import { Hospitalization } from "../models/hospitalization.model";
import Patient from "../models/patient.model";

const hospitalizationRepository = AppDataSource.getRepository(Hospitalization);
const patientRepository = AppDataSource.getRepository(Patient);

async function getHospitalization(id: number): Promise<Hospitalization | null> {
    return await hospitalizationRepository.findOne({
        where: { id },
        relations: ["patient"]
    });
}

async function getHospitalizationsByPatient(patientId: number): Promise<Hospitalization[]> {
    return await hospitalizationRepository.find({
        where: { patient: { id: patientId } },
        relations: ["patient"],
        order: { admissionDate: "DESC" }
    });
}

async function addHospitalization(data: Partial<Hospitalization>, patientId: number): Promise<Hospitalization | null> {
    const patient = await patientRepository.findOneBy({ id: patientId });
    if (!patient) {
        return null;
    }

    const newHospitalization = hospitalizationRepository.create({
        ...data,
        patient: patient
    });

    return await hospitalizationRepository.save(newHospitalization);
}

async function updateHospitalization(id: number, data: Partial<Hospitalization>): Promise<Hospitalization | null> {
    const hospitalization = await getHospitalization(id);
    if (hospitalization) {
        hospitalizationRepository.merge(hospitalization, data);
        return await hospitalizationRepository.save(hospitalization);
    }
    return null;
}

async function deleteHospitalization(id: number): Promise<boolean> {
    const result = await hospitalizationRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
}

export default {
    getHospitalization,
    getHospitalizationsByPatient,
    addHospitalization,
    updateHospitalization,
    deleteHospitalization
};
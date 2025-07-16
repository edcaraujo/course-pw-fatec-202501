import { Request, Response, NextFunction } from 'express';
import patientController from '../../controllers/patient.controller'; 
import PatientRepository from '../../repositories/patient.repository';

jest.mock('../../repositories/patient.repository');

describe('patientController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPatient', () => {
    it('should return a patient with status 200 if found', async () => {
      const mockPatient = { id: 1, name: 'João', email: 'joao@example.com' };
      mockRequest.params = { id: '1' };
      (PatientRepository.getPatient as jest.Mock).mockResolvedValue(mockPatient);

      await patientController.getPatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.getPatient).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPatient);
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
    });

    it('should return status 404 if patient is not found', async () => {
      mockRequest.params = { id: '999' };
      (PatientRepository.getPatient as jest.Mock).mockResolvedValue(null);

      await patientController.getPatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.getPatient).toHaveBeenCalledWith(999);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('getPatients', () => {
    it('should return all patients with status 200', async () => {
      const mockPatients = [
        { id: 1, name: 'João', email: 'joao@example.com' },
        { id: 2, name: 'Maria', email: 'maria@example.com' },
      ];
      (PatientRepository.getPatients as jest.Mock).mockResolvedValue(mockPatients);

      await patientController.getPatients(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.getPatients).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPatients);
    });

    it('should return an empty array with status 200 if no patients are found', async () => {
      (PatientRepository.getPatients as jest.Mock).mockResolvedValue([]);

      await patientController.getPatients(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.getPatients).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });
  });

  describe('addPatient', () => {
    it('should add a new patient and return it with status 201', async () => {
      const newPatientData = { name: 'Pedro', email: 'pedro@example.com' };
      const addedPatient = { id: 3, ...newPatientData };
      mockRequest.body = newPatientData;
      (PatientRepository.addPatient as jest.Mock).mockResolvedValue(addedPatient);

      await patientController.addPatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.addPatient).toHaveBeenCalledWith(newPatientData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(addedPatient);
    });
  });

  describe('updatePatient', () => {
    it('should update a patient and return it with status 200 if found', async () => {
      const updatedPatientData = { name: 'João Silva', email: 'joao.silva@example.com' };
      const updatedPatient = { id: 1, ...updatedPatientData };
      mockRequest.params = { id: '1' };
      mockRequest.body = updatedPatientData;
      (PatientRepository.updatePatient as jest.Mock).mockResolvedValue(updatedPatient);

      await patientController.updatePatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.updatePatient).toHaveBeenCalledWith(1, updatedPatientData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedPatient);
      expect(mockResponse.sendStatus).not.toHaveBeenCalled();
    });

    it('should return status 404 if patient to update is not found', async () => {
      const updatedPatientData = { name: 'João Silva', email: 'joao.silva@example.com' };
      mockRequest.params = { id: '999' };
      mockRequest.body = updatedPatientData;
      (PatientRepository.updatePatient as jest.Mock).mockResolvedValue(null);

      await patientController.updatePatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.updatePatient).toHaveBeenCalledWith(999, updatedPatientData);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('deletePatient', () => {
    it('should delete a patient and return status 204 if found', async () => {
      mockRequest.params = { id: '1' };
      (PatientRepository.deletePatient as jest.Mock).mockResolvedValue(true);

      await patientController.deletePatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.deletePatient).toHaveBeenCalledWith(1);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return status 404 if patient to delete is not found', async () => {
      mockRequest.params = { id: '999' };
      (PatientRepository.deletePatient as jest.Mock).mockResolvedValue(false);

      await patientController.deletePatient(mockRequest as Request, mockResponse as Response, mockNext);

      expect(PatientRepository.deletePatient).toHaveBeenCalledWith(999);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});
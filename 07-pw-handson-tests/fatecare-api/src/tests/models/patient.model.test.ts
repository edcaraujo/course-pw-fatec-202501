import Patient from '../../models/patient.model'; 

describe('Patient Model', () => {
  it('should create an instance of Patient with provided code and name', () => {
    const code = 'P001';
    const name = 'Alice Smith';
    const patient = new Patient(code, name);

    expect(patient).toBeInstanceOf(Patient);
    
    expect(patient.id).toBeUndefined();
    
    expect(patient.code).toBe(code);
    expect(patient.name).toBe(name);
  });

  it('should allow setting the id property if needed (e.g., for data retrieval)', () => {
    const patient = new Patient('P002', 'Bob Johnson');
    patient.id = 123;

    expect(patient.id).toBe(123);
    expect(patient.code).toBe('P002');
    expect(patient.name).toBe('Bob Johnson');
  });

  it('should handle empty strings for code and name', () => {
    const patient = new Patient('', '');

    expect(patient.code).toBe('');
    expect(patient.name).toBe('');
  });
});
export interface StudentInfo {
  fullName: string;
  address: string;
  ssn: string;
}

export interface FinancialInfo {
  income: number;
  dependents: number;
}

export interface ProgramInfo {
  programName: string;
  startDate: string;
}

export interface Application {
  id: string;
  studentInfo: StudentInfo;
  financialInfo: FinancialInfo;
  programInfo: ProgramInfo;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}
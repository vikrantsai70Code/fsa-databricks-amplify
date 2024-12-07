import { create } from 'zustand';
import { Application } from '../types/application';

interface ApplicationState {
  applications: Application[];
  submitApplication: (application: Omit<Application, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  reviewApplication: (id: string, notes: string) => void;
  approveApplication: (id: string, approved: boolean) => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  submitApplication: (application) => {
    set((state) => ({
      applications: [...state.applications, {
        ...application,
        id: crypto.randomUUID(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }],
    }));
  },
  reviewApplication: (id, notes) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id
          ? { ...app, status: 'reviewed', reviewerNotes: notes, updatedAt: new Date().toISOString() }
          : app
      ),
    }));
  },
  approveApplication: (id, approved) => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id
          ? { ...app, status: approved ? 'approved' : 'rejected', updatedAt: new Date().toISOString() }
          : app
      ),
    }));
  },
}));
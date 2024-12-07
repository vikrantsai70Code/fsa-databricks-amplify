import React, { useState } from 'react';
import { useApplicationStore } from '../store/applicationStore';

export const SubmitApplication: React.FC = () => {
  const submitApplication = useApplicationStore((state) => state.submitApplication);
  const [formData, setFormData] = useState({
    studentInfo: {
      fullName: '',
      address: '',
      ssn: '',
    },
    financialInfo: {
      income: 0,
      dependents: 0,
    },
    programInfo: {
      programName: '',
      startDate: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication(formData);
    // Reset form
    setFormData({
      studentInfo: { fullName: '', address: '', ssn: '' },
      financialInfo: { income: 0, dependents: 0 },
      programInfo: { programName: '', startDate: '' },
    });
  };

  const handleChange = (
    section: 'studentInfo' | 'financialInfo' | 'programInfo',
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Submit FAFSA Application</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={formData.studentInfo.fullName}
                onChange={(e) =>
                  handleChange('studentInfo', 'fullName', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={formData.studentInfo.address}
                onChange={(e) =>
                  handleChange('studentInfo', 'address', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SSN
              </label>
              <input
                type="text"
                value={formData.studentInfo.ssn}
                onChange={(e) =>
                  handleChange('studentInfo', 'ssn', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Income
              </label>
              <input
                type="number"
                value={formData.financialInfo.income}
                onChange={(e) =>
                  handleChange('financialInfo', 'income', Number(e.target.value))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Dependents
              </label>
              <input
                type="number"
                value={formData.financialInfo.dependents}
                onChange={(e) =>
                  handleChange(
                    'financialInfo',
                    'dependents',
                    Number(e.target.value)
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Program Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Program Name
              </label>
              <input
                type="text"
                value={formData.programInfo.programName}
                onChange={(e) =>
                  handleChange('programInfo', 'programName', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.programInfo.startDate}
                onChange={(e) =>
                  handleChange('programInfo', 'startDate', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};
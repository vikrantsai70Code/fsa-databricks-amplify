import React from 'react';
import { useApplicationStore } from '../store/applicationStore';
import { ApplicationCard } from '../components/ApplicationCard';

export const ApproveApplications: React.FC = () => {
  const applications = useApplicationStore((state) => state.applications);
  const approveApplication = useApplicationStore((state) => state.approveApplication);

  const reviewedApplications = applications.filter(
    (app) => app.status === 'reviewed'
  );

  const handleApprove = (id: string) => {
    approveApplication(id, true);
  };

  const handleReject = (id: string) => {
    approveApplication(id, false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Approve Applications</h1>
      
      <div className="space-y-4">
        {reviewedApplications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No reviewed applications pending approval
          </p>
        ) : (
          reviewedApplications.map((application) => (
            <div key={application.id} className="space-y-4">
              <ApplicationCard application={application} />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleReject(application.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(application.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
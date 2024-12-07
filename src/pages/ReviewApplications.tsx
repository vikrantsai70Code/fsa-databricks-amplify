import React, { useState } from 'react';
import { useApplicationStore } from '../store/applicationStore';
import { ApplicationCard } from '../components/ApplicationCard';

export const ReviewApplications: React.FC = () => {
  const applications = useApplicationStore((state) => state.applications);
  const reviewApplication = useApplicationStore((state) => state.reviewApplication);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const pendingApplications = applications.filter(
    (app) => app.status === 'pending'
  );

  const handleReview = (id: string) => {
    setSelectedId(id);
  };

  const submitReview = () => {
    if (selectedId && notes.trim()) {
      reviewApplication(selectedId, notes);
      setSelectedId(null);
      setNotes('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Applications</h1>
      
      {selectedId && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add Review Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-2 border rounded-md mb-4"
            placeholder="Enter your review notes..."
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setSelectedId(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={submitReview}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {pendingApplications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No pending applications to review
          </p>
        ) : (
          pendingApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onAction={handleReview}
              actionLabel="Review Application"
            />
          ))
        )}
      </div>
    </div>
  );
};
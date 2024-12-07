import React from 'react';
import { Application } from '../types/application';
import { Calendar, DollarSign, Users, FileCheck } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  onAction?: (id: string) => void;
  actionLabel?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onAction,
  actionLabel,
}) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {application.studentInfo.fullName}
          </h3>
          <p className="text-gray-600">{application.studentInfo.address}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[application.status]}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
          <span>Income: ${application.financialInfo.income.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-5 h-5 text-gray-400 mr-2" />
          <span>Dependents: {application.financialInfo.dependents}</span>
        </div>
        <div className="flex items-center">
          <FileCheck className="w-5 h-5 text-gray-400 mr-2" />
          <span>{application.programInfo.programName}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <span>Start: {new Date(application.programInfo.startDate).toLocaleDateString()}</span>
        </div>
      </div>

      {application.reviewerNotes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <strong>Reviewer Notes:</strong> {application.reviewerNotes}
          </p>
        </div>
      )}

      {onAction && actionLabel && (
        <button
          onClick={() => onAction(application.id)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
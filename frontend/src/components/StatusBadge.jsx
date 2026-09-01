import React from 'react';

const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-secondary';
  let label = status;

  switch (status) {
    case 'APPLIED':
      badgeClass = 'badge-info';
      label = 'Applied';
      break;
    case 'UNDER_REVIEW':
      badgeClass = 'badge-warning';
      label = 'Under Review';
      break;
    case 'SHORTLISTED':
      badgeClass = 'badge-success';
      label = 'Shortlisted';
      break;
    case 'SELECTED':
      badgeClass = 'badge-success';
      label = 'Selected 🎉';
      break;
    case 'REJECTED':
      badgeClass = 'badge-danger';
      label = 'Not Selected';
      break;
    default:
      badgeClass = 'badge-secondary';
  }

  return <span className={`badge ${badgeClass}`}>{label}</span>;
};

export default StatusBadge;

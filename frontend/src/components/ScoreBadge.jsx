import React from 'react';

const ScoreBadge = ({ score }) => {
  let badgeClass = 'score-low';
  if (score >= 80) {
    badgeClass = 'score-high';
  } else if (score >= 60) {
    badgeClass = 'score-medium';
  }

  return (
    <span className={`score-badge ${badgeClass}`}>
      {score}% Match
    </span>
  );
};

export default ScoreBadge;

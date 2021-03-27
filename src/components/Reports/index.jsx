import React from 'react';
import { useReports } from '../../context/reportsContext';
import { ReportsItem } from './ReportsItem';

export const Reports = () => {
  const {
    reportsState: { reports },
  } = useReports();

  return (
    <>
      {reports.map((report) => (
        <ReportsItem key={report.id} report={report} />
      ))}
    </>
  );
};

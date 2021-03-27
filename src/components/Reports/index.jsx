import React from 'react';
import { useReports } from '../../context/reportsContext';
import { ReportListStyles, ReportStyles } from './reports.style';
import { ReportsItem } from './ReportsItem';

export const Reports = () => {
  const {
    reportsState: { reports, error },
  } = useReports();

  if (error) return <div>{error}</div>;

  return (
    <ReportStyles>
      <ReportListStyles>
        <h1>Reports</h1>
        {reports.map((report) => (
          <ReportsItem key={report.id} report={report} />
        ))}
      </ReportListStyles>
    </ReportStyles>
  );
};

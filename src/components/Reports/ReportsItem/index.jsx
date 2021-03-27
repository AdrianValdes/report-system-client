/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBlock,
  ButtonCardStyles,
  ReportCard,
  ReportInfo,
} from './reportsItem.style';

export const ReportsItem = ({ report }) => (
  <ReportCard>
    <ReportInfo>
      <div>Id: {report.id}</div>
      <div>Type: {report.payload.reportType}</div>
      <div>State: {report.state}</div>
      <div>Message: {report.payload?.message}</div>
    </ReportInfo>
    <ButtonCardStyles>
      <ButtonBlock type='button'>Block</ButtonBlock>
      <button type='button'>Resolve</button>
    </ButtonCardStyles>
  </ReportCard>
);

ReportsItem.propTypes = {
  report: PropTypes.shape({
    created: PropTypes.string,
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    payload: PropTypes.shape({
      message: PropTypes.string,
      reportType: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

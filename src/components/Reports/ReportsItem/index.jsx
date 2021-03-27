import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBlock,
  ButtonCardStyles,
  ButtonResolve,
  ReportCard,
  ReportInfo,
} from './reportsItem.style';

import { blockContent, resolveTicket } from '../../../helpers/apiCalls';
import { useReports } from '../../../context/reportsContext';
import {
  RESOLVE_TICKET,
  RESOLVE_TICKET_ERROR,
} from '../../../context/constants';

export const ReportsItem = ({
  report: {
    state,
    payload: { message, reportType, reportId, referenceResourceId },
  },
}) => {
  const { dispatchReports } = useReports();

  const handleResolveReport = async () => {
    try {
      await resolveTicket(reportId);
      dispatchReports({ type: RESOLVE_TICKET, payload: { id: reportId } });
    } catch (error) {
      dispatchReports({ type: RESOLVE_TICKET_ERROR, payload: { error } });
    }
  };

  const handleBlockContent = async () => {
    try {
      await blockContent(referenceResourceId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReportCard>
      <ReportInfo>
        <div>Id: {reportId}</div>
        <div>Type: {reportType}</div>
        <div>State: {state}</div>
        <div>Message: {message}</div>
      </ReportInfo>
      <ButtonCardStyles>
        <ButtonBlock type='button' onClick={handleBlockContent}>
          Block
        </ButtonBlock>
        <ButtonResolve type='button' onClick={handleResolveReport}>
          Resolve
        </ButtonResolve>
      </ButtonCardStyles>
    </ReportCard>
  );
};

ReportsItem.propTypes = {
  report: PropTypes.shape({
    created: PropTypes.string,
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    payload: PropTypes.shape({
      message: PropTypes.string,
      reportType: PropTypes.string.isRequired,
      reportId: PropTypes.string.isRequired,
      referenceResourceId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

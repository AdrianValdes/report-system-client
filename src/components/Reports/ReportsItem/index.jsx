import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBlock,
  ButtonCardStyles,
  ButtonResolve,
  ReportCard,
  ReportInfo,
} from './reportsItem.style';

import { resolveTicket } from '../../../helpers/apiCalls';
import { useReports } from '../../../context/reportsContext';
import {
  RESOLVE_TICKET,
  RESOLVE_TICKET_ERROR,
} from '../../../context/constants';

export const ReportsItem = ({ report: { id, payload, state } }) => {
  const { dispatchReports } = useReports();

  const handleResolve = async () => {
    try {
      await resolveTicket(id);
      dispatchReports({ type: RESOLVE_TICKET, payload: { id } });
    } catch (error) {
      dispatchReports({ type: RESOLVE_TICKET_ERROR, payload: { error } });
    }
  };

  return (
    <ReportCard>
      <ReportInfo>
        <div>Id: {id}</div>
        <div>Type: {payload.reportType}</div>
        <div>State: {state}</div>
        <div>Message: {payload?.message}</div>
      </ReportInfo>
      <ButtonCardStyles>
        <ButtonBlock type='button'>Block</ButtonBlock>
        <ButtonResolve type='button' onClick={handleResolve}>
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
    }),
  }).isRequired,
};

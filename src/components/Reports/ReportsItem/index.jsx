/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonBlock,
  ButtonCardStyles,
  ReportCard,
  ReportInfo,
} from './reportsItem.style';

import { resolveTicket } from '../../../helpers/apiCalls';
import { useReports } from '../../../context/reportsContext';
import { RESOLVE_TICKET } from '../../../context/constants';

export const ReportsItem = ({ report: { id, payload, state } }) => {
  const { dispatchReports } = useReports();

  const handleResolve = async () => {
    try {
      await resolveTicket(id);
      dispatchReports({ type: RESOLVE_TICKET, payload: { id } });
    } catch (err) {
      console.log(err);
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
        <button type='button' onClick={handleResolve}>
          Resolve
        </button>
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

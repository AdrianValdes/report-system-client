/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export const ReportsItem = ({ report }) => <div>{report.id}</div>;

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

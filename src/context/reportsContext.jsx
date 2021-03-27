import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance as axios } from '../helpers';
import {
  FETCH_REPORTS,
  FETCH_REPORTS_ERROR,
  RESOLVE_TICKET,
} from './constants';

const initialReports = { error: null, reports: [] };

const reportsReducer = (state, { type, payload: { reports, error, id } }) => {
  switch (type) {
    case FETCH_REPORTS:
      return { ...state, reports };
    case FETCH_REPORTS_ERROR:
      return { ...state, error };
    case RESOLVE_TICKET: {
      const reportsNew = state.reports.filter((report) => report.id !== id);
      return { ...state, reports: reportsNew };
    }
    default:
      return state;
  }
};

const reportsContext = createContext();
export const useReports = () => useContext(reportsContext);

export const ReportsProvider = ({ children }) => {
  const [reportsState, dispatchReports] = useReducer(
    reportsReducer,
    initialReports
  );

  useEffect(() => {
    const getAllReports = async () => {
      try {
        const { data } = await axios.get('/reports');
        dispatchReports({ type: FETCH_REPORTS, payload: { reports: data } });
      } catch (error) {
        dispatchReports({ type: FETCH_REPORTS, payload: { error } });
      }
    };
    getAllReports();
  }, []);

  return (
    <reportsContext.Provider value={{ reportsState, dispatchReports }}>
      {children}
    </reportsContext.Provider>
  );
};

ReportsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

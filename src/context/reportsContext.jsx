import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { fetchAllReports } from '../helpers/apiCalls';
import {
  FETCH_REPORTS,
  FETCH_REPORTS_ERROR,
  RESOLVE_TICKET,
  RESOLVE_TICKET_ERROR,
} from './constants';

const initialReports = { error: null, reports: [] };

const reportsReducer = (state, { type, payload: { reports, error, id } }) => {
  switch (type) {
    case FETCH_REPORTS:
      return { ...state, reports };
    case FETCH_REPORTS_ERROR:
      return { ...state, error };
    case RESOLVE_TICKET: {
      const reportsNew = state.reports.filter(
        ({ payload: { reportId } }) => reportId !== id
      );
      return { ...state, reports: reportsNew };
    }
    case RESOLVE_TICKET_ERROR:
      return { ...state, error };
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
    const getReports = async () => {
      try {
        const reports = await fetchAllReports();

        if (reports instanceof Error) {
          dispatchReports({
            type: FETCH_REPORTS_ERROR,
            payload: { error: reports.message },
          });
        }
        dispatchReports({ type: FETCH_REPORTS, payload: { reports } });
      } catch (error) {
        dispatchReports({ type: FETCH_REPORTS_ERROR, payload: { error } });
      }
    };
    getReports();
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

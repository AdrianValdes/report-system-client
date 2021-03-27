import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance as axios } from '../helpers';
import { FETCH_REPORTS, FETCH_REPORTS_ERROR } from './constants';

const initialReports = { error: null, reports: [] };
const reportsReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_REPORTS:
      return { ...state, reports: payload };
    case FETCH_REPORTS_ERROR:
      return { ...state, error: payload };
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
        dispatchReports({ type: FETCH_REPORTS, payload: data });
      } catch (err) {
        dispatchReports({ type: FETCH_REPORTS, payload: err });
      }
    };
    getAllReports();
  }, []);

  return (
    <reportsContext.Provider value={{ reportsState }}>
      {children}
    </reportsContext.Provider>
  );
};

ReportsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

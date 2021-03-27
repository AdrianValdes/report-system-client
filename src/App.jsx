import React from 'react';
import { Reports } from './components/Reports';
import { GlobalStyle } from './components/GlobalStyle';
import { ReportsProvider } from './context/reportsContext';

export const App = () => (
  <>
    <ReportsProvider>
      <GlobalStyle />
      <Reports />
    </ReportsProvider>
  </>
);

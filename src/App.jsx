import React from 'react';
import { Reports } from './components/Reports';
import { GlobalStyle } from './components/GlobalStyle';
import { ReportsProvider } from './context/reportsContext';
import { Navbar } from './components/Navbar';

export const App = () => (
  <>
    <ReportsProvider>
      <GlobalStyle />
      <Navbar />
      <Reports />
    </ReportsProvider>
  </>
);

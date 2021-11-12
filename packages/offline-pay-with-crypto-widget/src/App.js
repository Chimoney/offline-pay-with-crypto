import React from 'react';
import './App.css';
import { ModalProvider } from './components';
import Demo from './Demo';

function App() {
  return (
    <ModalProvider>
      <Demo />
    </ModalProvider>
  );
}

export default App;

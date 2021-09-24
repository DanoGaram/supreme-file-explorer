import React from 'react';
import { Provider } from 'react-redux';
import FileExplorer from '../components/fileExplorer/FileExplorer';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <FileExplorer />
    </Provider>
  );
}

export default App;

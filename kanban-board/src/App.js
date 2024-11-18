import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import NavBar from './components/Navbar/NavBar';
import './App.css';

function App() {
  const [grouping, setGrouping] = useState('status');
  const [sortOrder, setSortOrder] = useState('priority');

  return (
    <div className="app">
      <NavBar
        grouping={grouping}
        setGrouping={setGrouping}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <KanbanBoard grouping={grouping} sortOrder={sortOrder} />
    </div>
  );
}

export default App;

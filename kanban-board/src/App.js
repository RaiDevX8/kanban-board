import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import NavBar from './components/Navbar/NavBar';
import './App.css';

function App() {
  const initialGrouping = localStorage.getItem('grouping') || 'status';
  const initialSortOrder = localStorage.getItem('sortOrder') || 'priority';

  const [grouping, setGrouping] = useState(initialGrouping);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sortOrder', sortOrder);
  }, [grouping, sortOrder]);
    
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

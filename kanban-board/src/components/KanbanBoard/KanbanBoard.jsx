import React, { useEffect, useState } from 'react';
import { fetchTicketsAndUsers } from '../../services/api';
import TicketCard from '../TicketCard/TicketCard';
import ActivityCard from '../ActivityCard/ActivityCard'; 
import './KanbanBoard.css';

const KanbanBoard = ({ grouping, sortOrder }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTicketsAndUsers();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const sortTickets = (tickets) => {
    const sorted = [...tickets];
    if (sortOrder === 'priority') {
      sorted.sort((a, b) => b.priority - a.priority);
    } else if (sortOrder === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  };

  const groupTickets = () => {
    if (grouping === 'status') {
      const statusGroups = ['Todo', 'In progress', 'Backlog', 'Done', 'Cancel'];
      const groups = {
        Todo: [],
        'In progress': [],
        Backlog: [],
        Done: [],
        Cancel: [],
      };

      tickets.forEach((ticket) => {
        const status = ticket.status ? ticket.status.trim() : 'No Status';
        if (statusGroups.includes(status)) {
          groups[status].push(ticket);
        } else {
          groups['Backlog'].push(ticket);
        }
      });

      return Object.keys(groups).map((key) => ({
        title: key,
        count: groups[key].length,
        items: sortTickets(groups[key]),
      }));
    } else if (grouping === 'user') {
      const userGroups = users.reduce((acc, user) => {
        acc[user.id] = {
          title: user.name,
          items: [],
        };
        return acc;
      }, {});

      tickets.forEach((ticket) => {
        if (userGroups[ticket.userId]) {
          userGroups[ticket.userId].items.push(ticket);
        }
      });

      return Object.keys(userGroups).map((userId) => ({
        title: userGroups[userId].title,
        count: userGroups[userId].items.length,
        items: sortTickets(userGroups[userId].items),
      }));
    } else if (grouping === 'priority') {
      const priorityGroups = {
        High: [],
        Medium: [],
        Low: [],
      };

      tickets.forEach((ticket) => {
        if (ticket.priority >= 3) {
          priorityGroups['High'].push(ticket);
        } else if (ticket.priority === 2) {
          priorityGroups['Medium'].push(ticket);
        } else {
          priorityGroups['Low'].push(ticket);
        }
      });

      return Object.keys(priorityGroups).map((key) => ({
        title: key,
        count: priorityGroups[key].length,
        items: sortTickets(priorityGroups[key]),
      }));
    }
    return [];
  };

  if (loading) return <div className="status-message">Loading...</div>;
  if (error)
    return (
      <div className="status-message error">
        Failed to fetch tickets. Please try again later.
      </div>
    );

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board-container">
      <div className="kanban-board">
        {groupedTickets.map((group) => (
          <div className="kanban-column" key={group.title}>
            <ActivityCard
              activity={group.title}
              count={group.count}
              priority={group.items[0]?.priority} 
            />
            <div className="ticket-list">
              {group.items.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} users={users} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

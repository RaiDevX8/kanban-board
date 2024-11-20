import React from 'react';
import './TicketCard.css';
import High from '../../assets/pHigh.svg';
import Low from '../../assets/pLow.svg';
import Med from '../../assets/pMed.svg';
import Urg from '../../assets/pUrg.svg';
import Pno from '../../assets/pNo.svg';
import Person from "../../assets/image.png";

import BacklogImage from "../../assets/status/Backlog.svg";
import CancelledImage from "../../assets/status/Cancelled.svg";
import DoneImage from "../../assets/status/Done.svg";
import InProgressImage from "../../assets/status/in-progress.svg";
import TodoImage from "../../assets/status/To-do.svg";
import More from "../../assets/more/more.svg";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TicketCard = ({ ticket, users ,group}) => {
  const assignedUser = users.find((user) => user.id === ticket.userId);

  const getPriorityImage = (priority) => {
    switch (priority) {
      case 4:
        return Urg;  // Urgent
      case 3:
        return High; // High
      case 2:
        return Med;  // Medium
      case 1:
        return Low;  // Low
      case 0:
      default:
        return Pno;  // No priority
    }
  };

  let activityImage;

  switch (ticket.status) {
    case "Backlog":
      activityImage = BacklogImage;
      break;
    case "cancel":
      activityImage = CancelledImage;
      break;
    case "Done":
      activityImage = DoneImage;
      break;
    case "In progress":
      activityImage = InProgressImage;
      break;
    case "Todo":
      activityImage = TodoImage;
      break;
    default:
      activityImage = Person;
      break;
  }

  const priorityImage = getPriorityImage(ticket.priority);

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
      <div className="inside-container">
        <div className="cardHeading flex-sb">
          <span className="color-grey" style={{ textTransform: 'uppercase' }}>
            {ticket.id}
          </span>
        </div>

        {assignedUser && (
          <div className="avatar-container">
            {assignedUser.avatar ? (
              <img
                className="userAvatar"
                src={assignedUser.avatar}
                alt="User Avatar"
              />
            ) : (
              <div 
                className="userAvatar"
                style={{ backgroundColor: getRandomColor(), display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {assignedUser.name.slice(0, 2).toUpperCase()} 
              </div>
            )}
            <div
              className={`status-indicator ${assignedUser.available ? 'available' : 'unavailable'}`}
            ></div>
          </div>
        )}
      </div>

      <div className="cardTitle flex-sb">
        {group === 'user' ? (
          ticket?.status ? (
            <div className="statusContainer">
              <img className="activity-image" src={activityImage} alt="Status" />
              <p className="title">{ticket.title}</p>
            </div>
          ) : (
            <p className="title">{ticket.title}</p>
          )
        ) : (
          <p className="title">{ticket.title}</p>
        )}
      </div>

      <div className="cardTags">
        <img
          src={priorityImage}
          alt="Priority Icon"
          className="priorityIcon"
        />
        {ticket.tag?.map((elem, index) => (
          <div key={index} className="tags color-grey">
            <span>•</span> {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketCard;

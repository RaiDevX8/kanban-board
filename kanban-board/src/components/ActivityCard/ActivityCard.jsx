import React from "react";
import "./ActivityCard.css";

import BacklogImage from "../../assets/status/Backlog.svg";
import CancelledImage from "../../assets/status/Cancelled.svg";
import DoneImage from "../../assets/status/Done.svg";
import InProgressImage from "../../assets/status/in-progress.svg";
import TodoImage from "../../assets/status/To-do.svg";

import High from "../../assets/pHigh.svg";
import Low from "../../assets/pLow.svg";
import Med from "../../assets/pMed.svg";
import Urg from "../../assets/pUrg.svg";
import Pno from "../../assets/pNo.svg";
import add from "../../assets/more/add.svg";
import more from "../../assets/more/more.svg";
import Person from "../../assets/image.png";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ActivityCard = ({ activity, count }) => {
  let activityImage;
  const randomColor = getRandomColor();  

  // Mapping activity and priority to images
  switch (activity.toLowerCase()) {
    case "backlog":
      activityImage = BacklogImage;
      break;
    case "cancel":
      activityImage = CancelledImage;
      break;
    case "done":
      activityImage = DoneImage;
      break;
    case "in progress":
      activityImage = InProgressImage;
      break;
    case "todo":
      activityImage = TodoImage;
      break;
    case "high":
      activityImage = High;
      break;
    case "medium":
      activityImage = Med;
      break;
    case "low":
      activityImage = Low;
      break;
    case "urgent":
      activityImage = Urg;
      break;
    case "no priority":
      activityImage = Pno;
      break;
    default:
      activityImage = Person;  // Default case if no match
      break;
  }

  return (
    <div className="activity-card">
      {/* If it's a user-related activity, show random color for initials */}
      {activityImage === Person ? (
        <div className="activity-avatar" style={{ backgroundColor: randomColor }}>
          {activity.slice(0, 2).toUpperCase()} 
        </div>
      ) : (
        <img src={activityImage} alt={activity} className="activity-image" />
      )}

      <div className="activity-text">
        <span className="activity-name">{activity}</span>
        <span className="activity-count">{count}</span>
      </div>

      <div className="activity-actions">
        <button className="add-button"><img src={add} alt="add" /></button>
        <button className="more-button"><img src={more} alt="more" /></button>
      </div>
    </div>
  );
};

export default ActivityCard;

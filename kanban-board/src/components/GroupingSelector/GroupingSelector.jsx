import './GroupingSelector.css';

const GroupingSelector = ({ grouping, setGrouping }) => {
  return (
    <div className="selector">
      
      <select
        id="grouping"
        value={grouping}
        onChange={(e) => setGrouping(e.target.value)}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingSelector;

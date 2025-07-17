const Notification = ({ count }) => (
  <div className="relative inline-block">
    <span className="text-white">🔔</span>
    {count > 0 && (
      <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-2 rounded-full">
        {count}
      </span>
    )}
  </div>
);

export default Notification;
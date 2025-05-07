import React, { useEffect, useState } from 'react';

function Notification({ message, type = 'info', duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const notificationClass = `notification ${type}`;

  return (
    <div className={notificationClass}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
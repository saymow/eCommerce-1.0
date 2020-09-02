import React, { createContext, useContext, useState } from "react";

import AlertNotification from "../Components/AlertNotification";

const NotificationsContext = createContext({
  pushNotification: (arg0: INotification) => {},
});

interface INotification {
  type: "success" | "warning";
  message: string;
}

const delay = 4000;

const Context: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const pushNotification = (notification: INotification) => {
    setNotifications([...notifications, notification]);
    return setTimeout(() => setNotifications((prev) => prev.slice(1)), delay);
  };

  return (
    <NotificationsContext.Provider value={{ pushNotification }}>
      {notifications.map(({ type, message }, i) => (
        <AlertNotification
          key={i}
          delay={delay}
          type={type}
          message={message}
        />
      ))}
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationContext() {
  const context = useContext(NotificationsContext);

  return context;
}

export default Context;

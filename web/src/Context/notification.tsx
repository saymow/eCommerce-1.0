import React, { createContext, useContext, useReducer } from "react";

import AlertNotification from "../Components/AlertNotification";

const NotificationsContext = createContext({
  pushNotification: (arg0: INotification) => {},
});

interface INotification {
  type: "success" | "warning";
  message: string;
}

const delay = 4000;

const notifications: INotification[] = [];

const Context: React.FC = ({ children }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Since react state is asynchronously i've been through some notification state issues, thus
  // it resolved the probleem.
  const pushNotification = (notification: INotification) => {
    notifications.push(notification);
    forceUpdate();

    return setTimeout(() => {
      notifications.shift();
      forceUpdate();
    }, delay);
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

/* eslint-disable react-refresh/only-export-components */
import React from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";

import config from "../utils/config";
import { useAuth } from "./AuthContext";

interface WebsocketContext {
  lastMessage?: Record<string, unknown>;
  sendMessage: SendMessage;
  messages?: MessageShape[];
}

type MessageShape = Record<string, unknown>;

const WebsocketContext = React.createContext<WebsocketContext>({
  sendMessage: () => {},
});

export const WebsocketProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const auth = useAuth();
  const [messages, setMessages] = React.useState<MessageShape[]>([]);
  const { sendMessage, lastJsonMessage } = useWebSocket<MessageShape>(
    config.WS_HOST,
    { queryParams: { token: `${auth.accessToken}` } },
  );

  React.useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages((prev) => prev.concat(lastJsonMessage));
    }
  }, [lastJsonMessage, setMessages]);

  return (
    <WebsocketContext.Provider
      value={{ sendMessage, lastMessage: lastJsonMessage, messages }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => React.useContext(WebsocketContext);

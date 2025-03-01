import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconExclamationCircle,
} from "@tabler/icons-react";

export const showSuccessNotification = (message: string) => {
  notifications.show({
    title: "Success!",
    message: message,
    color: "green",
    icon: <IconCheck />,
  });
};

export const showWarningNotification = (message: string) => {
  notifications.show({
    title: "Warning!",
    message: message,
    color: "yellow",
    icon: <IconAlertTriangle />,
  });
};

export const showErrorNotification = (message: string) => {
  notifications.show({
    title: "Error!",
    message: message,
    color: "red",
    icon: <IconExclamationCircle />,
  });
};

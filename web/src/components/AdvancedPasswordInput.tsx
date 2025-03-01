import React from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  rem,
  PasswordInputProps,
} from "@mantine/core";

const PasswordRequirement: React.FC<{
  meets: boolean;
  label: string;
}> = ({ meets, label }) => {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
      component="div"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const AdvancedPasswordInput: React.FC<PasswordInputProps> = ({
  value,
  ...props
}) => {
  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(`${value}`)}
    />
  ));

  const strength = getStrength(`${value}`);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput value={value} {...props} />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 8 characters"
          meets={`${value}`.length > 7}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

export default AdvancedPasswordInput;

import { Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

type ButtonProps = {
  name: string;
  route: string;
  icon: JSX.Element;
};

const Button: React.FC<ButtonProps> = ({ route, name, icon }) => {
  const router = useRouter();

  return (
    <Link href={route} passHref>
      <UnstyledButton
        className="no-underline"
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.black,

          '&:hover': {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color="blue" variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm" underline={router.pathname === route}>
            {name}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

export default Button;

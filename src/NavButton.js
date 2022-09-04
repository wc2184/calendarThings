import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const NavButton = ({ path, color, text }) => {
  return (
    <NavLink active to={`/${path}`}>
      {({ isActive }) =>
        isActive ? (
          <Button
            sx={{ margin: '0 15px 0 15px' }}
            colorScheme={`${color}`}
            size="md"
          >
            {text}
          </Button>
        ) : (
          <Button sx={{ margin: '0 15px 0 15px' }} size="md">
            {text}
          </Button>
        )
      }
    </NavLink>
  );
};

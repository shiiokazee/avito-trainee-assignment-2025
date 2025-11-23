import { ROUTES } from '@/router';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  SettingsBrightness as SystemModeIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  createTheme,
  GlobalStyles,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const AppLayout = () => {
  const [userTheme, setUserTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_THEME_KEY) ?? 'system') as Theme
  );

  const theme = useMemo(() => {
    if (userTheme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return darkTheme;
      }

      return lightTheme;
    }

    return userTheme === 'light' ? lightTheme : darkTheme;
  }, [userTheme]);

  const handleChangeTheme = (_: unknown, theme: Theme) => {
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    setUserTheme(theme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
          },
        })}
      />
      <Box>
        <Card
          sx={{
            position: 'sticky',
            top: 0,
            p: 2,
            zIndex: 5,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to={ROUTES.list}>
              <Button variant="text">Список объявлений</Button>
            </Link>
            <Link to={ROUTES.stats}>
              <Button variant="text">Аналитика</Button>
            </Link>
          </Box>

          <ToggleButtonGroup
            onChange={handleChangeTheme}
            exclusive
            value={userTheme}
          >
            <ToggleButton value={'light' satisfies Theme}>
              <LightModeIcon />
            </ToggleButton>
            <ToggleButton value={'dark' satisfies Theme}>
              <DarkModeIcon />
            </ToggleButton>
            <ToggleButton value={'system' satisfies Theme}>
              <SystemModeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

type Theme = 'light' | 'dark' | 'system';
const STORAGE_THEME_KEY = 'theme';

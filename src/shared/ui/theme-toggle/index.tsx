'use client';

import React from 'react';

import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const ThemeToggle: React.FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleTheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip label={computedColorScheme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}>
      <ActionIcon
        variant="default"
        aria-label="Toggle color scheme"
        onClick={toggleTheme}
        size="lg"
      >
        {computedColorScheme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;

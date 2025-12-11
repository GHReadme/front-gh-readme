import React, { useCallback } from 'react';

import { Path, useFormContext, useWatch } from 'react-hook-form';

import { Grid, Paper, SegmentedControl, Stack, Switch, Text, Title } from '@mantine/core';

import type { ProfileReadmeConfig } from 'core/types';
import TextInput from 'shared/ui/inputs/text-input';

const GithubStatsSettings: React.FC = () => {
  const { control, setValue } = useFormContext<ProfileReadmeConfig>();
  const stats = useWatch({ control, name: 'githubStats' });

  const handleChange = useCallback(
    <TKey extends keyof ProfileReadmeConfig['githubStats']>(key: TKey) =>
    (value: ProfileReadmeConfig['githubStats'][TKey]) =>
      setValue(`githubStats.${key}` as Path<ProfileReadmeConfig>, value, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue],
  );

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>GitHub статистика</Title>
          <Text size="sm" c="dimmed">
            Управляй отображением карточек GitHub и темой виджетов.
          </Text>
        </div>

        <Grid gutter="sm">
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Switch
              label="Показать overview"
              checked={stats?.showOverviewCard ?? false}
              onChange={(event) => handleChange('showOverviewCard')(event.currentTarget.checked)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Switch
              label="Показать топ языков"
              checked={stats?.showTopLangs ?? false}
              onChange={(event) => handleChange('showTopLangs')(event.currentTarget.checked)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Switch
              label="Показать streak"
              checked={stats?.showStreak ?? false}
              onChange={(event) => handleChange('showStreak')(event.currentTarget.checked)}
            />
          </Grid.Col>
        </Grid>

        <SegmentedControl
          data={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Transparent', value: 'transparent' },
          ]}
          fullWidth
          value={stats?.theme ?? 'light'}
          onChange={(value) => handleChange('theme')(value as ProfileReadmeConfig['githubStats']['theme'])}
        />

        <TextInput
          label="Кастомный username"
          placeholder="Переопределит profile.username"
          value={stats?.customUsername ?? ''}
          onChange={(value) => handleChange('customUsername')(value)}
        />
      </Stack>
    </Paper>
  );
};

export default GithubStatsSettings;

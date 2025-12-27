import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Switch } from '@mantine/core';

import type { ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import SegmentedControl from '@/shared/ui/segmented-control';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const GithubStatsSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const stats = useWatch({ control, name: 'githubStats' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

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
              onChange={(event) => setFieldValue('githubStats.showOverviewCard')(event.currentTarget.checked)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Switch
              label="Показать топ языков"
              checked={stats?.showTopLangs ?? false}
              onChange={(event) => setFieldValue('githubStats.showTopLangs')(event.currentTarget.checked)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Switch
              label="Показать streak"
              checked={stats?.showStreak ?? false}
              onChange={(event) => setFieldValue('githubStats.showStreak')(event.currentTarget.checked)}
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
          onChange={(value) => setFieldValue('githubStats.theme')(value as ProfileReadmeConfig['githubStats']['theme'])}
        />

        <TextInput
          label="Кастомный username"
          placeholder="Переопределит profile.username"
          value={stats?.customUsername ?? ''}
          onChange={setFieldValue('githubStats.customUsername')}
        />
      </Stack>
    </Paper>
  );
};

export default GithubStatsSettings;

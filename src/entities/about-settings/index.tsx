import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Switch, Textarea } from '@mantine/core';

import type { ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const AboutSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const about = useWatch({ control, name: 'about' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const handleValuesChange = (value: string) => {
    const parsed = value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    setFieldValue('about.values')(parsed);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Блок «Обо мне»</Title>
          <Text size="sm" c="dimmed">
            Управляй текстами и активностью секции. Оставь неиспользуемые поля пустыми.
          </Text>
        </div>

        <Switch
          label="Показывать блок в README"
          checked={about?.active ?? false}
          onChange={(event) => setFieldValue('about.active')(event.currentTarget.checked)}
        />

        <Grid gutter="md">
          <Grid.Col span={{ base: 12 }}>
            <Textarea
              label="Короткое описание"
              placeholder="Senior frontend engineer focusing on scalable React + TypeScript apps"
              autosize
              minRows={2}
              value={about?.shortBio ?? ''}
              onChange={(event) => setFieldValue('about.shortBio')(event.currentTarget.value)}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Над чем сейчас работаешь"
              placeholder="Building internal design system"
              value={about?.currentFocus ?? ''}
              onChange={setFieldValue('about.currentFocus')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Что сейчас изучаешь"
              placeholder="Web security, performance profiling"
              value={about?.currentlyLearning ?? ''}
              onChange={setFieldValue('about.currentlyLearning')}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Что ищешь / открыт к"
              placeholder="Open to senior frontend roles (remote, EU timezones)"
              value={about?.lookingFor ?? ''}
              onChange={setFieldValue('about.lookingFor')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Textarea
              label="Ценности (по одному на строку)"
              placeholder={'I value clean architecture\nI like improving DX'}
              autosize
              minRows={3}
              value={(about?.values ?? []).join('\n')}
              onChange={(event) => handleValuesChange(event.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default AboutSettings;

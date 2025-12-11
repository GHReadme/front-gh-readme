import React, { useCallback } from 'react';

import { Path, useFormContext, useWatch } from 'react-hook-form';

import { Button, Group, Paper, Stack, Switch, Text, Textarea, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import type { ProfileReadmeConfig } from 'core/types';

const FunFactsSettings: React.FC = () => {
  const { control, setValue } = useFormContext<ProfileReadmeConfig>();
  const funFacts = useWatch({ control, name: 'funFacts' });

  const handleChange = useCallback(
    <TKey extends keyof ProfileReadmeConfig['funFacts']>(key: TKey) =>
    (value: ProfileReadmeConfig['funFacts'][TKey]) =>
      setValue(`funFacts.${key}` as Path<ProfileReadmeConfig>, value, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue],
  );

  const handleItemsChange = (value: string) => {
    const items = value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    handleChange('items')(items);
  };

  const handleAddItem = () => {
    const items = [...(funFacts?.items ?? []), ''];
    handleChange('items')(items);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Fun facts</Title>
          <Text size="sm" c="dimmed">
            Добавь пару личных фактов для более живого README.
          </Text>
        </div>

        <Group justify="space-between" align="center">
          <Switch
            label="Показывать fun facts"
            checked={funFacts?.active ?? false}
            onChange={(event) => handleChange('active')(event.currentTarget.checked)}
          />
          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={handleAddItem}>
            Добавить строку
          </Button>
        </Group>

        <Textarea
          label="Факты (по одному на строку)"
          placeholder={'I enjoy refactoring legacy code\nI like measuring performance'}
          autosize
          minRows={3}
          value={(funFacts?.items ?? []).join('\n')}
          onChange={(event) => handleItemsChange(event.currentTarget.value)}
        />
      </Stack>
    </Paper>
  );
};

export default FunFactsSettings;

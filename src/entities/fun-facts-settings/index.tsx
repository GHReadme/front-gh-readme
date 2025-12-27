import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, Switch, Textarea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import type { ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Group from '@/shared/ui/group';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const FunFactsSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const funFacts = useWatch({ control, name: 'funFacts' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const handleItemsChange = (value: string) => {
    const items = value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    setFieldValue('funFacts.items')(items);
  };

  const handleAddItem = () => {
    const items = [...(funFacts?.items ?? []), ''];
    setFieldValue('funFacts.items')(items);
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
            onChange={(event) => setFieldValue('funFacts.active')(event.currentTarget.checked)}
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

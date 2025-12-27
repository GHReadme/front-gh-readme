import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, Switch } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ActivityFlag, ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import Group from '@/shared/ui/group';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const ActivitySettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const activity = useWatch({ control, name: 'activity' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const updateFlag = <TKey extends keyof ActivityFlag>(index: number, key: TKey, value: ActivityFlag[TKey]) => {
    const flags = [...(activity?.flags ?? [])];
    flags[index] = { ...flags[index], [key]: value } as ActivityFlag;
    setFieldValue('activity.flags')(flags);
  };

  const addFlag = () => {
    const flags = [...(activity?.flags ?? []), { label: 'Новый флаг', value: true }];
    setFieldValue('activity.flags')(flags);
  };

  const removeFlag = (index: number) => {
    const flags = [...(activity?.flags ?? [])];
    flags.splice(index, 1);
    setFieldValue('activity.flags')(flags);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Активность / статус</Title>
          <Text size="sm" c="dimmed">
            Отметь статусы вроде «Open to work» и предпочтительный способ связи.
          </Text>
        </div>

        <Switch
          label="Показывать блок активности"
          checked={activity?.active ?? false}
          onChange={(event) => setFieldValue('activity.active')(event.currentTarget.checked)}
        />

        <TextInput
          label="Предпочтительный способ связи"
          placeholder="Telegram или email"
          value={activity?.preferredContact ?? ''}
          onChange={setFieldValue('activity.preferredContact')}
        />

        <Stack gap="sm">
          {activity?.flags?.map((flag, index) => (
            <Paper key={`${flag.label}-${index}`} withBorder radius="md" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Text fw={600}>Флаг #{index + 1}</Text>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => removeFlag(index)}
                  >
                    Удалить
                  </Button>
                </Group>

                <Grid gutter="sm">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Название"
                      placeholder="Open to work"
                      value={flag.label}
                      onChange={(value) => updateFlag(index, 'label', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <Switch
                      label="Активен"
                      checked={flag.value}
                      onChange={(event) => updateFlag(index, 'value', event.currentTarget.checked)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Комментарий"
                      placeholder="Remote, EU timezones"
                      value={flag.note ?? ''}
                      onChange={(value) => updateFlag(index, 'note', value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          ))}

          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addFlag}>
            Добавить статус
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ActivitySettings;

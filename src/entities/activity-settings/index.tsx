import React, { useCallback } from 'react';

import { Path, useFormContext, useWatch } from 'react-hook-form';

import { Button, Grid, Group, Paper, Stack, Switch, Text, Title } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ActivityFlag, ProfileReadmeConfig } from 'core/types';
import TextInput from 'shared/ui/inputs/text-input';

const ActivitySettings: React.FC = () => {
  const { control, setValue } = useFormContext<ProfileReadmeConfig>();
  const activity = useWatch({ control, name: 'activity' });

  const handleChange = useCallback(
    <TKey extends keyof ProfileReadmeConfig['activity']>(key: TKey) =>
    (value: ProfileReadmeConfig['activity'][TKey]) =>
      setValue(`activity.${key}` as Path<ProfileReadmeConfig>, value, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue],
  );

  const updateFlag = <TKey extends keyof ActivityFlag>(index: number, key: TKey, value: ActivityFlag[TKey]) => {
    const flags = [...(activity?.flags ?? [])];
    flags[index] = { ...flags[index], [key]: value } as ActivityFlag;
    handleChange('flags')(flags);
  };

  const addFlag = () => {
    const flags = [...(activity?.flags ?? []), { label: 'Новый флаг', value: true }];
    handleChange('flags')(flags);
  };

  const removeFlag = (index: number) => {
    const flags = [...(activity?.flags ?? [])];
    flags.splice(index, 1);
    handleChange('flags')(flags);
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
          onChange={(event) => handleChange('active')(event.currentTarget.checked)}
        />

        <TextInput
          label="Предпочтительный способ связи"
          placeholder="Telegram или email"
          value={activity?.preferredContact ?? ''}
          onChange={(value) => handleChange('preferredContact')(value)}
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

import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, TextInput as MantineTextInput, Switch } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ProfileReadmeConfig, StackItem } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import Group from '@/shared/ui/group';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Select from '@/shared/ui/select';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const stackCategories: { label: string; value: StackItem['category'] }[] = [
  { label: 'Language', value: 'language' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Testing', value: 'testing' },
  { label: 'Database', value: 'database' },
  { label: 'Tool', value: 'tool' },
  { label: 'Other', value: 'other' },
];

const stackLevels: { label: string; value: NonNullable<StackItem['level']> }[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Expert', value: 'expert' },
];

const TechStackSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const techStack = useWatch({ control, name: 'techStack' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const updateGroupItem = (
    groupIndex: number,
    itemIndex: number,
    key: keyof StackItem,
    value: StackItem[keyof StackItem]
  ) => {
    const nextGroups = [...(techStack?.groups ?? [])];
    const items = [...(nextGroups[groupIndex]?.items ?? [])];
    items[itemIndex] = { ...items[itemIndex], [key]: value } as StackItem;
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], items };
    setFieldValue('techStack.groups')(nextGroups);
  };

  const updateGroupTitle = (groupIndex: number, title: string) => {
    const nextGroups = [...(techStack?.groups ?? [])];
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], title };
    setFieldValue('techStack.groups')(nextGroups);
  };

  const addGroup = () => {
    const nextGroups = [...(techStack?.groups ?? []), { title: 'Новая группа', items: [] }];
    setFieldValue('techStack.groups')(nextGroups);
  };

  const removeGroup = (groupIndex: number) => {
    const nextGroups = [...(techStack?.groups ?? [])];
    nextGroups.splice(groupIndex, 1);
    setFieldValue('techStack.groups')(nextGroups);
  };

  const addTech = (groupIndex: number) => {
    const nextGroups = [...(techStack?.groups ?? [])];
    const items = [...(nextGroups[groupIndex]?.items ?? [])];
    items.push({ name: '', category: 'other', level: 'intermediate', icon: '' });
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], items };
    setFieldValue('techStack.groups')(nextGroups);
  };

  const removeTech = (groupIndex: number, itemIndex: number) => {
    const nextGroups = [...(techStack?.groups ?? [])];
    const items = [...(nextGroups[groupIndex]?.items ?? [])];
    items.splice(itemIndex, 1);
    nextGroups[groupIndex] = { ...nextGroups[groupIndex], items };
    setFieldValue('techStack.groups')(nextGroups);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Техстек</Title>
          <Text size="sm" c="dimmed">
            Опиши технологии и группировку для блока «Tech stack».
          </Text>
        </div>

        <Switch
          label="Показывать техстек"
          checked={techStack?.active ?? false}
          onChange={(event) => setFieldValue('techStack.active')(event.currentTarget.checked)}
        />

        <Switch
          label="Группировать стек"
          checked={techStack?.grouped ?? false}
          onChange={(event) => setFieldValue('techStack.grouped')(event.currentTarget.checked)}
        />

        <Stack gap="md">
          {techStack?.groups?.map((group, groupIndex) => (
            <Paper key={`${group.title}-${groupIndex}`} withBorder radius="md" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <TextInput
                    label={`Группа #${groupIndex + 1}`}
                    placeholder="Frontend"
                    value={group.title}
                    onChange={(value) => updateGroupTitle(groupIndex, value)}
                  />
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => removeGroup(groupIndex)}
                  >
                    Удалить
                  </Button>
                </Group>

                <Stack gap="sm">
                  {group.items?.map((item, itemIndex) => (
                    <Paper key={`${item.name}-${itemIndex}`} withBorder radius="md" p="md">
                      <Stack gap="sm">
                        <Group justify="space-between" align="center">
                          <Text fw={600}>Технология #{itemIndex + 1}</Text>
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            leftSection={<IconTrash size={14} />}
                            onClick={() => removeTech(groupIndex, itemIndex)}
                          >
                            Удалить
                          </Button>
                        </Group>

                        <Grid gutter="sm">
                          <Grid.Col span={{ base: 12, sm: 3 }}>
                            <TextInput
                              label="Название"
                              placeholder="React"
                              value={item.name}
                              onChange={(value) => updateGroupItem(groupIndex, itemIndex, 'name', value)}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 3 }}>
                            <Select
                              label="Категория"
                              data={stackCategories}
                              value={item.category}
                              onChange={(value) =>
                                updateGroupItem(
                                  groupIndex,
                                  itemIndex,
                                  'category',
                                  (value ?? 'other') as StackItem['category']
                                )
                              }
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 3 }}>
                            <Select
                              label="Уровень"
                              data={stackLevels}
                              clearable
                              value={item.level ?? null}
                              onChange={(value) =>
                                updateGroupItem(
                                  groupIndex,
                                  itemIndex,
                                  'level',
                                  (value ?? undefined) as StackItem['level']
                                )
                              }
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 3 }}>
                            <MantineTextInput
                              label="Иконка / ключ"
                              placeholder="react"
                              value={item.icon ?? ''}
                              onChange={(event) =>
                                updateGroupItem(groupIndex, itemIndex, 'icon', event.currentTarget.value)
                              }
                            />
                          </Grid.Col>
                        </Grid>
                      </Stack>
                    </Paper>
                  ))}

                  <Button leftSection={<IconPlus size={16} />} variant="light" onClick={() => addTech(groupIndex)}>
                    Добавить технологию
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ))}

          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addGroup}>
            Добавить группу
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TechStackSettings;

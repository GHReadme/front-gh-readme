import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, TextInput as MantineTextInput, Switch, Textarea } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { FeaturedProject, ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import Group from '@/shared/ui/group';
import NumberInput from '@/shared/ui/inputs/number-input';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const ProjectsSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const projects = useWatch({ control, name: 'projects' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const updateProject = <TKey extends keyof FeaturedProject>(
    index: number,
    key: TKey,
    value: FeaturedProject[TKey]
  ) => {
    const next = [...(projects?.items ?? [])];
    next[index] = { ...next[index], [key]: value } as FeaturedProject;
    setFieldValue('projects.items')(next);
  };

  const addProject = () => {
    const next = [
      ...(projects?.items ?? []),
      {
        id: `project-${(projects?.items?.length ?? 0) + 1}`,
        name: '',
        description: '',
        tech: [],
      },
    ];

    setFieldValue('projects.items')(next);
  };

  const removeProject = (index: number) => {
    const next = [...(projects?.items ?? [])];
    next.splice(index, 1);
    setFieldValue('projects.items')(next);
  };

  const handleTechChange = (index: number, value: string) => {
    const tech = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    updateProject(index, 'tech', tech);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Выделенные проекты</Title>
          <Text size="sm" c="dimmed">
            Заполни карточки проектов, которые хочешь подсветить в README.
          </Text>
        </div>

        <Switch
          label="Показывать проекты"
          checked={projects?.active ?? false}
          onChange={(event) => setFieldValue('projects.active')(event.currentTarget.checked)}
        />

        <Grid gutter="sm">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput
              label="Максимум проектов для показа"
              placeholder="3"
              value={projects?.maxToShow ?? null}
              onChange={(value) => setFieldValue('projects.maxToShow')(value ?? undefined)}
              min={1}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Switch
              label="Сначала выделенные проекты"
              checked={projects?.showHighlightedFirst ?? false}
              onChange={(event) => setFieldValue('projects.showHighlightedFirst')(event.currentTarget.checked)}
            />
          </Grid.Col>
        </Grid>

        <Stack gap="sm">
          {projects?.items?.map((project, index) => (
            <Paper key={project.id} withBorder radius="md" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Text fw={600}>Проект #{index + 1}</Text>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => removeProject(index)}
                  >
                    Удалить
                  </Button>
                </Group>

                <Grid gutter="sm">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="ID"
                      placeholder="readme-builder"
                      value={project.id}
                      onChange={(value) => updateProject(index, 'id', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Название"
                      placeholder="GitHub README Builder"
                      value={project.name}
                      onChange={(value) => updateProject(index, 'name', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12 }}>
                    <Textarea
                      label="Описание"
                      placeholder="Config-driven GitHub README generator"
                      autosize
                      minRows={2}
                      value={project.description}
                      onChange={(event) => updateProject(index, 'description', event.currentTarget.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Ссылка на репозиторий"
                      placeholder="https://github.com/your-username/repo"
                      value={project.repoUrl ?? ''}
                      onChange={(value) => updateProject(index, 'repoUrl', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Ссылка на демо"
                      placeholder="https://project-demo.com"
                      value={project.demoUrl ?? ''}
                      onChange={(value) => updateProject(index, 'demoUrl', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <MantineTextInput
                      label="Стек (через запятую)"
                      placeholder="React, TypeScript, Node.js"
                      value={project.tech.join(', ')}
                      onChange={(event) => handleTechChange(index, event.currentTarget.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <Switch
                      label="Выделить проект"
                      checked={project.highlight ?? false}
                      onChange={(event) => updateProject(index, 'highlight', event.currentTarget.checked)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Роль"
                      placeholder="Solo developer"
                      value={project.role ?? ''}
                      onChange={(value) => updateProject(index, 'role', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 3 }}>
                    <TextInput
                      label="Период"
                      placeholder="2024 — now"
                      value={project.period ?? ''}
                      onChange={(value) => updateProject(index, 'period', value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          ))}

          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addProject}>
            Добавить проект
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProjectsSettings;

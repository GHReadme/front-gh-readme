import React, { useCallback } from 'react';

import { Path, useFormContext, useWatch } from 'react-hook-form';

import { Button, Grid, Group, Paper, Stack, Switch, Text, TextInput as MantineTextInput, Title } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ContentLink, ProfileReadmeConfig } from 'core/types';
import TextInput from 'shared/ui/inputs/text-input';

const ContentSettings: React.FC = () => {
  const { control, setValue } = useFormContext<ProfileReadmeConfig>();
  const content = useWatch({ control, name: 'content' });

  const handleChange = useCallback(
    <TKey extends keyof ProfileReadmeConfig['content']>(key: TKey) =>
    (value: ProfileReadmeConfig['content'][TKey]) =>
      setValue(`content.${key}` as Path<ProfileReadmeConfig>, value, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue],
  );

  const updateLink = <TKey extends keyof ContentLink>(index: number, key: TKey, value: ContentLink[TKey]) => {
    const links = [...(content?.latest ?? [])];
    links[index] = { ...links[index], [key]: value } as ContentLink;
    handleChange('latest')(links);
  };

  const addLink = () => {
    const links = [...(content?.latest ?? []), { title: '', url: '', platform: '' }];
    handleChange('latest')(links);
  };

  const removeLink = (index: number) => {
    const links = [...(content?.latest ?? [])];
    links.splice(index, 1);
    handleChange('latest')(links);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Контент</Title>
          <Text size="sm" c="dimmed">
            Добавь последние статьи, видео или посты, которые стоит показать.
          </Text>
        </div>

        <Switch
          label="Показывать блок контента"
          checked={content?.active ?? false}
          onChange={(event) => handleChange('active')(event.currentTarget.checked)}
        />

        <TextInput
          label="Базовый URL"
          placeholder="https://dev.to/your-username"
          value={content?.baseUrl ?? ''}
          onChange={(value) => handleChange('baseUrl')(value)}
        />

        <Stack gap="sm">
          {content?.latest?.map((item, index) => (
            <Paper key={`${item.title}-${index}`} withBorder radius="md" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Text fw={600}>Материал #{index + 1}</Text>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => removeLink(index)}
                  >
                    Удалить
                  </Button>
                </Group>

                <Grid gutter="sm">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Заголовок"
                      placeholder="Практичные паттерны React + TS"
                      value={item.title}
                      onChange={(value) => updateLink(index, 'title', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <MantineTextInput
                      label="Ссылка"
                      placeholder="https://dev.to/..."
                      value={item.url}
                      onChange={(event) => updateLink(index, 'url', event.currentTarget.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Платформа"
                      placeholder="dev.to / medium / youtube"
                      value={item.platform}
                      onChange={(value) => updateLink(index, 'platform', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Дата публикации"
                      placeholder="2024-05-01"
                      value={item.publishedAt ?? ''}
                      onChange={(value) => updateLink(index, 'publishedAt', value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          ))}

          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={addLink}>
            Добавить материал
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContentSettings;

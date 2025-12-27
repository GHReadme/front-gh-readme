import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, TextInput as MantineTextInput, Switch } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ContentLink, ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import Group from '@/shared/ui/group';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const ContentSettings: React.FC = () => {
  const { control } = useFormContext<ProfileReadmeConfig>();
  const content = useWatch({ control, name: 'content' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const updateLink = <TKey extends keyof ContentLink>(index: number, key: TKey, value: ContentLink[TKey]) => {
    const links = [...(content?.latest ?? [])];
    links[index] = { ...links[index], [key]: value } as ContentLink;
    setFieldValue('content.latest')(links);
  };

  const addLink = () => {
    const links = [...(content?.latest ?? []), { title: '', url: '', platform: '' }];
    setFieldValue('content.latest')(links);
  };

  const removeLink = (index: number) => {
    const links = [...(content?.latest ?? [])];
    links.splice(index, 1);
    setFieldValue('content.latest')(links);
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
          onChange={(event) => setFieldValue('content.active')(event.currentTarget.checked)}
        />

        <TextInput
          label="Базовый URL"
          placeholder="https://dev.to/your-username"
          value={content?.baseUrl ?? ''}
          onChange={setFieldValue('content.baseUrl')}
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

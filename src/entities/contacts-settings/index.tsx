import React, { useCallback } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { Button, TextInput as MantineTextInput, Switch } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

import type { ContactItem, ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import Grid from '@/shared/ui/grid';
import Group from '@/shared/ui/group';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Select from '@/shared/ui/select';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const contactOptions: { label: string; value: ContactItem['type'] }[] = [
  { label: 'Email', value: 'email' },
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'Website', value: 'website' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Dev.to', value: 'devto' },
  { label: 'Medium', value: 'medium' },
  { label: 'Другое', value: 'other' },
];

const ContactsSettings: React.FC = () => {
  const { control, setValue } = useFormContext<ProfileReadmeConfig>();
  const contacts = useWatch({ control, name: 'contacts' });
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();

  const updateContacts = useCallback(
    (items: ContactItem[]) =>
      setValue('contacts.items', items, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue]
  );

  const handleItemChange = <TKey extends keyof ContactItem>(index: number, key: TKey, value: ContactItem[TKey]) => {
    const next = [...(contacts?.items ?? [])];
    next[index] = {
      ...next[index],
      [key]: value,
    } as ContactItem;

    updateContacts(next);
  };

  const handleAdd = () => {
    const next = [...(contacts?.items ?? []), { type: 'github', url: '', label: '' } satisfies ContactItem];
    updateContacts(next);
  };

  const handleRemove = (index: number) => {
    const next = [...(contacts?.items ?? [])];
    next.splice(index, 1);
    updateContacts(next);
  };

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Контакты</Title>
          <Text size="sm" c="dimmed">
            Настрой ссылки и способы связи для блока «Connect with me».
          </Text>
        </div>

        <Switch
          label="Показывать контакты"
          checked={contacts?.active ?? false}
          onChange={(event) => setFieldValue('contacts.active')(event.currentTarget.checked)}
        />

        <Stack gap="sm">
          {contacts?.items?.map((item, index) => (
            <Paper key={`${item.type}-${index}`} withBorder radius="md" p="md">
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Text fw={600}>Контакт #{index + 1}</Text>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => handleRemove(index)}
                  >
                    Удалить
                  </Button>
                </Group>

                <Grid gutter="sm">
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Select
                      label="Тип"
                      data={contactOptions}
                      value={item.type}
                      onChange={(value) => handleItemChange(index, 'type', (value ?? 'other') as ContactItem['type'])}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Подпись"
                      placeholder="Telegram"
                      value={item.label ?? ''}
                      onChange={(value) => handleItemChange(index, 'label', value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    <MantineTextInput
                      label="URL"
                      placeholder="https://t.me/your_handle"
                      value={item.url}
                      onChange={(event) => handleItemChange(index, 'url', event.currentTarget.value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          ))}

          <Button leftSection={<IconPlus size={16} />} variant="light" onClick={handleAdd}>
            Добавить контакт
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContactsSettings;

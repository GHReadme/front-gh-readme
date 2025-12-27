import React, { useEffect, useMemo, useRef } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import type { ProfileReadmeConfig } from '@/core/types';
import { useFormField } from '@/shared/hooks/useFormField';
import { useGithubUser } from '@/shared/hooks/useGithubUser';
import Grid from '@/shared/ui/grid';
import TextInput from '@/shared/ui/inputs/text-input';
import Paper from '@/shared/ui/paper';
import Stack from '@/shared/ui/stack';
import Text from '@/shared/ui/text';
import Title from '@/shared/ui/title';

const ProfileSettings: React.FC = () => {
  const {
    control,
    setValue,
    formState: { dirtyFields },
  } = useFormContext<ProfileReadmeConfig>();
  const profile = useWatch({ control, name: 'profile' });
  const { data: githubUser } = useGithubUser(profile?.username);
  const profileDirty = useMemo(() => dirtyFields?.profile ?? {}, [dirtyFields]);
  const { setFieldValue } = useFormField<ProfileReadmeConfig>();
  const prevUsernameRef = useRef(profile?.username);

  useEffect(() => {
    // При смене username сбрасываем автозаполняемые поля
    if (prevUsernameRef.current !== profile?.username) {
      prevUsernameRef.current = profile?.username;

      if (!profileDirty.fullName) {
        setValue('profile.fullName', '', { shouldDirty: false });
      }
      if (!profileDirty.company) {
        setValue('profile.company', '', { shouldDirty: false });
      }
      if (!profileDirty.location) {
        setValue('profile.location', '', { shouldDirty: false });
      }
    }
  }, [profile?.username, profileDirty, setValue]);

  useEffect(() => {
    if (!githubUser) return;

    const updates: Partial<ProfileReadmeConfig['profile']> = {};

    if (githubUser.name && !profileDirty.fullName) updates.fullName = githubUser.name;
    if (githubUser.company && !profileDirty.company) updates.company = githubUser.company;
    if (githubUser.location && !profileDirty.location) updates.location = githubUser.location;

    (Object.keys(updates) as (keyof ProfileReadmeConfig['profile'])[]).forEach((key) => {
      const value = updates[key];

      if (typeof value !== 'undefined') {
        setValue(`profile.${key}`, value, {
          shouldDirty: false,
          shouldTouch: true,
        });
      }
    });
  }, [githubUser, profileDirty, setValue]);

  return (
    <Paper withBorder radius="md" shadow="xs" p="md">
      <Stack gap="md">
        <div>
          <Title order={3}>Общие настройки профиля</Title>
          <Text size="sm" c="dimmed">
            Эти поля используются для генерации README и соответствуют типизации профиля.
          </Text>
        </div>

        <TextInput
          label="Username профиля GitHub"
          placeholder="octocat"
          description="Используется для загрузки данных с GitHub API."
          value={profile?.username}
          onChange={setFieldValue('profile.username')}
          required
        />

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="ФИО"
              placeholder="Фамилия Имя Отчество"
              description="Отображается в README, если указано."
              value={profile?.fullName}
              onChange={setFieldValue('profile.fullName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Роль в компании"
              placeholder="Senior Frontend Developer"
              description="Короткая формулировка вашей роли."
              value={profile?.role}
              onChange={setFieldValue('profile.role')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Компания"
              placeholder="AwesomeCorp"
              description="Текущая компания или род занятий."
              value={profile?.company}
              onChange={setFieldValue('profile.company')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Локация"
              placeholder="Россия, Москва"
              description="Город или формат работы (например, Remote)."
              value={profile?.location}
              onChange={setFieldValue('profile.location')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Основной стек"
              placeholder="React · TypeScript · Node.js"
              description="Короткая строка с ключевыми технологиями."
              value={profile?.mainStackLine}
              onChange={setFieldValue('profile.mainStackLine')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Языки для общения"
              placeholder="English, Russian"
              description="Например: English, Russian"
              value={profile?.languages}
              onChange={setFieldValue('profile.languages')}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ProfileSettings;

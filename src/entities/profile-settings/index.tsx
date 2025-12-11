import React, { useCallback, useEffect, useMemo } from 'react';

import { Path, useFormContext, useWatch } from 'react-hook-form';

import { Title, Text, Stack, Paper, Grid } from '@mantine/core';

import type { ProfileReadmeConfig } from 'core/types';
import { useGithubUser } from './api';
import TextInput from 'shared/ui/inputs/text-input';

const ProfileSettings: React.FC = () => {
  const {
    control,
    setValue,
    formState: { dirtyFields },
  } = useFormContext<ProfileReadmeConfig>();
  const profile = useWatch({ control, name: 'profile' });
  const { data: githubUser } = useGithubUser(profile?.username);
  const profileDirty = useMemo(() => dirtyFields?.profile ?? {}, [dirtyFields]);

  const handleChange = useCallback(
    <TKey extends keyof ProfileReadmeConfig['profile']>(key: TKey) =>
    (value: string) =>
      setValue(`profile.${key}` as Path<ProfileReadmeConfig>, value, {
        shouldDirty: true,
        shouldTouch: true,
      }),
    [setValue],
  );

  useEffect(() => {
    if (!githubUser) return;

    const updates: Partial<ProfileReadmeConfig['profile']> = {};

    if (githubUser.name && !profile?.fullName && !profileDirty.fullName)
      updates.fullName = githubUser.name;
    if (githubUser.company && !profile?.company && !profileDirty.company)
      updates.company = githubUser.company;
    if (githubUser.location && !profile?.location && !profileDirty.location)
      updates.location = githubUser.location;

    (Object.keys(updates) as (keyof ProfileReadmeConfig['profile'])[]).forEach((key) => {
      const value = updates[key];

      if (typeof value !== 'undefined') {
        setValue(`profile.${key}` as Path<ProfileReadmeConfig>, value, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    });
  }, [githubUser, profile, profileDirty, setValue]);

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
          onChange={handleChange('username')}
          required
        />

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="ФИО"
              placeholder="Фамилия Имя Отчество"
              description="Отображается в README, если указано."
              value={profile?.fullName}
              onChange={handleChange('fullName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Роль в компании"
              placeholder="Senior Frontend Developer"
              description="Короткая формулировка вашей роли."
              value={profile?.role}
              onChange={handleChange('role')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Компания"
              placeholder="AwesomeCorp"
              description="Текущая компания или род занятий."
              value={profile?.company}
              onChange={handleChange('company')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Локация"
              placeholder="Россия, Москва"
              description="Город или формат работы (например, Remote)."
              value={profile?.location}
              onChange={handleChange('location')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Основной стек"
              placeholder="React · TypeScript · Node.js"
              description="Короткая строка с ключевыми технологиями."
              value={profile?.mainStackLine}
              onChange={handleChange('mainStackLine')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Языки для общения"
              placeholder="English, Russian"
              description="Например: English, Russian"
              value={profile?.languages}
              onChange={handleChange('languages')}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default ProfileSettings;

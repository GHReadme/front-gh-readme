import React from 'react';

import { useFormContext } from 'react-hook-form';

import type { ProfileReadmeConfig } from 'core/types';
import TextInput from 'shared/ui/inputs/text-input';

import { useGithubUser } from './api';

import styles from './profile.module.scss';

const ProfileSettings: React.FC = () => {
  const { watch, setValue } = useFormContext<ProfileReadmeConfig>();
  const data = watch('profile');

  const { data: dataRequest } = useGithubUser(data?.username);

  console.log({ dataRequest });

  return (
    <div className={styles.profileSettings}>
      <h2 className={styles.profileTitle}>Общие настройки профиля</h2>
      <TextInput
        label="Username профиля GitHub"
        placeholder="username"
        value={data?.username}
        onChange={(v) => setValue('profile.username', v)}
      />
      <TextInput
        label="ФИО"
        placeholder="Фамиоия Имя Отчество"
        value={data?.fullName}
        onChange={(v) => setValue('profile.fullName', v)}
      />
      <TextInput
        label="Роль в компании"
        placeholder="Тимлид"
        value={data?.role}
        onChange={(v) => setValue('profile.role', v)}
      />
      <TextInput
        label="Компания"
        placeholder="ОАО Компания"
        value={data?.company}
        onChange={(v) => setValue('profile.company', v)}
      />
      <TextInput
        label="Локация"
        placeholder="Россия/Москва"
        value={data?.location}
        onChange={(v) => setValue('profile.location', v)}
      />
      <TextInput
        label="Основной стек в виде короткой строки"
        placeholder="React, TypeScript, Redux"
        value={data?.location}
        onChange={(v) => setValue('profile.location', v)}
      />
      <TextInput
        label="Языки, на которых удобно общаться"
        placeholder="English, Russian"
        value={data?.languages}
        onChange={(v) => setValue('profile.languages', v)}
      />
    </div>
  );
};

export default ProfileSettings;

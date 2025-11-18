import React from 'react';

import { useFormContext } from 'react-hook-form';

import type { ProfileReadmeConfig } from 'core/types';

const ProfileSettings: React.FC = () => {
  const { watch } = useFormContext<ProfileReadmeConfig>();
  const data = watch('profile');
  console.log(data);
  return <div className="p-2">Тут заполнение/настройки профиля</div>;
};

export default ProfileSettings;

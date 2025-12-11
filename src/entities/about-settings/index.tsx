import React from 'react';

import { useFormContext } from 'react-hook-form';

import type { ProfileReadmeConfig } from 'core/types';

const AboutSettings: React.FC = () => {
  const { watch } = useFormContext<ProfileReadmeConfig>();
  watch('about');
  return <div className="p-2">Тут заполнение/настройки обо мне</div>;
};

export default AboutSettings;

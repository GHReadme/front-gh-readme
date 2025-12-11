import React from 'react';

import { useFormContext } from 'react-hook-form';

import type { ProfileReadmeConfig } from 'core/types';

const ContactsSettings: React.FC = () => {
  const { watch } = useFormContext<ProfileReadmeConfig>();
  watch('contacts');
  return <div className="p-2">Тут заполнение/настройки контактов</div>;
};

export default ContactsSettings;

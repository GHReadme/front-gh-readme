import React from 'react';

import AboutSettings from 'entities/about-settings';
import ContactsSettings from 'entities/contacts-settings';
import ProfileSettings from 'entities/profile-settings';

/**
 * Тут собираются все entities внутри которых уже обработка полей
 */
const BaseSettings: React.FC = () => {
  return (
    <div>
      <ProfileSettings />
      <AboutSettings />
      <ContactsSettings />
    </div>
  );
};

export default BaseSettings;

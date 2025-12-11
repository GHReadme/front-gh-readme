import React from 'react';

import { Stack } from '@mantine/core';

import AboutSettings from 'entities/about-settings';
import ActivitySettings from 'entities/activity-settings';
import ContactsSettings from 'entities/contacts-settings';
import ContentSettings from 'entities/content-settings';
import FunFactsSettings from 'entities/fun-facts-settings';
import ProfileSettings from 'entities/profile-settings';
import ProjectsSettings from 'entities/projects-settings';
import TechStackSettings from 'entities/tech-stack-settings';

/**
 * Тут собираются все entities внутри которых уже обработка полей
 */
const BaseSettings: React.FC = () => {
  return (
    <Stack gap="md">
      <ProfileSettings />
      <AboutSettings />
      <ContactsSettings />
      <TechStackSettings />
      <ProjectsSettings />
      <ActivitySettings />
      <ContentSettings />
      <FunFactsSettings />
    </Stack>
  );
};

export default BaseSettings;

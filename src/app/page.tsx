'use client';

import { FormProvider, useForm } from 'react-hook-form';

import type { ProfileReadmeConfig } from '@/core/types';
import Tabs from '@/shared/ui/tabs';
import { TabType } from '@/shared/ui/tabs/types';
import BaseSettings from '@/widgets/base-settings';
import StatsSettings from '@/widgets/stats-settings';

import MarkdownEditor from '../widgets/markdown-editor';

const tabs: TabType[] = [
  {
    title: 'Базовые настройки',
    content: <BaseSettings />,
  },
  {
    title: 'Статистика',
    content: <StatsSettings />,
  },
  {
    title: 'Markdown editor',
    content: <MarkdownEditor />,
  },
] as const;

export default function Home() {
  const methods = useForm<ProfileReadmeConfig>();

  return (
    <FormProvider {...methods}>
      <Tabs tabs={tabs} />
    </FormProvider>
  );
}

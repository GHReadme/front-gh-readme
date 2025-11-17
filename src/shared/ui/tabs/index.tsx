import React, { useMemo, useState } from 'react';

import { Tabs as MantineTabs, TabsProps as MantineTabsProps } from '@mantine/core';

import { TabType } from './types';

type TabsProps<TTabs extends readonly TabType[]> = Omit<MantineTabsProps, 'value' | 'defaultValue' | 'onChange'> & {
  tabs: TTabs;
  value?: TTabs[number]['title'] | null;
  defaultValue?: TTabs[number]['title'] | null;
  onChange?: (value: TTabs[number]['title'] | null) => void;
};

const Tabs = <TTabs extends readonly TabType[]>({
  tabs,
  value,
  defaultValue,
  onChange,
  ...props
}: TabsProps<TTabs>) => {
  type TabValue = TTabs[number]['title'];

  const [activeTab, setActiveTab] = useState<TabValue | null>((value ?? defaultValue ?? null) as TabValue | null);

  const defaultValueTabs = useMemo(() => (defaultValue ?? tabs[0].title) as TabValue, [tabs, defaultValue]);

  const handleOnChange = (v: string | null) => {
    const next = v as TabValue | null;
    setActiveTab(next);
    onChange?.(next);
  };

  return (
    <MantineTabs defaultValue={defaultValueTabs} value={activeTab ?? undefined} onChange={handleOnChange} {...props}>
      <MantineTabs.List>
        {tabs.map((tab) => (
          <MantineTabs.Tab key={tab.title} value={tab.title} leftSection={tab?.icon}>
            {tab.title}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>

      {tabs.map((tab) => (
        <MantineTabs.Panel key={tab.title} value={tab.title}>
          <div className="h-full">{tab.content}</div>
        </MantineTabs.Panel>
      ))}
    </MantineTabs>
  );
};

export default Tabs;

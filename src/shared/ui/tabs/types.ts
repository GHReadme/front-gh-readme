import React from 'react';

export type TabType<TValue extends string = string> = {
  title: TValue;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

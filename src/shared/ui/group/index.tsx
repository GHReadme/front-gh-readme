import React, { ReactNode } from 'react';

import { Group as MantineGroup, GroupProps as MantineGroupProps } from '@mantine/core';

export type GroupProps = MantineGroupProps & {
  children?: ReactNode;
};

const Group: React.FC<GroupProps> = ({ children, ...props }) => {
  return <MantineGroup {...props}>{children}</MantineGroup>;
};

export default Group;

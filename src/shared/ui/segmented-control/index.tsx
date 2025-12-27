import React from 'react';

import {
  SegmentedControl as MantineSegmentedControl,
  SegmentedControlProps as MantineSegmentedControlProps,
} from '@mantine/core';

export type SegmentedControlProps = MantineSegmentedControlProps;

const SegmentedControl: React.FC<SegmentedControlProps> = ({ ...props }) => {
  return <MantineSegmentedControl {...props} />;
};

export default SegmentedControl;

import React from 'react';

import { Grid as MantineGrid, GridProps as MantineGridProps } from '@mantine/core';

export type GridProps = MantineGridProps & {
  children?: React.ReactNode;
};

export type GridColProps = React.ComponentProps<typeof MantineGrid.Col>;

const Grid: React.FC<GridProps> & { Col: typeof MantineGrid.Col } = ({ children, gutter = 'md', ...props }) => {
  return (
    <MantineGrid gutter={gutter} {...props}>
      {children}
    </MantineGrid>
  );
};

Grid.Col = MantineGrid.Col;

export default Grid;

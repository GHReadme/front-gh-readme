import React from 'react';

import { Input as MantineInput, Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';

type SelectorValue = string | null;

type SelectorProps = Omit<MantineSelectProps, 'data' | 'value' | 'defaultValue' | 'onChange'> & {
  data: { value: string; label: string }[];
  value?: SelectorValue;
  defaultValue?: SelectorValue;
  onChange?: (value: SelectorValue) => void;
};

const Selector: React.FC<SelectorProps> = ({ data, value, defaultValue, rightSection, onChange, ...props }) => {
  const handleOnChange: MantineSelectProps['onChange'] = (val) => {
    onChange?.(val ?? null);
  };

  const hasValue = value !== null && value !== undefined && value !== '';

  const defaultRightSection = (
    <MantineInput.ClearButton
      onClick={() => onChange?.(null)}
      style={{
        opacity: hasValue ? 1 : 0,
        pointerEvents: hasValue ? 'auto' : 'none',
      }}
    />
  );

  return (
    <MantineSelect
      data={data}
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={handleOnChange}
      rightSection={rightSection ?? defaultRightSection}
      {...props}
    />
  );
};

export default Selector;

import React from 'react';

import {
  Input as MantineInput,
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';

type NumberValue = number | null;

type Props = Omit<MantineNumberInputProps, 'onChange' | 'value' | 'defaultValue'> & {
  value?: NumberValue;
  defaultValue?: NumberValue;
  onChange?: (value: NumberValue) => void;
};

const NumberInput: React.FC<Props> = ({ value = null, defaultValue = null, rightSection, onChange, ...rest }) => {
  const handleOnChange: MantineNumberInputProps['onChange'] = (val) => {
    if (val === '' || val === undefined || val === null) {
      onChange?.(null);
      return;
    }

    const num = typeof val === 'number' ? val : Number(val);
    onChange?.(Number.isNaN(num) ? null : num);
  };

  const hasValue = value !== null;

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
    <MantineNumberInput
      value={value ?? ''}
      defaultValue={defaultValue ?? ''}
      onChange={handleOnChange}
      rightSection={rightSection ?? defaultRightSection}
      {...rest}
    />
  );
};

export default NumberInput;

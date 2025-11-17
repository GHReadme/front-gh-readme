import React from 'react';

import {
  Input as MantineInput,
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from '@mantine/core';

type TextInputProps = Omit<MantineTextInputProps, 'onChange'> & {
  onChange?: (value: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({ value, rightSection, onChange, ...props }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value ?? '');
  };

  const hasValue = value !== '';

  const defaultRightSection = (
    <MantineInput.ClearButton
      onClick={() => onChange?.('')}
      style={{
        opacity: hasValue ? 1 : 0,
        pointerEvents: hasValue ? 'auto' : 'none',
      }}
    />
  );

  return (
    <MantineTextInput
      value={value}
      onChange={handleOnChange}
      rightSection={rightSection ?? defaultRightSection}
      {...props}
    />
  );
};

export default TextInput;

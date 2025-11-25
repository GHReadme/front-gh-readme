import React from 'react';

import {
  Input as MantineInput,
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from '@mantine/core';

type TextareaProps = Omit<MantineTextareaProps, 'onChange'> & {
  onChange?: (value: string) => void;
  minHeight?: string;
  minWidth?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  minHeight = '100px',
  minWidth = '300px',
  rightSection,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value ?? '');
  };

  const hasValue = !!value && value !== '';

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
    <MantineTextarea
      value={value ?? ''}
      onChange={handleOnChange}
      rightSection={rightSection ?? defaultRightSection}
      styles={{
        input: {
          minHeight,
          minWidth,
        },
      }}
      {...props}
    />
  );
};

export default Textarea;

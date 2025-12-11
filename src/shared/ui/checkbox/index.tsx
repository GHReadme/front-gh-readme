import React from 'react';

import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core';

type CheckBoxProps = Omit<MantineCheckboxProps, 'onChange' | 'checked' | 'defaultChecked'> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ checked, defaultChecked, onChange, ...props }, ref) => {
    const handleOnChange: MantineCheckboxProps['onChange'] = (event) => {
      onChange?.(event.currentTarget.checked);
    };

    const checkboxProps: MantineCheckboxProps = {
      ...props,
      onChange: handleOnChange,
      ...(checked !== undefined ? { checked } : {}),
      ...(checked === undefined && defaultChecked !== undefined ? { defaultChecked } : {}),
    };

    return <MantineCheckbox ref={ref} {...checkboxProps} />;
  },
);

CheckBox.displayName = 'CheckBox';

export default CheckBox;

import { useCallback } from 'react';

import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

type UseFormFieldOptions = {
  shouldDirty?: boolean;
  shouldTouch?: boolean;
};

/**
 * Универсальный хук для упрощения работы с полями формы React Hook Form
 * Устраняет дублирование handleChange паттерна
 */
export function useFormField<TForm extends FieldValues = FieldValues>(options: UseFormFieldOptions = {}) {
  const { setValue } = useFormContext<TForm>();
  const { shouldDirty = true, shouldTouch = true } = options;

  const setFieldValue = useCallback(
    <TKey extends Path<TForm>>(key: TKey) =>
      (value: PathValue<TForm, TKey>) => {
        setValue(key, value, {
          shouldDirty,
          shouldTouch,
        });
      },
    [setValue, shouldDirty, shouldTouch]
  );

  return { setFieldValue };
}

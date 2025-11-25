import React from 'react';

import { getErrorMessage } from 'core/api';

interface ErrorBlockProps {
  error: unknown;
  onRetry?: () => void;
}

export const ErrorBlock: React.FC<ErrorBlockProps> = ({ error, onRetry }) => {
  const message = getErrorMessage(error);

  return (
    <div style={{ padding: 16, border: '1px solid #f00' }}>
      <div>Произошла ошибка: {message}</div>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
};

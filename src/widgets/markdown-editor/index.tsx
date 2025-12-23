'use client';

import React, { useState } from 'react';

import type { SimpleMDEReactProps } from 'react-simplemde-editor';

import dynamic from 'next/dynamic';

import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const MarkdownEditor: React.FC = () => {
  const [value, setValue] = useState('**Hello world!**');

  const mdeOptions: SimpleMDEReactProps['options'] = {
    autofocus: true,
    spellChecker: false,
    placeholder: 'Пишите Markdown здесь...',
    status: ['autosave', 'lines', 'words', 'cursor'],
    sideBySideFullscreen: false,
    toolbar: [
      'bold',
      'italic',
      'heading',
      '|',
      'code',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
    ],
  };

  return (
    <div>
      <SimpleMDE value={value} onChange={setValue} options={mdeOptions} />
      <button onClick={() => console.log(value)} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Сохранить
      </button>
    </div>
  );
};

export default MarkdownEditor;

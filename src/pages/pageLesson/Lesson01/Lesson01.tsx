import React from 'react';

export const Lesson01 = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2><strong>Khởi tạo dự án</strong></h2>

      <ol style={{ paddingLeft: '1.5rem' }}>
        <li>
          <strong>Khởi tạo React TS với Vite:</strong>{' '}
          <a href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">
            https://vitejs.dev/guide/
          </a>
        </li>
        <li>
          <strong>Sửa lại nội dung file eslint:</strong>{' '}
          <a
            href="https://github.com/thangpqtechlead/test-node-example/blob/lint/.eslintrc.js"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/thangpqtechlead/test-node-example/blob/lint/.eslintrc.js
          </a>
        </li>
        <li>
          <strong>Upload code lên GitHub</strong>
        </li>
      </ol>
    </div>
  );
};

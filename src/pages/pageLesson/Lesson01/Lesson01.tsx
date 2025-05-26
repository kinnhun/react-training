export const Lesson01 = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Khởi tạo dự án</h2>

      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Khởi tạo React TS với Vite:</strong>{' '}
          <a href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">
            https://vitejs.dev/guide/
          </a>
        </li>
        <li>
          <strong>Cài đặt Tailwind, Antd, React Query, React Hook Form</strong>
        </li>
        <li>
          <strong>Thiết lập eslint:</strong>{' '}
          <a
            href="https://github.com/thangpqtechlead/test-node-example/blob/lint/.eslintrc.js"
            target="_blank"
            rel="noreferrer"
          >
            Mẫu file eslint
          </a>
        </li>
        <li>
          <strong>Push lên GitHub</strong>
        </li>
      </ol>
    </div>
  );
};

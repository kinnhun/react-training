export const Lesson02 = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Thực hành Router</h2>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          Sử dụng <strong>react-router-dom</strong> để tổ chức route cho:
          <ul className="list-disc pl-5">
            <li>Trang đăng nhập, đăng ký, quên mật khẩu</li>
            <li>Trang welcome</li>
            <li>Danh sách bài tập</li>
            <li>Chi tiết bài tập</li>
            <li>Layout sau khi đăng nhập (gồm header và sidebar)</li>
          </ul>
        </li>
        <li>
          Sử dụng <strong>Redux</strong> để lưu trạng thái đăng nhập:
          <ul className="list-disc pl-5">
            <li>Lưu user sau khi đăng nhập thành công</li>
            <li>Chuyển hướng khi chưa đăng nhập</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

# Grade Portal Web
## Group: `A`
### Thành Viên:
- Danh sách thành viên:

| MSSV    | Tên SV                     | Vai trò |
| ------- | -------------------------- | ------- |
| 2210737 | Nguyễn Huỳnh Hải Đăng      | PO      |
| 2213857 | Võ Ngọc Tú                 | Dev     |
| 2210694 | Nguyễn Quốc Đạt            | Dev     |
| 2211572 | Nguyễn Gia Khiêm           | Dev     |
| 2210456 | Nguyễn Hoàng Danh          | Dev     |
| 2211664 | Võ Trần Minh Khoa          | Dev     |
| 2211560 | Trần Tiến Khải             | Dev     |

Mô tả đề tài: Hiện thực giao diện frontend web cho ứng dụng tra cứu và quản lý điểm cho sinh viên/ giảng viên.
- Backend sử dụng: [grade-portal-be-go-1](https://github.com/dath-241/grade-portal-be-go-1)

### Tính năng đã hoàn thành:
- Trang tra cứu điểm cho sinh viên/ giảng viên.
- Trang cập nhật bảng điểm cho giảng viên.
- Trang quản lý khóa học, lớp học cho admin.
- Trang chỉnh sửa thông tin người dùng, thêm và xóa khóa học, lớp học cho admin.
- Trang đăng nhập sử dụng google login với api login từ backend.
- Chức năng hall of fame để xem bảng xếp hạng.
### Tính năng chưa hoàn thành:
- Tự động cập nhật bảng điểm.

### Hướng dẫn cài đặt:
#### Chạy bằng DockerFile:
- Tạo file docker-compose.yml như sau: [docker-compose.yml](https://github.com/dath-241/grade-portal-web-2/blob/Final/docker-compose.yml)
- Chạy lệnh:
```basg
docker-compose up
```

### Deployment:
#### Ứng dụng được deploy tại domain:
[Grade-Portal-Web-2](https://grade2.thuanle.me)

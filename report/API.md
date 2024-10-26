# API specification

## Admin

### Đăng nhập - Đăng xuất

- **POST** 
  - **Đăng Nhập**: `admin/api/login`  
    - Mô tả: Tính năng đăng nhập, cookie sẽ được ghi vào cookie trên máy người dùng trong vòng 24h
    - Yêu cầu gửi lên :
    ```bash
      {
        "idToken": idToken
      }
    ```
  - **Đăng Xuất**: `admin/api/logout`  
    - Mô tả: Tính năng đăng xuất, xóa cookie trên máy người dùng

### Quản lí thành viên

 - **Tạo Tài Khoản**: `admin/api/account/create`  
    - Mô tả: Tạo thêm tài khoản (có thể gửi lên một danh sách tài khoản).
    - Yêu cầu gửi lên:
    ```bash
      [
        { // object 1
          "email": email,
          "name": name,
          "ms": mssv,
          "faculty": faculty,
          "role": role
        },
        { // object 2
          ....
        }
      ]
    ```
- **Xóa Tài Khoản**: `admin/api/account/delete`
   - Mô tả: Xóa tài khoản của giảng viên / sinh viên ra khỏi hệ thống

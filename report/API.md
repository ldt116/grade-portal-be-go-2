# API specification

## Admin

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
 
- **Tìm thông tin tài khoản**: `admin/api/account/:ms`
    - Mô tả: Tìm một tài khoản theo mã số ms
    - Yêu cầu: Mã số ms cần tồn tại trong hệ thống

- **Tạo khóa học**: `admin/api/course/create`
    - Mô tả: Tạo thêm một khóa học mới
    - Yêu cầu: 
   ```bash
   {
     "name": name,
    "credit": credit,
    "ms": ms,
    "number": number,
    "desc": desc
   }
    ```
- **Tạo lớp học**: `admin/api/class/create`
    - Mô tả: Tạo thêm một lớp học mới trong khóa học đã có
    - Yêu cầu:
  ```bash
   {
     "courseID": courseID,
      "classID": classID,
      "className": className,
      "teacherID": teacherID,
      "listStudent_id": [ // Danh sách các mssv
          mssv_1, mssv_2, ...
        ]
   }
    ```
  

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
    "semester": semester
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
      "listStudentID": [ mssv1, mssv2, ...]
   }
    ```
## Giảng viên
  - **Nhập bảng điểm**: `teacher/api/class/score`
    - Mô tả: Cập nhật bảng điểm cho các sinh viên trong lớp
    - Yêu cầu:
  ```bash
   {
     "courseID": courseID,
      "classID": classID,
      "semester": semester,
      "score": [
      "MSSV": MSSV,
      "Data": {
        "BT": []float // Điểm thành phần cột điểm BT,
        "TN": []float // Điểm thành phần cột điểm TN,
        "BTL": []float // Điểm thành phần cột điểm BTL,
        "GK": float // điểm giữa kỳ
        "CK": float // điểm cuối kỳ
              }
               ],
   }

```

 - **Thêm thành viên**: `teacher/api/class/addMem`
    - Mô tả: Thêm thành viên mới vào lớp
    - Yêu cầu:
    ```bash
   {
     "courseID": courseID,
      "classID": classID,
      "semester": semester,
      "newStudent": [ mssv1, mssv2, ...]
   }
    ```

   ## Sinh viên
- **Tra cứu điểm**: `student/api/score`
    - Mô tả: Tra cứu điểm của một sinh viên
    - Yêu cầu:
    ```bash
   {
     "studentID": studentID,
     "courseID": courseID,
      "semester": semester
   }
    ```

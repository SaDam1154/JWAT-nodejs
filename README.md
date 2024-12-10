## Practice NodeJS:

Viết API quản lí học sinh của một ngôi trường (sử dụng Express, NodeJS):

## \*\*KHÔNG CẦN DB, SỬ DỤNG ARRAY ĐỂ LƯU TẠM KHI CHẠY

# Enitity:

-   Student: + ID: unique + Name: tên học sinh + Class: lớp mà học sinh thuộc về.
-   Class: + ID: unique + Class Name: tên lớp

# Constraints:

-   1 HS chỉ thuộc về duy nhất 1 class
-   Class Name không được phép trùng
-   Student Name không được phép trùng.
-   1 HS phải thuộc về 1 class nào đó.
-   1 Class có thể có nhiều học sinh

# APIs:

-   Quản lí học sinh:
    -   Thêm Học Sinh
    -   Update thông tin học sinh
    -   Xóa học sinh
    -   Truy xuất tất cả danh sách học sinh
    -   Truy xuất thông tin HS theo ID
    -   Truy xuất thông tin HS theo Name (search LIKE)
    -   Truy xất tất cả học sinh theo Class (sử dung Class Name).

# - Quản lí Lớp:

        + Thêm 1 Lớp
        + Update thông tin Lớp
        + Xóa Lớp (nếu lớp còn HS thì ko được phép xóa)
        + Truy xuất thông tin Lớp theo ID

---

## API Endpoints:

### 1. Quản lí học sinh:

-   **POST** `/api/students`: Thêm Học Sinh.
-   **PUT** `/api/students/:id`: Update thông tin học sinh (theo id).
-   **DELETE** `/api/students/:id`: Xóa học sinh (theo id).
-   **GET** `/api/students`: Truy xuất tất cả danh sách học sinh.
-   **GET** `/api/students/:id`: Truy xuất thông tin HS theo ID.
-   **GET** `/api/students/search?name=<name>`: Truy xuất thông tin HS theo Name (search LIKE).
-   **GET** `/api/students/class?className=<class_name>`: Truy xất tất cả học sinh theo Class.

### 2. Class Management:

-   **POST** `/api/classes`: Thêm 1 Lớp.
-   **PUT** `/api/classes/:id`: Update thông tin Lớp (theo id).
-   **DELETE** `/api/classes/:id`: Xóa Lớp (nếu lớp còn HS thì ko được phép xóa).
-   **GET** `/api/classes`: Truy xuất tất cả danh sách Lớp.
-   **GET** `/api/classes/:id`:Truy xuất thông tin Lớp theo ID.

## Example API Requests

### Thêm Học Sinh (POST /api/students)

```json
{
    "name": "Student name1",
    "classId": "JWAT1"
}
```

### Update thông tin học sinh (PUT /api/students/:id)

```json
{
    "name": "Student name1",
    "classId": "JWAT1"
}
```

### Retrieve Students by Class (GET /api/students/class?className=JWAT1)

```json
{
    "success": true,
    "students": [
        {
            "id": "1",
            "name": "John Doe",
            "classId": "JWAT1"
        }
    ]
}
```

### Add a Class (POST /api/classes)

```json
{
    "id": "JWAT1",
    "className": "Class CLV A"
}
```

### Update Class Information (PUT /api/classes/:id)

```json
{
    "className": "Class CLV B"
}
```

## Installation Steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/jwat.git
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the server**:

    ```bash
    npm start
    ```

    The server will run at `http://localhost:3000`.

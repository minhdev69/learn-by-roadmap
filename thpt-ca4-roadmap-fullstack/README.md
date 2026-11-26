# PROJECT: CATCH ME IF YOU CAN v2.0 (FULL-STACK RPG ROADMAP: THPT D01 & BCA CA4)

Hệ thống Game RPG Lộ trình ôn thi cấp tốc **THPT Quốc gia (Khối D01: Toán, Văn, Anh)** và **Đánh giá Năng lực Bộ Công an (Mã CA4: Toán, Văn NLXH 500 chữ, Tiếng Anh, Lịch sử, Địa lí)** hướng tới kỳ thi **Tháng 6–7/2027** với quỹ thời gian **3 giờ/ngày**.

## 1. Tính năng nâng cấp nổi bật
1. **2 Thanh Chỉ Số Song Song & Công Thức Quy Đổi Điểm Xét Tuyển BCA Thực Tế**:
   - **Điểm THPT D01 (Thang 30.00)** — Trọng số 40%.
   - **Điểm ĐGNL Bộ Công an CA4 (Thang 100.0)** — Trọng số 60% (quy về thang 30).
   - **Công thức Điểm Xét Tuyển BCA**: `ĐXT = (Điểm_THPT_30 * 0.4) + ((Điểm_CA4_100 * 0.3) * 0.6) + Điểm_Ưu_Tiên`.
2. **Hệ Thống 6 Ải (Phase 0 -> Phase 5) Đủ 5 Môn (Toán - Văn - Anh - Sử - Địa)**:
   - Bổ sung trọn vẹn lộ trình **Lịch sử (10đ CA4)** và **Địa lí (15đ CA4)** xuyên suốt từ Phase 0 đến Phase 5, bên cạnh các chuyên đề Toán GDPT 2018 (Xác suất có điều kiện, Công thức Bayes, Thống kê ghép nhóm, Tối ưu hóa thực tế), Văn NLXH 500 chữ và Tiếng Anh.
3. **Màn Hình Chiến Đấu (Quest Arena)**:
   - Mỗi Nhiệm vụ nhỏ (Sub-quest) gồm **(A) Lý thuyết tóm tắt trọng tâm (Cheat-Sheet)** và **(B) Bộ câu hỏi trắc nghiệm trực tiếp trên App**.
   - Yêu cầu trả lời đúng **>= 80%** số câu hỏi mới được tính là **Hoàn thành Sub-quest** và cộng Điểm / EXP.
4. **Đấu Trùm Cuối Mỗi Phase (Boss Fight)**:
   - Chỉ mở khóa khi hoàn thành **100% nhiệm vụ nhỏ** trong Phase đó.
   - Bài kiểm tra tổng hợp 5 môn có đồng hồ đếm ngược, yêu cầu đạt **>= 80%** để hạ Trùm và nhận điểm thưởng Boss.
5. **Phòng Tập Tự Upload Đề & Chấm Điểm**:
   - Cho phép tải lên file đề (`.txt`, `.md`, `.json`, `.csv`) hoặc dán văn bản câu hỏi trắc nghiệm để chuyển thành bài thi tương tác có bấm giờ và chấm điểm tự động.
6. **Backend Node.js + Express + Mongoose kết nối MongoDB Atlas**:
   - Đã cấu hình sẵn URI MongoDB Atlas của bạn trong `.env` và `server/index.js`.

## 2. Hướng dẫn cài đặt và chạy dự án trên máy (VS Code)
```bash
# 1. Cài đặt toàn bộ thư viện Frontend (React/Vite) & Backend (Express/Mongoose)
npm install

# 2. Chạy đồng thời cả Backend MongoDB (Port 5000) và Frontend Vite (Port 5173)
npm run dev:full
```

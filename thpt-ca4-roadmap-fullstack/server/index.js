import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserProgress from './models/UserProgress.js';
import CustomExam from './models/CustomExam.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://dopaminhzforwork_db_user:123Dbtnctgt%21@cluster0.wuuiejj.mongodb.net/thpt_ca4_roadmap?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Kết nối MongoDB Atlas
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Đã kết nối thành công tới MongoDB Atlas (thpt_ca4_roadmap)!'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB Atlas:', err.message));

// 1. Lấy tiến độ học tập & danh sách đề tự luyện của người dùng
app.get('/api/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = await UserProgress.create({ userId });
    }
    const customExams = await CustomExam.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, progress, customExams });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Lưu / Cập nhật tiến độ Sub-quest, Boss Fight và Điểm số lên MongoDB Atlas
app.post('/api/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { completedSubQuests, defeatedBosses, priorityBonus, stats } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { userId },
      {
        $set: {
          completedSubQuests: completedSubQuests || {},
          defeatedBosses: defeatedBosses || {},
          priorityBonus: Number(priorityBonus || 0),
          statsSnapshot: stats || {}
        }
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Lưu đề thi tự upload trong Phòng Tập lên MongoDB Atlas
app.post('/api/exams/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, title, category, durationMinutes, questions } = req.body;

    const exam = await CustomExam.findOneAndUpdate(
      { examId: id },
      {
        $set: {
          examId: id,
          userId,
          title,
          category,
          durationMinutes,
          questions
        }
      },
      { new: true, upsert: true }
    );
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Lưu kết quả làm đề trong Phòng Tập
app.post('/api/exams/:examId/attempt', async (req, res) => {
  try {
    const { examId } = req.params;
    const { correct, totalQ, score10, score100 } = req.body;
    const exam = await CustomExam.findOneAndUpdate(
      { examId },
      {
        $push: {
          attempts: { correct, totalQ, score10, score100, submittedAt: new Date() }
        }
      },
      { new: true }
    );
    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server Backend THPT D01 & BCA CA4 đang chạy tại http://localhost:${PORT}`);
});

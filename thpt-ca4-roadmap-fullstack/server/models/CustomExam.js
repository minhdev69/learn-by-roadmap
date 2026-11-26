import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  q: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true, default: 0 },
  explain: { type: String, default: '' }
});

const CustomExamSchema = new mongoose.Schema(
  {
    examId: { type: String, required: true, unique: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Đề Tự Upload / Biên Soạn' },
    durationMinutes: { type: Number, default: 15 },
    questions: [QuestionSchema],
    attempts: [
      {
        correct: Number,
        totalQ: Number,
        score10: Number,
        score100: Number,
        submittedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('CustomExam', CustomExamSchema);

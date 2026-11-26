import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    agentName: { type: String, default: 'Nguyễn Cao Trường Minh' },
    completedSubQuests: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    defeatedBosses: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    priorityBonus: { type: Number, default: 0 },
    streakDays: { type: Number, default: 5 },
    statsSnapshot: {
      thptScore: { type: Number, default: 0 },
      ca4Score: { type: Number, default: 0 },
      bcaAdmissionScore: { type: Number, default: 0 },
      totalExp: { type: Number, default: 0 },
      level: { type: Number, default: 1 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('UserProgress', UserProgressSchema);

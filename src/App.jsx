import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, Circle, ShieldAlert, Cpu, Database, Flame, Trophy, Lock } from 'lucide-react';

// Cấu trúc dữ liệu đã được tính toán chính xác để tổng điểm là 30 điểm
const ROADMAP_DATA = [
  {
    phaseId: 0,
    title: "Phase 0: Rã đông kiến thức (Từ 0 điểm)",
    description: "Khôi phục trí nhớ sau 8 năm rời xa sách vở.",
    icon: <Database className="w-6 h-6 text-slate-400" />,
    targetPoints: 15,
    tasks: [
      { id: "t0_1", title: "Sử dụng lại máy tính Casio/Vinacal (Toán)", points: 2.0 },
      { id: "t0_2", title: "Ôn lại các thì cơ bản (Tiếng Anh)", points: 3.0 },
      { id: "t0_3", title: "Lấy lại từ vựng nền tảng (Tiếng Anh)", points: 3.0 },
      { id: "t0_4", title: "Cấu trúc một đoạn văn cơ bản (Ngữ Văn)", points: 3.0 },
      { id: "t0_5", title: "Đọc hiểu bảng số liệu cơ bản (Địa lí)", points: 2.0 },
      { id: "t0_6", title: "Nắm mốc thời gian lịch sử chính (Lịch sử)", points: 2.0 }
    ]
  },
  {
    phaseId: 1,
    title: "Phase 1: Xây dựng nền móng (Chạm mốc 21đ)",
    description: "Đạt mức điểm cạnh tranh an toàn.",
    icon: <ShieldAlert className="w-6 h-6 text-blue-400" />,
    targetPoints: 21,
    tasks: [
      { id: "t1_1", title: "Hàm số & Phương trình mũ (Toán)", points: 1.5 },
      { id: "t1_2", title: "Hình học không gian Oxyz (Toán)", points: 1.5 },
      { id: "t1_3", title: "Đọc hiểu văn bản (Ngữ Văn)", points: 1.0 },
      { id: "t1_4", title: "Cấu trúc nghị luận xã hội (Ngữ Văn)", points: 1.0 },
      { id: "t1_5", title: "Từ vựng chuyên đề (Tiếng Anh)", points: 0.5 },
      { id: "t1_6", title: "Mệnh đề quan hệ & Điều kiện (Tiếng Anh)", points: 0.5 }
    ]
  },
  {
    phaseId: 2,
    title: "Phase 2: Lập trình Tư duy (Chạm mốc 25đ)",
    description: "Mở khóa các kỹ năng giải nhanh.",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    targetPoints: 25,
    tasks: [
      { id: "t2_1", title: "Xác suất có điều kiện (Toán 2018)", points: 1.0 },
      { id: "t2_2", title: "Thống kê ghép nhóm (Toán 2018)", points: 1.0 },
      { id: "t2_3", title: "Phân tích nhân vật/đoạn thơ (Ngữ Văn)", points: 1.0 },
      { id: "t2_4", title: "Đọc hiểu ngữ cảnh & Sắp xếp đoạn (Tiếng Anh)", points: 1.0 }
    ]
  },
  {
    phaseId: 3,
    title: "Phase 3: Chuyên gia Khắc phục (Chạm mốc 28đ)",
    description: "Tránh bẫy đề thi và tối ưu hóa thời gian.",
    icon: <Flame className="w-6 h-6 text-orange-400" />,
    targetPoints: 28,
    tasks: [
      { id: "t3_1", title: "Tích phân & Ứng dụng (Toán)", points: 1.0 },
      { id: "t3_2", title: "Phản biện sâu trong Nghị luận (Ngữ Văn)", points: 1.0 },
      { id: "t3_3", title: "Đọc hiểu học thuật dài (Tiếng Anh)", points: 1.0 }
    ]
  },
  {
    phaseId: 4,
    title: "Phase 4: Đặc nhiệm Phá đảo (Chạm mốc 29đ)",
    description: "Chiếm lĩnh tuyệt đối các câu vận dụng cao.",
    icon: <Target className="w-6 h-6 text-red-400" />,
    targetPoints: 29,
    tasks: [
      { id: "t4_1", title: "Bài toán thực tế, Tối ưu hóa (Toán)", points: 0.5 },
      { id: "t4_2", title: "Suy luận nghĩa từ mới (Tiếng Anh)", points: 0.5 }
    ]
  },
  {
    phaseId: 5,
    title: "Phase BONUS: Bức phá giới hạn (Chạm mốc 30đ)",
    description: "Phần thưởng tuyệt đối cho sự bền bỉ.",
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    targetPoints: 30,
    tasks: [
      { id: "tb_1", title: "Giải mã câu Phân loại cực khó", points: 1.0 }
    ]
  }
];

export default function App() {
  const [targetScore, setTargetScore] = useState(25);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentScore, setCurrentScore] = useState(0);
  const [floatingPoints, setFloatingPoints] = useState([]);

  // Calculate current score based on completed tasks
  useEffect(() => {
    let score = 0;
    ROADMAP_DATA.forEach(phase => {
      phase.tasks.forEach(task => {
        if (completedTasks.has(task.id)) {
          score += task.points;
        }
      });
    });
    setCurrentScore(score);
  }, [completedTasks]);

  const toggleTask = (e, task) => {
    const isCompleted = completedTasks.has(task.id);
    const newCompleted = new Set(completedTasks);
    
    if (isCompleted) {
      newCompleted.delete(task.id);
    } else {
      newCompleted.add(task.id);
    }
    
    setCompletedTasks(newCompleted);

    // Create floating point effect
    const rect = e.currentTarget.getBoundingClientRect();
    const newFloat = {
      id: Date.now(),
      points: task.points,
      isPositive: !isCompleted,
      x: rect.right - 20,
      y: rect.top
    };
    
    setFloatingPoints(prev => [...prev, newFloat]);
    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(p => p.id !== newFloat.id));
    }, 1000);
  };

  // Lọc lộ trình dựa trên targetScore (luôn hiển thị Phase 0)
  const visiblePhases = ROADMAP_DATA.filter(phase => {
    if (phase.phaseId === 0) return true; // Phase 0 luôn hiện
    if (phase.phaseId === 5) return targetScore > 29; // Bonus phase
    return phase.targetPoints <= targetScore || (phase.targetPoints > targetScore && targetScore > ROADMAP_DATA[phase.phaseId - 1].targetPoints);
  });

  const percentage = Math.min(100, Math.round((currentScore / targetScore) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono pb-20">
      {/* Cố định Header Dashboard */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400 tracking-wider">PROJECT: CATCH ME IF YOU CAN</h1>
              <p className="text-slate-400 text-sm mt-1">Đặc vụ: Nguyễn Cao Trường Minh | Chuyên án THPT 2027</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white tracking-tighter">
                {currentScore.toFixed(2)}<span className="text-xl text-slate-500">/30</span>
              </div>
              <div className="text-emerald-500 text-sm font-bold">CURRENT SCORE</div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between mb-2">
              <label className="font-semibold text-slate-300">Set Target Score: <span className="text-blue-400">{targetScore}</span></label>
              <span className="text-sm text-slate-400">Total Completion: {percentage}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="30" 
              step="1"
              value={targetScore} 
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Floating Points Overlay */}
      {floatingPoints.map(fp => (
        <div 
          key={fp.id}
          className={`fixed pointer-events-none z-50 font-bold text-2xl animate-floating ${fp.isPositive ? 'text-emerald-400' : 'text-red-500'}`}
          style={{ left: fp.x, top: fp.y }}
        >
          {fp.isPositive ? '+' : '-'}{fp.points}
        </div>
      ))}

      {/* Lộ trình */}
      <div className="max-w-3xl mx-auto p-4 mt-6">
        <div className="space-y-8">
          {visiblePhases.map((phase, idx) => (
            <div key={phase.phaseId} className="relative">
              {/* Kết nối lộ trình */}
              {idx !== visiblePhases.length - 1 && (
                <div className="absolute left-6 top-14 bottom-[-2rem] w-0.5 bg-slate-800" />
              )}
              
              <div className="flex items-start gap-4">
                <div className={`mt-1 rounded-full p-2 bg-slate-800 border-2 ${currentScore >= phase.targetPoints ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-slate-700'}`}>
                  {currentScore >= phase.targetPoints ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : phase.icon}
                </div>
                
                <div className="flex-1">
                  <h2 className={`text-xl font-bold ${currentScore >= phase.targetPoints ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {phase.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4">{phase.description}</p>
                  
                  <div className="grid gap-3">
                    {phase.tasks.map(task => {
                      const isCompleted = completedTasks.has(task.id);
                      return (
                        <div 
                          key={task.id}
                          onClick={(e) => toggleTask(e, task)}
                          className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all duration-300
                            ${isCompleted 
                              ? 'bg-emerald-900/20 border-emerald-500/50 glow-effect' 
                              : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-600" />
                            )}
                            <span className={`${isCompleted ? 'text-emerald-100 line-through opacity-70' : 'text-slate-300'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                            +{task.points.toFixed(2)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {targetScore < 30 && (
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-slate-800 rounded-lg mt-8 text-slate-500">
              <Lock className="w-5 h-5 mr-2" />
              Tăng mục tiêu điểm để mở khóa thêm nhiệm vụ (Max 30)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

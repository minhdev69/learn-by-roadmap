import React, { useState, useEffect, useRef } from 'react';
import {
  Target, CheckCircle, Circle, ShieldAlert, Cpu, Database, Flame, Trophy, Lock,
  Swords, BookOpen, Clock, Upload, FileText, Play, RotateCcw, Award, Zap,
  ChevronRight, AlertTriangle, Check, X, Server, RefreshCw, Calendar, Sparkles,
  HelpCircle, BarChart3, Layers, Compass, History, Calculator, Feather, Globe
} from 'lucide-react';

// ============================================================================
// CẤU HÌNH KẾT NỐI BACKEND MONGODB ATLAS (EXPRESS + MONGOOSE API)
// ============================================================================
const API_BASE_URL = 'http://localhost:5000/api';
const USER_ID = 'agent_nguyen_cao_truong_minh_2027';

// ============================================================================
// DỮ LIỆU LỘ TRÌNH GAME RPG: THPT QG (D01 - 30Đ) & ĐGNL BỘ CÔNG AN (CA4 - 100Đ)
// Thiết kế cho quỹ thời gian 3h/ngày hướng tới kỳ thi Tháng 6-7/2027
// Tổng điểm chuẩn: THPT D01 = 30.00 điểm | ĐGNL CA4 = 100.00 điểm
// ============================================================================
const ROADMAP_PHASES = [
  {
    phaseId: 0,
    code: 'PHASE 0',
    title: 'Phase 0: Rã Đông Kiến Thức (Từ 0 Điểm)',
    timeline: 'Tuần 1 – Tuần 4 (84 giờ học | 3h/ngày)',
    description: 'Khôi phục trí nhớ nền tảng sau 8 năm rời xa sách vở cho cả 5 môn: Toán, Văn, Anh, Sử, Địa.',
    targetThpt: 8.5,
    targetCa4: 26.0,
    themeColor: 'emerald',
    quests: [
      {
        id: 'q0_1',
        subject: 'Toán',
        badge: 'D01 + CA4 (35đ)',
        title: 'Làm chủ Casio/Vinacal & Biến đổi Đại số nền tảng',
        description: 'Kỹ năng bấm máy giải phương trình, hệ phương trình, đạo hàm, tích phân và bảng giá trị TABLE.',
        subQuests: [
          {
            id: 'sq0_1_1',
            title: 'Nhiệm vụ 0.1A: Kỹ thuật CALC, SOLVE và TABLE (MODE 8) trên Casio 580VNX',
            thptPoints: 1.0,
            ca4Points: 3.0,
            exp: 150,
            cheatSheet: [
              '1. Phím CALC: Thay giá trị x cụ thể vào biểu thức. Dùng để thử đáp án trắc nghiệm cực nhanh.',
              '2. Phím SHIFT + CALC (SOLVE): Tìm nghiệm xấp xỉ của phương trình f(x) = 0. Nhập phương trình -> SHIFT CALC -> Nhập x gợi ý -> Bằng (=).',
              '3. Chế độ TABLE (MENU 8 trên 580VNX / MODE 7 trên 570VN): Tìm GTLN (Max), GTNN (Min) và quét nghiệm trên đoạn [a; b] với bước nhảy Step = (b - a) / 29.',
              '4. Tổ hợp & Chỉnh hợp: nCr (SHIFT + dấu chia) dùng khi không phân biệt thứ tự; nPr (SHIFT + dấu nhân) dùng khi có thứ tự.'
            ],
            questions: [
              {
                q: 'Trên máy tính Casio fx-580VN X, để quét giá trị lớn nhất và nhỏ nhất của hàm số y = f(x) trên đoạn [1; 5], ta dùng chức năng MENU 8 (TABLE) với bước nhảy (Step) tối ưu nào sau đây?',
                options: ['Step = (5 - 1) / 29 hoặc (5 - 1) / 40', 'Step = 5 + 1', 'Step = 0', 'Step = 100'],
                answer: 0,
                explain: 'Khoảng chia tối đa của bảng TABLE là 30 đến 45 giá trị, nên Step = (Cuối - Đầu)/29 hoặc /40 cho độ mịn cao nhất.'
              },
              {
                q: 'Giá trị của tổ hợp C_6^2 (chọn 2 phần tử từ 6 phần tử không tính thứ tự) bấm bằng phím 6 SHIFT ÷ 2 là bao nhiêu?',
                options: ['12', '15', '30', '36'],
                answer: 1,
                explain: 'C_6^2 = 6! / (2! * 4!) = (6 * 5) / 2 = 15.'
              },
              {
                q: 'Nghiệm thực của phương trình 2^x = 16 là:',
                options: ['x = 3', 'x = 4', 'x = 8', 'x = 2'],
                answer: 1,
                explain: '2^4 = 16 nên x = 4.'
              },
              {
                q: 'Khi dùng lệnh SHIFT + SOLVE để dò nghiệm phương trình bậc 2 có 2 nghiệm dương và âm, nếu nhập giá trị ban đầu X = 10 thì máy thường trả về nghiệm nào?',
                options: ['Nghiệm gần với X = 10 nhất (nghiệm dương)', 'Luôn trả về nghiệm âm', 'Báo lỗi Syntax Error', 'Trả về tổng 2 nghiệm'],
                answer: 0,
                explain: 'Thuật toán Newton-Raphson của lệnh SOLVE hội tụ về nghiệm gần với giá trị khởi tạo X nhất.'
              },
              {
                q: 'Cho hàm số f(x) = x^3 - 3x + 2. Giá trị f(2) là bao nhiêu?',
                options: ['2', '4', '0', '6'],
                answer: 1,
                explain: 'Thay x = 2: 2^3 - 3(2) + 2 = 8 - 6 + 2 = 4.'
              }
            ]
          },
          {
            id: 'sq0_1_2',
            title: 'Nhiệm vụ 0.1B: Hằng đẳng thức, Tam thức bậc hai & Tập xác định hàm số',
            thptPoints: 1.0,
            ca4Points: 3.0,
            exp: 150,
            cheatSheet: [
              '1. Điều kiện xác định cơ bản: Phân thức A/B có nghĩa khi B ≠ 0; Căn bậc hai √A có nghĩa khi A ≥ 0; Logarit log_a(B) có nghĩa khi B > 0 (với 0 < a ≠ 1).',
              '2. Định lý Vi-ét cho phương trình ax^2 + bx + c = 0 (Δ ≥ 0): Tổng x1 + x2 = -b/a; Tích x1*x2 = c/a.',
              '3. Dấu tam thức bậc hai f(x) = ax^2 + bx + c (khi Δ > 0): "Trong trái, ngoài cùng" so với dấu của hệ số a.'
            ],
            questions: [
              {
                q: 'Tập xác định D của hàm số y = log_2(x - 3) là:',
                options: ['D = [3; +∞)', 'D = (3; +∞)', 'D = (-∞; 3)', 'D = R \\ {3}'],
                answer: 1,
                explain: 'Biểu thức trong logarit phải dương nghiêm ngặt: x - 3 > 0 <=> x > 3.'
              },
              {
                q: 'Phương trình x^2 - 5x + 6 = 0 có hai nghiệm x1, x2. Theo định lý Vi-ét, tổng x1 + x2 và tích x1*x2 lần lượt là:',
                options: ['5 và 6', '-5 và 6', '5 và -6', '6 và 5'],
                answer: 0,
                explain: 'x1 + x2 = -b/a = 5; x1*x2 = c/a = 6.'
              },
              {
                q: 'Bất phương trình x^2 - 4x + 3 < 0 có tập nghiệm là:',
                options: ['(1; 3)', '(-∞; 1) ∪ (3; +∞)', '[1; 3]', '(-3; -1)'],
                answer: 0,
                explain: 'Phương trình có nghiệm x = 1, x = 3. Hệ số a = 1 > 0 nên trong khoảng 2 nghiệm (1; 3) mang dấu âm (trái dấu a).'
              },
              {
                q: 'Hàm số y = √(4 - 2x) xác định khi và chỉ khi:',
                options: ['x ≤ 2', 'x ≥ 2', 'x < 2', 'x > -2'],
                answer: 0,
                explain: '4 - 2x ≥ 0 <=> 2x ≤ 4 <=> x ≤ 2.'
              },
              {
                q: 'Khai triển hằng đẳng thức (x - 2)^3 ta được:',
                options: ['x^3 - 6x^2 + 12x - 8', 'x^3 - 8', 'x^3 - 3x^2 + 3x - 8', 'x^3 + 6x^2 + 12x + 8'],
                answer: 0,
                explain: '(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3 = x^3 - 6x^2 + 12x - 8.'
              }
            ]
          }
        ]
      },
      {
        id: 'q0_2',
        subject: 'Tiếng Anh',
        badge: 'D01 + CA4 (15đ)',
        title: 'Khôi phục 6 Thì cốt lõi & Từ loại Tiếng Anh (Word Form)',
        description: 'Nắm vững công thức dấu hiệu 6 thì hay thi nhất và quy tắc nhận diện Danh - Động - Tính - Trạng.',
        subQuests: [
          {
            id: 'sq0_2_1',
            title: 'Nhiệm vụ 0.2A: 6 Thì trọng tâm & Sự phối hợp thì (When / While / Since)',
            thptPoints: 1.25,
            ca4Points: 2.5,
            exp: 150,
            cheatSheet: [
              '1. Hiện tại đơn (V_s/es) & Hiện tại tiếp diễn (am/is/are + V_ing): Thói quen vs Hành động đang diễn ra.',
              '2. Hiện tại hoàn thành (have/has + V3/ed): Dấu hiệu since + mốc thời gian, for + khoảng thời gian, recently, already, yet, so far.',
              '3. Quá khứ đơn (V2/ed) & Quá khứ tiếp diễn (was/were + V_ing): Hành động đang xảy ra (QKTD) thì hành động khác xen vào (QKĐ).',
              '4. Cấu trúc kinh điển: S + have/has + V3/ed + SINCE + S + V2/ed (Quá khứ đơn).'
            ],
            questions: [
              {
                q: 'We _______ each other since we graduated from high school in 2019.',
                options: ['did not see', 'have not seen', 'do not see', 'were not seeing'],
                answer: 1,
                explain: 'Cấu trúc: Hiện tại hoàn thành (have not seen) + SINCE + Mệnh đề quá khứ đơn (graduated).'
              },
              {
                q: 'While the officers _______ the cybercrime report, the power suddenly went out.',
                options: ['reviewed', 'were reviewing', 'have reviewed', 'are reviewing'],
                answer: 1,
                explain: 'Hành động đang diễn ra trong quá khứ (While + were reviewing) thì hành động khác cắt ngang (went out).'
              },
              {
                q: 'Look! The security system _______ an unusual login attempt from an unknown IP.',
                options: ['detects', 'is detecting', 'detected', 'was detecting'],
                answer: 1,
                explain: 'Dấu hiệu "Look!" ở đầu câu chỉ hành động đang diễn ra ngay lúc nói -> Hiện tại tiếp diễn.'
              },
              {
                q: 'By the time the police arrived at the scene, the suspects _______ away.',
                options: ['had run', 'ran', 'have run', 'were running'],
                answer: 0,
                explain: 'By the time + Quá khứ đơn (arrived), mệnh đề còn lại chia Quá khứ hoàn thành (had + V3).'
              },
              {
                q: 'She usually _______ 3 hours a day studying for the entrance examination.',
                options: ['spends', 'is spending', 'spent', 'has spent'],
                answer: 0,
                explain: 'Trạng từ tần suất "usually" chỉ thói quen ở hiện tại -> Hiện tại đơn (spends).'
              }
            ]
          },
          {
            id: 'sq0_2_2',
            title: 'Nhiệm vụ 0.2B: Vị trí Từ loại (Noun, Verb, Adj, Adv) & Từ vựng nền tảng',
            thptPoints: 1.25,
            ca4Points: 2.5,
            exp: 150,
            cheatSheet: [
              '1. Đuôi Danh từ (Noun): -tion, -sion, -ment, -ness, -ity, -ence, -ance, -er/-or/-ist (chỉ người). Đứng sau a/an/the, tính từ, giới từ.',
              '2. Đuôi Tính từ (Adj): -ful, -less, -ive, -ous, -able, -al, -ic. Đứng trước danh từ hoặc sau động từ nối (be, become, seem, feel, look).',
              '3. Đuôi Trạng từ (Adv): Adj + -ly. Bổ nghĩa cho động từ thường, đứng trước tính từ hoặc đầu câu.'
            ],
            questions: [
              {
                q: 'Protecting national cybersecurity requires high _______ and technical expertise.',
                options: ['responsible', 'responsibly', 'responsibility', 'responsibilities'],
                answer: 2,
                explain: 'Sau tính từ "high" và song hành với cụm danh từ "technical expertise" cần một danh từ không đếm được: responsibility.'
              },
              {
                q: 'The candidate answered all the interview questions very _______.',
                options: ['confident', 'confidently', 'confidence', 'confidential'],
                answer: 1,
                explain: 'Bổ nghĩa cho động từ thường "answered" cần trạng từ (Adv): confidently.'
              },
              {
                q: 'Artificial intelligence has become an _______ tool in modern digital investigation.',
                options: ['effect', 'effective', 'effectively', 'effectiveness'],
                answer: 1,
                explain: 'Đứng giữa mạo từ "an" và danh từ "tool" là một tính từ (Adj): effective.'
              },
              {
                q: 'Chính phủ đã đưa ra nhiều biện pháp để ngăn chặn tội phạm mạng. Từ nào đồng nghĩa với "prevent" (ngăn chặn)?',
                options: ['encourage', 'stop', 'promote', 'allow'],
                answer: 1,
                explain: 'Prevent = stop / hinder (ngăn chặn), trái nghĩa với encourage/promote/allow.'
              },
              {
                q: 'He made a firm _______ to pass the People\'s Public Security entrance exam.',
                options: ['decide', 'decision', 'decisive', 'decisively'],
                answer: 1,
                explain: 'Cụm cố định: make a (firm) decision (đưa ra quyết định dứt khoát). Sau tính từ "firm" là danh từ.'
              }
            ]
          }
        ]
      },
      {
        id: 'q0_3',
        subject: 'Ngữ Văn',
        badge: 'D01 + CA4 (25đ Tự luận)',
        title: 'Kỹ thuật Đọc hiểu & Khung Nghị luận xã hội 500 chữ chuẩn CA4',
        description: 'Làm chủ cấu trúc bài văn Nghị luận xã hội 500 chữ (chiếm 25/100 điểm bài thi CA4) và đọc hiểu ngữ liệu mới.',
        subQuests: [
          {
            id: 'sq0_3_1',
            title: 'Nhiệm vụ 0.3A: Công thức 5 bước viết bài Nghị luận xã hội 500 chữ (Đề CA4)',
            thptPoints: 2.0,
            ca4Points: 5.0,
            exp: 200,
            cheatSheet: [
              '1. Đặc thù đề thi ĐGNL Bộ Công an (CA4): Phần Tự luận bắt buộc chiếm 25/100 điểm với 01 câu Nghị luận xã hội tối thiểu 500 chữ (tư tưởng đạo lý, bản lĩnh, sự kiên trì, trách nhiệm công dân).',
              '2. Bố cục 5 phần chuẩn điểm tối đa (25/25):',
              '   - Mở bài (4-5 dòng): Dẫn dắt từ trích dẫn đề bài -> Nêu trực diện vấn đề nghị luận.',
              '   - Giải thích (5-6 dòng): Giải thích từ khóa, vế câu và rút ra ý nghĩa chung của nhận định.',
              '   - Phân tích & Chứng minh (20-25 dòng): Trả lời Vì sao? Biểu hiện thế nào? Dẫn chứng thực tế tiêu biểu (người thật, việc thật, tấm gương chiến sĩ CAND, nhà khoa học...).',
              '   - Bàn luận mở rộng & Phản đề (6-8 dòng): Phê phán biểu hiện lệch lạc/ngược lại; nêu điều kiện để tư tưởng phát huy giá trị.',
              '   - Bài học nhận thức & Hành động của bản thân (5-6 dòng): Liên hệ trực tiếp trách nhiệm người trẻ / người chiến sĩ tương lai.'
            ],
            questions: [
              {
                q: 'Trong bài thi Đánh giá của Bộ Công an mã CA4, phần Tự luận bắt buộc có cấu trúc và thang điểm như thế nào?',
                options: [
                  '1 câu Nghị luận xã hội (tối thiểu khoảng 500 chữ), chiếm 25/100 điểm',
                  '1 câu phân tích truyện ngắn trong SGK, chiếm 50/100 điểm',
                  '2 câu nghị luận văn học, chiếm 10/100 điểm',
                  'Không có phần tự luận, chỉ thi trắc nghiệm'
                ],
                answer: 0,
                explain: 'Theo đề tham khảo chính thức của Bộ Công an, phần Tự luận bắt buộc gồm 1 câu Nghị luận xã hội (~500 chữ) chiếm 25 điểm.'
              },
              {
                q: 'Sau bước "Mở bài" giới thiệu vấn đề nghị luận, thao tác lập luận đầu tiên trong phần Thân bài Nghị luận xã hội là gì?',
                options: [
                  'Phê phán những người đi ngược lại vấn đề ngay lập tức',
                  'Giải thích từ khóa, khái niệm và ý nghĩa toàn bộ nhận định/vấn đề',
                  'Kể lại một câu chuyện dài dòng 300 chữ',
                  'Viết kết bài'
                ],
                answer: 1,
                explain: 'Thao tác Giải thích giúp làm rõ bản chất khái niệm trước khi đi vào Phân tích - Chứng minh.'
              },
              {
                q: 'Khi chọn dẫn chứng cho bài Nghị luận xã hội trong đề thi THPT và CA4, loại dẫn chứng nào có sức thuyết phục cao nhất?',
                options: [
                  'Nhân vật hư cấu trong phim hoạt hình hoặc truyện cổ tích',
                  'Người thật, việc thật tiêu biểu, có tính thời sự và được xã hội công nhận',
                  'Tự bịa ra một câu chuyện không có tên tuổi, nguồn gốc',
                  'Chép lại nguyên văn đoạn trích trên đề bài'
                ],
                answer: 1,
                explain: 'Dẫn chứng NLXH cần xác thực, tiêu biểu, toàn diện và gắn chặt với luận điểm.'
              },
              {
                q: 'Thao tác "Phản đề / Mở rộng vấn đề" trong bài Nghị luận xã hội về "Sự kiên trì trước gian khổ" nhằm mục đích gì?',
                options: [
                  'Phủ nhận hoàn toàn giá trị của sự kiên trì',
                  'Phê phán lối sống dễ bỏ cuộc, đồng thời phân biệt kiên trì có phương pháp với sự cố chấp mù quáng',
                  'Kéo dài bài viết cho đủ 500 chữ mà không cần nội dung',
                  'Chuyển sang phân tích một bài thơ trữ tình'
                ],
                answer: 1,
                explain: 'Bàn luận mở rộng giúp bài viết có tư duy biện chứng: vừa phê phán mặt tiêu cực (bỏ cuộc), vừa nhìn nhận giới hạn hợp lý (kiên trì khác với bảo thủ, cố chấp).'
              },
              {
                q: 'Ở phần Đọc hiểu văn bản (đề thi THPT mới), khi đề hỏi "Xác định phương thức biểu đạt chính" của một đoạn trích bàn về trách nhiệm tuổi trẻ trong kỷ nguyên số, đáp án đúng là:',
                options: ['Nghị luận', 'Tự sự', 'Miêu tả', 'Biểu cảm'],
                answer: 0,
                explain: 'Văn bản trình bày ý kiến, lý lẽ, dẫn chứng về một vấn đề tư tưởng/xã hội có phương thức biểu đạt chính là Nghị luận.'
              }
            ]
          }
        ]
      },
      {
        id: 'q0_4',
        subject: 'Địa lí & Lịch sử',
        badge: 'CA4 (25đ: 15đ Địa + 10đ Sử)',
        title: 'Nền tảng Số liệu Địa lí & Trục thời gian Lịch sử Việt Nam - Thế giới',
        description: 'Lấp lỗ hổng 25 câu trắc nghiệm Sử - Địa trong đề CA4 ngay từ vạch xuất phát.',
        subQuests: [
          {
            id: 'sq0_4_1',
            title: 'Nhiệm vụ 0.4A: Công thức tính toán Địa lí & Nhận diện Biểu đồ (CA4 Địa lí)',
            thptPoints: 0.0,
            ca4Points: 4.0,
            exp: 150,
            cheatSheet: [
              '1. Công thức Địa lí bắt buộc thuộc lòng (Đề CA4 không dùng Atlat):',
              '   - Mật độ dân số = Số dân / Diện tích (người/km²).',
              '   - Tỉ trọng thành phần (%) = (Giá trị thành phần / Tổng giá trị) * 100%.',
              '   - Cán cân xuất nhập khẩu = Xuất khẩu - Nhập khẩu (+ là Xuất siêu, - là Nhập siêu).',
              '   - Tổng kim ngạch XNK = Xuất khẩu + Nhập khẩu.',
              '   - Năng suất lúa = Sản lượng / Diện tích (tạ/ha hoặc tấn/ha; lưu ý 1 tấn = 10 tạ).',
              '2. Từ khóa chọn Biểu đồ: "Tốc độ tăng trưởng (%)" -> Đường (Line); "Quy mô và cơ cấu (≤ 3 năm)" -> Tròn (Pie); "Chuyển dịch cơ cấu (≥ 4 năm)" -> Miền (Area).'
            ],
            questions: [
              {
                q: 'Cho giá trị Xuất khẩu của một quốc gia là 371,3 tỉ USD và Nhập khẩu là 358,9 tỉ USD. Cán cân xuất nhập khẩu của quốc gia đó là:',
                options: ['Xuất siêu +12,4 tỉ USD', 'Nhập siêu -12,4 tỉ USD', '730,2 tỉ USD', 'Xuất siêu +24,8 tỉ USD'],
                answer: 0,
                explain: 'Cán cân XNK = Xuất khẩu - Nhập khẩu = 371,3 - 358,9 = +12,4 tỉ USD (> 0 nên gọi là Xuất siêu).'
              },
              {
                q: 'Khi đề bài Địa lí yêu cầu thể hiện "Tốc độ tăng trưởng của nhiều đối tượng có đơn vị khác nhau qua các năm (lấy năm đầu = 100%)", loại biểu đồ thích hợp nhất là:',
                options: ['Biểu đồ Đường (Đồ thị)', 'Biểu đồ Tròn', 'Biểu đồ Miền', 'Biểu đồ Cột đơn'],
                answer: 0,
                explain: 'Từ khóa "Tốc độ tăng trưởng" qua nhiều năm luôn gắn liền với Biểu đồ Đường.'
              },
              {
                q: 'Một vùng có diện tích 54.500 km² và dân số 21,5 triệu người (21.500.000 người). Mật độ dân số của vùng gần nhất với giá trị nào?',
                options: ['394 người/km²', '253 người/km²', '39 người/km²', '545 người/km²'],
                answer: 0,
                explain: 'Mật độ = 21.500.000 / 54.500 ≈ 394,5 người/km².'
              },
              {
                q: 'Vị trí địa lí Việt Nam nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc nên có đặc điểm khí hậu nổi bật nào?',
                options: [
                  'Tổng bức xạ lớn, cân bằng bức xạ dương quanh năm, nhiệt độ trung bình năm cao',
                  'Khí hậu ôn đới lạnh giá quanh năm',
                  'Không bao giờ chịu ảnh hưởng của gió mùa',
                  'Có băng tuyết bao phủ trên toàn bộ lãnh thổ'
                ],
                answer: 0,
                explain: 'Nằm trong vùng nội chí tuyến giúp Việt Nam có góc nhập xạ lớn, 2 lần Mặt Trời lên thiên đỉnh trong năm -> nền nhiệt cao.'
              },
              {
                q: 'Biểu đồ Miền được sử dụng hiệu quả nhất khi đề bài yêu cầu thể hiện:',
                options: [
                  'Sự chuyển dịch cơ cấu (%) của các thành phần qua chuỗi thời gian từ 4 năm trở lên',
                  'Quy mô diện tích của 1 năm duy nhất',
                  'Lượng mưa và nhiệt độ của 12 tháng',
                  'Số lượng học sinh của 3 trường học'
                ],
                answer: 0,
                explain: 'Chuyển dịch cơ cấu (%) qua từ 4 mốc năm trở lên (tổng luôn bằng 100%) là dấu hiệu chuẩn của biểu đồ Miền.'
              }
            ]
          },
          {
            id: 'sq0_4_2',
            title: 'Nhiệm vụ 0.4B: Trục thời gian Trật tự Thế giới, Liên Hợp Quốc & ASEAN (CA4 Lịch sử)',
            thptPoints: 0.0,
            ca4Points: 3.0,
            exp: 150,
            cheatSheet: [
              '1. Hội nghị I-an-ta (2/1945): Liên Xô, Mỹ, Anh thỏa thuận phân chia phạm vi ảnh hưởng -> Hình thành Trật tự hai cực I-an-ta.',
              '2. Liên Hợp Quốc (UN - thành lập 10/1945): Mục tiêu hàng đầu là Duy trì hòa bình và an ninh quốc tế.',
              '3. Hiệp hội các quốc gia Đông Nam Á (ASEAN): Thành lập ngày 08/08/1967 tại Băng Cốc (Thái Lan) với 5 nước sáng lập (Thái Lan, Indonesia, Malaysia, Singapore, Philippines). Việt Nam gia nhập năm 1995 (thành viên thứ 7). Cộng đồng ASEAN chính thức thành lập năm 2015.'
            ],
            questions: [
              {
                q: 'Mục tiêu quan trọng hàng đầu của tổ chức Liên Hợp Quốc được ghi nhận trong Hiến chương (1945) là gì?',
                options: [
                  'Duy trì hòa bình và an ninh quốc tế',
                  'Thành lập liên minh quân sự chung trên toàn cầu',
                  'Thống nhất một đồng tiền chung cho tất cả các châu lục',
                  'Xóa bỏ biên giới quốc gia'
                ],
                answer: 0,
                explain: 'Điều 1 Hiến chương Liên Hợp Quốc khẳng định mục tiêu trọng tâm số 1 là duy trì hòa bình và an ninh quốc tế.'
              },
              {
                q: 'Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập ngày 8/8/1967 tại đâu và gồm bao nhiêu quốc gia sáng lập?',
                options: [
                  'Tại Băng Cốc (Thái Lan) với 5 quốc gia sáng lập',
                  'Tại Hà Nội (Việt Nam) với 10 quốc gia sáng lập',
                  'Tại Gia-các-ta (Indonesia) với 7 quốc gia sáng lập',
                  'Tại Ma-ni-la (Philippines) với 6 quốc gia sáng lập'
                ],
                answer: 0,
                explain: 'ASEAN thành lập ngày 8/8/1967 tại Băng Cốc với 5 nước: Indonesia, Malaysia, Philippines, Singapore, Thái Lan.'
              },
              {
                q: 'Việt Nam chính thức gia nhập ASEAN vào thời gian nào và là thành viên thứ mấy?',
                options: [
                  'Tháng 7/1995 - Thành viên thứ 7',
                  'Tháng 8/1967 - Thành viên sáng lập',
                  'Tháng 12/2015 - Thành viên thứ 10',
                  'Tháng 5/1986 - Thành viên thứ 6'
                ],
                answer: 0,
                explain: 'Ngày 28/7/1995, Việt Nam trở thành thành viên thứ 7 của ASEAN.'
              },
              {
                q: 'Sau khi Trật tự thế giới hai cực I-an-ta sụp đổ (1991), xu thế phát triển chính của trật tự thế giới mới là gì?',
                options: [
                  'Xu thế đa cực, nhiều trung tâm',
                  'Trật tự hai cực mới giữa Anh và Pháp',
                  'Quay lại chế độ phong kiến',
                  'Chấm dứt hoàn toàn cạnh tranh kinh tế'
                ],
                answer: 0,
                explain: 'Sau năm 1991, thế giới vận động theo xu thế đa cực, nhiều trung tâm với sự vươn lên của Mỹ, EU, Trung Quốc, Nhật Bản, Ấn Độ, Nga.'
              },
              {
                q: 'Ba trụ cột của Cộng đồng ASEAN (được thành lập năm 2015) bao gồm:',
                options: [
                  'Chính trị - An ninh (APSC), Kinh tế (AEC) và Văn hóa - Xã hội (ASCC)',
                  'Quân sự, Tài chính và Du lịch',
                  'Nông nghiệp, Công nghiệp và Dịch vụ',
                  'Giáo dục, Y tế và Quốc phòng'
                ],
                answer: 0,
                explain: 'Cộng đồng ASEAN dựa trên 3 trụ cột: APSC (Chính trị - An ninh), AEC (Kinh tế), ASCC (Văn hóa - Xã hội).'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_0',
      title: 'TRÙM ẢI 0: CHIẾN DỊCH RÃ ĐÔNG TOÀN DIỆN',
      subtitle: 'Bài kiểm tra tổng hợp 5 môn (Toán - Văn - Anh - Sử - Địa) mở khóa Phase 1',
      timeLimitSeconds: 600,
      thptBonus: 2.0,
      ca4Bonus: 3.0,
      expBonus: 500,
      questions: [
        {
          q: '[TOÁN] Tập xác định của hàm số y = log_3(2x - 6) là:',
          options: ['(3; +∞)', '[3; +∞)', '(-∞; 3)', 'R \\ {3}'],
          answer: 0,
          explain: 'Điều kiện logarit: 2x - 6 > 0 <=> x > 3.'
        },
        {
          q: '[TOÁN] Tổng các nghiệm của phương trình x^2 - 7x + 10 = 0 bằng:',
          options: ['7', '-7', '10', '3'],
          answer: 0,
          explain: 'Theo Vi-ét, x1 + x2 = -b/a = 7 (hai nghiệm là 2 và 5).'
        },
        {
          q: '[ANH] Since the new cybersecurity law _______ into effect, online fraud cases have decreased significantly.',
          options: ['came', 'has come', 'comes', 'was coming'],
          answer: 0,
          explain: 'Sau SINCE là mệnh đề chia ở thì Quá khứ đơn (came), mệnh đề chính chia Hiện tại hoàn thành.'
        },
        {
          q: '[ANH] Rapid technological _______ has transformed the way police investigate financial crimes.',
          options: ['develop', 'development', 'developing', 'developed'],
          answer: 1,
          explain: 'Sau tính từ "technological" và làm chủ ngữ cho động từ "has transformed" cần một Danh từ: development.'
        },
        {
          q: '[VĂN - CA4] Trong bài văn Nghị luận xã hội 500 chữ của đề thi CA4, phần nào đóng vai trò chứng minh tính xác thực của luận điểm?',
          options: [
            'Hệ thống lý lẽ sắc bén kết hợp dẫn chứng thực tế tiêu biểu, toàn diện',
            'Phần chép lại nguyên văn đề bài',
            'Những câu cảm thán sáo rỗng không có căn cứ',
            'Việc đếm số lượng dấu chấm câu'
          ],
          answer: 0,
          explain: 'Sự kết hợp giữa lý lẽ chặt chẽ và dẫn chứng thực tế tiêu biểu tạo nên sức thuyết phục của văn nghị luận.'
        },
        {
          q: '[ĐỊA - CA4] Biết diện tích gieo trồng lúa là 7,1 triệu ha và sản lượng đạt 43,5 triệu tấn. Năng suất lúa (tính theo tạ/ha) là khoảng bao nhiêu?',
          options: ['61,3 tạ/ha', '6,13 tạ/ha', '16,3 tạ/ha', '50,6 tạ/ha'],
          answer: 0,
          explain: 'Năng suất = (43,5 / 7,1) = 6,126 tấn/ha = 61,26 tạ/ha ≈ 61,3 tạ/ha.'
        },
        {
          q: '[SỬ - CA4] Quốc gia nào ở Đông Nam Á đã gia nhập ASEAN vào ngày 28/7/1995?',
          options: ['Việt Nam', 'Campuchia', 'Lào', 'Thái Lan'],
          answer: 0,
          explain: 'Việt Nam chính thức gia nhập ASEAN ngày 28/7/1995.'
        },
        {
          q: '[TOÁN] Nghiệm của phương trình 3^(x - 1) = 27 là:',
          options: ['x = 4', 'x = 3', 'x = 2', 'x = 9'],
          answer: 0,
          explain: '27 = 3^3 => x - 1 = 3 => x = 4.'
        }
      ]
    }
  },
  {
    phaseId: 1,
    code: 'PHASE 1',
    title: 'Phase 1: Xây Dựng Nền Móng (Mốc 15.5đ THPT / 48đ CA4)',
    timeline: 'Tuần 5 – Tuần 10 (126 giờ học | 3h/ngày)',
    description: 'Chiếm lĩnh trọn vẹn nhóm câu hỏi Nhận biết & Thông hiểu (Hàm số, Oxyz, Mệnh đề, Sử VN 1945-1975, Địa lí Tự nhiên).',
    targetThpt: 15.5,
    targetCa4: 48.0,
    themeColor: 'blue',
    quests: [
      {
        id: 'q1_1',
        subject: 'Toán',
        badge: 'D01 + CA4',
        title: 'Khảo sát Hàm số, Cực trị, Tiệm cận & Tọa độ không gian Oxyz',
        description: 'Trụ cột lớn nhất của đề Toán THPT và 35 câu Toán CA4.',
        subQuests: [
          {
            id: 'sq1_1_1',
            title: 'Nhiệm vụ 1.1A: Tính đơn điệu, Cực trị & Tiệm cận của đồ thị hàm số',
            thptPoints: 1.5,
            ca4Points: 5.0,
            exp: 200,
            cheatSheet: [
              '1. Đơn điệu: f\'(x) > 0 trên (a;b) => hàm đồng biến; f\'(x) < 0 => hàm nghịch biến.',
              '2. Cực trị: Điểm x0 mà qua đó f\'(x) đổi dấu từ (+) sang (-) là Cực đại; từ (-) sang (+) là Cực tiểu. Số điểm cực trị = số nghiệm bội lẻ của f\'(x) = 0.',
              '3. Tiệm cận hàm phân thức bậc nhất y = (ax + b)/(cx + d): Tiệm cận ngang y = a/c; Tiệm cận đứng x = -d/c.'
            ],
            questions: [
              {
                q: 'Đồ thị hàm số y = (2x - 1) / (x + 3) có đường tiệm cận ngang và tiệm cận đứng lần lượt là:',
                options: ['y = 2 và x = -3', 'y = -1/3 và x = 2', 'y = 2 và x = 3', 'y = -3 và x = 2'],
                answer: 0,
                explain: 'Tiệm cận ngang y = a/c = 2/1 = 2; Tiệm cận đứng là nghiệm mẫu số x + 3 = 0 <=> x = -3.'
              },
              {
                q: 'Cho hàm số y = f(x) có đạo hàm f\'(x) = x(x - 1)^2(x + 2). Số điểm cực trị của hàm số đã cho là:',
                options: ['2', '3', '1', '4'],
                answer: 0,
                explain: 'f\'(x) = 0 có 3 nghiệm x = 0 (bội 1), x = 1 (bội 2 - chẵn nên không đổi dấu), x = -2 (bội 1). Vậy có 2 nghiệm bội lẻ => 2 điểm cực trị.'
              },
              {
                q: 'Hàm số y = x^3 - 3x^2 + 2 nghịch biến trên khoảng nào dưới đây?',
                options: ['(0; 2)', '(-∞; 0)', '(2; +∞)', '(-2; 0)'],
                answer: 0,
                explain: 'y\' = 3x^2 - 6x < 0 <=> 0 < x < 2.'
              },
              {
                q: 'Giá trị cực đại của hàm số y = -x^3 + 3x + 1 (tại điểm cực đại x = 1) bằng:',
                options: ['3', '1', '-1', '2'],
                answer: 0,
                explain: 'y\' = -3x^2 + 3 = 0 => x = ±1. Tại x = 1 (Cực đại), y(1) = -1 + 3 + 1 = 3.'
              },
              {
                q: 'Tiệm cận xiên của đồ thị hàm số y = x + 2 + 1/(x - 1) khi x -> ±∞ là đường thẳng:',
                options: ['y = x + 2', 'y = x - 1', 'y = 1', 'y = 2x + 1'],
                answer: 0,
                explain: 'Vì lim [y - (x + 2)] = lim [1/(x - 1)] = 0 khi x -> ±∞ nên y = x + 2 là tiệm cận xiên.'
              }
            ]
          },
          {
            id: 'sq1_1_2',
            title: 'Nhiệm vụ 1.1B: Vectơ, Mặt phẳng, Đường thẳng & Mặt cầu trong Oxyz',
            thptPoints: 1.5,
            ca4Points: 4.5,
            exp: 200,
            cheatSheet: [
              '1. Mặt phẳng (P): Ax + By + Cz + D = 0 có vectơ pháp tuyến n = (A; B; C).',
              '2. Mặt cầu (S): (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 có tâm I(a; b; c) và bán kính R.',
              '3. Tích vô hướng u.v = x1.x2 + y1.y2 + z1.z2. Hai vectơ vuông góc khi u.v = 0.'
            ],
            questions: [
              {
                q: 'Trong không gian Oxyz, mặt phẳng (P): 2x - 3y + z - 5 = 0 có một vectơ pháp tuyến là:',
                options: ['n = (2; -3; 1)', 'n = (2; 3; 1)', 'n = (-3; 1; -5)', 'n = (2; -3; -5)'],
                answer: 0,
                explain: 'Hệ số của x, y, z trong phương trình mặt phẳng lần lượt là (2; -3; 1).'
              },
              {
                q: 'Mặt cầu (S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16 có tọa độ tâm I và bán kính R là:',
                options: ['I(1; -2; 3), R = 4', 'I(-1; 2; -3), R = 4', 'I(1; -2; 3), R = 16', 'I(1; 2; 3), R = 4'],
                answer: 0,
                explain: 'Đối chiếu (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 => I(1; -2; 3) và R = √16 = 4.'
              },
              {
                q: 'Trong không gian Oxyz, cho hai điểm A(1; 2; 3) và B(3; 0; -1). Tọa độ trung điểm M của đoạn thẳng AB là:',
                options: ['M(2; 1; 1)', 'M(4; 2; 2)', 'M(1; -1; -2)', 'M(2; 2; 1)'],
                answer: 0,
                explain: 'M = ((1+3)/2; (2+0)/2; (3-1)/2) = (2; 1; 1).'
              },
              {
                q: 'Cho hai vectơ u = (1; -2; 3) và v = (2; 4; m). Giá trị của m để u vuông góc với v là:',
                options: ['m = 2', 'm = -2', 'm = 3', 'm = 0'],
                answer: 0,
                explain: 'u ⊥ v <=> u.v = 0 <=> 1*2 + (-2)*4 + 3*m = 0 <=> 2 - 8 + 3m = 0 <=> 3m = 6 <=> m = 2.'
              },
              {
                q: 'Khoảng cách từ điểm M(1; 2; -1) đến mặt phẳng (P): x + 2y - 2z + 2 = 0 bằng:',
                options: ['3', '9', '1', '2'],
                answer: 0,
                explain: 'd(M, (P)) = |1 + 2(2) - 2(-1) + 2| / √(1^2 + 2^2 + (-2)^2) = |1 + 4 + 2 + 2| / 3 = 9 / 3 = 3.'
              }
            ]
          }
        ]
      },
      {
        id: 'q1_2',
        subject: 'Tiếng Anh & Ngữ Văn',
        badge: 'D01 + CA4',
        title: 'Mệnh đề quan hệ, Câu điều kiện & Biện pháp tu từ Ngữ Văn',
        description: 'Gỡ trọn điểm ngữ pháp Tiếng Anh trọng tâm và câu hỏi Đọc hiểu – Nghị luận Ngữ Văn.',
        subQuests: [
          {
            id: 'sq1_2_1',
            title: 'Nhiệm vụ 1.2A: Mệnh đề quan hệ, Câu điều kiện (Type 1, 2, 3) & Bị động',
            thptPoints: 1.5,
            ca4Points: 3.5,
            exp: 180,
            cheatSheet: [
              '1. Đại từ quan hệ: WHO (chủ ngữ người), WHOM (tân ngữ người), WHICH (vật), WHOSE + Noun (sở hữu), THAT (thay cho người/vật trong mệnh đề xác định, không đứng sau dấu phẩy hoặc giới từ).',
              '2. Rút gọn mệnh đề quan hệ: Chủ động dùng V-ing; Bị động dùng V3/ed; Sau the first/second/only/so sánh nhất dùng To + V.',
              '3. Câu điều kiện: Loại 1 (If + HTĐ, will + V); Loại 2 - trái hiện tại (If + QKĐ/were, would + V); Loại 3 - trái quá khứ (If + had V3, would have V3).'
            ],
            questions: [
              {
                q: 'If I _______ more time yesterday, I would have completed all the practice tests.',
                options: ['had had', 'had', 'have', 'would have'],
                answer: 0,
                explain: 'Dấu hiệu "yesterday" và mệnh đề chính "would have completed" -> Câu điều kiện loại 3: If + S + had + V3 (had had).'
              },
              {
                q: 'The cyber specialist _______ we invited to the seminar gave an inspiring speech on data security.',
                options: ['whom', 'which', 'whose', 'where'],
                answer: 0,
                explain: 'Thay thế cho danh từ chỉ người "The cyber specialist" đóng vai trò làm tân ngữ cho động từ "we invited" -> dùng whom (hoặc who/that).'
              },
              {
                q: 'The documents _______ on the server are strictly encrypted.',
                options: ['stored', 'storing', 'which stored', 'to storing'],
                answer: 0,
                explain: 'Rút gọn mệnh đề quan hệ dạng bị động (which are stored -> stored).'
              },
              {
                q: 'She was the first candidate _______ the maximum score in the physical fitness test.',
                options: ['to achieve', 'achieving', 'achieved', 'who achieve'],
                answer: 0,
                explain: 'Rút gọn mệnh đề quan hệ sau số thứ tự "the first" -> dùng To-infinitive (to achieve).'
              },
              {
                q: 'If I _______ you, I would focus on the CA4 Geography and History questions every evening.',
                options: ['were', 'am', 'had been', 'will be'],
                answer: 0,
                explain: 'Câu điều kiện loại 2 đưa ra lời khuyên ở hiện tại: If I were you, I would + V.'
              }
            ]
          },
          {
            id: 'sq1_2_2',
            title: 'Nhiệm vụ 1.2B: Phép liên kết, Biện pháp tu từ & Thao tác lập luận Ngữ Văn',
            thptPoints: 1.5,
            ca4Points: 3.0,
            exp: 180,
            cheatSheet: [
              '1. Các phép liên kết hình thức giữa các câu: Phép lặp (lặp lại từ ngữ), Phép thế (dùng đại từ/từ đồng nghĩa thay thế), Phép nối (dùng quan hệ từ: nhưng, tuy nhiên, vì vậy, hơn nữa...), Phép liên tưởng.',
              '2. Hiệu quả nghệ thuật của Điệp ngữ / Liệt kê: Nhấn mạnh ý, tạo nhịp điệu dồn dập/tha thiết, tăng sức gợi hình gợi cảm và tính thuyết phục.',
              '3. Dẫn chứng trong Nghị luận xã hội CA4: Cần phân tích theo mô hình "Nêu tên dẫn chứng -> Điểm cốt lõi của dẫn chứng gắn với đề -> Ý nghĩa/bài học rút ra".'
            ],
            questions: [
              {
                q: 'Trong hai câu văn: "Kỷ luật là sức mạnh của người chiến sĩ. Nhờ có đó, họ vượt qua mọi thử thách khắc nghiệt.", từ "đó" sử dụng phép liên kết nào?',
                options: ['Phép thế', 'Phép lặp', 'Phép trái nghĩa', 'Phép tỉnh lược'],
                answer: 0,
                explain: 'Đại từ "đó" thay thế cho "Kỷ luật" ở câu trước -> Phép thế.'
              },
              {
                q: 'Tác dụng chung quan trọng nhất của biện pháp tu từ Điệp từ / Điệp cấu trúc trong văn bản nghị luận và thơ văn là gì?',
                options: [
                  'Nhấn mạnh nội dung cần biểu đạt, tạo nhịp điệu và tăng sức thuyết phục/gợi cảm',
                  'Làm cho câu văn dài hơn để đủ số chữ quy định',
                  'Giải thích nghĩa từ Hán Việt',
                  'Thay thế cho dấu chấm câu'
                ],
                answer: 0,
                explain: 'Điệp từ/điệp ngữ luôn có 2 tác dụng cốt lõi: Về nội dung (nhấn mạnh/khẳng định...) và về nghệ thuật (tạo nhịp điệu, giọng điệu hùng hồn/tha thiết).'
              },
              {
                q: 'Thao tác lập luận nào dùng cách chia nhỏ đối tượng thành từng khía cạnh, bộ phận để xem xét toàn diện bản chất của vấn đề?',
                options: ['Thao tác phân tích', 'Thao tác bác bỏ', 'Thao tác bình luận', 'Thao tác so sánh'],
                answer: 0,
                explain: 'Chia nhỏ vấn đề thành các khía cạnh để đi sâu khám phá bản chất là thao tác Phân tích.'
              },
              {
                q: 'Trong bài Nghị luận xã hội 500 chữ (đề CA4), lỗi nào sau đây làm mất điểm nặng nhất ở phần Thân bài?',
                options: [
                  'Chỉ kể lể dài dòng dẫn chứng mà thiếu lý lẽ phân tích, hoặc chỉ nói lý thuyết suông không có dẫn chứng',
                  'Chia thân bài thành 3-4 đoạn văn rõ ràng',
                  'Có phần bàn luận mở rộng và phản đề',
                  'Liên hệ bài học nhận thức và hành động của bản thân'
                ],
                answer: 0,
                explain: 'Văn nghị luận đòi hỏi sự cân bằng giữa Lý lẽ và Dẫn chứng; sa vào kể chuyện hoặc nói suông đều bị trừ điểm lập luận.'
              },
              {
                q: 'Ngữ liệu Đọc hiểu trong đề thi tốt nghiệp THPT từ năm 2025 trở đi có đặc điểm gì cần lưu ý?',
                options: [
                  'Sử dụng 100% ngữ liệu ngoài các bộ sách giáo khoa hiện hành',
                  'Chỉ lấy các bài thơ đã học thuộc lòng trong SGK lớp 12',
                  'Không có câu hỏi tự luận',
                  'Chỉ hỏi về tiểu sử tác giả'
                ],
                answer: 0,
                explain: 'Chương trình GDPT 2018 sử dụng ngữ liệu mới ngoài SGK để đánh giá năng lực đọc hiểu thực chất của thí sinh.'
              }
            ]
          }
        ]
      },
      {
        id: 'q1_3',
        subject: 'Địa lí & Lịch sử',
        badge: 'CA4 (Sử - Địa Trọng Tâm)',
        title: 'Thiên nhiên nhiệt đới ẩm gió mùa & Lịch sử Việt Nam 1945 – 1975',
        description: 'Chuyên đề chiếm số câu nhiều nhất trong phần Sử - Địa của đề thi Đánh giá Bộ Công an.',
        subQuests: [
          {
            id: 'sq1_3_1',
            title: 'Nhiệm vụ 1.3A: Địa lí Tự nhiên Việt Nam (Gió mùa & Phân hóa thiên nhiên)',
            thptPoints: 0.0,
            ca4Points: 3.0,
            exp: 180,
            cheatSheet: [
              '1. Gió mùa Đông Bắc (Tháng 11 - Tháng 4): Nửa đầu mùa đông lạnh khô, nửa sau lạnh ẩm (mưa phùn ven biển và đồng bằng Bắc Bộ). Gây mưa lớn cho ven biển Trung Bộ khi kết hợp dải hội tụ nhiệt đới và địa hình chắn gió Trường Sơn.',
              '2. Gió mùa Tây Nam (Tháng 5 - Tháng 10): Đầu mùa hạ (khối khí Bắc Ấn Độ Dương) gây mưa cho Nam Bộ & Tây Nguyên, nhưng gây hiệu ứng Phơn khô nóng cho đồng bằng ven biển Trung Bộ và phía nam Tây Bắc.',
              '3. Phân hóa Bắc - Nam: Ranh giới là dãy Bạch Mã (16°B). Miền Bắc có mùa đông lạnh (2-3 tháng t < 18°C); Miền Nam nóng quanh năm (nhiệt độ TB năm > 25°C, biên độ nhiệt nhỏ, 2 mùa mưa - khô rõ rệt).'
            ],
            questions: [
              {
                q: 'Nguyên nhân chủ yếu gây ra hiện tượng thời tiết khô nóng (gió Phơn Tây Nam) ở đồng bằng ven biển Trung Bộ vào đầu mùa hạ là gì?',
                options: [
                  'Khối khí nhiệt đới ẩm từ Bắc Ấn Độ Dương thổi theo hướng Tây Nam vượt qua dãy Trường Sơn bị biến tính',
                  'Hoạt động của gió mùa Đông Bắc lạnh khô',
                  'Hoạt động của tín phong bán cầu Nam',
                  'Ảnh hưởng của dòng biển lạnh ven bờ'
                ],
                answer: 0,
                explain: 'Khối khí Bắc Ấn Độ Dương trút mưa ở sườn Tây Trường Sơn, khi vượt sang sườn Đông bị biến tính trở nên khô và nóng (hiệu ứng Phơn).'
              },
              {
                q: 'Ranh giới tự nhiên phân chia phần lãnh thổ phía Bắc và phần lãnh thổ phía Nam trong sự phân hóa thiên nhiên theo chiều Bắc - Nam ở nước ta là:',
                options: ['Dãy núi Bạch Mã (vĩ tuyến 16°B)', 'Dãy Hoàng Liên Sơn', 'Sông Hồng', 'Đèo Ngang'],
                answer: 0,
                explain: 'Dãy Bạch Mã là bức chắn địa hình chặn các đợt gió mùa Đông Bắc yếu xuống phía Nam.'
              },
              {
                q: 'Đặc điểm khí hậu đặc trưng của phần lãnh thổ phía Nam (từ dãy Bạch Mã trở vào) là:',
                options: [
                  'Mang tính chất cận xích đạo gió mùa, nóng quanh năm, biên độ nhiệt năm nhỏ và phân thành 2 mùa mưa - khô rõ rệt',
                  'Có mùa đông lạnh kéo dài 3 tháng với nhiệt độ dưới 18°C',
                  'Có 4 mùa Xuân - Hạ - Thu - Đông rõ rệt',
                  'Mưa phùn ẩm ướt kéo dài vào cuối mùa đông'
                ],
                answer: 0,
                explain: 'Phía Nam mang khí hậu cận xích đạo gió mùa, nền nhiệt > 25°C, biên độ nhiệt nhỏ (3-5°C), chia 2 mùa mưa - khô.'
              },
              {
                q: 'Vào nửa sau mùa đông, gió mùa Đông Bắc khi thổi vào miền Bắc nước ta gây ra kiểu thời tiết lạnh ẩm, mưa phùn ở ven biển và đồng bằng Bắc Bộ vì:',
                options: [
                  'Khối khí lạnh di chuyển lệch đông qua vùng biển ấm nên được tăng cường thêm độ ẩm',
                  'Khối khí chỉ di chuyển hoàn toàn trên lục địa Trung Hoa',
                  'Ảnh hưởng của gió Tây khô nóng',
                  'Do bão nhiệt đới hoạt động mạnh nhất vào tháng 1'
                ],
                answer: 0,
                explain: 'Nửa sau mùa đông, áp cao Xibia dịch chuyển ra phía đông nên gió mùa Đông Bắc đi qua biển, mang theo nhiều hơi ẩm gây mưa phùn.'
              },
              {
                q: 'Sông ngòi nước ta có tổng lượng nước lớn và chế độ nước theo mùa chủ yếu là do:',
                options: [
                  'Lượng mưa lớn và chế độ mưa phân hóa theo mùa của khí hậu nhiệt đới ẩm gió mùa',
                  'Băng tuyết tan trên đỉnh núi cao',
                  'Địa hình hoàn toàn là đồng bằng bằng phẳng',
                  'Hệ thống hồ thủy điện điều tiết hoàn toàn tự nhiên'
                ],
                answer: 0,
                explain: 'Chế độ nước sông phụ thuộc chặt chẽ vào chế độ mưa: mùa mưa tương ứng với mùa lũ, mùa khô tương ứng với mùa cạn.'
              }
            ]
          },
          {
            id: 'sq1_3_2',
            title: 'Nhiệm vụ 1.3B: Cách mạng Tháng Tám 1945 & Hai cuộc kháng chiến (1945 – 1975)',
            thptPoints: 0.0,
            ca4Points: 3.0,
            exp: 180,
            cheatSheet: [
              '1. Cách mạng Tháng Tám 1945: Thời cơ "Ngàn năm có một" xuất hiện từ khi Nhật đầu hàng Đồng minh (8/1945) đến trước khi quân Đồng minh vào Đông Dương.',
              '2. Kháng chiến chống Pháp (1945-1954): Việt Bắc thu-đông 1947 (phá sản kế hoạch "đánh nhanh thắng nhanh"); Biên giới thu-đông 1950 (giành thế chủ động chiến lược trên chiến trường chính Bắc Bộ); Điện Biên Phủ 1954 (chấm dứt chiến tranh, dẫn tới Hiệp định Giơ-ne-vơ).',
              '3. Kháng chiến chống Mỹ (1954-1975): Đồng khởi (1959-1960) chuyển từ giữ gìn lực lượng sang thế tiến công; Mậu Thân 1968 buộc Mỹ xuống thang, đàm phán ở Paris; Điện Biên Phủ trên không (12/1972) buộc Mỹ ký Hiệp định Paris (1/1973); Chiến dịch Hồ Chí Minh (30/4/1975) giải phóng hoàn toàn miền Nam.'
            ],
            questions: [
              {
                q: 'Thắng lợi quân sự nào trong cuộc kháng chiến chống thực dân Pháp (1945-1954) đã giúp quân dân Việt Nam giành được quyền chủ động trên chiến trường chính Bắc Bộ?',
                options: [
                  'Chiến dịch Biên giới thu - đông năm 1950',
                  'Chiến dịch Việt Bắc thu - đông năm 1947',
                  'Chiến dịch Điện Biên Phủ năm 1954',
                  'Cuộc chiến đấu ở các đô thị phía Bắc vĩ tuyến 16 (1946-1947)'
                ],
                answer: 0,
                explain: 'Chiến dịch Biên giới 1950 là chiến dịch tiến công lớn đầu tiên, khai thông biên giới Việt - Trung và giành quyền chủ động chiến lược.'
              },
              {
                q: 'Phong trào "Đồng khởi" (1959 - 1960) ở miền Nam Việt Nam có ý nghĩa lịch sử quan trọng nào?',
                options: [
                  'Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công',
                  'Buộc Mỹ phải ký ngay Hiệp định Paris',
                  'Hoàn thành thống nhất đất nước về mặt nhà nước',
                  'Đánh bại hoàn toàn chiến lược Việt Nam hóa chiến tranh'
                ],
                answer: 0,
                explain: 'Đồng khởi (tiêu biểu tại Bến Tre) đã giáng đòn nặng nề vào chính sách thực dân mới của Mỹ, chuyển cách mạng miền Nam sang thế tiến công.'
              },
              {
                q: 'Thắng lợi của trận "Điện Biên Phủ trên không" (12 ngày đêm cuối tháng 12/1972) đã trực tiếp buộc Mỹ phải:',
                options: [
                  'Tuyên bố ngừng hẳn các hoạt động chống phá miền Bắc và ký Hiệp định Paris (27/1/1973)',
                  'Bắt đầu đưa quân viễn chinh Mỹ vào miền Nam',
                  'Ký Hiệp định Giơ-ne-vơ về Đông Dương',
                  'Phát động chiến lược Chiến tranh đặc biệt'
                ],
                answer: 0,
                explain: 'Đập tan cuộc tập kích B-52 cuối năm 1972 đã buộc Mỹ ký Hiệp định Paris (1/1973), rút hết quân Mỹ và đồng minh về nước.'
              },
              {
                q: 'Trong cuộc Tổng tiến công và nổi dậy Xuân 1975, ba chiến dịch lớn nối tiếp nhau theo thứ tự thời gian là:',
                options: [
                  'Chiến dịch Tây Nguyên -> Chiến dịch Huế - Đà Nẵng -> Chiến dịch Hồ Chí Minh',
                  'Chiến dịch Hồ Chí Minh -> Chiến dịch Tây Nguyên -> Chiến dịch Huế - Đà Nẵng',
                  'Chiến dịch Biên giới -> Chiến dịch Tây Nguyên -> Chiến dịch Điện Biên Phủ',
                  'Chiến dịch Quảng Trị -> Chiến dịch Ấp Bắc -> Chiến dịch Hồ Chí Minh'
                ],
                answer: 0,
                explain: 'Thứ tự 3 đòn chiến lược Xuân 1975: Tây Nguyên (4/3 - 24/3) -> Huế - Đà Nẵng (21/3 - 29/3) -> Hồ Chí Minh (26/4 - 30/4/1975).'
              },
              {
                q: 'Bài học kinh nghiệm xuyên suốt nào từ Cách mạng Tháng Tám 1945 vẫn giữ nguyên giá trị trong công cuộc xây dựng và bảo vệ Tổ quốc hiện nay?',
                options: [
                  'Nắm vững ngọn cờ độc lập dân tộc gắn liền với chủ nghĩa xã hội, phát huy sức mạnh khối đại đoàn kết toàn dân tộc',
                  'Chỉ dựa vào sự viện trợ từ bên ngoài',
                  'Tách rời đấu tranh chính trị với xây dựng lực lượng',
                  'Chờ đợi đối phương tự rút lui mà không cần chuẩn bị lực lượng'
                ],
                answer: 0,
                explain: 'Sự lãnh đạo đúng đắn của Đảng và sức mạnh đại đoàn kết toàn dân tộc là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_1',
      title: 'TRÙM ẢI 1: PHÒNG TUYẾN NỀN MÓNG D01 & CA4',
      subtitle: 'Vượt qua 8 câu hỏi tổng hợp để chạm mốc 15.5đ THPT & 48đ CA4',
      timeLimitSeconds: 600,
      thptBonus: 1.0,
      ca4Bonus: 3.0,
      expBonus: 700,
      questions: [
        {
          q: '[TOÁN] Đồ thị hàm số y = (3x + 2) / (x - 1) có tâm đối xứng là giao điểm của hai đường tiệm cận có tọa độ:',
          options: ['I(1; 3)', 'I(-1; 3)', 'I(3; 1)', 'I(1; -2)'],
          answer: 0,
          explain: 'TCĐ: x = 1; TCN: y = 3 => Tâm đối xứng I(1; 3).'
        },
        {
          q: '[TOÁN - Oxyz] Mặt phẳng đi qua điểm A(1; 0; -2) và có vectơ pháp tuyến n = (2; -1; 3) có phương trình là:',
          options: ['2x - y + 3z + 4 = 0', '2x - y + 3z - 4 = 0', 'x - 2z + 4 = 0', '2x + y + 3z + 4 = 0'],
          answer: 0,
          explain: '2(x - 1) - 1(y - 0) + 3(z + 2) = 0 <=> 2x - y + 3z + 4 = 0.'
        },
        {
          q: '[ANH] Had the team detected the vulnerability earlier, the system _______ compromised.',
          options: ['would not have been', 'will not be', 'would not be', 'was not'],
          answer: 0,
          explain: 'Đảo ngữ câu điều kiện loại 3 (Had + S + V3, S + would not have been + V3).'
        },
        {
          q: '[VĂN] Khi viết bài Nghị luận xã hội 500 chữ về "Tinh thần thượng tôn pháp luật", luận điểm nào sau đây thuộc phần Bàn luận mở rộng / Phản đề?',
          options: [
            'Lên án những hành vi coi thường kỷ cương, lợi dụng kẽ hở pháp luật để trục lợi cá nhân',
            'Giải thích khái niệm pháp luật là hệ thống quy tắc xử sự chung',
            'Chép lại câu danh ngôn trong đề bài',
            'Nêu tên tác giả đoạn trích'
          ],
          answer: 0,
          explain: 'Phê phán mặt trái/biểu hiện vi phạm pháp luật là thao tác phản đề giúp lập luận chặt chẽ, toàn diện.'
        },
        {
          q: '[ĐỊA - CA4] Vùng biển miền Trung nước ta thường có mưa lớn tập trung vào thời gian Thu - Đông (tháng 9 đến tháng 12) chủ yếu do:',
          options: [
            'Tác động kết hợp của gió mùa Đông Bắc, dải hội tụ nhiệt đới, bão và bức chắn địa hình dãy Trường Sơn',
            'Hoạt động đơn độc của gió Phơn Tây Nam khô nóng',
            'Không có dãy núi nào chắn gió',
            'Chỉ do dòng biển lạnh hoạt động'
          ],
          answer: 0,
          explain: 'Các luồng gió thổi từ biển vào gặp bức chắn địa hình Trường Sơn cùng dải hội tụ nhiệt đới và bão gây mưa lớn vào thu - đông cho Trung Bộ.'
        },
        {
          q: '[SỬ - CA4] Hiệp định Giơ-ne-vơ năm 1954 về Đông Dương được ký kết là kết quả trực tiếp từ thắng lợi quân sự quyết định nào?',
          options: [
            'Chiến dịch Điện Biên Phủ (1954)',
            'Chiến dịch Biên giới (1950)',
            'Chiến dịch Việt Bắc (1947)',
            'Chiến dịch Hồ Chí Minh (1975)'
          ],
          answer: 0,
          explain: 'Chiến thắng Điện Biên Phủ (7/5/1954) đập tan kế hoạch Nava, xoay chuyển cục diện và dẫn tới Hiệp định Giơ-ne-vơ.'
        },
        {
          q: '[TOÁN] Hàm số y = x^4 - 2x^2 + 3 có bao nhiêu điểm cực trị?',
          options: ['3', '1', '2', '4'],
          answer: 0,
          explain: 'Hàm trùng phương có a.b = 1.(-2) = -2 < 0 nên luôn có 3 điểm cực trị (x = 0, x = ±1).'
        },
        {
          q: '[ANH] The suspect _______ by the cybersecurity unit confessed to all charges.',
          options: ['arrested', 'arresting', 'who arrested', 'to arrest'],
          answer: 0,
          explain: 'Rút gọn mệnh đề quan hệ bị động: who was arrested -> arrested.'
        }
      ]
    }
  },
  {
    phaseId: 2,
    code: 'PHASE 2',
    title: 'Phase 2: Lập Trình Tư Duy (Mốc 21.5đ THPT / 68đ CA4)',
    timeline: 'Tuần 11 – Tuần 16 (126 giờ học | 3h/ngày)',
    description: 'Bứt tốc với chuyên đề mới GDPT 2018 (Xác suất có điều kiện, Thống kê ghép nhóm, Cấp số, Địa lí Kinh tế ngành, Đổi mới 1986).',
    targetThpt: 21.5,
    targetCa4: 68.0,
    themeColor: 'purple',
    quests: [
      {
        id: 'q2_1',
        subject: 'Toán (GDPT 2018)',
        badge: 'D01 + CA4 Trọng Tâm Mới',
        title: 'Xác suất có điều kiện, Công thức Bayes & Thống kê mẫu số liệu ghép nhóm',
        description: 'Hai chuyên đề mới 100% xuất hiện trong cả đề minh họa THPT 2025-2027 và đề tham khảo CA4.',
        subQuests: [
          {
            id: 'sq2_1_1',
            title: 'Nhiệm vụ 2.1A: Xác suất có điều kiện P(A|B), Xác suất toàn phần & Công thức Bayes',
            thptPoints: 1.25,
            ca4Points: 4.5,
            exp: 220,
            cheatSheet: [
              '1. Xác suất có điều kiện: P(A | B) = P(A ∩ B) / P(B) (với P(B) > 0). Suy ra quy tắc nhân: P(A ∩ B) = P(B) * P(A | B).',
              '2. Công thức xác suất toàn phần: P(A) = P(B) * P(A | B) + P(B̄) * P(A | B̄).',
              '3. Công thức Bayes (Tính ngược nguyên nhân khi đã biết kết quả A xảy ra): P(B | A) = [P(B) * P(A | B)] / P(A).'
            ],
            questions: [
              {
                q: 'Cho hai biến cố A và B có P(B) = 0,5 và P(A ∩ B) = 0,2. Xác suất của A với điều kiện B đã xảy ra, ký hiệu P(A | B), bằng:',
                options: ['0,4', '0,1', '0,7', '0,25'],
                answer: 0,
                explain: 'P(A | B) = P(A ∩ B) / P(B) = 0,2 / 0,5 = 0,4.'
              },
              {
                q: 'Một hệ thống lọc thư rác có: 20% email gửi đến là thư rác (B). Nếu là thư rác thì hệ thống chặn (A) với xác suất 0,95. Nếu là thư thường (80%) thì hệ thống chặn nhầm với xác suất 0,05. Theo công thức xác suất toàn phần, xác suất một email bất kỳ bị hệ thống chặn P(A) là:',
                options: ['0,23', '0,19', '0,04', '0,90'],
                answer: 0,
                explain: 'P(A) = P(B)*P(A|B) + P(B̄)*P(A|B̄) = 0,2 * 0,95 + 0,8 * 0,05 = 0,19 + 0,04 = 0,23.'
              },
              {
                q: 'Từ dữ kiện câu trên (P(B) = 0,2; P(A|B) = 0,95; P(A) = 0,23), nếu một email đã bị chặn, xác suất email đó thực sự là thư rác P(B | A) theo công thức Bayes bằng:',
                options: ['19/23 (≈ 0,826)', '4/23', '19/20', '1/5'],
                answer: 0,
                explain: 'P(B | A) = [P(B)*P(A|B)] / P(A) = 0,19 / 0,23 = 19/23.'
              },
              {
                q: 'Nếu hai biến cố A và B độc lập với nhau và P(A) = 0,6; P(B) = 0,5 thì P(A | B) bằng bao nhiêu?',
                options: ['0,6', '0,3', '0,5', '1,1'],
                answer: 0,
                explain: 'Khi A và B độc lập, việc B xảy ra không ảnh hưởng đến A nên P(A | B) = P(A) = 0,6.'
              },
              {
                q: 'Một hộp có 6 bi đỏ và 4 bi xanh. Lấy ngẫu nhiên lần lượt 2 viên bi không hoàn lại. Xác suất để cả 2 lần đều lấy được bi đỏ là:',
                options: ['1/3', '36/100', '2/5', '1/2'],
                answer: 0,
                explain: 'P = (6/10) * (5/9) = 30/90 = 1/3.'
              }
            ]
          },
          {
            id: 'sq2_1_2',
            title: 'Nhiệm vụ 2.1B: Thống kê ghép nhóm (Khoảng biến thiên, Tứ phân vị, Phương sai, Độ lệch chuẩn)',
            thptPoints: 1.25,
            ca4Points: 4.0,
            exp: 220,
            cheatSheet: [
              '1. Giá trị đại diện của nhóm [a_i; a_{i+1}) là c_i = (a_i + a_{i+1}) / 2.',
              '2. Số trung bình: x̄ = (n1.c1 + n2.c2 + ... + nk.ck) / n.',
              '3. Phương sai s^2 = [1/n * Σ n_i*(c_i)^2] - (x̄)^2. Độ lệch chuẩn s = √(s^2) đo mức độ phân tán của số liệu (s càng nhỏ thì dữ liệu càng đồng đều, ổn định).',
              '4. Khoảng tứ phân vị Δ_Q = Q3 - Q1 (ít bị ảnh hưởng bởi các giá trị ngoại lai).'
            ],
            questions: [
              {
                q: 'Cho nhóm số liệu [40; 50) trong bảng phân bố tần số ghép nhóm. Giá trị đại diện c_i của nhóm này là:',
                options: ['45', '40', '50', '10'],
                answer: 0,
                explain: 'c_i = (40 + 50) / 2 = 45.'
              },
              {
                q: 'Khi so sánh điểm thi thử của hai tổ A và B có cùng điểm trung bình là 7,5 điểm, tổ A có độ lệch chuẩn s_A = 0,8 và tổ B có độ lệch chuẩn s_B = 1,9. Nhận xét nào sau đây đúng?',
                options: [
                  'Điểm thi của tổ A đồng đều và ổn định hơn tổ B',
                  'Điểm thi của tổ B đồng đều hơn tổ A',
                  'Hai tổ có mức độ phân tán như nhau',
                  'Tổ B có điểm trung bình cao hơn tổ A'
                ],
                answer: 0,
                explain: 'Độ lệch chuẩn s càng nhỏ thì mức độ phân tán quanh số trung bình càng thấp -> dữ liệu càng đồng đều.'
              },
              {
                q: 'Khoảng tứ phân vị Δ_Q của mẫu số liệu ghép nhóm có Q1 = 12,5 và Q3 = 18,2 là:',
                options: ['5,7', '30,7', '15,35', '6,2'],
                answer: 0,
                explain: 'Δ_Q = Q3 - Q1 = 18,2 - 12,5 = 5,7.'
              },
              {
                q: 'Trong mẫu số liệu ghép nhóm có nhóm đầu tiên là [10; 20) và nhóm cuối cùng là [50; 60), khoảng biến thiên R của mẫu số liệu ghép nhóm là:',
                options: ['50', '40', '10', '60'],
                answer: 0,
                explain: 'Khoảng biến thiên R = Đầu mút phải nhóm cuối - Đầu mút trái nhóm đầu = 60 - 10 = 50.'
              },
              {
                q: 'Nếu phương sai của một mẫu số liệu ghép nhóm là s^2 = 16 thì độ lệch chuẩn s bằng:',
                options: ['4', '256', '8', '2'],
                answer: 0,
                explain: 'Độ lệch chuẩn s = √(s^2) = √16 = 4.'
              }
            ]
          }
        ]
      },
      {
        id: 'q2_2',
        subject: 'Ngữ Văn & Tiếng Anh',
        badge: 'D01 + CA4',
        title: 'Sắp xếp đoạn hội thoại/lá thư (Tiếng Anh 2025+) & Nghị luận Văn học ngữ liệu mới',
        description: 'Làm chủ dạng bài mới sắp xếp câu a-b-c-d-e và phân tích tâm lý nhân vật/hình tượng thơ mới.',
        subQuests: [
          {
            id: 'sq2_2_1',
            title: 'Nhiệm vụ 2.2A: Chiến thuật giải nhanh dạng bài Sắp xếp đoạn văn/hội thoại & Cloze Test',
            thptPoints: 1.25,
            ca4Points: 3.0,
            exp: 200,
            cheatSheet: [
              '1. Mẹo giải câu Sắp xếp thứ tự (a-b-c-d-e):',
              '   - Bước 1: Tìm câu Mở đầu (Topic sentence / Lời chào mở đầu hội thoại). Câu mở đầu KHÔNG BAO GIỜ bắt đầu bằng: Therefore, However, Moreover, Also, Finally, hoặc đại từ nhân xưng/chỉ định chưa rõ quy chiếu (He, She, They, This, That problem).',
              '   - Bước 2: Ghép cặp nhân quả hoặc Thứ tự liên từ: First/Firstly -> Second/Besides/Moreover -> Finally/In conclusion.',
              '   - Bước 3: Kiểm tra câu Kết (In short, Overall, Looking forward to hearing from you).'
            ],
            questions: [
              {
                q: 'Khi làm bài sắp xếp thứ tự 5 câu (a, b, c, d, e) thành một đoạn văn hoàn chỉnh, câu nào sau đây KHÔNG THỂ là câu mở đầu đoạn văn?',
                options: [
                  'Therefore, these strict measures have helped reduce cyberattacks by 40%.',
                  'Cybersecurity has become a top priority for organizations worldwide.',
                  'In recent years, digital transformation has changed modern education.',
                  'Regular physical training offers numerous benefits for young officers.'
                ],
                answer: 0,
                explain: 'Câu bắt đầu bằng "Therefore, these strict measures..." chứa từ nối chỉ kết quả và từ chỉ định "these" quy chiếu về câu trước nên không thể đứng đầu.'
              },
              {
                q: 'Sắp xếp đoạn hội thoại ngắn sau:\n(a) Minh: I spend 3 hours every day practicing Math, Literature, English, History, and Geography.\n(b) Lan: How are you preparing for the BCA CA4 assessment exam?\n(c) Lan: That sounds like a very disciplined and effective schedule!',
                options: ['b - a - c', 'a - b - c', 'c - b - a', 'b - c - a'],
                answer: 0,
                explain: 'Lan đặt câu hỏi mở đầu (b) -> Minh trả lời cách ôn tập (a) -> Lan khen ngợi lịch trình đó (c).'
              },
              {
                q: 'Trong chuỗi liên từ chỉ trình tự lập luận của một bức thư trang trọng, thứ tự hợp lý nhất là:',
                options: [
                  'First of all -> Furthermore -> Finally',
                  'Finally -> First of all -> However',
                  'In conclusion -> Secondly -> Firstly',
                  'Therefore -> Firstly -> At first'
                ],
                answer: 0,
                explain: 'Trình tự chuẩn: Ý đầu tiên (First of all) -> Ý bổ sung (Furthermore/Moreover) -> Ý cuối (Finally).'
              },
              {
                q: 'Chọn từ nối phù hợp: "The exam structure is challenging; _______, with a clear daily roadmap, candidates can achieve high scores."',
                options: ['however', 'therefore', 'because', 'despite'],
                answer: 0,
                explain: 'Hai mệnh đề mang nghĩa tương phản và ngăn cách bởi dấu chấm phẩy (;) cùng dấu phẩy (,) -> dùng however.'
              },
              {
                q: 'Cụm động từ (Phrasal verb) nào đồng nghĩa với "continue" (tiếp tục nỗ lực)?',
                options: ['carry on', 'give up', 'put off', 'turn down'],
                answer: 0,
                explain: 'Carry on = continue (tiếp tục); give up (từ bỏ); put off (trì hoãn); turn down (từ chối).'
              }
            ]
          },
          {
            id: 'sq2_2_2',
            title: 'Nhiệm vụ 2.2B: Phân tích đặc trưng Thể loại Truyện ngắn & Thơ (Ngữ liệu ngoài SGK)',
            thptPoints: 1.25,
            ca4Points: 2.5,
            exp: 200,
            cheatSheet: [
              '1. Khi gặp một truyện ngắn mới ngoài SGK, bám sát 4 trục phân tích: (1) Tình huống truyện (sự kiện đẩy mâu thuẫn lên cao trào); (2) Nhân vật (ngoại hình, hành động, độc thoại nội tâm); (3) Điểm nhìn & Ngôi kể (Ngôi thứ nhất "tôi" tăng tính chân thực; Ngôi thứ ba toàn tri linh hoạt); (4) Chi tiết nghệ thuật đắt giá.',
              '2. Khi gặp một đoạn thơ mới ngoài SGK, bám sát 3 trục: (1) Chủ thể trữ tình & Mạch cảm xúc; (2) Hình ảnh biểu tượng, từ ngữ, biện pháp tu từ; (3) Thể thơ, nhịp điệu, giọng điệu.'
            ],
            questions: [
              {
                q: 'Khi phân tích một văn bản truyện ngắn mới ngoài sách giáo khoa, yếu tố nào được xem là "cái cớ", là hoàn cảnh đặc biệt để nhân vật bộc lộ rõ nhất tính cách và phẩm chất?',
                options: ['Tình huống truyện', 'Số trang của tác phẩm', 'Năm sinh của nhà văn', 'Tên nhà xuất bản'],
                answer: 0,
                explain: 'Tình huống truyện là lát cắt đời sống nơi mâu thuẫn hoặc bước ngoặt diễn ra, giúp nhân vật bộc lộ chiều sâu tâm lý và tư tưởng chủ đề.'
              },
              {
                q: 'Tác phẩm truyện được kể theo ngôi thứ nhất (người kể chuyện xưng "tôi") có ưu thế nghệ thuật nổi bật nào?',
                options: [
                  'Tạo cảm giác chân thực, gần gũi và thuận lợi cho việc bộc lộ trực tiếp thế giới nội tâm, cảm xúc của người kể',
                  'Giúp người kể có mặt ở mọi nơi cùng một lúc mà không bị giới hạn không gian',
                  'Biến văn bản truyện thành văn bản hành chính công vụ',
                  'Loại bỏ hoàn toàn cảm xúc chủ quan'
                ],
                answer: 0,
                explain: 'Ngôi kể thứ nhất (xưng "tôi") giúp câu chuyện có độ tin cậy, giàu chất tự truyện và đào sâu tâm lý chủ quan.'
              },
              {
                q: 'Trong đoạn kết bài Nghị luận văn học (hoặc phần đánh giá tổng hợp), thí sinh cần làm nổi bật mối quan hệ nào?',
                options: [
                  'Sự thống nhất, hòa quyện giữa giá trị Nội dung (tư tưởng, nhân sinh) và đặc sắc Nghệ thuật của văn bản',
                  'Chỉ tóm tắt lại cốt truyện từ đầu đến cuối',
                  'Đặt câu hỏi bỏ lửng không trả lời',
                  'Liệt kê danh sách các tác phẩm khác không liên quan'
                ],
                answer: 0,
                explain: 'Một bài phân tích văn học hoàn chỉnh luôn phải đánh giá cả hai phương diện: Nội dung tư tưởng và Hình thức nghệ thuật.'
              },
              {
                q: 'Trong thơ trữ tình, "hình ảnh biểu tượng" là những hình ảnh:',
                options: [
                  'Vừa mang nghĩa tả thực, vừa gợi mở những tầng ý nghĩa triết lý, tư tưởng hoặc khát vọng sâu xa',
                  'Chỉ dùng để chú thích số liệu thống kê',
                  'Không có bất kỳ biện pháp nghệ thuật nào',
                  'Chỉ xuất hiện trong văn bản pháp luật'
                ],
                answer: 0,
                explain: 'Hình ảnh biểu tượng có tính đa nghĩa, vượt lên trên nghĩa thực để khái quát tâm trạng hoặc tư tưởng thời đại.'
              },
              {
                q: 'Nếu đề thi CA4 cho một đoạn trích bàn về "Kỷ luật tự giác là chiếc cầu nối giữa mục tiêu và thành tựu", luận điểm trọng tâm bạn cần triển khai là:',
                options: [
                  'Kỷ luật tự giác giúp biến ước mơ trừu tượng thành hành động bền bỉ mỗi ngày để đi tới đích',
                  'Chỉ cần đặt mục tiêu thật cao là tự khắc thành công mà không cần rèn luyện',
                  'Kỷ luật làm mất đi sự sáng tạo của con người',
                  'Phân tích vẻ đẹp của những cây cầu bắc qua sông'
                ],
                answer: 0,
                explain: 'Hình ảnh "chiếc cầu nối" là ẩn dụ cho vai trò quyết định của tính kỷ luật trong việc hiện thực hóa mục tiêu thành kết quả thực tế.'
              }
            ]
          }
        ]
      },
      {
        id: 'q2_3',
        subject: 'Địa lí & Lịch sử',
        badge: 'CA4 (Sử - Địa Chuyên Sâu)',
        title: 'Địa lí các ngành Kinh tế (Nông - Công - Dịch vụ) & Công cuộc Đổi mới 1986',
        description: 'Giải quyết gọn các câu hỏi vận dụng về chuyển dịch cơ cấu kinh tế và lịch sử Việt Nam từ 1986 đến nay.',
        subQuests: [
          {
            id: 'sq2_3_1',
            title: 'Nhiệm vụ 2.3A: Chuyển dịch cơ cấu kinh tế, Nông nghiệp công nghệ cao & Công nghiệp - Dịch vụ',
            thptPoints: 0.0,
            ca4Points: 3.0,
            exp: 200,
            cheatSheet: [
              '1. Chuyển dịch cơ cấu ngành kinh tế Việt Nam: Giảm tỉ trọng Nông - Lâm - Thủy sản; Tăng tỉ trọng Công nghiệp - Xây dựng và Dịch vụ (theo hướng công nghiệp hóa, hiện đại hóa, phát triển xanh và bền vững).',
              '2. Nông nghiệp hàng hóa & Công nghệ cao: Tăng tỉ trọng chăn nuôi, thủy sản (nhất là nuôi trồng); trồng trọt chuyển sang giống năng suất cao, thích ứng biến đổi khí hậu (đặc biệt tại ĐBSCL).',
              '3. Công nghiệp & Năng lượng: Phát triển mạnh năng lượng tái tạo (điện gió, điện mặt trời tại Duyên hải Nam Trung Bộ, Tây Nguyên, Nam Bộ); công nghiệp chế biến, chế tạo chiếm tỉ trọng cao nhất.'
            ],
            questions: [
              {
                q: 'Xu hướng chuyển dịch cơ cấu trong nội bộ ngành nông nghiệp nước ta hiện nay là:',
                options: [
                  'Giảm tỉ trọng ngành trồng trọt, tăng tỉ trọng ngành chăn nuôi và dịch vụ nông nghiệp, đẩy mạnh nông nghiệp công nghệ cao',
                  'Tăng tối đa tỉ trọng trồng cây lương thực, xóa bỏ ngành chăn nuôi',
                  'Chỉ sản xuất tự cấp tự túc trong từng hộ gia đình',
                  'Mở rộng diện tích phá rừng tự nhiên để trồng lúa'
                ],
                answer: 0,
                explain: 'Nông nghiệp chuyển dịch theo hướng sản xuất hàng hóa, ứng dụng công nghệ cao, tăng tỉ trọng chăn nuôi và nuôi trồng thủy sản.'
              },
              {
                q: 'Ngành công nghiệp nào chiếm tỉ trọng lớn nhất trong cơ cấu giá trị sản xuất công nghiệp của nước ta hiện nay và đóng vai trò động lực tăng trưởng chính?',
                options: [
                  'Công nghiệp chế biến, chế tạo',
                  'Công nghiệp khai khoáng than đá thủ công',
                  'Khai thác gỗ tự nhiên',
                  'Sản xuất muối thủ công'
                ],
                answer: 0,
                explain: 'Công nghiệp chế biến, chế tạo chiếm tỉ trọng áp đảo (>80%) và tạo giá trị gia tăng xuất khẩu chủ lực.'
              },
              {
                q: 'Các vùng Duyên hải Nam Trung Bộ, Tây Nguyên và Nam Bộ có tiềm năng tự nhiên vượt trội nào để phát triển điện mặt trời và điện gió?',
                options: [
                  'Số giờ nắng cao, cường độ bức xạ lớn và tốc độ gió mạnh, ổn định',
                  'Trữ lượng than đá lớn nhất cả nước',
                  'Có mùa đông lạnh kéo dài nhiều băng tuyết',
                  'Mạng lưới sông ngòi dày đặc nhất cả nước với độ dốc lớn'
                ],
                answer: 0,
                explain: 'Số giờ nắng rất cao (2.500 - 3.000 giờ/năm) và gió biển/gió cao nguyên mạnh giúp các vùng này dẫn đầu về năng lượng tái tạo.'
              },
              {
                q: 'Thị trường xuất khẩu hàng hóa của Việt Nam ngày càng mở rộng và đa dạng hóa chủ yếu nhờ vào:',
                options: [
                  'Quá trình hội nhập quốc tế sâu rộng, ký kết các Hiệp định thương mại tự do thế hệ mới (FTA) và nâng cao chất lượng hàng hóa',
                  'Việc hạn chế giao thương với các nước ngoài khu vực ASEAN',
                  'Chỉ xuất khẩu khoáng sản thô chưa qua chế biến',
                  'Giảm sản lượng sản xuất trong nước'
                ],
                answer: 0,
                explain: 'Các FTA thế hệ mới (CPTPP, EVFTA, RCEP...) cùng năng lực sản xuất chế biến giúp hàng Việt Nam vươn ra toàn cầu.'
              },
              {
                q: 'Trong ngành thủy sản nước ta những năm gần đây, tỉ trọng sản lượng nuôi trồng tăng nhanh hơn khai thác chủ yếu vì:',
                options: [
                  'Nuôi trồng chủ động được nguồn cung, kiểm soát chất lượng theo tiêu chuẩn xuất khẩu và bảo vệ nguồn lợi thủy sản tự nhiên',
                  'Việt Nam không còn vùng biển để đánh bắt',
                  'Khai thác xa bờ bị cấm hoàn toàn',
                  'Nhu cầu tiêu thụ thủy sản giảm về 0'
                ],
                answer: 0,
                explain: 'Nuôi trồng thủy sản công nghệ cao giúp chủ động sản lượng, đáp ứng truy xuất nguồn gốc khắt khe của thị trường quốc tế.'
              }
            ]
          },
          {
            id: 'sq2_3_2',
            title: 'Nhiệm vụ 2.3B: Công cuộc Đổi mới từ 1986 đến nay & Hoạt động Đối ngoại Việt Nam',
            thptPoints: 0.0,
            ca4Points: 2.0,
            exp: 200,
            cheatSheet: [
              '1. Đại hội VI của Đảng (12/1986): Mở đầu công cuộc Đổi mới toàn diện, trọng tâm là Đổi mới kinh tế (xóa bỏ cơ chế tập trung quan liêu bao cấp, phát triển kinh tế hàng hóa nhiều thành phần định hướng XHCN).',
              '2. Quan điểm Đổi mới: Đổi mới không phải là thay đổi mục tiêu XHCN, mà làm cho mục tiêu ấy được thực hiện hiệu quả hơn bằng hình thức, bước đi phù hợp.',
              '3. Đối ngoại thời kỳ Đổi mới: Đa phương hóa, đa dạng hóa quan hệ quốc tế; Việt Nam là bạn, là đối tác tin cậy và là thành viên có trách nhiệm của cộng đồng quốc tế (gia nhập ASEAN 1995, APEC 1998, WTO 2007, tham gia gìn giữ hòa bình LHQ từ 2014).'
            ],
            questions: [
              {
                q: 'Đường lối Đổi mới của Đảng Cộng sản Việt Nam (bắt đầu từ Đại hội VI tháng 12/1986) xác định trọng tâm của công cuộc đổi mới là lĩnh vực nào?',
                options: [
                  'Đổi mới về kinh tế, gắn liền với đổi mới từng bước về chính trị',
                  'Chỉ đổi mới văn hóa nghệ thuật, giữ nguyên cơ chế kinh tế bao cấp',
                  'Thay đổi mục tiêu chủ nghĩa xã hội',
                  'Đóng cửa hoàn toàn nền kinh tế với bên ngoài'
                ],
                answer: 0,
                explain: 'Đảng xác định đổi mới phải toàn diện và đồng bộ, trong đó lấy đổi mới kinh tế làm trọng tâm.'
              },
              {
                q: 'Mô hình kinh tế tổng quát của Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội được xây dựng từ công cuộc Đổi mới là:',
                options: [
                  'Kinh tế thị trường định hướng xã hội chủ nghĩa',
                  'Kinh tế kế hoạch hóa tập trung quan liêu bao cấp',
                  'Kinh tế tự nhiên tự cấp tự túc',
                  'Kinh tế thị trường tự do hoàn toàn không có sự quản lý của Nhà nước'
                ],
                answer: 0,
                explain: 'Xóa bỏ cơ chế bao cấp để phát triển nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường có sự quản lý của Nhà nước theo định hướng XHCN.'
              },
              {
                q: 'Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới (WTO) vào năm nào?',
                options: ['Năm 2007', 'Năm 1995', 'Năm 1986', 'Năm 2015'],
                answer: 0,
                explain: 'Đầu năm 2007, Việt Nam chính thức trở thành thành viên thứ 150 của WTO, đánh dấu bước hội nhập kinh tế quốc tế toàn diện.'
              },
              {
                q: 'Từ năm 2014 đến nay, việc Quân đội nhân dân và Công an nhân dân Việt Nam cử lực lượng tham gia hoạt động gìn giữ hòa bình của Liên Hợp Quốc thể hiện điều gì?',
                options: [
                  'Việt Nam là thành viên chủ động, tích cực và có trách nhiệm trong việc duy trì hòa bình, ổn định quốc tế',
                  'Việt Nam tham gia vào các liên minh quân sự xâm lược',
                  'Việt Nam từ bỏ nguyên tắc độc lập tự chủ',
                  'Chỉ nhằm mục đích phát triển du lịch'
                ],
                answer: 0,
                explain: 'Tham gia lực lượng Gìn giữ hòa bình LHQ khẳng định vị thế, uy tín và trách nhiệm quốc tế cao cả của Việt Nam.'
              },
              {
                q: 'Phương châm đối ngoại xuyên suốt của Việt Nam trong thời kỳ hội nhập quốc tế hiện nay là:',
                options: [
                  'Độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển; đa phương hóa, đa dạng hóa quan hệ đối ngoại',
                  'Chỉ quan hệ ngoại giao với các nước cùng châu lục',
                  'Phụ thuộc vào một cường quốc duy nhất',
                  'Hạn chế ký kết các hiệp định quốc tế'
                ],
                answer: 0,
                explain: 'Đường lối đối ngoại độc lập, tự chủ, đa phương hóa, đa dạng hóa là kim chỉ nam của ngoại giao Việt Nam hiện đại.'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_2',
      title: 'TRÙM ẢI 2: BÀI TOÁN TƯ DUY CHƯƠNG TRÌNH MỚI 2018',
      subtitle: 'Kiểm tra Xác suất Bayes, Thống kê ghép nhóm, Sắp xếp đoạn Anh và Sử - Địa Đổi mới',
      timeLimitSeconds: 600,
      thptBonus: 1.0,
      ca4Bonus: 3.0,
      expBonus: 900,
      questions: [
        {
          q: '[TOÁN 2018] Cho P(A) = 0,4; P(B) = 0,5 và P(A | B) = 0,6. Khi đó P(A ∩ B) và P(B | A) lần lượt bằng:',
          options: ['0,3 và 0,75', '0,24 và 0,5', '0,3 và 0,5', '0,2 và 0,75'],
          answer: 0,
          explain: 'P(A ∩ B) = P(B)*P(A|B) = 0,5 * 0,6 = 0,3. Suy ra P(B | A) = P(A ∩ B) / P(A) = 0,3 / 0,4 = 0,75.'
        },
        {
          q: '[TOÁN 2018] Hai xạ thủ A và B có điểm trung bình bằng nhau là 9,2 điểm. Phương sai điểm của A là 0,15 và của B là 0,48. Ai có phong độ bắn ổn định hơn?',
          options: ['Xạ thủ A ổn định hơn', 'Xạ thủ B ổn định hơn', 'Hai người ổn định như nhau', 'Không so sánh được'],
          answer: 0,
          explain: 'Phương sai của A nhỏ hơn (0,15 < 0,48) nên điểm số của A ít phân tán hơn -> phong độ ổn định hơn.'
        },
        {
          q: '[ANH] Sắp xếp 3 câu sau thành đoạn mở đầu thư hợp lý:\n(a) First, we should organize weekly mock tests for the CA4 assessment.\n(b) I am writing to propose some ideas for our unit\'s exam study group.\n(c) Second, pairing up to review History and Geography flashcards will save time.',
          options: ['b - a - c', 'a - c - b', 'c - a - b', 'b - c - a'],
          answer: 0,
          explain: 'Nêu lý do viết thư (b) -> Ý đề xuất thứ nhất "First" (a) -> Ý đề xuất thứ hai "Second" (c).'
        },
        {
          q: '[VĂN] Trong đề Đọc hiểu ngữ liệu mới, khi đề yêu cầu "Anh/chị có đồng tình với quan điểm của tác giả không? Vì sao?", cách trả lời nào đạt điểm tối đa?',
          options: [
            'Nêu rõ thái độ (Đồng tình / Đồng tình một phần) và đưa ra ít nhất 2-3 lý lẽ thuyết phục, chặt chẽ để bảo vệ quan điểm',
            'Chỉ viết đúng hai chữ "Đồng tình" rồi bỏ trống phần giải thích',
            'Chép lại nguyên văn câu hỏi',
            'Trả lời lan man sang một tác phẩm khác'
          ],
          answer: 0,
          explain: 'Câu hỏi vận dụng luôn chấm điểm chủ yếu ở phần lập luận "Vì sao?" (thường chiếm 0,75/1,0 điểm của câu).'
        },
        {
          q: '[ĐỊA - CA4] Ngành công nghiệp sản xuất điện ở nước ta hiện nay đang chuyển dịch mạnh mẽ theo hướng nào?',
          options: [
            'Phát triển các nguồn năng lượng tái tạo (điện gió, điện mặt trời) gắn với giảm phát thải và chuyển dịch năng lượng xanh',
            'Tăng tối đa các nhà máy nhiệt điện đốt than công nghệ cũ',
            'Ngừng vận hành toàn bộ các nhà máy thủy điện',
            'Chỉ sử dụng củi gỗ làm nhiên liệu công nghiệp'
          ],
          answer: 0,
          explain: 'Phát triển năng lượng tái tạo, năng lượng sạch là xu thế chiến lược trong Quy hoạch điện VIII của Việt Nam.'
        },
        {
          q: '[SỬ - CA4] Nội dung cốt lõi của đường lối Đổi mới kinh tế được đề ra tại Đại hội VI (12/1986) của Đảng Cộng sản Việt Nam là:',
          options: [
            'Xóa bỏ cơ chế tập trung quan liêu, bao cấp, hình thành cơ chế thị trường có sự quản lý của Nhà nước theo định hướng XHCN',
            'Quốc hữu hóa toàn bộ tài sản cá nhân ngay lập tức',
            'Đóng cửa biên giới thương mại',
            'Chỉ phát triển công nghiệp nặng, bỏ qua nông nghiệp'
          ],
          answer: 0,
          explain: 'Bước ngoặt 1986 là xóa bỏ cơ chế bao cấp, phát triển kinh tế nhiều thành phần theo cơ chế thị trường định hướng XHCN.'
        }
      ]
    }
  },
  {
    phaseId: 3,
    code: 'PHASE 3',
    title: 'Phase 3: Chuyên Gia Khắc Phục (Mốc 26.0đ THPT / 82đ CA4)',
    timeline: 'Tuần 17 – Tuần 22 (126 giờ học | 3h/ngày)',
    description: 'Chinh phục Nguyên hàm - Tích phân, Cấp số - Lượng giác lớp 11, Phản biện sâu NLXH và Địa lí các Vùng kinh tế.',
    targetThpt: 26.0,
    targetCa4: 82.0,
    themeColor: 'orange',
    quests: [
      {
        id: 'q3_1',
        subject: 'Toán',
        badge: 'D01 + CA4 (Lớp 11 & 12)',
        title: 'Nguyên hàm - Tích phân ứng dụng & Cấp số cộng / Cấp số nhân (30% kiến thức lớp 11)',
        description: 'Giải quyết bài toán diện tích, thể tích, chuyển động và nhóm câu lớp 11 trong đề CA4.',
        subQuests: [
          {
            id: 'sq3_1_1',
            title: 'Nhiệm vụ 3.1A: Tích phân, Diện tích hình phẳng, Thể tích khối tròn xoay & Bài toán Chuyển động',
            thptPoints: 1.25,
            ca4Points: 3.5,
            exp: 240,
            cheatSheet: [
              '1. Công thức Newton-Leibniz: ∫_a^b f(x)dx = F(b) - F(a) (trong đó F\'(x) = f(x)).',
              '2. Ứng dụng Vật lý / Thực tế: Quãng đường S đi được từ t1 đến t2 là S = ∫_{t1}^{t2} v(t) dt. Gia tốc a(t) = v\'(t).',
              '3. Diện tích hình phẳng giới hạn bởi y = f(x), y = g(x), x = a, x = b: S = ∫_a^b |f(x) - g(x)| dx.',
              '4. Thể tích khối tròn xoay khi quay y = f(x) quanh trục Ox từ a đến b: V = π * ∫_a^b [f(x)]^2 dx (Chú ý đừng quên nhân π!).'
            ],
            questions: [
              {
                q: 'Một ô tô đang chạy với vận tốc 20 m/s thì người lái đạp phanh, từ thời điểm đó ô tô chuyển động chậm dần đều với vận tốc v(t) = 20 - 4t (m/s). Quãng đường ô tô đi được từ lúc đạp phanh đến khi dừng hẳn (v = 0) là:',
                options: ['50 m', '100 m', '25 m', '40 m'],
                answer: 0,
                explain: 'Khi dừng hẳn: v(t) = 20 - 4t = 0 => t = 5 (s). Quãng đường S = ∫_0^5 (20 - 4t)dt = [20t - 2t^2]_0^5 = 100 - 50 = 50 m.'
              },
              {
                q: 'Cho ∫_1^3 f(x)dx = 5 và ∫_1^3 g(x)dx = -2. Giá trị của ∫_1^3 [2f(x) - 3g(x)]dx bằng:',
                options: ['16', '4', '10', '7'],
                answer: 0,
                explain: '2 * 5 - 3 * (-2) = 10 + 6 = 16.'
              },
              {
                q: 'Công thức tính thể tích V của khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi đồ thị hàm số y = f(x), trục Ox và hai đường thẳng x = a, x = b (a < b) quanh trục Ox là:',
                options: [
                  'V = π ∫_a^b [f(x)]^2 dx',
                  'V = ∫_a^b [f(x)]^2 dx',
                  'V = π ∫_a^b |f(x)| dx',
                  'V = 2π ∫_a^b f(x) dx'
                ],
                answer: 0,
                explain: 'Thể tích khối tròn xoay quanh Ox bắt buộc phải có hệ số π và bình phương hàm số [f(x)]^2.'
              },
              {
                q: 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số y = x^2 - 4, trục hoành Ox và hai đường thẳng x = 0, x = 2 bằng:',
                options: ['16/3', '8/3', '4', '12/5'],
                answer: 0,
                explain: 'Trên [0; 2], x^2 - 4 ≤ 0 nên S = ∫_0^2 |x^2 - 4|dx = ∫_0^2 (4 - x^2)dx = [4x - x^3/3]_0^2 = 8 - 8/3 = 16/3.'
              },
              {
                q: 'Họ nguyên hàm của hàm số f(x) = e^(2x) + cos(x) là:',
                options: [
                  '(1/2)e^(2x) + sin(x) + C',
                  '2e^(2x) - sin(x) + C',
                  '(1/2)e^(2x) - sin(x) + C',
                  'e^(2x) + sin(x) + C'
                ],
                answer: 0,
                explain: '∫ e^(ax) dx = (1/a)e^(ax) và ∫ cos(x) dx = sin(x).'
              }
            ]
          },
          {
            id: 'sq3_1_2',
            title: 'Nhiệm vụ 3.1B: Cấp số cộng, Cấp số nhân & Góc - Khoảng cách Hình không gian (Lớp 11)',
            thptPoints: 0.75,
            ca4Points: 2.5,
            exp: 220,
            cheatSheet: [
              '1. Cấp số cộng (công sai d): Số hạng tổng quát u_n = u_1 + (n - 1)d. Tổng n số hạng đầu S_n = n*(u_1 + u_n)/2 = n*[2u_1 + (n - 1)d]/2.',
              '2. Cấp số nhân (công bội q): Số hạng tổng quát u_n = u_1 * q^(n - 1). Tổng S_n = u_1 * (1 - q^n) / (1 - q) (với q ≠ 1).',
              '3. Thể tích khối chóp V = (1/3) * B * h; Thể tích khối lăng trụ V = B * h (B là diện tích đáy, h là chiều cao).'
            ],
            questions: [
              {
                q: 'Cho cấp số cộng (u_n) có số hạng đầu u_1 = 3 và công sai d = 4. Số hạng thứ 10 (u_10) và tổng 10 số hạng đầu (S_10) lần lượt là:',
                options: ['u_10 = 39 và S_10 = 210', 'u_10 = 43 và S_10 = 230', 'u_10 = 36 và S_10 = 200', 'u_10 = 39 và S_10 = 420'],
                answer: 0,
                explain: 'u_10 = u_1 + 9d = 3 + 9*4 = 39. Tổng S_10 = 10*(u_1 + u_10)/2 = 5*(3 + 39) = 210.'
              },
              {
                q: 'Cho cấp số nhân (u_n) có u_1 = 2 và công bội q = 3. Số hạng u_4 bằng:',
                options: ['54', '18', '162', '24'],
                answer: 0,
                explain: 'u_4 = u_1 * q^3 = 2 * 27 = 54.'
              },
              {
                q: 'Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, SA vuông góc với mặt phẳng đáy và SA = a√3. Thể tích khối chóp S.ABCD bằng:',
                options: ['(a^3 * √3) / 3', 'a^3 * √3', '(a^3 * √3) / 2', '(a^3) / 3'],
                answer: 0,
                explain: 'V = (1/3) * S_ABCD * SA = (1/3) * a^2 * a√3 = (a^3 * √3) / 3.'
              },
              {
                q: 'Trong hình chóp câu trên (đáy hình vuông cạnh a, SA ⊥ (ABCD), SA = a√3), góc giữa đường thẳng SB và mặt phẳng đáy (ABCD) là góc nào và có số đo bao nhiêu?',
                options: ['Góc SBA = 60°', 'Góc SBA = 30°', 'Góc SAB = 60°', 'Góc SBC = 45°'],
                answer: 0,
                explain: 'Hình chiếu của SB lên (ABCD) là AB nên góc là góc SBA. tan(SBA) = SA / AB = (a√3)/a = √3 => Góc SBA = 60°.'
              },
              {
                q: 'Một rạp hát có 20 hàng ghế. Hàng đầu tiên có 15 ghế, mỗi hàng sau nhiều hơn hàng ngay trước nó 2 ghế. Tổng số ghế trong rạp hát đó là:',
                options: ['680 ghế', '600 ghế', '720 ghế', '540 ghế'],
                answer: 0,
                explain: 'Cấp số cộng với n = 20, u_1 = 15, d = 2. S_20 = (20/2) * [2*15 + (20 - 1)*2] = 10 * (30 + 38) = 680 ghế.'
              }
            ]
          }
        ]
      },
      {
        id: 'q3_2',
        subject: 'Ngữ Văn & Tiếng Anh',
        badge: 'D01 + CA4',
        title: 'Phản biện sâu trong Nghị luận xã hội CA4 & Đọc hiểu Học thuật dài Tiếng Anh',
        description: 'Kỹ thuật viết đoạn văn nghị luận sắc sảo (25/25đ CA4) và bóc tách bài đọc 7-8 câu Tiếng Anh.',
        subQuests: [
          {
            id: 'sq3_2_1',
            title: 'Nhiệm vụ 3.2A: Tư duy Biện chứng & Liên hệ sứ mệnh Chiến sĩ CAND trong NLXH 500 chữ',
            thptPoints: 0.75,
            ca4Points: 2.5,
            exp: 220,
            cheatSheet: [
              '1. Công thức nâng điểm NLXH từ mức Khá (18/25) lên mức Xuất sắc (23-25/25) trong đề CA4:',
              '   - Luôn có cặp phạm trù đối sánh biện chứng: "Kiên trì nhưng không bảo thủ", "Tự tin nhưng không tự phụ", "Hội nhập nhưng không hòa tan", "Khát vọng lớn nhưng phải bắt đầu từ kỷ luật nhỏ".',
              '   - Phần Liên hệ bản thân: Tránh viết chung chung ("Em hứa sẽ cố gắng học giỏi"). Hãy gắn trực tiếp với bối cảnh thời đại chuyển đổi số, an ninh mạng và lý tưởng phụng sự Tổ quốc, giữ gìn bình yên cho nhân dân.'
            ],
            questions: [
              {
                q: 'Để bài văn Nghị luận xã hội 500 chữ trong đề thi CA4 đạt điểm tối đa ở tiêu chí "Sáng tạo và Sâu sắc", người viết nên triển khai phần Bàn luận mở rộng theo hướng nào?',
                options: [
                  'Đặt vấn đề trong mối tương quan hai chiều (tư duy biện chứng), chỉ ra ranh giới giữa phẩm chất tích cực với cực đoan/lệch lạc và gắn với bối cảnh thời đại số',
                  'Viết lặp lại câu mở bài 3 lần ở phần thân bài',
                  'Dùng thật nhiều từ ngữ khẩu ngữ, tiếng lóng trên mạng xã hội',
                  'Chỉ chép lại nguyên văn đoạn trích trên đề bài'
                ],
                answer: 0,
                explain: 'Tư duy biện chứng hai chiều và liên hệ thực tiễn thời đại giúp bài viết vượt trội hẳn so với các bài viết theo văn mẫu rập khuôn.'
              },
              {
                q: 'Trong câu hỏi Đọc hiểu: "Anh/chị hiểu như thế nào về ý kiến: Không có áp lực, không có kim cương?", cách giải thích nào sau đây đầy đủ cả nghĩa đen và nghĩa bóng?',
                options: [
                  'Kim cương hình thành từ carbon dưới nhiệt độ và áp suất cực lớn trong lòng đất; ẩn dụ cho việc con người phải trải qua gian khổ, thử thách khắc nghiệt mới tôi luyện nên bản lĩnh và giá trị tỏa sáng',
                  'Chỉ giải thích công thức hóa học của kim cương trong phòng thí nghiệm',
                  'Khuyên con người nên đi tìm mỏ kim cương để làm giàu',
                  'Cho rằng áp lực luôn hủy hoại mọi cố gắng của con người'
                ],
                answer: 0,
                explain: 'Khi giải thích câu nói có hình ảnh ẩn dụ, luôn phải đi từ Nghĩa gốc (hình ảnh trực quan) sang Nghĩa chuyển (bài học nhân sinh).'
              },
              {
                q: 'Cách viết Mở bài Nghị luận xã hội nào vừa tiết kiệm thời gian phòng thi vừa gây ấn tượng mạnh với giám khảo chấm thi CA4?',
                options: [
                  'Đi từ một nghịch lý/thực trạng thời đại hoặc câu chuyện ngắn gọn 2 câu, sau đó dẫn trực tiếp vào trích dẫn đề bài và chốt vấn đề nghị luận',
                  'Viết mở bài dài 2 trang giấy kể từ thuở khai thiên lập địa',
                  'Chỉ chép lại câu lệnh của đề bài mà không có câu dẫn dắt',
                  'Bỏ trống phần mở bài để viết sau cùng'
                ],
                answer: 0,
                explain: 'Mở bài phản đề/tương phản ngắn gọn (4-5 dòng) giúp vào thẳng trọng tâm và thu hút người chấm ngay từ những dòng đầu.'
              },
              {
                q: 'Trong văn bản nghị luận, việc kết hợp yếu tố "Biểu cảm" ở mức độ hợp lý có tác dụng gì?',
                options: [
                  'Giúp lời văn truyền cảm hứng, chạm tới trái tim người đọc và làm cho lý lẽ khô khan trở nên giàu sức lay động',
                  'Biến bài văn nghị luận thành một bài thơ lục bát',
                  'Thay thế hoàn toàn cho hệ thống luận điểm',
                  'Làm mất đi tính đúng đắn của dẫn chứng'
                ],
                answer: 0,
                explain: 'Nghị luận cần lý trí sắc bén nhưng khi kết hợp giọng điệu chân thành, truyền cảm sẽ tạo nên sức thuyết phục toàn diện.'
              },
              {
                q: 'Khi đề bài yêu cầu viết bài văn "tối thiểu khoảng 500 chữ" trong 180 phút (cùng với 80 câu trắc nghiệm), quỹ thời gian phân bổ hợp lý nhất cho bài văn Tự luận CA4 là:',
                options: [
                  'Khoảng 40 – 45 phút (5 phút lập dàn ý nhanh, 35 phút viết hoàn chỉnh khoảng 1,5 – 2 trang giấy thi, 5 phút rà soát)',
                  'Dành 150 phút để viết văn 5 trang giấy, chỉ để 30 phút làm 80 câu trắc nghiệm',
                  'Chỉ dành 5 phút viết 3 dòng',
                  'Không cần lập dàn ý, viết đến đâu nghĩ đến đó'
                ],
                answer: 0,
                explain: 'Phần tự luận chiếm 25/100 điểm -> dành khoảng 40-45/180 phút (25% thời gian) là chiến thuật phân bổ tối ưu nhất.'
              }
            ]
          },
          {
            id: 'sq3_2_2',
            title: 'Nhiệm vụ 3.2B: Kỹ năng Skimming, Scanning & Paraphrasing trong Đọc hiểu Tiếng Anh dài',
            thptPoints: 0.75,
            ca4Points: 1.5,
            exp: 220,
            cheatSheet: [
              '1. Câu hỏi Main Idea / Best Title (Ý chính): Làm SAU CÙNG sau khi đã đọc các đoạn. Đáp án đúng phải bao quát toàn bài, không quá hẹp (chỉ nói 1 đoạn) và không quá rộng.',
              '2. Câu hỏi Reference ("It / They / This / Which" in paragraph X refers to...): Đọc ngược lại câu liền trước hoặc vế trước dấu phẩy để tìm danh từ số ít/số nhiều tương ứng.',
              '3. Câu hỏi NOT TRUE / EXCEPT: Dùng từ khóa (Tên riêng, con số, thuật ngữ) quét (Scan) từng phương án trong bài. Đáp án của đề thường sử dụng kỹ thuật Paraphrase (đổi từ đồng nghĩa hoặc đổi cấu trúc chủ động - bị động).'
            ],
            questions: [
              {
                q: 'Read the sentence: "Cybercriminals often exploit human psychology through phishing emails, which trick users into revealing sensitive passwords." The word "which" refers to:',
                options: ['phishing emails', 'human psychology', 'sensitive passwords', 'users'],
                answer: 0,
                explain: 'Đại từ quan hệ "which" đứng ngay sau danh từ "phishing emails" để giải thích tác hại của các email lừa đảo này.'
              },
              {
                q: 'Trong bài đọc hiểu Tiếng Anh, khi gặp câu hỏi "Which of the following best serves as the title for the passage?", chiến thuật thông minh nhất là:',
                options: [
                  'Làm các câu hỏi chi tiết trước để nắm nội dung từng đoạn, sau đó mới chốt câu Title/Main idea dựa trên câu chủ đề các đoạn',
                  'Chỉ đọc đúng 3 từ đầu tiên của bài rồi khoanh bừa',
                  'Chọn đáp án dài nhất có chứa từ khó nhất',
                  'Chọn đáp án chỉ xuất hiện ở câu cuối cùng của đoạn 4'
                ],
                answer: 0,
                explain: 'Làm câu chi tiết trước giúp bạn hiểu toàn bộ mạch bài mà không tốn thời gian đọc lại từ đầu.'
              },
              {
                q: 'Read the excerpt: "Unlike traditional warfare, cyber attacks can be launched anonymously from anywhere in the world within seconds." Which statement is TRUE according to the excerpt?',
                options: [
                  'Cyber attacks differ from conventional warfare in their speed and anonymity.',
                  'Traditional warfare is much faster than cyber attacks.',
                  'Cyber attacks can only be launched from a single country.',
                  'It takes several months to launch a cyber attack.'
                ],
                answer: 0,
                explain: 'Paraphrase chuẩn: "Unlike traditional warfare" = "differ from conventional warfare"; "anonymously... within seconds" = "speed and anonymity".'
              },
              {
                q: 'The word "mitigate" in the context "Organizations must take proactive steps to mitigate security risks" is CLOSEST in meaning to:',
                options: ['reduce', 'increase', 'ignore', 'create'],
                answer: 0,
                explain: 'Mitigate risks = reduce / lessen risks (giảm thiểu rủi ro).'
              },
              {
                q: 'The word "mandatory" in "The essay section is mandatory for all CA4 candidates" is OPPOSITE in meaning to:',
                options: ['optional', 'compulsory', 'required', 'essential'],
                answer: 0,
                explain: 'Mandatory = compulsory/required (bắt buộc) >< optional (tự chọn/không bắt buộc).'
              }
            ]
          }
        ]
      },
      {
        id: 'q3_3',
        subject: 'Địa lí & Lịch sử',
        badge: 'CA4 (Vùng Kinh Tế & Chủ Quyền)',
        title: 'Địa lí các Vùng kinh tế trọng điểm, Biển đảo & Bảo vệ Tổ quốc sau 1975',
        description: 'Nắm chắc đặc trưng từng vùng kinh tế (ĐBSCL, Đông Nam Bộ, Tây Nguyên...) và lịch sử bảo vệ chủ quyền.',
        subQuests: [
          {
            id: 'sq3_3_1',
            title: 'Nhiệm vụ 3.3A: Thế mạnh đặc trưng 6 Vùng kinh tế & Kinh tế Biển đảo Việt Nam',
            thptPoints: 0.0,
            ca4Points: 2.5,
            exp: 220,
            cheatSheet: [
              '1. Từ khóa nhận diện nhanh các vùng kinh tế:',
              '   - Trung du & Miền núi Bắc Bộ: Thủy điện lớn nhất, khoáng sản đa dạng nhất, cây công nghiệp cận nhiệt (Chè).',
              '   - Tây Nguyên: Đất đỏ badan -> Cà phê số 1 cả nước, cao su, hồ tiêu; Bô-xít; Thủy điện bậc thang.',
              '   - Đông Nam Bộ: Dẫn đầu công nghiệp - dịch vụ, khai thác dầu khí thềm lục địa, cây cao su lớn nhất.',
              '   - Đồng bằng sông Cửu Long: Vựa lúa, thủy sản và trái cây số 1 cả nước; thách thức lớn nhất là xâm nhập mặn, thiếu nước ngọt mùa khô -> giải pháp là chuyển đổi cơ cấu cây trồng, sống chung và thích ứng biến đổi khí hậu.'
            ],
            questions: [
              {
                q: 'Giải pháp quan trọng và lâu dài nhất để phát triển nông nghiệp bền vững trước tình trạng hạn hán và xâm nhập mặn ở Đồng bằng sông Cửu Long là:',
                options: [
                  'Chuyển đổi cơ cấu sản xuất nông nghiệp, chọn giống cây trồng vật nuôi chịu mặn và thích ứng với biến đổi khí hậu',
                  'Ngừng hoàn toàn mọi hoạt động sản xuất nông nghiệp và thủy sản',
                  'Đắp đê ngăn toàn bộ cửa sông thông ra biển',
                  'Chỉ trồng duy nhất một vụ lúa trong năm ở tất cả các tỉnh'
                ],
                answer: 0,
                explain: 'Thích ứng linh hoạt thông qua chuyển đổi cơ cấu mùa vụ, cây trồng, thủy sản (tôm - lúa, cây ăn quả...) là giải pháp chiến lược của ĐBSCL.'
              },
              {
                q: 'Vùng Tây Nguyên dẫn đầu cả nước về diện tích và sản lượng cây công nghiệp lâu năm nào sau đây nhờ thế mạnh đất đỏ badan màu mỡ và khí hậu cận xích đạo?',
                options: ['Cây cà phê', 'Cây chè', 'Cây dừa', 'Cây cói'],
                answer: 0,
                explain: 'Tây Nguyên là vùng chuyên canh cà phê lớn nhất Việt Nam (chiếm trên 85-90% diện tích cà phê cả nước).'
              },
              {
                q: 'Vùng Trung du và miền núi Bắc Bộ có thế mạnh nổi bật nhất cả nước về phát triển cây chè chủ yếu do:',
                options: [
                  'Khí hậu nhiệt đới ẩm gió mùa có một mùa đông lạnh kết hợp với đất feralit trên đồi núi',
                  'Khí hậu nóng quanh năm không có mùa đông',
                  'Địa hình hoàn toàn là đồng bằng châu thổ',
                  'Đất nhiễm phèn và nhiễm mặn diện rộng'
                ],
                answer: 0,
                explain: 'Cây chè ưa khí hậu cận nhiệt (có mùa đông lạnh) và đất feralit thoát nước tốt ở Trung du miền núi Bắc Bộ.'
              },
              {
                q: 'Theo Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982), Vùng đặc quyền kinh tế (EEZ) của Việt Nam có chiều rộng bao nhiêu hải lí tính từ đường cơ sở?',
                options: ['200 hải lí', '12 hải lí', '24 hải lí', '350 hải lí'],
                answer: 0,
                explain: 'Lãnh hải rộng 12 hải lí; Vùng tiếp giáp lãnh hải rộng 12 hải lí; Vùng đặc quyền kinh tế rộng 200 hải lí tính từ đường cơ sở.'
              },
              {
                q: 'Bốn ngành kinh tế biển trọng điểm của Việt Nam bao gồm:',
                options: [
                  'Du lịch và dịch vụ biển; Kinh tế hàng hải; Khai thác dầu khí và tài nguyên khoáng sản biển; Nuôi trồng và khai thác hải sản',
                  'Trồng lúa nước; Chăn nuôi gia súc lớn; Khai thác than đá; Lâm nghiệp',
                  'Chỉ có đánh bắt cá ven bờ',
                  'Sản xuất ô tô và dệt may'
                ],
                answer: 0,
                explain: 'Phát triển tổng hợp kinh tế biển gồm 4 trụ cột: Du lịch biển, Hàng hải (cảng biển/vận tải), Dầu khí/khoáng sản biển, và Hải sản.'
              }
            ]
          },
          {
            id: 'sq3_3_2',
            title: 'Nhiệm vụ 3.3B: Thống nhất đất nước về mặt Nhà nước (1975-1976) & Bảo vệ Tổ quốc, Chủ quyền Biển đảo',
            thptPoints: 0.0,
            ca4Points: 1.5,
            exp: 200,
            cheatSheet: [
              '1. Hoàn thành thống nhất đất nước về mặt Nhà nước (1975-1976): Cuộc Tổng tuyển cử bầu Quốc hội chung (25/4/1976). Kỳ họp thứ nhất Quốc hội khóa VI (7/1976) quyết định tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam, Thủ đô Hà Nội, đổi tên Sài Gòn - Gia Định thành TP. Hồ Chí Minh.',
              '2. Đấu tranh bảo vệ biên giới Tây Nam và biên giới phía Bắc (1975-1989): Là cuộc chiến tranh chính nghĩa tự vệ bảo vệ độc lập, chủ quyền, toàn vẹn lãnh thổ Tổ quốc.',
              '3. Chủ trương giải quyết tranh chấp ở Biển Đông: Kiên quyết, kiên trì đấu tranh bằng biện pháp hòa bình trên cơ sở luật pháp quốc tế (đặc biệt là UNCLOS 1982).'
            ],
            questions: [
              {
                q: 'Sự kiện lịch sử nào vào ngày 25/4/1976 đã đánh dấu bước quyết định trong quá trình hoàn thành thống nhất đất nước về mặt Nhà nước sau đại thắng Xuân 1975?',
                options: [
                  'Cuộc Tổng tuyển cử bầu Quốc hội chung của cả nước (Quốc hội khóa VI)',
                  'Hội nghị Hiệp thương chính trị tại Đà Lạt',
                  'Ký kết Hiệp định Paris',
                  'Việt Nam gia nhập Liên Hợp Quốc'
                ],
                answer: 0,
                explain: 'Ngày 25/4/1976, hơn 23 triệu cử tri cả nước đi bỏ phiếu bầu Quốc hội thống nhất (Quốc hội khóa VI).'
              },
              {
                q: 'Lập trường nhất quán của Đảng và Nhà nước Việt Nam trong việc giải quyết các tranh chấp chủ quyền ở Biển Đông là:',
                options: [
                  'Kiên quyết, kiên trì giải quyết tranh chấp bằng các biện pháp hòa bình trên cơ sở luật pháp quốc tế, đặc biệt là UNCLOS 1982',
                  'Sử dụng vũ lực quân sự để giải quyết mọi bất đồng',
                  'Từ bỏ quyền chủ quyền trong vùng đặc quyền kinh tế',
                  'Không tham gia bất kỳ diễn đàn đa phương nào'
                ],
                answer: 0,
                explain: 'Việt Nam kiên trì giải quyết tranh chấp bằng biện pháp hòa bình, tôn trọng luật pháp quốc tế (UNCLOS 1982), thực hiện DOC và hướng tới COC.'
              },
              {
                q: 'Hai quần đảo Hoàng Sa và Trường Sa thuộc chủ quyền của Việt Nam hiện nay trực thuộc quyền quản lý hành chính của hai tỉnh/thành phố nào?',
                options: [
                  'Huyện đảo Hoàng Sa thuộc TP. Đà Nẵng; Huyện đảo Trường Sa thuộc tỉnh Khánh Hòa',
                  'Hoàng Sa thuộc tỉnh Quảng Ninh; Trường Sa thuộc tỉnh Cà Mau',
                  'Cả hai đều thuộc tỉnh Bình Thuận',
                  'Hoàng Sa thuộc tỉnh Nghệ An; Trường Sa thuộc tỉnh Kiên Giang'
                ],
                answer: 0,
                explain: 'Huyện đảo Hoàng Sa trực thuộc thành phố Đà Nẵng; huyện đảo Trường Sa trực thuộc tỉnh Khánh Hòa.'
              },
              {
                q: 'Cuộc chiến đấu bảo vệ biên giới Tây Nam và biên giới phía Bắc của quân dân Việt Nam trong những năm 1975 – 1989 mang tính chất gì?',
                options: [
                  'Chiến tranh tự vệ chính nghĩa nhằm bảo vệ độc lập, chủ quyền, toàn vẹn lãnh thổ và làm nghĩa vụ quốc tế cao cả',
                  'Chiến tranh mở rộng lãnh thổ',
                  'Xung đột thương mại kinh tế',
                  'Diễn tập quân sự thông thường'
                ],
                answer: 0,
                explain: 'Đây là cuộc đấu tranh chính nghĩa bảo vệ biên cương Tổ quốc và giúp nhân dân Campuchia thoát khỏi họa diệt chủng Khmer Đỏ.'
              },
              {
                q: 'Ý nghĩa quan trọng nhất của việc hoàn thành thống nhất đất nước về mặt Nhà nước (1976) là gì?',
                options: [
                  'Tạo điều kiện chính trị - pháp lý cơ bản để phát huy sức mạnh toàn diện của đất nước và mở rộng quan hệ quốc tế',
                  'Bắt đầu cuộc kháng chiến chống Pháp',
                  'Chấm dứt hoàn toàn thiên tai hạn hán',
                  'Giải thể toàn bộ các cơ quan hành chính địa phương'
                ],
                answer: 0,
                explain: 'Thống nhất về mặt nhà nước đã thể chế hóa sự thống nhất lãnh thổ, tạo cơ sở pháp lý vững chắc để cả nước đi lên CNXH và hội nhập quốc tế.'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_3',
      title: 'TRÙM ẢI 3: CHUYÊN GIA PHÁ BẪY ĐỀ THI',
      subtitle: 'Kiểm tra tổng hợp Tích phân, Cấp số, Đọc hiểu học thuật, Vùng kinh tế & Biển đảo',
      timeLimitSeconds: 600,
      thptBonus: 0.5,
      ca4Bonus: 2.0,
      expBonus: 1100,
      questions: [
        {
          q: '[TOÁN] Thể tích khối tròn xoay khi quay hình phẳng giới hạn bởi y = √x, trục Ox, x = 0 và x = 4 quanh trục Ox bằng:',
          options: ['8π', '8', '4π', '16π'],
          answer: 0,
          explain: 'V = π ∫_0^4 (√x)^2 dx = π ∫_0^4 x dx = π * [x^2 / 2]_0^4 = 8π.'
        },
        {
          q: '[TOÁN] Cho cấp số cộng có u_1 = -2 và u_5 = 14. Công sai d của cấp số cộng là:',
          options: ['d = 4', 'd = 3', 'd = 5', 'd = 2'],
          answer: 0,
          explain: 'u_5 = u_1 + 4d <=> 14 = -2 + 4d <=> 4d = 16 <=> d = 4.'
        },
        {
          q: '[ANH] The phrase "narrow down" in "Investigators used digital footprints to narrow down the list of suspects" means:',
          options: [
            'reduce the number of possibilities',
            'expand the list indefinitely',
            'delete all evidence',
            'publish the list to the public'
          ],
          answer: 0,
          explain: 'Narrow down = thu hẹp phạm vi / giảm bớt số lượng khả năng.'
        },
        {
          q: '[ĐỊA - CA4] Thế mạnh hàng đầu của vùng Đông Nam Bộ so với các vùng kinh tế khác trong cả nước là:',
          options: [
            'Trình độ phát triển công nghiệp - dịch vụ cao nhất, thu hút FDI lớn và khai thác dầu khí ở thềm lục địa',
            'Có trữ lượng than đá và thủy điện lớn nhất cả nước',
            'Có diện tích trồng chè cận nhiệt lớn nhất',
            'Có mùa đông lạnh kéo dài thuận lợi cho cây vụ đông'
          ],
          answer: 0,
          explain: 'Đông Nam Bộ là vùng kinh tế phát triển năng động nhất, dẫn đầu về công nghiệp, dịch vụ và khai thác dầu khí.'
        },
        {
          q: '[SỬ - CA4] Kỳ họp thứ nhất Quốc hội khóa VI (tháng 7/1976) của nước Việt Nam thống nhất đã thông qua quyết định quan trọng nào?',
          options: [
            'Quyết định tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam, Quốc kỳ, Quốc huy, Quốc ca và Thủ đô là Hà Nội',
            'Phát động cuộc Tổng tiến công Xuân Mậu Thân',
            'Ký Hiệp định sơ bộ 6/3',
            'Gia nhập khối quân sự SEATO'
          ],
          answer: 0,
          explain: 'Kỳ họp đầu tiên của Quốc hội khóa VI (7/1976) đã hoàn tất các quyết sách trọng đại về tên nước, Quốc kỳ, Quốc ca, Thủ đô và đổi tên Sài Gòn - Gia Định thành TP. Hồ Chí Minh.'
        }
      ]
    }
  },
  {
    phaseId: 4,
    code: 'PHASE 4',
    title: 'Phase 4: Đặc Nhiệm Phá Đảo (Mốc 29.0đ THPT / 93đ CA4)',
    timeline: 'Tuần 23 – Tuần 27 (105 giờ học | 3h/ngày)',
    description: 'Chinh phục nhóm 20% câu hỏi Vận dụng cao: Bài toán Thực tế Tối ưu hóa, Suy luận Tiếng Anh và Liên hệ thực tiễn Sử - Địa.',
    targetThpt: 29.0,
    targetCa4: 93.0,
    themeColor: 'red',
    quests: [
      {
        id: 'q4_1',
        subject: 'Toán Vận Dụng Cao',
        badge: 'D01 + CA4 (VDC 20%)',
        title: 'Bài toán Thực tế Tối ưu hóa (Max/Min Chi phí - Lợi nhuận) & Mô hình hóa Hàm số',
        description: 'Dạng toán trả lời ngắn trong đề THPT và các câu phân loại trong đề tham khảo CA4 (như bài toán nhịp tim, khung cánh diều).',
        subQuests: [
          {
            id: 'sq4_1_1',
            title: 'Nhiệm vụ 4.1A: Giải bài toán Tối ưu hóa Thực tế bằng Đạo hàm & Hàm số lượng giác/mũ',
            thptPoints: 1.0,
            ca4Points: 4.5,
            exp: 300,
            cheatSheet: [
              '1. Quy trình 4 bước giải Toán thực tế tối ưu hóa:',
              '   - Bước 1: Chọn ẩn x (xác định điều kiện thực tế của x, ví dụ x > 0 hoặc a ≤ x ≤ b).',
              '   - Bước 2: Biểu diễn đại lượng cần tìm Max/Min (Chi phí, Lợi nhuận, Thể tích, Diện tích) thành hàm một biến f(x).',
              '   - Bước 3: Tính đạo hàm f\'(x) = 0 hoặc dùng TABLE (MENU 8) để tìm điểm cực trị.',
              '   - Bước 4: Đối chiếu điều kiện và làm tròn đúng hàng đơn vị/phần mười theo yêu cầu đề bài.',
              '2. Hàm lượng giác thực tế y = A.cos(ωt + φ) + B (với A > 0): Giá trị lớn nhất = B + A; Giá trị nhỏ nhất = B - A.'
            ],
            questions: [
              {
                q: '[Trích dạng đề tham khảo CA4] Huyết áp của một người sau t giây được mô tả bởi hàm số P(t) = 100 + 20.cos(7πt / 3) (mmHg). Huyết áp tối đa (tâm thu) và huyết áp tối thiểu (tâm trương) của người đó lần lượt là:',
                options: [
                  '120 mmHg và 80 mmHg',
                  '100 mmHg và 20 mmHg',
                  '140 mmHg và 60 mmHg',
                  '120 mmHg và 100 mmHg'
                ],
                answer: 0,
                explain: 'Vì -1 ≤ cos(...) ≤ 1 nên P_max = 100 + 20(1) = 120 mmHg và P_min = 100 + 20(-1) = 80 mmHg.'
              },
              {
                q: 'Một doanh nghiệp sản xuất x sản phẩm (1 ≤ x ≤ 100) có tổng lợi nhuận (triệu đồng) được mô hình hóa bởi hàm số L(x) = -x^2 + 80x - 500. Doanh nghiệp cần sản xuất bao nhiêu sản phẩm để đạt lợi nhuận lớn nhất?',
                options: ['40 sản phẩm', '80 sản phẩm', '50 sản phẩm', '20 sản phẩm'],
                answer: 0,
                explain: 'L\'(x) = -2x + 80 = 0 <=> x = 40. Khi đó lợi nhuận cực đại L(40) = -1600 + 3200 - 500 = 1100 triệu đồng.'
              },
              {
                q: 'Từ một tấm tôn hình vuông cạnh 12 cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh bằng x (cm) rồi gập lên thành một hình hộp chữ nhật không nắp. Giá trị của x để thể tích hộp lớn nhất là:',
                options: ['x = 2 cm', 'x = 3 cm', 'x = 4 cm', 'x = 1 cm'],
                answer: 0,
                explain: 'Thể tích V(x) = x(12 - 2x)^2 (0 < x < 6). Đạo hàm V\'(x) = (12 - 2x)(12 - 6x) = 0 => x = 2 cm (Mẹo nhanh: x = cạnh / 6 = 12 / 6 = 2).'
              },
              {
                q: 'Dân số của một khu đô thị mới tăng theo công thức S(t) = A * e^(r*t). Nếu ban đầu có 50.000 người và tốc độ tăng r = 0,04/năm, sau 10 năm dân số khu đô thị gần nhất với con số nào (biết e^0,4 ≈ 1,4918)?',
                options: ['74.590 người', '60.000 người', '95.000 người', '54.000 người'],
                answer: 0,
                explain: 'S(10) = 50.000 * e^(0,04 * 10) = 50.000 * 1,4918 = 74.590 người.'
              },
              {
                q: 'Trong không gian Oxyz (đơn vị km), một trạm radar đặt tại I(1; 2; 0) có bán kính quét tối đa R = 10 km. Một mục tiêu bay tại vị trí M(7; 10; 2) có nằm trong vùng phủ sóng của radar không?',
                options: [
                  'Không, vì khoảng cách IM = √104 ≈ 10,2 km > 10 km',
                  'Có, vì khoảng cách IM = 8 km < 10 km',
                  'Có, vì mục tiêu nằm ngay tại tâm radar',
                  'Không xác định được'
                ],
                answer: 0,
                explain: 'IM = √[(7-1)^2 + (10-2)^2 + (2-0)^2] = √(36 + 64 + 4) = √104 ≈ 10,198 km > R = 10 km nên nằm ngoài vùng quét.'
              }
            ]
          }
        ]
      },
      {
        id: 'q4_2',
        subject: 'Tiếng Anh, Văn, Sử, Địa (VDC)',
        badge: 'D01 + CA4 (Vận Dụng Cao)',
        title: 'Suy luận Ngữ cảnh (Inference), Thành ngữ & Câu hỏi Phân loại Sử - Địa CA4',
        description: 'Bứt phá mốc 29đ THPT và 93đ CA4 bằng kỹ năng xử lý câu hỏi suy luận gián tiếp.',
        subQuests: [
          {
            id: 'sq4_2_1',
            title: 'Nhiệm vụ 4.2A: Câu hỏi Suy luận (It can be inferred...), Idioms & So sánh liên môn Sử - Địa',
            thptPoints: 1.0,
            ca4Points: 3.5,
            exp: 300,
            cheatSheet: [
              '1. Nguyên tắc vàng cho câu hỏi Inference ("What can be inferred from paragraph X?"): Đáp án đúng là hệ quả logic trực tiếp từ thông tin trong bài (100% có căn cứ), TUYỆT ĐỐI tránh các đáp án chứa từ tuyệt đối hóa (always, never, completely, only, all) nếu bài gốc không khẳng định tuyệt đối.',
              '2. Địa lí Vận dụng cao: Khi hỏi về "Ý nghĩa chủ yếu" của việc phát triển giao thông/công nghiệp chế biến -> Luôn ưu tiên đáp án gắn với "Thúc đẩy sản xuất hàng hóa, nâng cao giá trị nông sản/khoáng sản, tăng cường liên kết vùng".',
              '3. Lịch sử Vận dụng cao: Khi hỏi về "Điểm tương đồng" giữa các chiến dịch hoặc các giai đoạn cách mạng -> Tìm bản chất chung về sự lãnh đạo của Đảng, kết hợp sức mạnh dân tộc với sức mạnh thời đại, nghệ thuật chớp thời cơ.'
            ],
            questions: [
              {
                q: '[ANH - Inference] "Although automated AI firewalls block 98% of standard malware, social engineering attacks targeting employees still account for the majority of data breaches." What can be inferred from this statement?',
                options: [
                  'Human awareness training is just as critical as technical software defenses in cybersecurity.',
                  'AI firewalls are completely useless and should be removed.',
                  'Standard malware causes 100% of all data breaches today.',
                  'Employees never use computers at work.'
                ],
                answer: 0,
                explain: 'Vì tường lửa chặn 98% mã độc kỹ thuật nhưng tấn công nhắm vào yếu tố con người vẫn gây ra phần lớn vụ rò rỉ -> suy ra đào tạo nhận thức con người quan trọng không kém giải pháp kỹ thuật.'
              },
              {
                q: '[ANH - Idiom] Studying 3 hours every single day after work is tough, but his determination helped him _______ and pass the academy exam.',
                options: [
                  'weather the storm',
                  'spill the beans',
                  'miss the boat',
                  'bark up the wrong tree'
                ],
                answer: 0,
                explain: 'Weather the storm = vượt qua giai đoạn khó khăn, thử thách thành công.'
              },
              {
                q: '[ĐỊA - CA4 VDC] Mục đích chủ yếu của việc đẩy mạnh công nghiệp chế biến nông, lâm, thủy sản tại các vùng chuyên canh ở nước ta hiện nay là:',
                options: [
                  'Nâng cao giá trị gia tăng và sức cạnh tranh của hàng hóa, mở rộng thị trường xuất khẩu và thúc đẩy nông nghiệp sản xuất hàng hóa',
                  'Giảm diện tích đất nông nghiệp xuống mức tối thiểu',
                  'Chỉ để phục vụ nhu cầu tiêu dùng tại chỗ của người nông dân',
                  'Thay thế hoàn toàn ngành dịch vụ du lịch'
                ],
                answer: 0,
                explain: 'Công nghiệp chế biến giúp nông sản bảo quản lâu, nâng cao giá trị thương phẩm, đáp ứng tiêu chuẩn xuất khẩu và kích thích vùng nguyên liệu phát triển.'
              },
              {
                q: '[SỬ - CA4 VDC] Điểm tương đồng nổi bật về nghệ thuật chỉ đạo chiến lược giữa Tổng khởi nghĩa Tháng Tám năm 1945 và Tổng tiến công và nổi dậy Xuân 1975 là gì?',
                options: [
                  'Nghệ thuật tạo thời cơ, dự báo chính xác và chớp thời cơ chiến lược để giành thắng lợi quyết định',
                  'Đều diễn ra trong điều kiện đất nước đã có chính quyền nhà nước thống nhất trên toàn quốc từ trước',
                  'Chỉ sử dụng lực lượng chính trị quần chúng mà không có lực lượng vũ trang',
                  'Đều kết thúc bằng việc ký kết một hiệp định quốc tế tại châu Âu'
                ],
                answer: 0,
                explain: 'Cả hai thắng lợi vĩ đại năm 1945 và 1975 đều là đỉnh cao của nghệ thuật tạo lực, lập thế và chớp thời cơ chiến lược thần tốc, táo bạo.'
              },
              {
                q: '[VĂN - CA4 VDC] Khi mở bài hoặc kết bài Nghị luận xã hội về "Trách nhiệm của người trẻ trong kỷ nguyên vươn mình của dân tộc", cách diễn đạt nào tạo chiều sâu tư tưởng tốt nhất?',
                options: [
                  'Kết nối khát vọng cá nhân với vận mệnh đất nước: mỗi giờ học tập, rèn luyện kỷ luật và làm chủ tri thức công nghệ hôm nay chính là viên gạch xây dựng lá chắn bảo vệ bình yên Tổ quốc ngày mai',
                  'Chỉ liệt kê danh sách các môn học ở trường phổ thông',
                  'Than phiền về những áp lực trong cuộc sống hiện đại',
                  'Sử dụng những khẩu hiệu sáo rỗng nhưng không chỉ ra hành động cụ thể'
                ],
                answer: 0,
                explain: 'Gắn kết cái tôi cá nhân (hành động cụ thể mỗi ngày) với cái ta chung của dân tộc và ngành nghề mơ ước luôn tạo dấu ấn sâu sắc nhất.'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_4',
      title: 'TRÙM ẢI 4: ĐẶC NHIỆM PHÁ ĐẢO VẬN DỤNG CAO',
      subtitle: 'Vượt qua 5 bài toán & câu hỏi phân loại để chạm mốc 29.0đ THPT & 93đ CA4',
      timeLimitSeconds: 600,
      thptBonus: 1.0,
      ca4Bonus: 3.0,
      expBonus: 1500,
      questions: [
        {
          q: '[TOÁN VDC] Chi phí sản xuất x đơn vị hàng hóa là C(x) = x^2 + 40x + 900 (nghìn đồng). Giá trị của x (x > 0) để chi phí trung bình cho mỗi đơn vị hàng hóa AC(x) = C(x)/x đạt giá trị nhỏ nhất là:',
          options: ['x = 30', 'x = 20', 'x = 40', 'x = 45'],
          answer: 0,
          explain: 'AC(x) = x + 40 + 900/x. Theo BĐT Cauchy (hoặc đạo hàm 1 - 900/x^2 = 0): x = 900/x => x^2 = 900 => x = 30.'
        },
        {
          q: '[ANH VDC] "While quantum computing promises unprecedented processing speed, it simultaneously poses an existential threat to current RSA encryption standards." The author\'s tone in this sentence is best described as:',
          options: [
            'Objective and cautionary',
            'Sarcastic and humorous',
            'Completely indifferent',
            'Hostile toward all science'
          ],
          answer: 0,
          explain: 'Tác giả nêu cả mặt tích cực (tốc độ xử lý) lẫn nguy cơ đối với mã hóa RSA -> giọng điệu khách quan và cảnh báo (objective and cautionary).'
        },
        {
          q: '[ĐỊA - CA4 VDC] Ý nghĩa chiến lược của việc phát triển kinh tế - xã hội gắn với quốc phòng an ninh tại các huyện đảo và quần đảo xa bờ của Việt Nam là:',
          options: [
            'Vừa khai thác hiệu quả tiềm năng kinh tế biển, vừa tạo thế trận vững chắc bảo vệ chủ quyền, quyền chủ quyền và quyền tài phán quốc gia trên biển',
            'Chỉ nhằm mục đích giảm mật độ dân số ở các vùng núi cao',
            'Thay thế hoàn toàn kinh tế đất liền',
            'Hạn chế tàu thuyền quốc tế đi qua vùng biển quốc tế'
          ],
          answer: 0,
          explain: 'Kinh tế biển gắn liền với quốc phòng an ninh là trụ cột bảo vệ chủ quyền biển đảo Tổ quốc từ sớm, từ xa.'
        },
        {
          q: '[SỬ - CA4 VDC] Bài học lịch sử nào từ thắng lợi của công cuộc Đổi mới (từ 1986 đến nay) đóng vai trò quyết định đối với sự phát triển bền vững của Việt Nam?',
          options: [
            'Kiên định mục tiêu độc lập dân tộc và chủ nghĩa xã hội, lấy dân làm gốc, tôn trọng quy luật khách quan và chủ động hội nhập quốc tế',
            'Sao chép nguyên mẫu mô hình của các quốc gia khác mà không cần điều chỉnh',
            'Tách rời phát triển kinh tế với bảo đảm an ninh - quốc phòng',
            'Giữ nguyên các cơ chế quản lý cũ dù thực tiễn đã thay đổi'
          ],
          answer: 0,
          explain: 'Kiên định nguyên tắc chiến lược đồng thời đổi mới sáng tạo dựa trên thực tiễn và lấy dân làm gốc là bài học xuyên suốt.'
        },
        {
          q: '[TOÁN VDC] Một hộp chứa 99 tấm thẻ đánh số từ 1 đến 99. Rút ngẫu nhiên 1 thẻ. Biết rằng thẻ rút ra là số lẻ, xác suất để số trên thẻ chia hết cho 5 là:',
          options: ['1/5 (10/50)', '1/10', '19/99', '9/50'],
          answer: 0,
          explain: 'Từ 1 đến 99 có 50 số lẻ. Các số lẻ chia hết cho 5 tận cùng bằng 5: {5, 15, 25, ..., 95} có 10 số. Vậy P = 10/50 = 1/5.'
        }
      ]
    }
  },
  {
    phaseId: 5,
    code: 'PHASE BONUS',
    title: 'Phase BONUS: Bứt Phá Giới Hạn (Mốc 30.0đ THPT / 100đ CA4)',
    timeline: 'Tuần 28 – Tuần 30 (63 giờ học | Tổng duyệt trước ngày thi)',
    description: 'Chiến thuật phân bổ 180 phút phòng thi CA4 và tổng duyệt đề thực chiến đạt đỉnh cao.',
    targetThpt: 30.0,
    targetCa4: 100.0,
    themeColor: 'yellow',
    quests: [
      {
        id: 'q5_1',
        subject: 'Chiến Thuật Tổng Hợp',
        badge: 'TỔNG DUYỆT D01 & CA4',
        title: 'Chiến thuật Phân bổ 180 Phút Bài thi CA4 & Tối ưu Điểm Xét Tuyển BCA',
        description: 'Làm chủ nhịp độ phòng thi: 45 phút Tự luận Văn + 120 phút cho 80 câu Trắc nghiệm + 15 phút rà soát phiếu tô.',
        subQuests: [
          {
            id: 'sq5_1_1',
            title: 'Nhiệm vụ 5.1A: Kỷ luật Phòng thi 180 Phút & Công thức Quy đổi Điểm Xét Tuyển BCA',
            thptPoints: 0.5,
            ca4Points: 4.0,
            exp: 400,
            cheatSheet: [
              '1. Công thức tính Điểm xét tuyển Đại học CAND (Phương thức 3):',
              '   Điểm Xét Tuyển (Thang 30) = (Tổng 3 môn THPT D01) * 2/5 + (Điểm ĐGNL CA4 thang 100 * 3/10) * 3/5 + Điểm ưu tiên/khuyến khích.',
              '   => Viết gọn: ĐXT = 0,4 * Điểm_THPT_30 + 0,18 * Điểm_CA4_100 + Điểm_Ưu_Tiên.',
              '2. Chiến thuật 180 phút làm bài thi Đánh giá CA4:',
              '   - Phút 00 – 45 (45 phút): Hoàn thành bài Tự luận Nghị luận xã hội 500 chữ (25 điểm).',
              '   - Phút 45 – 85 (40 phút): Giải 20 câu Tiếng Anh (15đ) + 10 câu Lịch sử (10đ) + 15 câu Địa lí (15đ) = 45 câu (40 điểm).',
              '   - Phút 85 – 165 (80 phút): Giải 35 câu Toán học (35 điểm) từ dễ đến khó.',
              '   - Phút 165 – 180 (15 phút): Kiểm tra kỹ phiếu trả lời trắc nghiệm, không bỏ trống bất kỳ câu nào.'
            ],
            questions: [
              {
                q: 'Theo công thức quy đổi điểm xét tuyển vào các học viện, trường đại học Công an nhân dân (40% điểm thi THPT thang 30 + 60% điểm bài thi Đánh giá BCA quy về thang 30), nếu thí sinh đạt 25,0 điểm khối D01 và 80,0 điểm bài thi CA4 (chưa cộng ưu tiên), điểm xét tuyển là bao nhiêu?',
                options: ['24,40 điểm', '25,00 điểm', '22,80 điểm', '26,20 điểm'],
                answer: 0,
                explain: 'Điểm xét tuyển = 25 * 0,4 + (80 * 0,3) * 0,6 = 10,0 + 24 * 0,6 = 10,0 + 14,4 = 24,40 điểm.'
              },
              {
                q: 'Trong bài thi Đánh giá Bộ Công an mã CA4 (180 phút = 1 câu tự luận Văn + 80 câu trắc nghiệm Toán, Anh, Sử, Địa), vì sao nên giải quyết gọn cụm 45 câu Anh - Sử - Địa trước khi sa đà vào 5-7 câu Toán vận dụng cao cuối đề?',
                options: [
                  'Vì 45 câu Anh - Sử - Địa chiếm tới 40/100 điểm và tốc độ đọc-khoanh nhanh hơn nhiều so với giải 1 bài Toán vận dụng cao phức tạp',
                  'Vì môn Toán không được tính điểm trong bài thi CA4',
                  'Vì đề thi quy định bắt buộc nộp bài môn Toán riêng sau 3 ngày',
                  'Vì không được phép dùng máy tính bỏ túi cho môn Toán'
                ],
                answer: 0,
                explain: 'Tối ưu hóa điểm số trên mỗi phút làm bài: ăn chắc 40 điểm Anh-Sử-Địa và 28 điểm Toán cơ bản/vận dụng trước khi công phá nhóm câu Toán VDC.'
              },
              {
                q: 'Khi còn 5 phút cuối giờ làm bài thi trắc nghiệm CA4 mà vẫn còn 3 câu Toán vận dụng cao chưa tính ra kết quả chính xác, nguyên tắc bắt buộc là gì?',
                options: [
                  'Dùng phương pháp loại trừ các đáp án vô lý, thử số bằng máy tính Casio hoặc tô kín phương án có xác suất hợp lý nhất, tuyệt đối không để trống ô trên phiếu trả lời',
                  'Bỏ trống cả 3 câu không tô gì cả',
                  'Gạch xóa phiếu trả lời trắc nghiệm của các câu đã làm đúng',
                  'Nộp giấy trắng'
                ],
                answer: 0,
                explain: 'Trắc nghiệm 4 lựa chọn không trừ điểm câu sai, nên việc loại trừ đáp án nhiễu và tô đầy đủ giúp giữ cơ hội 25% - 50% lấy điểm.'
              },
              {
                q: 'Trong bài thi tốt nghiệp THPT môn Toán theo cấu trúc mới (gồm 3 phần: Trắc nghiệm 4 lựa chọn, Đúng/Sai và Trả lời ngắn), phần Trắc nghiệm Đúng/Sai chấm điểm theo quy tắc nào?',
                options: [
                  'Đúng 1 ý được 0,1đ; đúng 2 ý được 0,25đ; đúng 3 ý được 0,5đ; đúng cả 4 ý trong 1 câu mới đạt tối đa 1,0đ',
                  'Mỗi ý đúng luôn được đều nhau 0,25đ',
                  'Sai 1 ý là bị 0 điểm cả bài thi',
                  'Chỉ cần làm 1 ý trong 4 ý là được 1,0 điểm'
                ],
                answer: 0,
                explain: 'Thang điểm lũy tiến (0,1 -> 0,25 -> 0,5 -> 1,0) của phần Đúng/Sai đòi hỏi sự chắc chắn ở từng mệnh đề a, b, c, d.'
              },
              {
                q: 'Để duy trì hiệu suất học tập 3 giờ/ngày bền bỉ suốt 30 tuần từ nay đến tháng 6-7/2027 mà không bị kiệt sức (burnout) khi vừa công tác vừa ôn thi, phương pháp phân bổ mỗi ca học 3 giờ nào hiệu quả nhất?',
                options: [
                  'Chia thành 3 phiên tập trung sâu (60 phút Lý thuyết & Sub-quest + 60 phút Luyện bài tập/Đề + 60 phút Chữa lỗi sai & Ôn Sử/Địa/Từ vựng) có nghỉ giải lao ngắn 5-10 phút giữa các phiên',
                  'Chỉ đọc sách thụ động không làm bất kỳ bài tập nào suốt 3 giờ',
                  'Nghỉ học 6 ngày trong tuần rồi học dồn 21 tiếng vào Chủ nhật',
                  'Học thuộc lòng đáp án mà không hiểu bản chất'
                ],
                answer: 0,
                explain: 'Kỹ thuật chia phiên chủ động (Active Recall + Spaced Repetition + Chữa lỗi sai thực chiến) giúp não bộ ghi nhớ sâu và duy trì kỷ luật dài hạn.'
              }
            ]
          }
        ]
      }
    ],
    bossFight: {
      id: 'boss_phase_5',
      title: 'FINAL BOSS: TỔNG DUYỆT CHUYÊN ÁN THPT D01 & BCA CA4 2027',
      subtitle: 'Trận chiến cuối cùng chinh phục tuyệt đối 30/30 THPT & 100/100 CA4',
      timeLimitSeconds: 600,
      thptBonus: 0.5,
      ca4Bonus: 3.0,
      expBonus: 2500,
      questions: [
        {
          q: '[TỔNG HỢP] Một thí sinh đạt Toán 9.0, Văn 8.5, Anh 9.0 trong kỳ thi THPT (Tổng D01 = 26.5) và đạt 85/100 điểm bài thi ĐGNL CA4 (được cộng 1.0 điểm ưu tiên khu vực/đối tượng). Tổng điểm xét tuyển vào Học viện ANND của thí sinh là:',
          options: ['26,90 điểm', '25,90 điểm', '27,50 điểm', '24,80 điểm'],
          answer: 0,
          explain: 'ĐXT = 26,5 * 0,4 + (85 * 0,3) * 0,6 + 1,0 = 10,6 + 15,3 + 1,0 = 26,90 điểm.'
        },
        {
          q: '[TOÁN] Cho hàm số f(x) liên tục trên R và ∫_0^2 f(x)dx = 6. Giá trị của tích phân I = ∫_0^1 f(2x)dx bằng:',
          options: ['3', '12', '6', '2'],
          answer: 0,
          explain: 'Đặt t = 2x => dt = 2dx => dx = dt/2. Đổi cận x ∈ [0; 1] -> t ∈ [0; 2]. Vậy I = (1/2) ∫_0^2 f(t)dt = 6 / 2 = 3.'
        },
        {
          q: '[ANH] Not until the forensic team analyzed the encrypted server logs _______ the true origin of the cyberattack.',
          options: [
            'did they discover',
            'they discovered',
            'had they discover',
            'were they discovering'
          ],
          answer: 0,
          explain: 'Cấu trúc đảo ngữ: Not until + mệnh đề/cụm thời gian + trợ động từ (did) + S + V_nguyên_thể (did they discover).'
        },
        {
          q: '[ĐỊA - CA4] Việc hình thành các vùng chuyên canh nông nghiệp quy mô lớn gắn với công nghiệp chế biến ở Tây Nguyên và Đồng bằng sông Cửu Long có tác động chủ yếu nào?',
          options: [
            'Tạo ra khối lượng hàng hóa lớn, nâng cao chất lượng và giá trị xuất khẩu, thúc đẩy chuyển dịch cơ cấu kinh tế nông thôn',
            'Làm giảm hoàn toàn nhu cầu lao động có kỹ thuật',
            'Thu hẹp thị trường tiêu thụ trong nước',
            'Xóa bỏ hoàn toàn ngành dịch vụ vận tải'
          ],
          answer: 0,
          explain: 'Sản xuất chuyên canh gắn với chế biến là chìa khóa của nền nông nghiệp hàng hóa hiện đại.'
        },
        {
          q: '[SỬ - CA4] Nhân tố hàng đầu quyết định mọi thắng lợi của cách mạng Việt Nam từ năm 1930 đến nay là:',
          options: [
            'Sự lãnh đạo đúng đắn, sáng tạo của Đảng Cộng sản Việt Nam với đường lối độc lập, tự chủ gắn liền với lợi ích dân tộc',
            'Sự thay đổi của điều kiện tự nhiên và khí hậu',
            'Sự viện trợ tài chính từ các tập đoàn đa quốc gia',
            'Việc từ bỏ đấu tranh ngoại giao'
          ],
          answer: 0,
          explain: 'Sự lãnh đạo của Đảng Cộng sản Việt Nam là nhân tố tiên quyết dẫn dắt dân tộc đi từ thắng lợi này đến thắng lợi khác.'
        }
      ]
    }
  }
];

// ============================================================================
// ĐỀ THI MẪU CÓ SẴN TRONG PHÒNG TẬP (PRACTICE ROOM TEMPLATES)
// ============================================================================
const DEFAULT_PRACTICE_EXAMS = [
  {
    id: 'exam_ca4_mini_01',
    title: 'Đề Thi Thử ĐGNL Bộ Công An Mã CA4 - Mini Test #01 (Chuẩn Cấu Trúc 5 Môn)',
    category: 'CA4 BCA (Toán - Văn - Anh - Sử - Địa)',
    durationMinutes: 15,
    createdAt: '2026-11-26',
    questions: [
      {
        q: 'Câu 1 [TOÁN]: Tập nghiệm của bất phương trình log_2(x - 1) < 3 là:',
        options: ['(1; 9)', '(-∞; 9)', '(1; 7)', '[1; 9)'],
        answer: 0,
        explain: 'Điều kiện x > 1. log_2(x - 1) < 3 <=> x - 1 < 2^3 = 8 <=> x < 9. Kết hợp điều kiện: 1 < x < 9.'
      },
      {
        q: 'Câu 2 [TOÁN]: Trong không gian Oxyz, khoảng cách từ điểm A(2; -1; 2) đến mặt phẳng (Oxy) bằng:',
        options: ['2', '1', '3', '√5'],
        answer: 0,
        explain: 'Mặt phẳng (Oxy) có phương trình z = 0 nên khoảng cách từ A(x; y; z) đến (Oxy) là |z_A| = 2.'
      },
      {
        q: 'Câu 3 [TOÁN 2018]: Cho hai biến cố A, B với P(A) = 0,5; P(B) = 0,6 và P(A ∩ B) = 0,3. Xác suất P(A | B) bằng:',
        options: ['0,5', '0,6', '0,3', '0,8'],
        answer: 0,
        explain: 'P(A | B) = P(A ∩ B) / P(B) = 0,3 / 0,6 = 0,5.'
      },
      {
        q: 'Câu 4 [TIẾNG ANH]: Security experts advise users _______ two-factor authentication on all personal accounts.',
        options: ['to enable', 'enabling', 'enable', 'enabled'],
        answer: 0,
        explain: 'Cấu trúc: advise + somebody + to V (khuyên ai làm gì).'
      },
      {
        q: 'Câu 5 [TIẾNG ANH]: The new traffic monitoring system has proved highly _______ in reducing urban congestion.',
        options: ['effective', 'effect', 'effectively', 'effectiveness'],
        answer: 0,
        explain: 'Sau động từ nối "proved" + trạng từ chỉ mức độ "highly" là một tính từ (Adj): effective.'
      },
      {
        q: 'Câu 6 [NGỮ VĂN CA4]: Trong bài Nghị luận xã hội 500 chữ bàn về "Bản lĩnh đối diện với thất bại", ý nào sau đây là bài học nhận thức và hành động sâu sắc nhất?',
        options: [
          'Xem mỗi lần vấp ngã là dữ liệu quý giá để phân tích nguyên nhân, rèn luyện ý chí kiên cường và điều chỉnh chiến lược vươn tới mục tiêu',
          'Tránh né mọi thử thách khó khăn để không bao giờ bị thất bại',
          'Đổ lỗi cho hoàn cảnh khách quan mỗi khi kết quả không như ý',
          'Bỏ cuộc ngay từ lần thử đầu tiên'
        ],
        answer: 0,
        explain: 'Bài học nhận thức và hành động cần thể hiện tư duy cầu thị, biến thất bại thành bài học kinh nghiệm để trưởng thành.'
      },
      {
        q: 'Câu 7 [LỊCH SỬ CA4]: Thắng lợi của chiến dịch nào đã kết thúc thắng lợi hoàn toàn cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)?',
        options: [
          'Chiến dịch Hồ Chí Minh (4/1975)',
          'Chiến dịch Điện Biên Phủ (5/1954)',
          'Chiến dịch Tây Nguyên (3/1975)',
          'Chiến dịch Biên giới (1950)'
        ],
        answer: 0,
        explain: '11h30 ngày 30/4/1975, Chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam, thống nhất đất nước.'
      },
      {
        q: 'Câu 8 [LỊCH SỬ CA4]: Quốc gia nào sau đây là một trong 5 thành viên sáng lập Hiệp hội các quốc gia Đông Nam Á (ASEAN) năm 1967?',
        options: ['Thái Lan', 'Việt Nam', 'Campuchia', 'Mi-an-ma'],
        answer: 0,
        explain: '5 nước sáng lập ASEAN (8/8/1967): Thái Lan, Indonesia, Malaysia, Philippines, Singapore.'
      },
      {
        q: 'Câu 9 [ĐỊA LÍ CA4]: Biểu đồ thích hợp nhất để thể hiện cơ cấu GDP phân theo khu vực kinh tế của nước ta trong 2 năm (2020 và 2025) là:',
        options: ['Biểu đồ Tròn', 'Biểu đồ Miền', 'Biểu đồ Đường', 'Biểu đồ Kết hợp cột và đường'],
        answer: 0,
        explain: 'Thể hiện cơ cấu (%) của 1 đến 3 mốc năm dùng Biểu đồ Tròn.'
      },
      {
        q: 'Câu 10 [ĐỊA LÍ CA4]: Vùng kinh tế nào dẫn đầu cả nước về sản lượng lúa gạo và sản lượng thủy sản nuôi trồng?',
        options: [
          'Đồng bằng sông Cửu Long',
          'Đông Nam Bộ',
          'Tây Nguyên',
          'Trung du và miền núi Bắc Bộ'
        ],
        answer: 0,
        explain: 'Đồng bằng sông Cửu Long chiếm trên 50% sản lượng lúa và gần 70% sản lượng thủy sản nuôi trồng của cả nước.'
      }
    ]
  }
];

// ============================================================================
// HÀM PARSE ĐỀ THI TỪ TEXT / MARKDOWN / JSON KHI NGƯỜI DÙNG UPLOAD HOẶC DÁN
// ============================================================================
function parseRawTextToQuestions(rawText) {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  // 1. Thử parse JSON trước nếu người dùng upload file .json
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      const arr = Array.isArray(parsed) ? parsed : (parsed.questions || []);
      if (arr.length > 0) {
        return arr.map((item, idx) => ({
          q: item.q || item.question || `Câu ${idx + 1}`,
          options: Array.isArray(item.options) && item.options.length >= 2
            ? item.options
            : ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
          answer: typeof item.answer === 'number' ? item.answer : 0,
          explain: item.explain || item.explanation || 'Đáp án chuẩn theo đề tải lên.'
        }));
      }
    } catch (e) {
      // Nếu không phải JSON hợp lệ thì chuyển sang bộ phân tích văn bản thông minh
    }
  }

  // 2. Phân tích định dạng văn bản chuẩn:
  // Câu 1: Nội dung câu hỏi...
  // A. ...
  // B. ...
  // C. ...
  // D. ...
  // Đáp án: A (hoặc đánh dấu * trước đáp án đúng: *A. ...)
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const questions = [];
  let currentQ = null;

  const pushCurrent = () => {
    if (currentQ && currentQ.q && currentQ.options.length >= 2) {
      while (currentQ.options.length < 4) {
        currentQ.options.push(`Phương án bổ sung ${currentQ.options.length + 1}`);
      }
      questions.push(currentQ);
    }
  };

  for (const line of lines) {
    const qMatch = line.match(/^(?:Câu\s*\d+|Question\s*\d+|\d+[\.\):])\s*[:\.\-]?\s*(.+)/i);
    const optMatch = line.match(/^(\*)?([A-D])[\.\)\:]\s*(.+)/i);
    const ansMatch = line.match(/^(?:Đáp\s*án|Answer|Key|ĐA)\s*[:\-]?\s*([A-D])/i);
    const expMatch = line.match(/^(?:Giải\s*thích|Hướng\s*dẫn|Explain)\s*[:\-]?\s*(.+)/i);

    if (qMatch && !optMatch && !ansMatch) {
      pushCurrent();
      currentQ = {
        q: line,
        options: [],
        answer: 0,
        explain: 'Đã đối chiếu theo đáp án đề tự luyện.'
      };
    } else if (optMatch && currentQ) {
      const isStarred = Boolean(optMatch[1]);
      const letter = optMatch[2].toUpperCase();
      const text = optMatch[3].trim();
      const idx = ['A', 'B', 'C', 'D'].indexOf(letter);
      currentQ.options.push(text);
      if (isStarred && idx !== -1) {
        currentQ.answer = idx;
      }
    } else if (ansMatch && currentQ) {
      const letter = ansMatch[1].toUpperCase();
      const idx = ['A', 'B', 'C', 'D'].indexOf(letter);
      if (idx !== -1) currentQ.answer = idx;
    } else if (expMatch && currentQ) {
      currentQ.explain = expMatch[1].trim();
    } else if (currentQ && currentQ.options.length === 0) {
      currentQ.q += ' ' + line;
    }
  }
  pushCurrent();
  return questions;
}

const SAMPLE_PASTE_TEMPLATE = `Câu 1: Trong bài thi Đánh giá Bộ Công an mã CA4, môn tự chọn là môn nào?
*A. Địa lí (15 câu - 15 điểm)
B. Vật lí (15 câu - 15 điểm)
C. Hóa học (15 câu - 15 điểm)
D. Sinh học (15 câu - 15 điểm)
Giải thích: CA1 là Vật lí, CA2 là Hóa học, CA3 là Sinh học, CA4 là Địa lí.

Câu 2: Nghiệm của phương trình log_3(x) = 2 là:
A. x = 6
*B. x = 9
C. x = 8
D. x = 5
Đáp án: B
Giải thích: x = 3^2 = 9.

Câu 3: Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết vào năm nào?
A. 1954
B. 1968
*C. 1973
D. 1975
Đáp án: C`;

export default function App() {
  // Navigation & Tabs + Mobile Responsive Toggle
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'practice' | 'analytics' | 'mongodb'
  const [showMobileStats, setShowMobileStats] = useState(false);

  // Game Progress State
  const [completedSubQuests, setCompletedSubQuests] = useState(() => {
    try {
      const saved = localStorage.getItem('ca4_completed_subquests');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [defeatedBosses, setDefeatedBosses] = useState(() => {
    try {
      const saved = localStorage.getItem('ca4_defeated_bosses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [priorityBonus, setPriorityBonus] = useState(() => {
    try {
      const saved = localStorage.getItem('ca4_priority_bonus');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [targetAdmissionScore, setTargetAdmissionScore] = useState(24.5);
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [streakDays, setStreakDays] = useState(5);

  // MongoDB Sync State
  const [syncStatus, setSyncStatus] = useState('ready'); // 'ready' | 'syncing' | 'connected' | 'local_fallback'
  const [lastSyncedAt, setLastSyncedAt] = useState('Chế độ Local Cache + Sẵn sàng đồng bộ MongoDB Atlas');

  // Quest Arena Modal State (Cho Sub-quest & Cheat-sheet)
  const [activeQuestModal, setActiveQuestModal] = useState(null); // { phase, quest, activeSubQuestIndex }
  const [arenaViewMode, setArenaViewMode] = useState('cheatsheet'); // 'cheatsheet' | 'quiz' | 'result'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // Boss Fight Modal State (Mini-test có bấm giờ)
  const [activeBossModal, setActiveBossModal] = useState(null); // { phase, boss }
  const [bossTimeLeft, setBossTimeLeft] = useState(600);
  const [bossAnswers, setBossAnswers] = useState({});
  const [bossResult, setBossResult] = useState(null);
  const bossTimerRef = useRef(null);

  // Practice Room State (Phòng tập tự upload đề)
  const [practiceExams, setPracticeExams] = useState(() => {
    try {
      const saved = localStorage.getItem('ca4_practice_exams');
      return saved ? JSON.parse(saved) : DEFAULT_PRACTICE_EXAMS;
    } catch {
      return DEFAULT_PRACTICE_EXAMS;
    }
  });
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamDuration, setNewExamDuration] = useState(15);
  const [newExamRawText, setNewExamRawText] = useState('');
  const [activePracticeSession, setActivePracticeSession] = useState(null);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceTimeLeft, setPracticeTimeLeft] = useState(900);
  const [practiceResult, setPracticeResult] = useState(null);
  const practiceTimerRef = useRef(null);

  // Floating Toast / Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ============================================================================
  // TÍNH TOÁN 2 THANH CHỈ SỐ SONG SONG: THPT D01 (30Đ) & ĐGNL CA4 (100Đ)
  // ============================================================================
  const calculateStats = () => {
    let thptScore = 0;
    let ca4Score = 0;
    let totalExp = 0;
    let completedSqCount = 0;
    let totalSqCount = 0;

    ROADMAP_PHASES.forEach(phase => {
      phase.quests.forEach(quest => {
        quest.subQuests.forEach(sq => {
          totalSqCount += 1;
          if (completedSubQuests[sq.id]?.passed) {
            thptScore += sq.thptPoints;
            ca4Score += sq.ca4Points;
            totalExp += sq.exp;
            completedSqCount += 1;
          }
        });
      });

      if (defeatedBosses[phase.bossFight.id]?.passed) {
        thptScore += phase.bossFight.thptBonus;
        ca4Score += phase.bossFight.ca4Bonus;
        totalExp += phase.bossFight.expBonus;
      }
    });

    thptScore = Math.min(30, Number(thptScore.toFixed(2)));
    ca4Score = Math.min(100, Number(ca4Score.toFixed(2)));

    // Công thức Điểm Xét Tuyển BCA thực tế (Thang 30):
    // ĐXT = (Điểm_THPT_30 * 40%) + ((Điểm_CA4_100 * 3/10) * 60%) + Điểm_Ưu_Tiên
    const bcaConverted30 = (ca4Score * 0.3);
    const bcaAdmissionScore = Number(
      ((thptScore * 0.4) + (bcaConverted30 * 0.6) + Number(priorityBonus || 0)).toFixed(2)
    );

    const level = Math.floor(totalExp / 500) + 1;
    const rankTitles = [
      'Tân Binh Khởi Động (Lv.1)',
      'Trinh Sát Kiến Thức (Lv.2)',
      'Chiến Sĩ Tuyến Đầu (Lv.3)',
      'Đặc Nhiệm Tư Duy (Lv.4)',
      'Chuyên Gia Phá Bẫy (Lv.5)',
      'Chỉ Huy Chiến Dịch CA4 (Lv.6+)'
    ];
    const rankTitle = rankTitles[Math.min(rankTitles.length - 1, level - 1)];

    return {
      thptScore,
      ca4Score,
      bcaConverted30: Number(bcaConverted30.toFixed(2)),
      bcaAdmissionScore,
      totalExp,
      level,
      rankTitle,
      completedSqCount,
      totalSqCount
    };
  };

  const stats = calculateStats();

  // Tự động tải tiến độ từ MongoDB Atlas khi khởi chạy Full-stack
  useEffect(() => {
    async function fetchFromMongoDB() {
      try {
        const res = await fetch(`${API_BASE_URL}/progress/${USER_ID}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.progress) {
          if (data.progress.completedSubQuests && Object.keys(data.progress.completedSubQuests).length > 0) {
            setCompletedSubQuests(data.progress.completedSubQuests);
          }
          if (data.progress.defeatedBosses && Object.keys(data.progress.defeatedBosses).length > 0) {
            setDefeatedBosses(data.progress.defeatedBosses);
          }
          if (typeof data.progress.priorityBonus === 'number') {
            setPriorityBonus(data.progress.priorityBonus);
          }
          setSyncStatus('connected');
          setLastSyncedAt(`Đã tải dữ liệu từ MongoDB Atlas lúc ${new Date().toLocaleTimeString()}`);
        }
        if (data.success && Array.isArray(data.customExams) && data.customExams.length > 0) {
          const loadedExams = data.customExams.map(e => ({
            id: e.examId,
            title: e.title,
            category: e.category,
            durationMinutes: e.durationMinutes,
            createdAt: new Date(e.createdAt).toISOString().slice(0, 10),
            questions: e.questions
          }));
          setPracticeExams([...loadedExams, ...DEFAULT_PRACTICE_EXAMS]);
        }
      } catch (err) {
        setSyncStatus('local_fallback');
      }
    }
    fetchFromMongoDB();
  }, []);

  // Lưu LocalStorage & Tự động đồng bộ lên MongoDB Atlas Backend
  useEffect(() => {
    try {
      localStorage.setItem('ca4_completed_subquests', JSON.stringify(completedSubQuests));
      localStorage.setItem('ca4_defeated_bosses', JSON.stringify(defeatedBosses));
      localStorage.setItem('ca4_priority_bonus', String(priorityBonus));
      localStorage.setItem('ca4_practice_exams', JSON.stringify(practiceExams));
      fetch(`${API_BASE_URL}/progress/${USER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: USER_ID,
          completedSubQuests,
          defeatedBosses,
          priorityBonus,
          stats
        })
      }).then(res => {
        if (res.ok) {
          setSyncStatus('connected');
          setLastSyncedAt(`Đã tự động lưu lên MongoDB Atlas lúc ${new Date().toLocaleTimeString()}`);
        }
      }).catch(() => {});
    } catch (e) {
      // Ignore storage restrictions
    }
  }, [completedSubQuests, defeatedBosses, priorityBonus, practiceExams]);

  // Hàm kiểm tra xem 1 Phase đã hoàn thành 100% Sub-quest để mở khóa Boss Fight chưa
  const isPhaseSubQuestsCompleted = (phase) => {
    return phase.quests.every(q =>
      q.subQuests.every(sq => Boolean(completedSubQuests[sq.id]?.passed))
    );
  };

  // Kiểm tra tiến độ từng Phase
  const getPhaseProgress = (phase) => {
    let total = 0;
    let done = 0;
    phase.quests.forEach(q => {
      q.subQuests.forEach(sq => {
        total += 1;
        if (completedSubQuests[sq.id]?.passed) done += 1;
      });
    });
    return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
  };

  // ============================================================================
  // XỬ LÝ QUEST ARENA (CHEAT-SHEET + BÀI TẬP TRẮC NGHIỆM >= 80% ĐỂ QUA ẢI)
  // ============================================================================
  const openQuestArena = (phase, quest, subQuestIndex = 0) => {
    setActiveQuestModal({ phase, quest, activeSubQuestIndex: subQuestIndex });
    setArenaViewMode('cheatsheet');
    setQuizAnswers({});
    setQuizResult(null);
  };

  const switchSubQuestTab = (idx) => {
    if (!activeQuestModal) return;
    setActiveQuestModal({ ...activeQuestModal, activeSubQuestIndex: idx });
    setArenaViewMode('cheatsheet');
    setQuizAnswers({});
    setQuizResult(null);
  };

  const submitSubQuestQuiz = () => {
    if (!activeQuestModal) return;
    const sq = activeQuestModal.quest.subQuests[activeQuestModal.activeSubQuestIndex];
    const totalQ = sq.questions.length;
    let correct = 0;
    sq.questions.forEach((item, idx) => {
      if (quizAnswers[idx] === item.answer) correct += 1;
    });
    const accuracy = Math.round((correct / totalQ) * 100);
    const passed = accuracy >= 80;

    setQuizResult({ correct, totalQ, accuracy, passed });
    setArenaViewMode('result');

    if (passed) {
      setCompletedSubQuests(prev => ({
        ...prev,
        [sq.id]: {
          passed: true,
          accuracy,
          completedAt: new Date().toISOString()
        }
      }));
      showToast(`Hoàn thành "${sq.title}" (${accuracy}%)! +${sq.thptPoints}đ THPT | +${sq.ca4Points}đ CA4`, 'success');
    } else {
      showToast(`Đạt ${accuracy}% (Cần >= 80% để vượt nhiệm vụ). Hãy xem giải thích và thử lại!`, 'warning');
    }
  };

  // ============================================================================
  // XỬ LÝ BOSS FIGHT CUỐI MỖI PHASE (MINI-TEST BẤM GIỜ >= 80%)
  // ============================================================================
  const startBossFight = (phase) => {
    if (!isPhaseSubQuestsCompleted(phase)) {
      showToast('Bạn cần hoàn thành 100% nhiệm vụ nhỏ trong Phase này trước khi khiêu chiến Trùm Ải!', 'warning');
      return;
    }
    if (bossTimerRef.current) clearInterval(bossTimerRef.current);
    const boss = phase.bossFight;
    setActiveBossModal({ phase, boss });
    setBossTimeLeft(boss.timeLimitSeconds);
    setBossAnswers({});
    setBossResult(null);

    bossTimerRef.current = setInterval(() => {
      setBossTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(bossTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (activeBossModal && bossTimeLeft === 0 && !bossResult) {
      submitBossFight(true);
    }
  }, [bossTimeLeft, activeBossModal, bossResult]);

  const submitBossFight = (isTimeout = false) => {
    if (!activeBossModal) return;
    if (bossTimerRef.current) clearInterval(bossTimerRef.current);

    const { boss } = activeBossModal;
    const totalQ = boss.questions.length;
    let correct = 0;
    boss.questions.forEach((item, idx) => {
      if (bossAnswers[idx] === item.answer) correct += 1;
    });
    const accuracy = Math.round((correct / totalQ) * 100);
    const passed = accuracy >= 80;

    setBossResult({ correct, totalQ, accuracy, passed, isTimeout });

    if (passed) {
      setDefeatedBosses(prev => ({
        ...prev,
        [boss.id]: {
          passed: true,
          accuracy,
          defeatedAt: new Date().toISOString()
        }
      }));
      showToast(`HẠ GỤC ${boss.title} (${accuracy}%)! Mở khóa Ải tiếp theo!`, 'success');
    } else {
      showToast(`Chưa hạ được Trùm (${accuracy}% - yêu cầu >= 80%). Hãy ôn lại và tái đấu!`, 'warning');
    }
  };

  const closeBossModal = () => {
    if (bossTimerRef.current) clearInterval(bossTimerRef.current);
    setActiveBossModal(null);
  };

  // ============================================================================
  // XỬ LÝ PHÒNG TẬP (UPLOAD ĐỀ THI -> CHUYỂN THÀNH BÀI TẬP TỰ CHẤM ĐIỂM)
  // ============================================================================
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = String(event.target?.result || '');
      setNewExamRawText(content);
      if (!newExamTitle) {
        setNewExamTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      showToast(`Đã tải nội dung từ file "${file.name}". Kiểm tra và bấm Tạo Đề Luyện Tập!`, 'success');
    };
    reader.readAsText(file);
  };

  const handleCreateCustomExam = () => {
    const parsedQuestions = parseRawTextToQuestions(newExamRawText);
    if (parsedQuestions.length === 0) {
      showToast('Không nhận diện được câu hỏi. Hãy dùng mẫu định dạng Câu 1 / A. B. C. D. / Đáp án!', 'warning');
      return;
    }
    const title = newExamTitle.trim() || `Đề Tự Luyện CA4/D01 #${practiceExams.length + 1}`;
    const newExam = {
      id: `custom_exam_${Date.now()}`,
      title,
      category: 'Đề Tự Upload / Biên Soạn',
      durationMinutes: Number(newExamDuration) || 15,
      createdAt: new Date().toISOString().slice(0, 10),
      questions: parsedQuestions
    };
    setPracticeExams(prev => [newExam, ...prev]);
    setNewExamTitle('');
    setNewExamRawText('');
    showToast(`Đã chuyển đổi thành công "${title}" (${parsedQuestions.length} câu hỏi)!`, 'success');
  };

  const startPracticeExam = (exam) => {
    if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
    setActivePracticeSession(exam);
    setPracticeAnswers({});
    setPracticeResult(null);
    setPracticeTimeLeft((exam.durationMinutes || 15) * 60);

    practiceTimerRef.current = setInterval(() => {
      setPracticeTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(practiceTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const submitPracticeExam = () => {
    if (!activePracticeSession) return;
    if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
    const totalQ = activePracticeSession.questions.length;
    let correct = 0;
    activePracticeSession.questions.forEach((item, idx) => {
      if (practiceAnswers[idx] === item.answer) correct += 1;
    });
    const score10 = Number(((correct / totalQ) * 10).toFixed(2));
    const score100 = Math.round((correct / totalQ) * 100);
    setPracticeResult({ correct, totalQ, score10, score100 });
    showToast(`Đã chấm điểm: Đúng ${correct}/${totalQ} câu (${score10}/10 điểm)!`, 'success');
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-28 md:pb-16 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* TOAST NOTIFICATION (Mobile: Top-center / Desktop: Bottom-right) */}
      {toastMessage && (
        <div
          className={`fixed top-4 left-3 right-3 md:top-auto md:left-auto md:bottom-6 md:right-6 md:max-w-md z-[60] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
              : 'bg-amber-950/95 border-amber-500 text-amber-100'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium leading-snug">{toastMessage.msg}</span>
        </div>
      )}

      {/* STICKY TOP COMMAND DASHBOARD (COMPACT ON MOBILE, EXPANDED ON DESKTOP) */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
          {/* Top Bar: Identity & Rank */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-sm sm:text-lg md:text-xl font-extrabold tracking-tight text-white truncate">
                    CATCH ME IF YOU CAN
                  </h1>
                  <span className="text-emerald-400 text-[10px] sm:text-xs font-mono px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                    v2.0 RPG
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                  Đặc vụ: <span className="text-slate-200 font-semibold">Nguyễn Cao Trường Minh</span>
                  <span className="hidden sm:inline"> • 3h/ngày • Mục tiêu Tháng 6–7/2027 (D01 + CA4)</span>
                </p>
              </div>
            </div>

            {/* RPG Level, EXP & Mobile Collapse Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-bold">{stats.rankTitle}</span>
                <span className="text-slate-500">|</span>
                <span className="text-emerald-400 font-mono font-bold">{stats.totalExp} EXP</span>
              </div>

              <div className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-[11px] sm:text-xs">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 shrink-0" />
                <span className="text-slate-200 font-semibold">{streakDays}d</span>
                <span className="hidden md:inline text-slate-400">(3h/ngày)</span>
              </div>

              <button
                onClick={() => setActiveTab('mongodb')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>MongoDB Atlas</span>
              </button>

              {/* Mobile Toggle Full Stats Button */}
              <button
                onClick={() => setShowMobileStats(prev => !prev)}
                className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-bold text-emerald-300 active:scale-95 transition"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{showMobileStats ? 'Thu gọn' : 'Chi tiết'}</span>
              </button>
            </div>
          </div>

          {/* MOBILE COMPACT HUD BAR (Always visible on Mobile < 768px so screen isn't blocked) */}
          <div className="md:hidden pt-2">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950/90 p-2 rounded-xl border border-slate-800">
              <div className="px-2 py-1 rounded-lg bg-blue-950/30 border border-blue-500/20">
                <div className="text-[10px] text-blue-300 font-bold uppercase">THPT D01</div>
                <div className="text-sm font-black font-mono text-white">
                  {stats.thptScore.toFixed(2)}<span className="text-[10px] text-slate-400">/30</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{ width: `${Math.min(100, (stats.thptScore / 30) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="px-2 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                <div className="text-[10px] text-emerald-300 font-bold uppercase">ĐGNL CA4</div>
                <div className="text-sm font-black font-mono text-white">
                  {stats.ca4Score.toFixed(1)}<span className="text-[10px] text-slate-400">/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: `${Math.min(100, stats.ca4Score)}%` }}
                  />
                </div>
              </div>

              <div className="px-2 py-1 rounded-lg bg-amber-950/30 border border-amber-500/30">
                <div className="text-[10px] text-amber-300 font-bold uppercase">ĐXT BCA</div>
                <div className="text-sm font-black font-mono text-amber-300">
                  {stats.bcaAdmissionScore.toFixed(2)}<span className="text-[10px] text-slate-400">/30</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                  {stats.completedSqCount}/{stats.totalSqCount} Q • {Object.keys(defeatedBosses).length}/6 Boss
                </div>
              </div>
            </div>
          </div>

          {/* 3 DETAILED SCORE CARDS (Always visible on Desktop md+, collapsible on Mobile) */}
          <div className={`${showMobileStats ? 'grid' : 'hidden'} md:grid grid-cols-1 md:grid-cols-3 gap-3 pt-3`}>
            {/* Thanh 1: Điểm THPT Quốc Gia D01 (Thang 30) */}
            <div className="bg-slate-950/75 border border-blue-500/30 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" /> Điểm THPT D01 (Toán - Văn - Anh)
                </span>
                <span className="text-base sm:text-lg font-extrabold font-mono text-white">
                  {stats.thptScore.toFixed(2)}<span className="text-xs text-slate-400">/30.0</span>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (stats.thptScore / 30) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                <span>Trọng số xét tuyển BCA: <strong className="text-blue-300">40%</strong></span>
                <span>Quy đổi: <strong className="text-blue-300">{(stats.thptScore * 0.4).toFixed(2)}đ</strong></span>
              </div>
            </div>

            {/* Thanh 2: Điểm ĐGNL Bộ Công An CA4 (Thang 100) */}
            <div className="bg-slate-950/75 border border-emerald-500/30 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> Điểm ĐGNL Bộ Công An CA4
                </span>
                <span className="text-base sm:text-lg font-extrabold font-mono text-white">
                  {stats.ca4Score.toFixed(1)}<span className="text-xs text-slate-400">/100</span>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, stats.ca4Score)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                <span>Trọng số BCA: <strong className="text-emerald-300">60%</strong> (Thang 30: {stats.bcaConverted30}đ)</span>
                <span>Quy đổi: <strong className="text-emerald-300">{(stats.bcaConverted30 * 0.6).toFixed(2)}đ</strong></span>
              </div>
            </div>

            {/* Thanh 3: Tổng Điểm Xét Tuyển BCA Thực Tế */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-amber-500/40 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 shrink-0" /> Điểm Xét Tuyển BCA (Thang 30)
                </span>
                <span className="text-lg sm:text-xl font-black font-mono text-amber-300">
                  {stats.bcaAdmissionScore.toFixed(2)}<span className="text-xs text-slate-400">/30</span>
                </span>
              </div>
              <div className="text-[11px] text-slate-300 font-mono bg-slate-950/70 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
                <span className="truncate">CT: (THPT×0.4)+(CA4×0.18)+ƯT</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-slate-400">ƯT:</span>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="5"
                    value={priorityBonus}
                    onChange={(e) => setPriorityBonus(Number(e.target.value) || 0)}
                    className="w-12 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-center text-amber-300 text-xs"
                    title="Điểm ưu tiên khu vực / đối tượng"
                  />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                <span>Đã vượt: <strong className="text-white">{stats.completedSqCount}/{stats.totalSqCount}</strong> nhiệm vụ nhỏ</span>
                <span>Boss hạ gục: <strong className="text-amber-300">{Object.keys(defeatedBosses).length}/6</strong></span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAVIGATION TABS (Hidden on Mobile, replaced by Bottom Tab Bar) */}
          <div className="hidden md:flex items-center gap-2.5 pt-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'roadmap'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              Bản Đồ Chiến Dịch (6 Ải & Đấu Trùm)
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Upload className="w-4 h-4" />
              Phòng Tập Tự Upload Đề ({practiceExams.length})
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Ma Trận CA4 & Lịch Học 3h/Ngày
            </button>

            <button
              onClick={() => setActiveTab('mongodb')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'mongodb'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              Cấu Hình Full-Stack MongoDB
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on phones/tablets < 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 shadow-2xl">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition ${
              activeTab === 'roadmap'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span>Chiến Dịch</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition ${
              activeTab === 'practice'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4 mb-0.5" />
            <span>Phòng Tập ({practiceExams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition ${
              activeTab === 'analytics'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            <span>Lịch 3h/Ngày</span>
          </button>

          <button
            onClick={() => setActiveTab('mongodb')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition ${
              activeTab === 'mongodb'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4 mb-0.5" />
            <span>MongoDB</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 mt-4 sm:mt-6">
        {/* ====================================================================
            TAB 1: BẢN ĐỒ CHIẾN DỊCH (ROADMAP RPG + SUB-QUESTS + BOSS FIGHT)
           ==================================================================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Bộ lọc môn học (Cuộn ngang mượt trên Mobile, Wrap trên Desktop) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                <span className="text-xs font-bold uppercase text-slate-400 mr-1 shrink-0">Môn:</span>
                {['ALL', 'Toán', 'Ngữ Văn', 'Tiếng Anh', 'Địa lí & Lịch sử'].map(subj => (
                  <button
                    key={subj}
                    onClick={() => setSubjectFilter(subj)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 active:scale-95 ${
                      subjectFilter === subj
                        ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {subj === 'ALL' ? 'Tất cả 5 môn (D01 + CA4)' : subj}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/80">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Chạm vào từng <strong className="text-slate-200">Nhiệm vụ nhỏ</strong> để đọc <strong className="text-blue-400">Cheat-sheet</strong> & làm bài đạt <strong className="text-emerald-400">≥ 80%</strong>.</span>
              </div>
            </div>

            {/* Danh sách 6 Phase (Ải) */}
            <div className="space-y-6 sm:space-y-8">
              {ROADMAP_PHASES.map((phase) => {
                const progress = getPhaseProgress(phase);
                const bossUnlocked = isPhaseSubQuestsCompleted(phase);
                const bossDefeated = Boolean(defeatedBosses[phase.bossFight.id]?.passed);

                const filteredQuests = phase.quests.filter(q => {
                  if (subjectFilter === 'ALL') return true;
                  return q.subject.toLowerCase().includes(subjectFilter.toLowerCase());
                });

                return (
                  <div
                    key={phase.phaseId}
                    className={`rounded-2xl border p-3.5 sm:p-5 md:p-6 transition-all ${
                      bossDefeated
                        ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-900/75 border-slate-800'
                    }`}
                  >
                    {/* Phase Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-800">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {phase.code}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {phase.timeline}
                          </span>
                          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Mục tiêu: {phase.targetThpt}đ THPT | {phase.targetCa4}đ CA4
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">{phase.title}</h2>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{phase.description}</p>
                      </div>

                      {/* Tiến độ Ải */}
                      <div className="w-full md:w-56 shrink-0 bg-slate-950/85 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400">Tiến độ Sub-quest:</span>
                          <span className="font-mono font-bold text-emerald-400">{progress.done}/{progress.total} ({progress.percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-300"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Danh sách Nhiệm vụ lớn (Main Quests) và các Nhiệm vụ nhỏ (Sub-Quests) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 mt-4">
                      {filteredQuests.map((quest) => {
                        const sqCompletedCount = quest.subQuests.filter(sq => completedSubQuests[sq.id]?.passed).length;
                        const allSqDone = sqCompletedCount === quest.subQuests.length;

                        return (
                          <div
                            key={quest.id}
                            className={`rounded-xl border p-3.5 sm:p-4 flex flex-col justify-between transition ${
                              allSqDone
                                ? 'bg-emerald-950/20 border-emerald-500/40'
                                : 'bg-slate-950/65 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30">
                                  {quest.subject}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  {quest.badge}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2 leading-snug">
                                {allSqDone && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                                <span>{quest.title}</span>
                              </h3>
                              <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">{quest.description}</p>

                              {/* Danh sách Sub-quests bên trong Main Quest (Không dùng truncate trên Mobile để đọc đủ tiêu đề) */}
                              <div className="space-y-2">
                                {quest.subQuests.map((sq, sqIdx) => {
                                  const sqState = completedSubQuests[sq.id];
                                  const isDone = Boolean(sqState?.passed);

                                  return (
                                    <button
                                      key={sq.id}
                                      onClick={() => openQuestArena(phase, quest, sqIdx)}
                                      className={`w-full text-left p-3 rounded-xl border flex items-start sm:items-center justify-between gap-3 transition active:scale-[0.99] ${
                                        isDone
                                          ? 'bg-emerald-900/25 border-emerald-500/40 text-emerald-100'
                                          : 'bg-slate-900 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                                      }`}
                                    >
                                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                        {isDone ? (
                                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        ) : (
                                          <Play className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                          <div className="text-xs sm:text-sm font-semibold leading-snug break-words">
                                            {sq.title}
                                          </div>
                                          <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2 mt-1">
                                            <span>{sq.questions.length} câu trắc nghiệm</span>
                                            <span>• Cheat-sheet</span>
                                            {isDone && (
                                              <span className="text-emerald-400 font-mono font-bold">• Đạt {sqState.accuracy}%</span>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="text-right shrink-0 font-mono text-[11px] bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800/80">
                                        {sq.thptPoints > 0 && (
                                          <div className="text-blue-400 font-bold">+{sq.thptPoints}đ D01</div>
                                        )}
                                        <div className="text-emerald-400 font-bold">+{sq.ca4Points}đ CA4</div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                              <span className="text-slate-400">
                                Hoàn thành: <strong className="text-white">{sqCompletedCount}/{quest.subQuests.length}</strong> nhiệm vụ nhỏ
                              </span>
                              <button
                                onClick={() => openQuestArena(phase, quest, 0)}
                                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-500/10 transition"
                              >
                                Vào Quest Arena <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* BOSS FIGHT CUỐI MỖI PHASE */}
                    <div
                      className={`mt-5 p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                        bossDefeated
                          ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/50'
                          : bossUnlocked
                          ? 'bg-gradient-to-r from-red-950/60 via-amber-950/40 to-slate-900 border-amber-500/60'
                          : 'bg-slate-950/80 border-slate-800 opacity-85'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div
                          className={`p-2.5 sm:p-3 rounded-xl border shrink-0 ${
                            bossDefeated
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                              : bossUnlocked
                              ? 'bg-red-500/20 border-red-500 text-red-400'
                              : 'bg-slate-800 border-slate-700 text-slate-500'
                          }`}
                        >
                          {bossDefeated ? (
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : bossUnlocked ? (
                            <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                              BOSS FIGHT • {Math.floor(phase.bossFight.timeLimitSeconds / 60)} PHÚT
                            </span>
                            <span className="text-[11px] font-mono text-amber-300">
                              +{phase.bossFight.thptBonus}đ THPT | +{phase.bossFight.ca4Bonus}đ CA4 | +{phase.bossFight.expBonus} EXP
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-snug">{phase.bossFight.title}</h4>
                          <p className="text-xs text-slate-300 mt-0.5">{phase.bossFight.subtitle}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => startBossFight(phase)}
                        className={`w-full sm:w-auto justify-center px-4 py-3 sm:py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition active:scale-95 ${
                          bossDefeated
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : bossUnlocked
                            ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-lg shadow-red-600/30'
                            : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {bossDefeated ? (
                          <>
                            <CheckCircle className="w-4 h-4 shrink-0" /> Đã Hạ Trùm ({defeatedBosses[phase.bossFight.id]?.accuracy}%) - Đấu Lại
                          </>
                        ) : bossUnlocked ? (
                          <>
                            <Swords className="w-4 h-4 shrink-0" /> Khiêu Chiến Trùm Ải Ngay
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 shrink-0" /> Hoàn thành {progress.done}/{progress.total} nhiệm vụ nhỏ để mở
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: PHÒNG TẬP TỰ UPLOAD ĐỀ & CHẤM ĐIỂM TỰ ĐỘNG
           ==================================================================== */}
        {activeTab === 'practice' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Cột trái: Form Upload / Dán đề thi */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">Tự Upload Đề Về Chuyển Thành Bài Tập</h2>
                  <p className="text-xs text-slate-400">Hỗ trợ tải file (.txt, .md, .json) hoặc dán trực tiếp câu hỏi</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tên bộ đề tự luyện:</label>
                <input
                  type="text"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  placeholder="VD: Đề thi thử CA4 Học viện ANND - Tuần 1..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thời gian làm bài (Phút):</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newExamDuration}
                    onChange={(e) => setNewExamDuration(Number(e.target.value) || 15)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Chọn file đề (.txt, .md, .json):</label>
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-slate-400 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nội dung câu hỏi (Dán hoặc sửa):</label>
                  <button
                    onClick={() => {
                      setNewExamTitle('Đề Mẫu Tự Upload CA4 - 3 Câu Nhanh');
                      setNewExamRawText(SAMPLE_PASTE_TEMPLATE);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
                  >
                    Điền thử định dạng mẫu
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={newExamRawText}
                  onChange={(e) => setNewExamRawText(e.target.value)}
                  placeholder={`Định dạng hỗ trợ:
Câu 1: Nội dung câu hỏi...
*A. Đáp án đúng (đánh dấu * ở đầu)
B. Đáp án B
C. Đáp án C
D. Đáp án D
Đáp án: A
Giải thích: ...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleCreateCustomExam}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition active:scale-95"
              >
                <Sparkles className="w-4 h-4 shrink-0" /> Chuyển Thành Đề Thi Tương Tác & Lưu MongoDB
              </button>
            </div>

            {/* Cột phải: Danh sách Đề trong Phòng tập & Giao diện làm bài */}
            <div className="lg:col-span-7 space-y-4">
              {!activePracticeSession ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400 shrink-0" /> Kho Đề Thi Trong Phòng Tập ({practiceExams.length})
                  </h3>
                  <div className="space-y-3">
                    {practiceExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {exam.category}
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">{exam.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            Số câu: <strong className="text-slate-200">{exam.questions.length} câu</strong> • Thời gian: <strong className="text-slate-200">{exam.durationMinutes} phút</strong> • Ngày tạo: {exam.createdAt}
                          </p>
                        </div>

                        <button
                          onClick={() => startPracticeExam(exam)}
                          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition active:scale-95"
                        >
                          <Play className="w-4 h-4" /> Bắt Đầu Làm Đề
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Giao diện đang làm đề trong Phòng tập */
                <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-3.5 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-blue-400 uppercase">PHÒNG THI THỰC CHIẾN</span>
                      <h3 className="text-sm sm:text-base font-extrabold text-white truncate">{activePracticeSession.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs sm:text-sm flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {formatTimer(practiceTimeLeft)}
                      </div>
                      <button
                        onClick={() => {
                          if (practiceTimerRef.current) clearInterval(practiceTimerRef.current);
                          setActivePracticeSession(null);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                      >
                        Thoát
                      </button>
                    </div>
                  </div>

                  {practiceResult && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-emerald-300">
                          KẾT QUẢ CHẤM ĐIỂM: Đúng {practiceResult.correct}/{practiceResult.totalQ} câu ({practiceResult.score100}%)
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          Điểm hệ 10: <strong className="text-white">{practiceResult.score10}/10</strong> • Điểm hệ 100 (CA4): <strong className="text-emerald-400">{practiceResult.score100}/100</strong>
                        </div>
                      </div>
                      <button
                        onClick={() => startPracticeExam(activePracticeSession)}
                        className="w-full sm:w-auto justify-center px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Làm Lại Đề Này
                      </button>
                    </div>
                  )}

                  <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                    {activePracticeSession.questions.map((item, qIdx) => {
                      const selected = practiceAnswers[qIdx];
                      const showKey = Boolean(practiceResult);

                      return (
                        <div key={qIdx} className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                            {item.q}
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {item.options.map((opt, optIdx) => {
                              const isChosen = selected === optIdx;
                              const isRight = item.answer === optIdx;

                              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                              if (!showKey && isChosen) {
                                btnStyle = 'bg-blue-950/80 border-blue-500 text-blue-200';
                              } else if (showKey && isRight) {
                                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                              } else if (showKey && isChosen && !isRight) {
                                btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={showKey}
                                  onClick={() => setPracticeAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                  className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs sm:text-sm flex items-start sm:items-center justify-between gap-2 transition ${btnStyle}`}
                                >
                                  <span className="leading-snug">
                                    <strong className="font-mono mr-2">{['A', 'B', 'C', 'D'][optIdx]}.</strong>
                                    {opt}
                                  </span>
                                  {showKey && isRight && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />}
                                  {showKey && isChosen && !isRight && <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5 sm:mt-0" />}
                                </button>
                              );
                            })}
                          </div>
                          {showKey && item.explain && (
                            <div className="text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg leading-relaxed">
                              <strong>Giải thích:</strong> {item.explain}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!practiceResult && (
                    <button
                      onClick={submitPracticeExam}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition active:scale-95"
                    >
                      Nộp Bài & Chấm Điểm Ngay
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: MA TRẬN ĐỀ CA4 & LỊCH HỌC 3 GIỜ/NGÀY (THÁNG 11/2026 -> 7/2027)
           ==================================================================== */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400 shrink-0" /> Cấu Trúc Chuẩn Bài Thi Đánh Giá Bộ Công An Mã CA4
              </h3>
              <p className="text-xs text-slate-400">
                Tổng thời gian: <strong className="text-white">180 phút</strong> • Tổng điểm: <strong className="text-emerald-400">100 điểm</strong> (70% lớp 12, 30% lớp 10 & 11)
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center gap-2">
                  <div>
                    <div className="font-bold text-amber-300">1. Phần Tự luận bắt buộc (Ngữ Văn NLXH ~500 chữ)</div>
                    <div className="text-slate-400 mt-0.5">01 câu Nghị luận xã hội • Khuyên dùng: 45 phút</div>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-amber-400 shrink-0">25 / 100đ</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center gap-2">
                  <div>
                    <div className="font-bold text-blue-300">2. Trắc nghiệm Toán học (Bắt buộc)</div>
                    <div className="text-slate-400 mt-0.5">35 câu hỏi • Khuyên dùng: 80 phút</div>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-blue-400 shrink-0">35 / 100đ</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center gap-2">
                  <div>
                    <div className="font-bold text-purple-300">3. Trắc nghiệm Tiếng Anh (Bắt buộc)</div>
                    <div className="text-slate-400 mt-0.5">20 câu hỏi (0,75đ/câu) • Khuyên dùng: 20 phút</div>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-purple-400 shrink-0">15 / 100đ</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center gap-2">
                  <div>
                    <div className="font-bold text-orange-300">4. Trắc nghiệm Lịch sử (Bắt buộc)</div>
                    <div className="text-slate-400 mt-0.5">10 câu hỏi (1,0đ/câu) • Khuyên dùng: 10 phút</div>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-orange-400 shrink-0">10 / 100đ</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 flex justify-between items-center gap-2">
                  <div>
                    <div className="font-bold text-emerald-300">5. Trắc nghiệm Tự chọn CA4: Địa lí</div>
                    <div className="text-slate-400 mt-0.5">15 câu hỏi (1,0đ/câu) • Khuyên dùng: 15 phút</div>
                  </div>
                  <span className="font-mono font-extrabold text-sm text-emerald-400 shrink-0">15 / 100đ</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" /> Phân Bổ Ca Học 3 Giờ / Ngày (180 Phút Tối Ưu)
              </h3>
              <p className="text-xs text-slate-400">
                Áp dụng từ Tháng 11/2026 đến Tháng 6–7/2027 (30 tuần × 21 giờ/tuần = <strong className="text-white">630 giờ thực chiến</strong>)
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-l-emerald-500 border border-slate-800">
                  <div className="font-bold text-emerald-300">GIỜ THỨ 1 (60 Phút đầu): Công Phá Môn Trụ Cột (Toán / Văn)</div>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Đọc Cheat-sheet lý thuyết trong Quest Arena (15p) + Làm bài tập trắc nghiệm Sub-quest đạt ≥ 80% hoặc viết 1 dàn ý/đoạn NLXH 500 chữ (45p).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-l-blue-500 border border-slate-800">
                  <div className="font-bold text-blue-300">GIỜ THỨ 2 (60 Phút giữa): Tiếng Anh & Tổ Hợp Sử - Địa CA4</div>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Luân phiên Thứ 2-4-6 học Tiếng Anh (Ngữ pháp + Đọc hiểu) và Thứ 3-5-7 học Lịch sử + Địa lí (nắm từ khóa và công thức số liệu).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-l-amber-500 border border-slate-800">
                  <div className="font-bold text-amber-300">GIỜ THỨ 3 (60 Phút cuối): Phòng Tập Đề & Sổ Tay Câu Sai</div>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Upload đề tự luyện vào Phòng Tập hoặc đấu Boss Fight cuối mỗi Phase, ghi chú lại các bẫy sai số để không bao giờ lặp lại lần 2.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: CẤU HÌNH BACKEND NODE.JS + EXPRESS + MONGODB ATLAS
           ==================================================================== */}
        {activeTab === 'mongodb' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Kết Nối MongoDB Atlas & Kiến Trúc Full-Stack</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bản đóng gói <code className="text-emerald-300">thpt-ca4-roadmap-fullstack.zip</code> đã tích hợp sẵn Express Server & Mongoose kết nối thẳng vào Cluster của bạn.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSyncStatus('syncing');
                  const payload = {
                    userId: USER_ID,
                    updatedAt: new Date().toISOString(),
                    completedSubQuests,
                    defeatedBosses,
                    priorityBonus,
                    practiceExams,
                    stats
                  };
                  try {
                    localStorage.setItem('ca4_mongodb_snapshot', JSON.stringify(payload));
                  } catch (e) {}
                  setTimeout(() => {
                    setSyncStatus('connected');
                    setLastSyncedAt(`Đã tạo bản ghi Snapshot MongoDB lúc ${new Date().toLocaleTimeString()}`);
                    showToast('Đã lưu Snapshot dữ liệu chuẩn Schema Mongoose (Chạy gói Full-Stack ZIP trên máy để đồng bộ trực tiếp lên MongoDB Atlas)!', 'success');
                  }, 350);
                }}
                className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shrink-0 transition active:scale-95"
              >
                <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                Lưu Snapshot Tiến Độ
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400">1. Thông tin Cluster MongoDB Atlas đã cấu hình trong server/.env</div>
                <div className="font-mono text-[11px] text-slate-300 break-all bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  MONGODB_URI=mongodb+srv://dopaminhzforwork_db_user:123Dbtnctgt%21@cluster0.wuuiejj.mongodb.net/thpt_ca4_roadmap?retryWrites=true&w=majority
                </div>
                <div className="text-slate-400">
                  Trạng thái hiện tại: <strong className="text-white">{lastSyncedAt}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-blue-400">2. Hướng dẫn chạy Full-Stack trên VS Code của bạn</div>
                <pre className="font-mono text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 overflow-x-auto">
{`# Giải nén thpt-ca4-roadmap-fullstack.zip
npm install
# Chạy đồng thời cả Backend (Port 5000) & Frontend Vite (Port 5173):
npm run dev:full`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================================
          MODAL 1: QUEST ARENA (BOTTOM SHEET ON MOBILE / CENTER MODAL ON DESKTOP)
         ====================================================================== */}
      {activeQuestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border-t sm:border border-slate-700 rounded-t-2xl sm:rounded-2xl max-w-3xl w-full h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    QUEST ARENA • {activeQuestModal.phase.code}
                  </span>
                  <span className="text-xs text-blue-400 font-semibold">{activeQuestModal.quest.subject}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 truncate">{activeQuestModal.quest.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuestModal(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-quest Selector Tabs */}
            <div className="px-3.5 sm:px-4 pt-2.5 pb-2.5 bg-slate-900 border-b border-slate-800 flex gap-2 overflow-x-auto shrink-0">
              {activeQuestModal.quest.subQuests.map((sq, idx) => {
                const isDone = Boolean(completedSubQuests[sq.id]?.passed);
                const isCurrent = idx === activeQuestModal.activeSubQuestIndex;
                return (
                  <button
                    key={sq.id}
                    onClick={() => switchSubQuestTab(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : isDone
                        ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {isDone ? <CheckCircle className="w-4 h-4 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
                    <span className="max-w-[220px] sm:max-w-none truncate">{sq.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-quest Content Body */}
            {(() => {
              const currentSq = activeQuestModal.quest.subQuests[activeQuestModal.activeSubQuestIndex];
              return (
                <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 flex-1">
                  {/* Phần thưởng & Điều kiện qua ải */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs text-slate-300">
                      Điều kiện qua ải: <strong className="text-emerald-400">Đúng ≥ 80% (Tối thiểu 4/5 câu)</strong>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
                      {currentSq.thptPoints > 0 && (
                        <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          +{currentSq.thptPoints}đ THPT D01
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        +{currentSq.ca4Points}đ ĐGNL CA4
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        +{currentSq.exp} EXP
                      </span>
                    </div>
                  </div>

                  {/* Mode Switcher: Cheat-Sheet vs Quiz */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => setArenaViewMode('cheatsheet')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                        arenaViewMode === 'cheatsheet'
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" /> (1) Lý Thuyết Tóm Tắt (Cheat-Sheet)
                    </button>
                    <button
                      onClick={() => setArenaViewMode('quiz')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                        arenaViewMode === 'quiz' || arenaViewMode === 'result'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      <Swords className="w-4 h-4 shrink-0" /> (2) Bài Tập Thực Chiến ({currentSq.questions.length} Câu)
                    </button>
                  </div>

                  {/* VIEW 1: CHEAT-SHEET */}
                  {arenaViewMode === 'cheatsheet' && (
                    <div className="space-y-4">
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-blue-500/30 space-y-2.5">
                        <h4 className="text-xs sm:text-sm font-bold text-blue-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 shrink-0" /> Bí Kíp & Công Thức Cốt Lõi Cần Nắm Vững:
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {currentSq.cheatSheet.map((line, i) => (
                            <div key={i} className="p-2.5 sm:p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setArenaViewMode('quiz')}
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition active:scale-95"
                      >
                        Đã Nắm Vững Lý Thuyết — Bắt Đầu Làm Bài Tập <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* VIEW 2 & 3: QUIZ & RESULT */}
                  {(arenaViewMode === 'quiz' || arenaViewMode === 'result') && (
                    <div className="space-y-4">
                      {quizResult && (
                        <div
                          className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            quizResult.passed
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : 'bg-red-950/60 border-red-500 text-red-200'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-extrabold">
                              {quizResult.passed
                                ? `NHIỆM VỤ HOÀN THÀNH! Đạt ${quizResult.accuracy}% (${quizResult.correct}/${quizResult.totalQ} câu)`
                                : `CHƯA ĐẠT YÊU CẦU: ${quizResult.accuracy}% (${quizResult.correct}/${quizResult.totalQ} câu - Cần >= 80%)`}
                            </div>
                            <div className="text-xs opacity-90 mt-0.5">
                              {quizResult.passed
                                ? `Đã cộng +${currentSq.thptPoints}đ THPT D01 và +${currentSq.ca4Points}đ CA4 vào thanh chỉ số!`
                                : 'Hãy đọc kỹ lời giải chi tiết bên dưới và bấm Làm Lại để vượt qua nhiệm vụ này.'}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setQuizAnswers({});
                              setQuizResult(null);
                              setArenaViewMode('quiz');
                            }}
                            className="w-full sm:w-auto justify-center px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Làm Lại
                          </button>
                        </div>
                      )}

                      {currentSq.questions.map((item, qIdx) => {
                        const selected = quizAnswers[qIdx];
                        const showKey = arenaViewMode === 'result';

                        return (
                          <div key={qIdx} className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                            <div className="text-[11px] font-bold text-slate-400">CÂU HỎI {qIdx + 1}/{currentSq.questions.length}</div>
                            <div className="text-xs sm:text-sm font-bold text-white leading-snug">{item.q}</div>
                            <div className="grid grid-cols-1 gap-2">
                              {item.options.map((opt, optIdx) => {
                                const isChosen = selected === optIdx;
                                const isRight = item.answer === optIdx;

                                let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                                if (!showKey && isChosen) {
                                  style = 'bg-blue-950 border-blue-500 text-blue-200';
                                } else if (showKey && isRight) {
                                  style = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                                } else if (showKey && isChosen && !isRight) {
                                  style = 'bg-red-950 border-red-500 text-red-200';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={showKey}
                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs sm:text-sm flex items-start sm:items-center justify-between gap-2 transition ${style}`}
                                  >
                                    <span className="leading-snug">
                                      <strong className="font-mono mr-2">{['A', 'B', 'C', 'D'][optIdx]}.</strong>
                                      {opt}
                                    </span>
                                    {showKey && isRight && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />}
                                    {showKey && isChosen && !isRight && <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5 sm:mt-0" />}
                                  </button>
                                );
                              })}
                            </div>
                            {showKey && (
                              <div className="text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg leading-relaxed">
                                <strong>Giải thích chi tiết:</strong> {item.explain}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {arenaViewMode === 'quiz' && (
                        <button
                          onClick={submitSubQuestQuiz}
                          className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 transition active:scale-95"
                        >
                          Chấm Điểm Nhiệm Vụ Nhỏ (Yêu Cầu Đạt ≥ 80%)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 2: BOSS FIGHT CUỐI PHASE (BOTTOM SHEET ON MOBILE / MODAL ON DESKTOP)
         ====================================================================== */}
      {activeBossModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border-t-2 sm:border-2 border-red-500/60 rounded-t-2xl sm:rounded-2xl max-w-3xl w-full h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-red-950 to-slate-950 border-b border-red-500/30 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-red-500/20 border border-red-500 text-red-400 shrink-0">
                  <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-red-300 uppercase block">
                    ĐẤU TRÙM CUỐI ẢI • YÊU CẦU ≥ 80%
                  </span>
                  <h3 className="text-xs sm:text-base font-extrabold text-white truncate">{activeBossModal.boss.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-300 font-mono font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  {formatTimer(bossTimeLeft)}
                </div>
                <button
                  onClick={closeBossModal}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 flex-1">
              {bossResult && (
                <div
                  className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    bossResult.passed
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/70 border-red-500 text-red-200'
                  }`}
                >
                  <div>
                    <div className="text-sm sm:text-base font-black">
                      {bossResult.passed
                        ? `CHIẾN THẮNG TRÙM ẢI! Đạt ${bossResult.accuracy}% (${bossResult.correct}/${bossResult.totalQ} câu)`
                        : `THẤT BẠI: Đạt ${bossResult.accuracy}% (${bossResult.correct}/${bossResult.totalQ} câu - Cần >= 80%)`}
                    </div>
                    <div className="text-xs mt-0.5">
                      {bossResult.passed
                        ? `Thưởng Trùm: +${activeBossModal.boss.thptBonus}đ THPT D01 | +${activeBossModal.boss.ca4Bonus}đ CA4 | +${activeBossModal.boss.expBonus} EXP!`
                        : 'Xem lại đáp án giải thích bên dưới và bấm Tái Đấu Trùm Ải!'}
                    </div>
                  </div>
                  <button
                    onClick={() => startBossFight(activeBossModal.phase)}
                    className="w-full sm:w-auto justify-center px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Tái Đấu
                  </button>
                </div>
              )}

              {activeBossModal.boss.questions.map((item, qIdx) => {
                const selected = bossAnswers[qIdx];
                const showKey = Boolean(bossResult);

                return (
                  <div key={qIdx} className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="text-[11px] font-mono text-amber-400">ĐÒN TẤN CÔNG #{qIdx + 1}/{activeBossModal.boss.questions.length}</div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-snug">{item.q}</div>
                    <div className="grid grid-cols-1 gap-2">
                      {item.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isRight = item.answer === optIdx;

                        let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                        if (!showKey && isChosen) {
                          style = 'bg-amber-950/80 border-amber-500 text-amber-200';
                        } else if (showKey && isRight) {
                          style = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                        } else if (showKey && isChosen && !isRight) {
                          style = 'bg-red-950 border-red-500 text-red-200';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={showKey}
                            onClick={() => setBossAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs sm:text-sm flex items-start sm:items-center justify-between gap-2 transition ${style}`}
                          >
                            <span className="leading-snug">
                              <strong className="font-mono mr-2">{['A', 'B', 'C', 'D'][optIdx]}.</strong>
                              {opt}
                            </span>
                            {showKey && isRight && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />}
                            {showKey && isChosen && !isRight && <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5 sm:mt-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {showKey && (
                      <div className="text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg leading-relaxed">
                        <strong>Giải thích:</strong> {item.explain}
                      </div>
                    )}
                  </div>
                );
              })}

              {!bossResult && (
                <button
                  onClick={() => submitBossFight(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 transition active:scale-95"
                >
                  TUNG ĐÒN QUYẾT ĐỊNH & CHẤM ĐIỂM BOSS FIGHT
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

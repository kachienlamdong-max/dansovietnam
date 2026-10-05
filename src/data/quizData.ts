import { MapQuestion, MultipleChoiceQuestion, TrueFalseQuestionGroup } from '../types';

/**
 * 1. MAP CHALLENGE QUESTIONS
 * Students must click directly on the 3D map of Vietnam.
 */
export const MAP_CHALLENGE_QUESTIONS: MapQuestion[] = [
  {
    id: 'map_q1',
    question: 'Vùng nào có mật độ dân số cao nhất nước ta hiện nay, lên tới 1.034 người/km²?',
    targetRegionId: 'dong_bang_song_hong',
    hint: 'Đây là vùng châu thổ sông Hồng, nơi có Thủ đô Hà Nội và truyền thống trồng lúa nước lâu đời.',
    explanation: 'Chính xác! Đồng bằng sông Hồng có mật độ dân số cao nhất cả nước (1.034 người/km²), cao gấp hơn 3 lần mật độ trung bình toàn quốc do lịch sử định cư khai phá lâu đời và nông nghiệp thâm canh cao.',
    difficulty: 'easy',
    category: 'Mật độ dân số'
  },
  {
    id: 'map_q2',
    question: 'Vùng nào có đất rộng nhưng mật độ dân số thấp nhất cả nước, chỉ có 136 người/km²?',
    targetRegionId: 'trung_du_mien_nui_phia_bac',
    hint: 'Vùng có đỉnh Phan Xi Păng, đường biên giới giáp Trung Quốc và Lào, diện tích trên 95.000 km².',
    explanation: 'Chính xác! Trung du và miền núi phía Bắc có diện tích rộng nhất cả nước nhưng mật độ dân số thấp nhất (chỉ 136 người/km²) do địa hình hiểm trở chia cắt mạnh và kinh tế - giao thông còn nhiều khó khăn.',
    difficulty: 'easy',
    category: 'Phân bố dân cư'
  },
  {
    id: 'map_q3',
    question: 'Vùng nào có tỉ lệ dân số thành thị cao nhất nước ta (>67%) và mật độ dân số đứng thứ hai cả nước (804 người/km²)?',
    targetRegionId: 'dong_nam_bo',
    hint: 'Vùng kinh tế trọng điểm phía Nam với trung tâm là TP. Hồ Chí Minh, Bình Dương, Đồng Nai.',
    explanation: 'Chính xác! Đông Nam Bộ là đầu tàu kinh tế năng động với tỉ lệ đô thị hóa vượt trội (>67%) và mật độ dân cư 804 người/km², thu hút lượng lớn lao động nhập cư từ khắp các tỉnh thành.',
    difficulty: 'medium',
    category: 'Đô thị hóa'
  },
  {
    id: 'map_q4',
    question: 'Vùng nào được xem là vựa lúa lớn nhất nước ta, với mật độ dân cư 430 người/km² và dân cư sống dọc theo kênh rạch?',
    targetRegionId: 'dong_bang_song_cuu_long',
    hint: 'Vùng châu thổ của dòng sông Mê Kông chín nhánh đổ ra biển, có TP. Cần Thơ.',
    explanation: 'Chính xác! Đồng bằng sông Cửu Long có mật độ dân số 430 người/km², tập trung đông dọc các cù lao, kênh rạch và mạng lưới sông ngòi trù phú.',
    difficulty: 'easy',
    category: 'Vùng châu thổ'
  },
  {
    id: 'map_q5',
    question: 'Vùng duy nhất của nước ta không giáp biển, có mật độ dân số rất thấp (~111 người/km²), nổi tiếng với đất đỏ bazan và cây công nghiệp?',
    targetRegionId: 'tay_nguyen',
    hint: 'Vùng đất của các cao nguyên xếp tầng: Kon Tum, Pleiku, Đắk Lắk, Lâm Viên.',
    explanation: 'Chính xác! Tây Nguyên là vùng có mật độ dân số thấp thứ hai cả nước (~111 người/km²) và là vùng duy nhất không tiếp giáp biển, kinh tế chủ đạo là cà phê, cao su và hồ tiêu.',
    difficulty: 'medium',
    category: 'Cao nguyên'
  },
  {
    id: 'map_q6',
    question: 'Vùng có lãnh thổ kéo dài, hẹp ngang nhất cả nước, dân cư tập trung đông ở dải đồng bằng ven biển và thưa ở vùng núi phía Tây?',
    targetRegionId: 'bac_trung_bo_duyen_hai_mien_trung',
    hint: 'Vùng đòn gánh chiến lược nối liền Bắc - Nam, chạy dọc dãy Trường Sơn và Biển Đông.',
    explanation: 'Chính xác! Bắc Trung Bộ và Duyên hải miền Trung có địa hình kéo dài hẹp ngang (nơi hẹp nhất chỉ 50km ở Quảng Bình), dân cư phân bố chênh lệch lớn giữa Đông (ven biển) và Tây (núi gồ ghề).',
    difficulty: 'medium',
    category: 'Duyên hải'
  }
];

/**
 * 2. MULTIPLE CHOICE QUESTIONS (Part 1 of Quiz)
 */
export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
  {
    id: 'mc_q1',
    question: 'Năm 2024, quy mô dân số nước ta đạt 101,3 triệu người, đứng thứ mấy ở Đông Nam Á?',
    options: [
      { key: 'A', text: 'Thứ 1' },
      { key: 'B', text: 'Thứ 2' },
      { key: 'C', text: 'Thứ 3' },
      { key: 'D', text: 'Thứ 4' }
    ],
    correctKey: 'C',
    explanation: 'Chính xác là phương án C! Ở Đông Nam Á, dân số Việt Nam (101,3 triệu người) đứng thứ 3 sau Indonesia (~280 triệu người) và Philippines (~118 triệu người). Trên thế giới, Việt Nam nằm trong top 15 quốc gia đông dân nhất.'
  },
  {
    id: 'mc_q2',
    question: 'Hiện nay, nước ta đang trong giai đoạn cơ cấu "dân số vàng" vì nhóm tuổi nào chiếm tỉ trọng trên 66%?',
    options: [
      { key: 'A', text: 'Nhóm 0 - 14 tuổi (dưới tuổi lao động)' },
      { key: 'B', text: 'Nhóm 15 - 64 tuổi (trong độ tuổi lao động)' },
      { key: 'C', text: 'Nhóm 65 tuổi trở lên (hết tuổi lao động)' },
      { key: 'D', text: 'Nhóm trên 80 tuổi (người cao tuổi)' }
    ],
    correctKey: 'B',
    explanation: 'Cơ cấu dân số vàng được định nghĩa khi tỉ lệ người trong độ tuổi lao động (15-64 tuổi) chiếm từ 66% trở lên trong tổng dân số (ở Việt Nam đạt 67,4% năm 2024).'
  },
  {
    id: 'mc_q3',
    question: 'Nguyên nhân cơ bản nhất dẫn tới sự phân bố dân cư không đều giữa đồng bằng và miền núi ở nước ta là do:',
    options: [
      { key: 'A', text: 'Điều kiện tự nhiên và trình độ phát triển kinh tế - xã hội khác nhau' },
      { key: 'B', text: 'Khí hậu miền núi quá nóng bức quanh năm' },
      { key: 'C', text: 'Đồng bằng có nhiều khoáng sản năng lượng hơn miền núi' },
      { key: 'D', text: 'Chính sách cấm định cư ở vùng cao của Nhà nước' }
    ],
    correctKey: 'A',
    explanation: 'Sự phân bố dân cư chịu sự tác động tổng hợp của nhiều nhân tố, trong đó quyết định nhất là trình độ phát triển kinh tế, phương thức sản xuất và lịch sử khai thác lãnh thổ kết hợp điều kiện tự nhiên.'
  },
  {
    id: 'mc_q4',
    question: 'Tỉ số giới tính khi sinh ở nước ta năm 2024 ở mức 111,4 bé trai / 100 bé gái phản ánh vấn đề gì?',
    options: [
      { key: 'A', text: 'Cơ cấu giới tính tự nhiên hoàn toàn lý tưởng' },
      { key: 'B', text: 'Tình trạng mất cân bằng giới tính khi sinh rất nghiêm trọng' },
      { key: 'C', text: 'Tỉ lệ nữ giới sinh ra nhiều hơn đáng kể so với nam giới' },
      { key: 'D', text: 'Việt Nam đã khắc phục triệt để tư tưởng trọng nam khinh nữ' }
    ],
    correctKey: 'B',
    explanation: 'Mức cân bằng sinh học tự nhiên là khoảng 104 - 106 bé trai / 100 bé gái. Mức 111,4 bé trai / 100 bé gái ở Việt Nam là mức mất cân bằng giới tính khi sinh nghiêm trọng, để lại hệ lụy lớn về hôn nhân và an sinh xã hội sau này.'
  }
];

/**
 * 3. TRUE / FALSE QUESTION GROUP (Part 2 of Quiz)
 * Based on 2024 Census data context
 */
export const TRUE_FALSE_QUESTION_GROUP: TrueFalseQuestionGroup = {
  id: 'tf_group_1',
  context: 'Năm 2024, Việt Nam đạt quy mô 101,3 triệu người. Tỉ lệ nam/nữ trong tổng số dân tương đối cân bằng (nam 49,91% và nữ 50,09%). Tuy nhiên, nước ta đang đối mặt với tình trạng mất cân bằng giới tính khi sinh nghiêm trọng với tỉ số 111,4 bé trai / 100 bé gái. Về cơ cấu tuổi, nhóm 15-64 tuổi chiếm 67,4%, nước ta đang trong thời kì cơ cấu dân số vàng nhưng tốc độ già hóa dân số diễn ra rất nhanh.',
  statements: [
    {
      id: 'tf_s1',
      statement: 'a) Tỉ số giới tính khi sinh của nước ta hiện nay đã đạt mức cân bằng và ổn định tự nhiên.',
      isCorrect: false,
      explanation: 'SAI. Tỉ số cân bằng tự nhiên là 104-106 bé trai / 100 bé gái. Con số 111,4 bé trai / 100 bé gái cho thấy nước ta đang đối mặt với mất cân bằng giới tính khi sinh rất nghiêm trọng.'
    },
    {
      id: 'tf_s2',
      statement: 'b) Nước ta hiện nay vừa sở hữu lợi thế của cơ cấu dân số vàng, vừa phải đối mặt với thách thức già hóa dân số nhanh.',
      isCorrect: true,
      explanation: 'ĐÚNG. Nhóm 15-64 tuổi chiếm 67,4% mang lại nguồn nhân lực dồi dào (dân số vàng), đồng thời tỉ lệ người già tăng nhanh khiến Việt Nam là một trong những nước có tốc độ già hóa nhanh nhất thế giới.'
    },
    {
      id: 'tf_s3',
      statement: 'c) Trong tổng quy mô 101,3 triệu người, số lượng nam giới nhiều vượt trội so với số lượng nữ giới.',
      isCorrect: false,
      explanation: 'SAI. Theo dữ liệu, tỉ lệ nam 49,91% và nữ 50,09% là tương đối cân bằng trong tổng dân số, không hề có việc nam vượt trội.'
    },
    {
      id: 'tf_s4',
      statement: 'd) Dân số vượt mốc 100 triệu người mang lại lợi thế về thị trường tiêu thụ nội địa rộng lớn và lực lượng lao động dồi dào cho phát triển kinh tế.',
      isCorrect: true,
      explanation: 'ĐÚNG. Quy mô dân số trên 100 triệu người (đứng thứ 3 ASEAN, thứ 15 thế giới) tạo ra thị trường tiêu dùng rộng lớn và nguồn lao động trẻ, thu hút mạnh mẽ vốn đầu tư FDI.'
    }
  ]
};

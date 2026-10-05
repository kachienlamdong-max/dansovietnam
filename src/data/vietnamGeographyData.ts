import { RegionData, RegionId } from '../types';
import { DETAILED_REGIONS } from './vietnamDetailedMapData';

/**
 * 6 Socio-Economic Regions of Vietnam
 * Configured with authentic colors and vector coordinates matching the
 * High School Geography Textbook Map (SGK Kết nối tri thức).
 */
export const VIETNAM_REGIONS: Record<RegionId, RegionData> = {
  trung_du_mien_nui_phia_bac: {
    id: 'trung_du_mien_nui_phia_bac',
    name: 'Trung du và miền núi phía Bắc',
    shortName: 'TD & MN Phía Bắc',
    population: 14.5,
    density: 136,
    area: 95222,
    urbanRate: 20.8,
    keyFeatures: [
      'Diện tích tự nhiên lớn nhất cả nước (hơn 95.000 km²)',
      'Mật độ dân số thấp nhất cả nước: chỉ 136 người/km²',
      'Địa hình hiểm trở, chia cắt mạnh với dãy Hoàng Liên Sơn, đỉnh Phan Xi Păng',
      'Tiềm năng lớn về thủy điện, khoáng sản và cây công nghiệp cận nhiệt, ôn đới'
    ],
    description: 'Vùng có diện tích tự nhiên rộng lớn nhất cả nước, địa hình núi non hiểm trở chia cắt mạnh. Mật độ dân số thấp nhất toàn quốc (136 người/km²), phân bố thưa thớt ở vùng núi cao và tập trung hơn tại các thung lũng, lòng chảo và dải trung du.',
    representativeProvinces: ['Lào Cai', 'Hà Giang', 'Yên Bái', 'Sơn La', 'Điện Biên', 'Cao Bằng', 'Lạng Sơn', 'Thái Nguyên'],
    color: '#eab308', // Vàng chuẩn SGK (100 - dưới 200)
    highlightColor: '#fde047',
    emissiveColor: '#713f12',
    center3D: [-0.4, 3.2, 0.4],
    polygon: DETAILED_REGIONS.trung_du_mien_nui_phia_bac.polygon3D
  },

  dong_bang_song_hong: {
    id: 'dong_bang_song_hong',
    name: 'Đồng bằng sông Hồng',
    shortName: 'ĐB Sông Hồng',
    population: 23.4,
    density: 1034,
    area: 21278,
    urbanRate: 37.5,
    keyFeatures: [
      'Mật độ dân số cao nhất nước ta: 1.034 người/km² (gấp 3.5 lần trung bình toàn quốc)',
      'Quy mô dân số hơn 23,4 triệu người trên diện tích tương đối hẹp',
      'Cái nôi của nền văn minh lúa nước sông Hồng với bề dày lịch sử khai thác lãnh thổ',
      'Trung tâm kinh tế, chính trị, văn hóa hàng đầu với hạt nhân là Thủ đô Hà Nội'
    ],
    description: 'Châu thổ phù sa màu mỡ sông Hồng và sông Thái Bình. Nơi đây có mật độ dân cư cao kỷ lục cả nước (1.034 người/km²), lịch sử định cư khai phá nghìn năm, làng mạc trù phú, đô thị hóa và công nghiệp phát triển rất sôi động.',
    representativeProvinces: ['Hà Nội', 'Hải Phòng', 'Bắc Ninh', 'Vĩnh Phúc', 'Hải Dương', 'Hưng Yên', 'Nam Định', 'Ninh Bình'],
    color: '#991b1b', // Đỏ sẫm chuẩn SGK (Từ 1.000 trở lên)
    highlightColor: '#ef4444',
    emissiveColor: '#450a0a',
    center3D: [0.35, 2.2, 0.45],
    polygon: DETAILED_REGIONS.dong_bang_song_hong.polygon3D
  },

  bac_trung_bo_duyen_hai_mien_trung: {
    id: 'bac_trung_bo_duyen_hai_mien_trung',
    name: 'Bắc Trung Bộ và Duyên hải miền Trung',
    shortName: 'Bắc Trung Bộ & DHMT',
    population: 20.8,
    density: 219,
    area: 95847,
    urbanRate: 31.2,
    keyFeatures: [
      'Lãnh thổ kéo dài và hẹp ngang nhất nước ta (chỗ hẹp nhất chỉ khoảng 50 km ở Quảng Bình)',
      'Mật độ dân số trung bình ~219 người/km²',
      'Dân cư phân bố không đều: tập trung đông ở dải đồng bằng ven biển, thưa thớt ở vùng đồi núi phía Tây',
      'Kinh tế biển mũi nhọn: cảng nước sâu, du lịch biển, kinh tế đảo, chế biến thủy hải sản'
    ],
    description: 'Vùng đòn gánh chiến lược nối hai đầu đất nước. Lãnh thổ hẹp ngang, phía tây là sườn đông Trường Sơn, phía đông là Biển Đông. Dân cư phân bố theo trục Tây - Đông rõ rệt: phía Tây thưa thớt, đồng bằng duyên hải trù phú mật độ cao.',
    representativeProvinces: ['Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Khánh Hòa'],
    color: '#f59e0b', // Vàng cam chuẩn SGK (200 - dưới 500)
    highlightColor: '#fbbf24',
    emissiveColor: '#78350f',
    center3D: [0.65, 0.2, 0.38],
    polygon: DETAILED_REGIONS.bac_trung_bo_duyen_hai_mien_trung.polygon3D
  },

  tay_nguyen: {
    id: 'tay_nguyen',
    name: 'Tây Nguyên',
    shortName: 'Tây Nguyên',
    population: 6.1,
    density: 111,
    area: 54548,
    urbanRate: 29.4,
    keyFeatures: [
      'Vùng duy nhất của nước ta không giáp biển ("Mái nhà của Đông Dương")',
      'Mật độ dân số thấp thứ hai cả nước (~111 người/km²)',
      'Địa bàn cư trú của nhiều dân tộc thiểu số với không gian văn hóa cồng chiêng đặc sắc',
      'Thủ phủ cây công nghiệp lâu năm giá trị cao: cà phê, cao su, hồ tiêu, chè'
    ],
    description: 'Vùng cao nguyên xếp tầng với đất đỏ bazan trù phú. Là vùng duy nhất không tiếp giáp biển. Mật độ dân số thấp, cư dân phân bố tập trung ở các đô thị như Buôn Ma Thuột, Pleiku, Đà Lạt và các vùng chuyên canh cây công nghiệp.',
    representativeProvinces: ['Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng'],
    color: '#fef08a', // Vàng nhạt chuẩn SGK (100 - dưới 200)
    highlightColor: '#fef9c3',
    emissiveColor: '#854d0e',
    center3D: [0.25, -2.6, 0.42],
    polygon: DETAILED_REGIONS.tay_nguyen.polygon3D
  },

  dong_nam_bo: {
    id: 'dong_nam_bo',
    name: 'Đông Nam Bộ',
    shortName: 'Đông Nam Bộ',
    population: 19.2,
    density: 804,
    area: 23553,
    urbanRate: 67.2,
    keyFeatures: [
      'Tỉ lệ dân số thành thị cao nhất cả nước (>67%), đầu tàu kinh tế và đổi mới sáng tạo',
      'Mật độ dân số đứng thứ hai cả nước: 804 người/km²',
      'Vùng thu hút lượng người di cư thuần lớn nhất Việt Nam nhờ các KCN sôi động',
      'Hạt nhân là TP. Hồ Chí Minh - siêu đô thị kinh tế, tài chính, khoa học công nghệ'
    ],
    description: 'Vùng kinh tế năng động và dẫn đầu cả nước về GDP, công nghiệp và xuất khẩu. Tỉ lệ dân số thành thị vượt trội trên 67%. Mật độ dân số đứng thứ hai cả nước (804 người/km²), áp lực cơ sở hạ tầng và việc làm rất lớn nhưng thu hút lao động trẻ dồi dào.',
    representativeProvinces: ['TP. Hồ Chí Minh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 'Tây Ninh', 'Bình Phước'],
    color: '#c2410c', // Cam sẫm chuẩn SGK (500 - dưới 1.000)
    highlightColor: '#f97316',
    emissiveColor: '#7c2d12',
    center3D: [0.05, -3.6, 0.4],
    polygon: DETAILED_REGIONS.dong_nam_bo.polygon3D
  },

  dong_bang_song_cuu_long: {
    id: 'dong_bang_song_cuu_long',
    name: 'Đồng bằng sông Cửu Long',
    shortName: 'ĐB Sông Cửu Long',
    population: 17.5,
    density: 430,
    area: 40922,
    urbanRate: 26.5,
    keyFeatures: [
      'Vựa lúa, trái cây và nuôi trồng thủy hải sản lớn nhất Việt Nam ("Vùng đất chín rồng")',
      'Mật độ dân số khá cao: ~430 người/km²',
      'Dân cư phân bố đặc trưng "sống chung với lũ", quần cư dọc theo các tuyến kênh rạch, sông ngòi và đê điều',
      'Đang đối mặt với thách thức biến đổi khí hậu, nước biển dâng và xâm nhập mặn'
    ],
    description: 'Đồng bằng châu thổ rộng lớn nhất nước ta do phù sa sông Mê Kông bồi đắp. Dân cư trù phú, quần cư ven sông rạch độc đáo. Mật độ dân số 430 người/km², giữ vai trò then chốt bảo đảm an ninh lương thực quốc gia và xuất khẩu gạo hàng đầu thế giới.',
    representativeProvinces: ['Cần Thơ', 'An Giang', 'Đồng Tháp', 'Tiền Giang', 'Vĩnh Long', 'Kiên Giang', 'Bến Tre', 'Cà Mau', 'Sóc Trăng', 'Bạc Liêu'],
    color: '#ea580c', // Cam chuẩn SGK (200 - dưới 500)
    highlightColor: '#fb923c',
    emissiveColor: '#7c2d12',
    center3D: [-0.45, -4.4, 0.38],
    polygon: DETAILED_REGIONS.dong_bang_song_cuu_long.polygon3D
  }
};

/**
 * Maritime & Sovereignty Points (Biển Đông, Quần đảo Hoàng Sa, Quần đảo Trường Sa)
 */
export interface IslandMarker {
  id: string;
  name: string;
  subName: string;
  position3D: [number, number, number];
  type: 'archipelago' | 'island' | 'sea';
}

export const SOVEREIGNTY_MARKERS: IslandMarker[] = [
  {
    id: 'hoang_sa',
    name: 'Quần đảo Hoàng Sa',
    subName: 'Huyện Hoàng Sa, TP. Đà Nẵng',
    position3D: [2.3, 0.4, 0.35],
    type: 'archipelago'
  },
  {
    id: 'truong_sa',
    name: 'Quần đảo Trường Sa',
    subName: 'Huyện đảo Trường Sa, Tỉnh Khánh Hòa',
    position3D: [2.5, -2.2, 0.35],
    type: 'archipelago'
  },
  {
    id: 'phu_quoc',
    name: 'Đảo Phú Quốc',
    subName: 'TP. Phú Quốc, Tỉnh Kiên Giang',
    position3D: [-1.45, -3.7, 0.35],
    type: 'island'
  },
  {
    id: 'con_dao',
    name: 'Côn Đảo',
    subName: 'Tỉnh Bà Rịa - Vũng Tàu',
    position3D: [0.45, -3.6, 0.35],
    type: 'island'
  }
];

/**
 * Vietnam National Overview Demographic Stats (2024 Census Data)
 */
export const VIETNAM_OVERVIEW = {
  year: 2024,
  totalPopulation: 101.3, // triệu người
  globalRank: 15,
  seaRank: 3, // Indonesia, Philippines, Vietnam
  averageDensity: 306, // người/km2
  sexRatioTotal: {
    male: 49.91,
    female: 50.09
  },
  sexRatioAtBirth: 111.4, // bé trai / 100 bé gái (mất cân bằng giới tính khi sinh)
  naturalSexRatioNormal: '104 - 106',
  workingAgeShare: 67.4, // % (15 - 64 tuổi) - Cơ cấu dân số vàng
  youthShare: 23.2, // % (0 - 14 tuổi)
  elderlyShare: 9.4, // % (65 tuổi trở lên) - Già hóa nhanh
  urbanRate: 38.6, // %
  ruralRate: 61.4, // %
  densityRanking: [
    { name: 'Đồng bằng sông Hồng', density: 1034, rank: 1, regionId: 'dong_bang_song_hong' },
    { name: 'Đông Nam Bộ', density: 804, rank: 2, regionId: 'dong_nam_bo' },
    { name: 'Đồng bằng sông Cửu Long', density: 430, rank: 3, regionId: 'dong_bang_song_cuu_long' },
    { name: 'Bắc Trung Bộ & Duyên hải miền Trung', density: 219, rank: 4, regionId: 'bac_trung_bo_duyen_hai_mien_trung' },
    { name: 'Trung du & miền núi phía Bắc', density: 136, rank: 5, regionId: 'trung_du_mien_nui_phia_bac' },
    { name: 'Tây Nguyên', density: 111, rank: 6, regionId: 'tay_nguyen' }
  ]
};

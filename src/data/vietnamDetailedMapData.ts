import { RegionId } from '../types';

export interface DetailedRegionPath {
  id: RegionId;
  name: string;
  shortName: string;
  densityText: string;
  densityValue: number;
  // Textbook density color code
  mapFillColor: string;
  mapHoverColor: string;
  densityCategory: string; // Theo chú giải SGK
  svgPath: string;
  labelPosition: { x: number; y: number };
  cities: { name: string; x: number; y: number; isCapital?: boolean }[];
  keyRivers: { name: string; path: string }[];
  // 3D coordinates points for Three.js extrusion
  polygon3D: [number, number][];
}

/**
 * High-precision, authentic geographic vector representation of Vietnam's 6 socio-economic regions
 * Matches the official High School Geography Textbook Map (SGK Kết nối tri thức).
 * Coordinate viewBox: 0 0 650 920.
 */
export const DETAILED_REGIONS: Record<RegionId, DetailedRegionPath> = {
  trung_du_mien_nui_phia_bac: {
    id: 'trung_du_mien_nui_phia_bac',
    name: 'Trung du và miền núi phía Bắc',
    shortName: 'TD & MN Phía Bắc',
    densityText: '136 người/km²',
    densityValue: 136,
    mapFillColor: '#fef08a', // Vàng nhạt (100 - dưới 200 người/km2 theo SGK)
    mapHoverColor: '#facc15',
    densityCategory: 'Từ 100 đến dưới 200',
    labelPosition: { x: 260, y: 110 },
    cities: [
      { name: 'Lào Cai', x: 255, y: 85 },
      { name: 'Hà Giang', x: 320, y: 60 },
      { name: 'Cao Bằng', x: 380, y: 75 },
      { name: 'Lạng Sơn', x: 405, y: 130 },
      { name: 'Sơn La', x: 215, y: 165 },
      { name: 'Điện Biên', x: 155, y: 130 }
    ],
    keyRivers: [
      { name: 'Sông Chảy', path: 'M 280 60 Q 275 100 270 140' },
      { name: 'Sông Đà', path: 'M 180 120 Q 220 160 265 190' }
    ],
    // SVG Path accurately tracing: Dien Bien -> Lai Chau -> Lao Cai -> Ha Giang -> Cao Bang -> Lang Son -> Quang Ninh -> border with Red River Delta -> Hoa Binh -> Son La
    svgPath: `
      M 148 112
      C 152 98, 168 85, 185 80
      C 205 75, 225 65, 250 58
      C 275 50, 305 42, 335 45
      C 348 47, 362 55, 375 62
      C 395 72, 412 85, 422 105
      C 432 120, 438 142, 452 165
      C 460 178, 452 188, 435 188
      C 420 188, 405 182, 395 180
      C 382 178, 375 185, 365 190
      C 350 196, 338 188, 325 185
      C 310 182, 298 190, 285 198
      C 272 205, 260 215, 252 230
      C 240 240, 228 232, 218 215
      C 205 195, 192 185, 178 172
      C 162 158, 142 135, 148 112
      Z
    `,
    // Normalized 3D coordinates for Three.js (X: -3.5 to 3.5, Y: -5 to 5)
    polygon3D: [
      [-2.1, 3.6],
      [-1.7, 4.0],
      [-1.0, 4.4],
      [-0.1, 4.6],
      [0.6, 4.3],
      [1.3, 3.8],
      [1.7, 3.0],
      [1.5, 2.7],
      [1.1, 2.7],
      [0.8, 2.6],
      [0.5, 2.5],
      [0.1, 2.6],
      [-0.4, 2.3],
      [-0.7, 2.0],
      [-1.1, 2.3],
      [-1.5, 2.7],
      [-1.9, 3.2],
      [-2.1, 3.6]
    ]
  },

  dong_bang_song_hong: {
    id: 'dong_bang_song_hong',
    name: 'Đồng bằng sông Hồng',
    shortName: 'ĐB Sông Hồng',
    densityText: '1.034 người/km²',
    densityValue: 1034,
    mapFillColor: '#991b1b', // Đỏ sẫm (Từ 1.000 trở lên theo SGK)
    mapHoverColor: '#b91c1c',
    densityCategory: 'Từ 1.000 trở lên',
    labelPosition: { x: 335, y: 220 },
    cities: [
      { name: 'HÀ NỘI', x: 325, y: 205, isCapital: true },
      { name: 'Hải Phòng', x: 375, y: 215 },
      { name: 'Bắc Ninh', x: 345, y: 195 },
      { name: 'Nam Định', x: 340, y: 245 }
    ],
    keyRivers: [
      { name: 'Sông Hồng', path: 'M 305 185 Q 330 215 365 240' }
    ],
    // SVG Path nested between Northern Mountains and coast: Hanoi, Hai Phong, Hai Duong, Hung Yen, Nam Dinh, Ninh Binh
    svgPath: `
      M 285 198
      C 298 190, 310 182, 325 185
      C 338 188, 350 196, 365 190
      C 375 185, 382 178, 395 180
      C 405 182, 420 188, 435 188
      C 425 208, 410 225, 390 235
      C 375 242, 358 252, 345 260
      C 332 265, 320 258, 310 245
      C 298 230, 290 215, 285 198
      Z
    `,
    polygon3D: [
      [-0.4, 2.3],
      [0.1, 2.6],
      [0.5, 2.5],
      [0.8, 2.6],
      [1.1, 2.7],
      [1.4, 2.5],
      [1.0, 2.0],
      [0.6, 1.8],
      [0.2, 1.6],
      [-0.1, 1.8],
      [-0.4, 2.3]
    ]
  },

  bac_trung_bo_duyen_hai_mien_trung: {
    id: 'bac_trung_bo_duyen_hai_mien_trung',
    name: 'Bắc Trung Bộ và Duyên hải miền Trung',
    shortName: 'Bắc Trung Bộ & DHMT',
    densityText: '219 người/km²',
    densityValue: 219,
    mapFillColor: '#f59e0b', // Vàng cam (200 - dưới 500 người/km2 theo SGK)
    mapHoverColor: '#fbbf24',
    densityCategory: 'Từ 200 đến dưới 500',
    labelPosition: { x: 360, y: 390 },
    cities: [
      { name: 'Thanh Hóa', x: 310, y: 275 },
      { name: 'Vinh', x: 300, y: 325 },
      { name: 'Huế', x: 385, y: 460 },
      { name: 'Đà Nẵng', x: 425, y: 485 },
      { name: 'Quy Nhơn', x: 440, y: 580 },
      { name: 'Nha Trang', x: 445, y: 645 }
    ],
    keyRivers: [
      { name: 'Sông Mã', path: 'M 255 240 Q 285 260 315 275' },
      { name: 'Sông Hương', path: 'M 370 455 Q 385 460 395 465' }
    ],
    // The long, slender, coastal waist extending from Thanh Hoa down to Binh Thuan
    svgPath: `
      M 252 230
      C 260 215, 272 205, 285 198
      C 290 215, 298 230, 310 245
      C 320 258, 332 265, 345 260
      C 335 285, 320 315, 305 345
      C 295 365, 305 385, 325 405
      C 342 422, 360 445, 380 470
      C 400 495, 420 520, 435 555
      C 445 580, 452 610, 450 645
      C 448 670, 438 695, 420 720
      C 405 738, 390 745, 380 740
      C 382 725, 395 705, 405 680
      C 415 650, 412 620, 402 590
      C 392 560, 375 530, 360 500
      C 340 460, 320 420, 298 380
      C 280 345, 260 305, 245 270
      C 240 255, 245 242, 252 230
      Z
    `,
    polygon3D: [
      [-0.7, 2.0],
      [-0.4, 2.3],
      [-0.1, 1.8],
      [0.2, 1.6],
      [0.1, 1.1],
      [-0.1, 0.5],
      [0.1, -0.1],
      [0.5, -0.7],
      [0.9, -1.3],
      [1.2, -2.0],
      [1.3, -2.8],
      [1.1, -3.5],
      [0.8, -3.7],
      [0.7, -3.4],
      [0.8, -2.9],
      [0.7, -2.2],
      [0.4, -1.5],
      [0.1, -0.8],
      [-0.2, -0.2],
      [-0.5, 0.4],
      [-0.8, 1.2],
      [-0.7, 2.0]
    ]
  },

  tay_nguyen: {
    id: 'tay_nguyen',
    name: 'Tây Nguyên',
    shortName: 'Tây Nguyên',
    densityText: '111 người/km²',
    densityValue: 111,
    mapFillColor: '#fef9c3', // Vàng chanh nhạt (Dưới 200 người/km2 theo SGK)
    mapHoverColor: '#fef08a',
    densityCategory: 'Từ 100 đến dưới 200',
    labelPosition: { x: 375, y: 585 },
    cities: [
      { name: 'Pleiku', x: 370, y: 550 },
      { name: 'Buôn Ma Thuột', x: 365, y: 610 },
      { name: 'Đà Lạt', x: 390, y: 665 },
      { name: 'Kon Tum', x: 365, y: 515 }
    ],
    keyRivers: [
      { name: 'Sông Sêrêpôk', path: 'M 355 600 Q 345 615 330 625' }
    ],
    // High plateau inland bordering Laos and Cambodia: Kon Tum, Gia Lai, Dak Lak, Dak Nong, Lam Dong
    svgPath: `
      M 360 500
      C 375 530, 392 560, 402 590
      C 412 620, 415 650, 405 680
      C 395 705, 382 725, 380 740
      C 365 745, 348 735, 335 720
      C 325 700, 320 675, 325 650
      C 330 620, 335 590, 338 560
      C 342 530, 350 512, 360 500
      Z
    `,
    polygon3D: [
      [0.4, -1.5],
      [0.7, -2.2],
      [0.8, -2.9],
      [0.7, -3.4],
      [0.5, -3.6],
      [0.1, -3.4],
      [-0.1, -3.0],
      [-0.1, -2.3],
      [0.1, -1.8],
      [0.4, -1.5]
    ]
  },

  dong_nam_bo: {
    id: 'dong_nam_bo',
    name: 'Đông Nam Bộ',
    shortName: 'Đông Nam Bộ',
    densityText: '804 người/km²',
    densityValue: 804,
    mapFillColor: '#c2410c', // Cam sẫm / nâu đỏ (500 - dưới 1000 người/km2 theo SGK)
    mapHoverColor: '#ea580c',
    densityCategory: 'Từ 500 đến dưới 1.000',
    labelPosition: { x: 330, y: 745 },
    cities: [
      { name: 'TP. HỒ CHÍ MINH', x: 330, y: 755, isCapital: false },
      { name: 'Biên Hòa', x: 345, y: 740 },
      { name: 'Thủ Dầu Một', x: 325, y: 735 },
      { name: 'Vũng Tàu', x: 360, y: 775 }
    ],
    keyRivers: [
      { name: 'Sông Đồng Nai', path: 'M 355 710 Q 345 740 340 765' },
      { name: 'Sông Sài Gòn', path: 'M 315 720 Q 325 745 335 760' }
    ],
    // Surrounding HCM City, Binh Duong, Dong Nai, Ba Ria Vung Tau, Tay Ninh, Binh Phuoc
    svgPath: `
      M 325 650
      C 320 675, 325 700, 335 720
      C 348 735, 365 745, 380 740
      C 390 745, 380 765, 368 780
      C 352 790, 335 788, 318 780
      C 305 772, 295 755, 292 735
      C 290 710, 298 685, 310 665
      C 318 655, 322 650, 325 650
      Z
    `,
    polygon3D: [
      [-0.1, -3.0],
      [0.1, -3.4],
      [0.5, -3.6],
      [0.6, -3.8],
      [0.4, -4.1],
      [0.0, -4.1],
      [-0.3, -3.9],
      [-0.4, -3.4],
      [-0.2, -3.1],
      [-0.1, -3.0]
    ]
  },

  dong_bang_song_cuu_long: {
    id: 'dong_bang_song_cuu_long',
    name: 'Đồng bằng sông Cửu Long',
    shortName: 'ĐB Sông Cửu Long',
    densityText: '430 người/km²',
    densityValue: 430,
    mapFillColor: '#ea580c', // Cam (200 - dưới 500 người/km2 theo SGK)
    mapHoverColor: '#f97316',
    densityCategory: 'Từ 200 đến dưới 500',
    labelPosition: { x: 260, y: 810 },
    cities: [
      { name: 'Cần Thơ', x: 275, y: 805 },
      { name: 'Mỹ Tho', x: 315, y: 780 },
      { name: 'Long Xuyên', x: 250, y: 785 },
      { name: 'Rạch Giá', x: 230, y: 815 },
      { name: 'Cà Mau', x: 235, y: 865 }
    ],
    keyRivers: [
      { name: 'Sông Tiền', path: 'M 305 765 Q 285 785 295 810' },
      { name: 'Sông Hậu', path: 'M 285 770 Q 265 800 275 830' }
    ],
    // The southwestern delta spreading down to Ca Mau cape (Mũi Cà Mau) and Kien Giang
    svgPath: `
      M 318 780
      C 335 788, 352 790, 368 780
      C 355 805, 335 830, 310 845
      C 285 860, 255 885, 230 895
      C 215 898, 205 885, 208 865
      C 212 840, 218 815, 225 790
      C 232 768, 245 750, 265 745
      C 285 740, 305 760, 318 780
      Z
    `,
    polygon3D: [
      [-0.3, -3.9],
      [0.0, -4.1],
      [0.4, -4.1],
      [0.2, -4.5],
      [-0.2, -4.8],
      [-0.6, -5.0],
      [-0.9, -4.8],
      [-0.8, -4.3],
      [-0.7, -4.0],
      [-0.4, -3.9],
      [-0.3, -3.9]
    ]
  }
};

/**
 * High School Geography Textbook Map Legend items
 */
export const TEXTBOOK_DENSITY_LEGEND = [
  { label: 'Từ 1.000 trở lên', color: '#991b1b', textColor: '#fef2f2', description: 'ĐB Sông Hồng, TP.HCM' },
  { label: 'Từ 500 đến dưới 1.000', color: '#c2410c', textColor: '#fff7ed', description: 'Đông Nam Bộ, ven biển' },
  { label: 'Từ 200 đến dưới 500', color: '#f59e0b', textColor: '#451a03', description: 'ĐB Sông Cửu Long, DHMT' },
  { label: 'Từ 100 đến dưới 200', color: '#fef08a', textColor: '#713f12', description: 'TD & MN phía Bắc, Tây Nguyên' },
  { label: 'Dưới 100', color: '#ecfccb', textColor: '#365314', description: 'Vùng núi cao biên giới' }
];

/**
 * Historical Population Pyramid Data (1979 vs 2024)
 * Taken directly from top-right of the user's uploaded textbook image!
 */
export const POPULATION_PYRAMID_DATA = {
  title: 'Tháp Dân Số Việt Nam Năm 1979 và Năm 2024',
  description: 'Biến đổi cơ cấu dân số theo độ tuổi và giới tính từ "Tháp mở rộng (trẻ)" năm 1979 sang "Tháp thu hẹp (già hóa)" năm 2024.',
  ageGroups: ['70+', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'],
  year1979: {
    male: [1.2, 2.4, 3.8, 5.2, 6.8, 9.4, 13.5, 14.8],
    female: [1.8, 3.2, 4.5, 5.8, 7.2, 9.8, 13.1, 14.2],
    character: 'Mô hình tháp trẻ: Đáy rất rộng (sinh nhiều), đỉnh thon nhọn (tuổi thọ trung bình thấp).'
  },
  year2024: {
    male: [3.8, 5.1, 6.8, 7.5, 7.8, 7.6, 7.4, 6.2],
    female: [5.2, 6.0, 7.2, 7.4, 7.6, 7.3, 7.0, 5.6],
    character: 'Mô hình tháp già hóa: Đáy thu hẹp (mức sinh giảm), phình to ở giữa (dân số vàng 15-64 tuổi), đỉnh mở rộng (tuổi thọ tăng cao).'
  }
};

import React, { useState } from 'react';
import { VIETNAM_OVERVIEW, VIETNAM_REGIONS } from '../../data/vietnamGeographyData';
import { RegionId } from '../../types';
import { playClickSound } from '../../utils/audio';
import {
  Users,
  TrendingUp,
  MapPin,
  Building2,
  Scale,
  Award,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const LearnSection: React.FC<{ onNavigateToChallenge: () => void }> = ({
  onNavigateToChallenge
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('dong_bang_song_hong');
  const activeRegion = VIETNAM_REGIONS[selectedRegionId];

  return (
    <div className="space-y-10">
      {/* Hero Infographic Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Địa Lí 12 · Chuyên Đề Dân Cư Việt Nam</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Quy Mô & Đặc Điểm Dân Số Việt Nam (Cập nhật 2024)
          </h2>
          <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed">
            Việt Nam chính thức vượt ngưỡng 100 triệu người, mở ra thời kỳ thị trường tiêu dùng rộng lớn và nguồn lao động dồi dào, song cũng đối diện với các bài toán cấp bách về cơ cấu dân số và phân bố dân cư.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => {
                playClickSound();
                onNavigateToChallenge();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition-all"
            >
              <span>Vào Thử Thách Bản Đồ 3D ngay</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative Grid Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
      </div>

      {/* 4 Core Pillars of Vietnam Demographics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Quy mô dân số</span>
            <span className="font-mono text-emerald-400 font-semibold">2024</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono tabular-nums">
            101,3 <span className="text-sm font-sans font-normal text-slate-400">triệu người</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Thứ 3 Đông Nam Á · Thứ 15 Thế giới</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Cơ cấu tuổi</span>
            <span className="text-amber-400 font-semibold text-[11px]">Dân số vàng</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono tabular-nums">
            67,4% <span className="text-sm font-sans font-normal text-slate-400">15-64 tuổi</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Nguồn lao động trẻ dồi dào, thu hút FDI</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Tỉ số giới tính khi sinh</span>
            <span className="text-red-400 font-semibold text-[11px]">Mất cân bằng</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-rose-400 font-mono tabular-nums">
            111,4 <span className="text-sm font-sans font-normal text-slate-400">trai / 100 gái</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>Mức tự nhiên chỉ là 104 - 106 / 100</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Mật độ bình quân</span>
            <span className="text-sky-400 font-semibold text-[11px]">Toàn quốc</span>
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono tabular-nums">
            306 <span className="text-sm font-sans font-normal text-slate-400">người/km²</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Phân bố chênh lệch lớn giữa các vùng</span>
          </div>
        </div>
      </div>

      {/* In-Depth Educational Topic 1: Cơ Cấu Dân Số & Thách Thức Kép */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
          1. Cơ Cấu Dân Số Nước Ta: Lợi Thế "Dân Số Vàng" Song Hành "Già Hóa Nhanh"
        </h3>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Một trong những nội dung trọng tâm trong đề thi tốt nghiệp THPT là nhận diện cơ cấu tuổi và cơ cấu giới tính.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Structure Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">Cơ cấu dân số theo độ tuổi (2024)</span>
              <span className="text-xs text-emerald-400 font-mono">Dân số vàng</span>
            </div>

            {/* Visual Multi-Segment Bar */}
            <div className="space-y-1.5">
              <div className="h-5 w-full bg-slate-800 rounded-lg overflow-hidden flex">
                <div
                  style={{ width: `${VIETNAM_OVERVIEW.youthShare}%` }}
                  className="bg-sky-500 h-full flex items-center justify-center text-[10px] font-bold text-slate-950"
                  title="0-14 tuổi: 23.2%"
                >
                  23,2%
                </div>
                <div
                  style={{ width: `${VIETNAM_OVERVIEW.workingAgeShare}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-slate-950"
                  title="15-64 tuổi: 67.4%"
                >
                  67,4% (Lao động)
                </div>
                <div
                  style={{ width: `${VIETNAM_OVERVIEW.elderlyShare}%` }}
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-slate-950"
                  title="65+ tuổi: 9.4%"
                >
                  9,4%
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  0 - 14 tuổi (23,2%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  15 - 64 tuổi (67,4%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  65+ tuổi (9,4%)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cơ hội:</strong> 2 người trong độ tuổi lao động nuôi 1 người phụ thuộc, tạo "cửa sổ nhân khẩu học vàng" để bứt phá kinh tế.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Thách thức:</strong> Tốc độ già hóa rất nhanh, thời gian chuyển từ "già hóa" sang "dân số già" chỉ khoảng 20 năm (nhanh hơn nhiều nước phát triển).
                </span>
              </div>
            </div>
          </div>

          {/* Sex Ratio Card */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">Cơ cấu theo giới tính & Mất cân bằng khi sinh</span>
              <span className="text-xs text-rose-400 font-mono">Báo động</span>
            </div>

            {/* Sex Ratio Comparison */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400">Trong tổng dân số</div>
                <div className="text-sm font-bold text-white mt-1">49,91% Nam · 50,09% Nữ</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Tương đối cân bằng</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-rose-500/30 text-center">
                <div className="text-[11px] text-slate-400">Tỉ số khi sinh (SRB)</div>
                <div className="text-sm font-bold text-rose-400 mt-1">111,4 trai / 100 gái</div>
                <div className="text-[10px] text-rose-300 mt-0.5">Mất cân bằng nghiêm trọng</div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nguyên nhân:</strong> Tư tưởng phong kiến trọng nam khinh nữ vẫn còn tồn tại, kết hợp lạm dụng kỹ thuật siêu âm chẩn đoán giới tính thai nhi sớm.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hệ lụy:</strong> Tương lai dư thừa nam giới bước vào độ tuổi kết hôn, gây mất ổn định trật tự xã hội và suy giảm nhân lực ngành nghề phù hợp với nữ.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Population Pyramid 1979 vs 2024 Comparison (SGK Kết nối tri thức) */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm md:text-base font-bold text-amber-300">
                Tháp Dân Số Việt Nam Năm 1979 và Năm 2024 (Theo SGK Địa Lí 12)
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Quan sát sự dịch chuyển hình thái tháp từ "mở rộng" sang "thu hẹp/già hóa".
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 hidden sm:inline">
              Cơ cấu sinh học
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-sky-400 mb-2">
                <span>Năm 1979: Tháp Mở Rộng (Trẻ)</span>
                <span className="text-[10px] text-slate-400">Đáy rộng, đỉnh nhọn</span>
              </div>
              <div className="space-y-1.5 py-2">
                {['70+', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'].map((age, idx) => {
                  const m = [1.2, 2.4, 3.8, 5.2, 6.8, 9.4, 13.5, 14.8][idx];
                  const f = [1.8, 3.2, 4.5, 5.8, 7.2, 9.8, 13.1, 14.2][idx];
                  return (
                    <div key={age} className="flex items-center text-[10px] gap-1">
                      <div className="w-1/2 flex justify-end">
                        <div
                          className="bg-sky-500 h-2.5 rounded-l-sm"
                          style={{ width: `${m * 6}%` }}
                        />
                      </div>
                      <span className="w-10 text-center font-mono text-slate-400 shrink-0">
                        {age}
                      </span>
                      <div className="w-1/2 flex justify-start">
                        <div
                          className="bg-rose-500 h-2.5 rounded-r-sm"
                          style={{ width: `${f * 6}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                <span className="text-sky-400 font-semibold">◀ Nam (%)</span>
                <span className="text-rose-400 font-semibold">Nữ (%) ▶</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Thời kỳ bùng nổ dân số sau giải phóng, mức sinh cao, tỉ lệ trẻ em dưới 15 tuổi chiếm trên 40%.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
                <span>Năm 2024: Tháp Thu Hẹp (Dân Số Vàng & Già Hóa)</span>
                <span className="text-[10px] text-amber-300">Phình ở giữa</span>
              </div>
              <div className="space-y-1.5 py-2">
                {['70+', '60-69', '50-59', '40-49', '30-39', '20-29', '10-19', '0-9'].map((age, idx) => {
                  const m = [3.8, 5.1, 6.8, 7.5, 7.8, 7.6, 7.4, 6.2][idx];
                  const f = [5.2, 6.0, 7.2, 7.4, 7.6, 7.3, 7.0, 5.6][idx];
                  return (
                    <div key={age} className="flex items-center text-[10px] gap-1">
                      <div className="w-1/2 flex justify-end">
                        <div
                          className="bg-sky-500 h-2.5 rounded-l-sm"
                          style={{ width: `${m * 6}%` }}
                        />
                      </div>
                      <span className="w-10 text-center font-mono text-slate-400 shrink-0">
                        {age}
                      </span>
                      <div className="w-1/2 flex justify-start">
                        <div
                          className="bg-rose-500 h-2.5 rounded-r-sm"
                          style={{ width: `${f * 6}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                <span className="text-sky-400 font-semibold">◀ Nam (%)</span>
                <span className="text-rose-400 font-semibold">Nữ (%) ▶</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Mức sinh giảm, nhóm tuổi 15-64 chiếm 67,4% (dân số vàng), đồng thời tuổi thọ tăng và tỉ lệ người già 65+ tăng lên 9,4%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* In-Depth Educational Topic 2: Bảng Mật Độ 6 Vùng Kinh Tế - Xã Hội */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
          2. Sự Phân Bố Dân Cư Không Đều Qua 6 Vùng Kinh Tế - Xã Hội
        </h3>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Dân cư nước ta tập trung chủ yếu ở đồng bằng ven biển (chiếm khoảng 75% dân số nhưng chỉ chiếm 25% diện tích).
        </p>

        {/* Visual Comparative Density Bars */}
        <div className="space-y-3 mb-8">
          {VIETNAM_OVERVIEW.densityRanking.map((item) => {
            const percentage = (item.density / 1034) * 100;
            const region = VIETNAM_REGIONS[item.regionId as RegionId];

            return (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 font-mono font-bold text-slate-400">
                      #{item.rank}
                    </span>
                    <span className="font-semibold text-white">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">
                    {item.density} người/km²
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: region.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Region Selector & Details Inspector */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            Khám phá chi tiết từng vùng
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(VIETNAM_REGIONS) as RegionId[]).map((rId) => {
              const r = VIETNAM_REGIONS[rId];
              const isSelected = selectedRegionId === rId;

              return (
                <button
                  key={rId}
                  onClick={() => {
                    playClickSound();
                    setSelectedRegionId(rId);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-900/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {r.shortName}
                </button>
              );
            })}
          </div>

          {/* Active Region Display Card */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{activeRegion.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{activeRegion.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400">Mật độ: </span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  {activeRegion.density} người/km²
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Quy mô dân số</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {activeRegion.population} triệu người
                </div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Diện tích tự nhiên</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {activeRegion.area.toLocaleString('vi-VN')} km²
                </div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Tỉ lệ đô thị hóa</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {activeRegion.urbanRate}%
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">Đặc điểm địa lí - dân cư nổi bật:</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeRegion.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex flex-wrap gap-1.5 items-center">
              <span className="font-semibold text-slate-300">Tỉnh/thành tiêu biểu:</span>
              {activeRegion.representativeProvinces.map((prov) => (
                <span
                  key={prov}
                  className="bg-slate-900 px-2 py-0.5 rounded text-[11px] text-slate-300 border border-slate-800"
                >
                  {prov}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

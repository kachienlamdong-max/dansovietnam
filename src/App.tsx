/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { MapChallenge } from './components/Map3D/MapChallenge';
import { QuizSection } from './components/Quiz/QuizSection';
import { LearnSection } from './components/Learn/LearnSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('challenge');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Bar adhering to 3-zone contract */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {activeTab === 'challenge' && <MapChallenge />}
        {activeTab === 'learn' && (
          <LearnSection onNavigateToChallenge={() => setActiveTab('challenge')} />
        )}
        {activeTab === 'quiz' && <QuizSection />}
      </main>

      {/* Clean Human Editorial Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/90 py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-semibold text-slate-300">
              Hành Trình Khám Phá Dân Số Việt Nam
            </span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Ứng dụng Địa lí 12 Dành cho Học sinh THPT</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Dữ liệu: Tổng cục Thống kê (GSO 2024)</span>
            <span aria-hidden="true">·</span>
            <span>Chương trình GDPT 2018</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { TOP_TEXT, BOTTOM_TEXT, CLUB_NAME } from '../constants';

interface PostcardProps {
  backgroundImage: string;
  pun: string;
}

const Postcard: React.FC<PostcardProps> = ({ backgroundImage, pun }) => {
  return (
    <div className="relative w-full max-w-[400px] mx-auto bg-white shadow-2xl overflow-hidden postcard-ratio border border-stone-200 print:shadow-none print:border-none">
      {/* Background Illustration */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Soft Overlays to enhance text readability while keeping illustration visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50" />

      {/* 上段: あけましておめでとうございます (Single Line) */}
      <div className="absolute top-10 left-0 right-0 text-center px-2">
        <h1 className="font-brush text-2xl md:text-3xl lg:text-4xl text-red-700 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] whitespace-nowrap overflow-hidden">
          {TOP_TEXT}
        </h1>
      </div>

      {/* 余白: うまを使った駄洒落 (Single Line) */}
      <div className="absolute top-[45%] left-6 -rotate-6 max-w-[70%]">
        <div className="bg-white/70 backdrop-blur-sm border-l-4 border-red-500 py-2 px-4 shadow-sm">
          <p className="font-brush text-lg md:text-xl text-stone-800 whitespace-nowrap">
            {pun}
          </p>
        </div>
      </div>

      {/* 下段エリア: スローガン + クラブ名 */}
      <div className="absolute bottom-12 left-0 right-0 text-center flex flex-col items-center gap-1">
        <p className="font-brush text-xl md:text-2xl text-stone-900 bg-white/40 px-4 py-1 rounded-full whitespace-nowrap">
          {BOTTOM_TEXT}
        </p>
        <p className="font-mincho text-sm md:text-base font-bold tracking-wider text-stone-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          {CLUB_NAME}
        </p>
      </div>
    </div>
  );
};

export default Postcard;
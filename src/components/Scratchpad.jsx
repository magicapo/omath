import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, Eraser, Trash2, X } from 'lucide-react';
import { sounds } from '../utils/audio';

export function Scratchpad({ isOpen, onClose, onDrawAction }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2563eb'); // blue default
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Resize canvas according to container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let tempCanvas = null;
    if (canvas.width > 0 && canvas.height > 0) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tempCanvas) {
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width / dpr, tempCanvas.height / dpr);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(resizeCanvas, 50);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen, resizeCanvas]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);

    if (!hasDrawn) {
      setHasDrawn(true);
      if (onDrawAction) onDrawAction();
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoords(e);

    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? lineWidth * 3.5 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-black/50 backdrop-blur-sm sm:p-4">
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">草稿計算板 (Scratchpad)</h3>
              <p className="text-[11px] text-slate-500">支援手繪線段圖、輔助線與計算演算過程</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={clearCanvas}
              title="清空草稿"
              className="px-2.5 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 bg-white sm:bg-transparent border border-slate-200 sm:border-0 transition-colors flex items-center gap-1 text-xs font-semibold active:scale-95 shadow-xs sm:shadow-none"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>清空</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-slate-50 px-3 sm:px-6 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Colors */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { c: '#2563eb', label: '藍色' },
              { c: '#dc2626', label: '紅色' },
              { c: '#16a34a', label: '綠色' },
              { c: '#d97706', label: '黃色' },
              { c: '#1e293b', label: '黑色' }
            ].map((col) => (
              <button
                key={col.c}
                onClick={() => {
                  setColor(col.c);
                  setIsEraser(false);
                }}
                style={{ backgroundColor: col.c }}
                className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full transition-transform active:scale-95 ${
                  color === col.c && !isEraser ? 'scale-115 ring-2 ring-slate-800 ring-offset-2' : 'opacity-85 hover:opacity-100'
                }`}
                title={col.label}
              />
            ))}
          </div>

          {/* Tools & Stroke Width */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                !isEraser ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> 鉛筆
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isEraser ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" /> 橡皮擦
            </button>

            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 ml-1">
              {[2, 4, 8].map((w) => (
                <button
                  key={w}
                  onClick={() => setLineWidth(w)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    lineWidth === w ? 'bg-slate-200 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {w === 2 ? '細' : w === 4 ? '中' : '粗'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div 
          ref={containerRef}
          className="relative flex-1 w-full bg-white cursor-crosshair touch-none select-none min-h-[220px]"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full block relative z-10"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <span className="text-[11px] text-slate-500 font-medium">支援手繪演算，隨時可返回題目。</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all text-xs"
          >
            完成並返回題目
          </button>
        </div>
      </div>
    </div>
  );
}
export default Scratchpad;

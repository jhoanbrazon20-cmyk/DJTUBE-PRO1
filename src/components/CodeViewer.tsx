import React, { useState } from 'react';
import { Copy, Check, FileCode, Sparkles, Terminal } from 'lucide-react';
import { KOTLIN_FILES } from '../data/kotlinCode';

export const CodeViewer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>(KOTLIN_FILES[0].id);
  const [copied, setCopied] = useState(false);

  const activeFile = KOTLIN_FILES.find((f) => f.id === selectedFileId) || KOTLIN_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#00E676] flex items-center justify-center text-black font-extrabold shadow-lg shadow-[#00E676]/20">
            <FileCode className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Código Jetpack Compose
            </h1>
            <p className="text-[11px] text-gray-400 font-medium">
              Archivos Kotlin generados para Android Studio (PASO 1)
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 bg-[#00E676] hover:bg-[#00C853] text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-[#00E676]/20"
        >
          {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? '¡Copiado!' : 'Copiar Kotlin'}</span>
        </button>
      </div>

      {/* File Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {KOTLIN_FILES.map((file) => (
          <button
            key={file.id}
            onClick={() => setSelectedFileId(file.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              selectedFileId === file.id
                ? 'bg-[#00381C] text-[#00E676] border-[#00E676] shadow-sm'
                : 'bg-[#1E1E1E] text-gray-400 border-[#2A2A2A] hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{file.filename}</span>
          </button>
        ))}
      </div>

      {/* Description Box */}
      <div className="bg-[#1E1E1E] p-3 rounded-xl border border-[#2A2A2A] text-xs text-gray-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#00E676] flex-shrink-0" />
        <span>{activeFile.description}</span>
      </div>

      {/* Code Display Area */}
      <div className="relative bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#181818] px-4 py-2 border-b border-[#2A2A2A] flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono font-bold text-[#00E676]">
            {activeFile.filename}
          </span>
          <span>Kotlin (Material Design 3)</span>
        </div>

        <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed max-h-[60vh] no-scrollbar">
          <code>{activeFile.code}</code>
        </pre>
      </div>
    </div>
  );
};

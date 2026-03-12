import React from 'react';
import { motion } from 'motion/react';
import { Skull, MapPin, Backpack, RotateCcw } from 'lucide-react';
import { Item } from '@/lib/types';

interface DeathScreenProps {
  playerName: string;
  playerRole: string;
  finalLocation: string;
  inventory: Item[];
  onRestart: () => void;
}

export const DeathScreen: React.FC<DeathScreenProps> = ({
  playerName,
  playerRole,
  finalLocation,
  inventory,
  onRestart,
}) => {
  return (
    <div className="min-h-screen bg-stone-950 text-parchment-200 flex items-center justify-center p-6 overflow-y-auto relative">
      {/* Blood atmosphere glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blood-900/25 rounded-full blur-[140px] blood-pulse" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-blood-900/20 rounded-full blur-[140px] blood-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blood-900/15 rounded-full blur-[120px]" />
      </div>

      {/* Corner decorations — blood-tinted */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-blood-700/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-blood-700/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-blood-700/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-blood-700/40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full dnd-panel p-0 relative overflow-hidden"
        data-testid="death-screen"
      >
        {/* Header */}
        <div className="dnd-panel-header p-8 text-center space-y-5">
          {/* Skull seal */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 border-2 border-blood-700/60 bg-stone-950/80 mb-2 relative"
          >
            <Skull className="w-9 h-9 text-blood-500" />
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-blood-700/60" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r border-t border-blood-700/60" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l border-b border-blood-700/60" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-blood-700/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-5xl font-cinzel-deco"
            style={{
              background: 'linear-gradient(90deg, #8b1a1a 0%, #c41e3a 40%, #dc4040 50%, #c41e3a 60%, #8b1a1a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            You Have Fallen
          </motion.h1>

          <div className="dnd-divider max-w-xs mx-auto"><span>⚔</span></div>

          <p className="text-blood-400 text-sm font-serif italic">
            {playerName} the {playerRole} breathes no more.
          </p>
        </div>

        {/* Details */}
        <div className="p-8 space-y-4">
          {/* Final location */}
          <div className="dnd-panel-inset p-5 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-blood-400" />
              <h3 className="text-[10px] font-cinzel text-blood-500 uppercase tracking-widest">Fell At</h3>
            </div>
            <div className="dnd-divider"><span>◆</span></div>
            <p className="text-sm text-parchment-300 leading-relaxed font-serif italic" data-testid="final-location">
              {finalLocation}
            </p>
          </div>

          {/* Inventory carried */}
          <div className="dnd-panel-inset p-5 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <Backpack className="w-4 h-4 text-stone-400" />
              <h3 className="text-[10px] font-cinzel text-gold-600 uppercase tracking-widest">Carried Into Darkness</h3>
            </div>
            <div className="dnd-divider"><span>◆</span></div>
            {inventory.length === 0 ? (
              <p className="text-sm text-stone-500 font-serif italic">Nothing but dust and regret.</p>
            ) : (
              <ul className="space-y-1.5">
                {inventory.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-serif text-parchment-400" data-testid="inventory-item">
                    <span className="text-gold-700 shrink-0">◈</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-8 pb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="dnd-btn-primary group inline-flex items-center gap-3 px-8 py-4 font-cinzel text-xs uppercase tracking-widest"
            data-testid="btn-rise-again"
          >
            <RotateCcw className="w-4 h-4" />
            Rise Again
          </button>
          <button
            onClick={onRestart}
            className="dnd-btn-secondary group inline-flex items-center gap-3 px-8 py-4 font-cinzel text-xs uppercase tracking-widest"
            data-testid="btn-accept-fate"
          >
            Accept Fate
          </button>
        </div>
      </motion.div>
    </div>
  );
};

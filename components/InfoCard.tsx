
import React from 'react';
import { CardType } from '../types';
import { BitcoinIcon, NewsIcon, TrendUpIcon, ClockIcon } from '../constants.tsx';
import LoadingSpinner from './LoadingSpinner';

interface InfoCardProps {
  title: string;
  type: CardType;
  isLoading: boolean;
  children: React.ReactNode;
  timestamp?: number; // For prediction card
}

const CardIcon: React.FC<{ type: CardType, className?: string}> = ({ type, className = "w-8 h-8" }) => {
  switch (type) {
    case CardType.CURRENT_PRICE:
      return <BitcoinIcon className={`${className} text-brand-accent`} />;
    case CardType.NEWS:
      return <NewsIcon className={`${className} text-brand-secondary`} />;
    case CardType.PREDICTION:
      return <TrendUpIcon className={`${className} text-green-500`} />;
    default:
      return null;
  }
};

const InfoCard: React.FC<InfoCardProps> = ({ title, type, isLoading, children, timestamp }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 min-h-[200px] flex flex-col relative overflow-hidden border border-neutral-lighter">
      <div className="flex items-center mb-4">
        <CardIcon type={type} />
        <h2 className="ml-3 text-xl font-semibold text-neutral-dark">{title}</h2>
      </div>
      
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex-grow text-neutral-medium">
          {children}
        </div>
      )}
      {timestamp && !isLoading && (
        <div className="text-xs text-neutral-medium mt-4 pt-2 border-t border-neutral-lighter flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5" />
            Prediction for: {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
      <div 
        className={`absolute top-0 left-0 h-1.5 w-full 
        ${type === CardType.CURRENT_PRICE ? 'bg-brand-accent' : ''}
        ${type === CardType.NEWS ? 'bg-brand-secondary' : ''}
        ${type === CardType.PREDICTION ? 'bg-green-500' : ''}`}
      />
    </div>
  );
};

export default InfoCard;

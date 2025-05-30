
import React from 'react';

export const BitcoinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M24.85,12.237a7.685,7.685,0,0,0-7.019-5.184V2h-3.438V7.053a7.728,7.728,0,0,0-7.019,5.184,8.333,8.333,0,0,0,.281,10.478l-2.2,2.147L7.226,26.6l2.2-2.147a7.64,7.64,0,0,0,5.012,2.045V31.5h3.438V26.5a7.636,7.636,0,0,0,5.012-2.045l2.2,2.147,1.75-1.737-2.2-2.147A8.341,8.341,0,0,0,24.85,12.237ZM19.562,22.1a4.2,4.2,0,0,1-2.734,1.121V18.032a2.083,2.083,0,0,0,1.094-1.805,2.1,2.1,0,0,0-2.188-2.061H14.375v-2.8h1.359a2.1,2.1,0,0,0,2.188-2.061,2.083,2.083,0,0,0-1.094-1.805V11.12a4.2,4.2,0,0,1,2.734,1.12,4.886,4.886,0,0,1,0,8.742Zm-5.187-3.906v3.75H12.25a2.093,2.093,0,0,0-1.093-1.812,2.1,2.1,0,0,0,1.093-1.805v-.133Z"/>
  </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const NewsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 015.625 5.25h3.375c.621 0 1.125.504 1.125 1.125V7.5z" />
  </svg>
);

export const TrendUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
);

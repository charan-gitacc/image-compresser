import { useEffect } from 'react';

interface AdSenseBannerProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  className?: string;
}

export default function AdSenseBanner({ 
  adSlot, 
  adFormat = "auto", 
  adLayout = "",
  className = "" 
}: AdSenseBannerProps) {
  useEffect(() => {
    try {
      // Push ads to AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
}
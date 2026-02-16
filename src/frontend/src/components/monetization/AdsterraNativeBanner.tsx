import { useEffect, useRef } from 'react';

interface AdsterraNativeBannerProps {
  className?: string;
}

export function AdsterraNativeBanner({ className = '' }: AdsterraNativeBannerProps) {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded to prevent duplicates
    const scriptId = 'adsterra-native-banner-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript && !scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl28724796.effectivegatecpm.com/f611970e20286f1dc66f1d89f295d869/invoke.js';
      
      document.body.appendChild(script);
      scriptLoadedRef.current = true;

      return () => {
        // Cleanup: remove script when component unmounts
        const scriptToRemove = document.getElementById(scriptId);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, []);

  return (
    <div className={className}>
      <div id="container-f611970e20286f1dc66f1d89f295d869"></div>
    </div>
  );
}

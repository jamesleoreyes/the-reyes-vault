import { useEffect, useState } from "react";

function usePWAMode() {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      const isPWAMode = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsPWA(isPWAMode);
    };

    checkPWA();
  }, []);

  return isPWA;
};

export { usePWAMode };
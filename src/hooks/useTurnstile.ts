import { useState } from 'react';

function useTurnstile() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    'loading' | 'success' | 'error' | 'expired' | 'required'
  >('loading');
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const showTurnstileSkeleton =
    turnstileStatus === 'loading' ||
    turnstileStatus === 'expired'

  const verify = (token: string) => {
    setTurnstileToken(token);
    setTurnstileStatus('success');
    setTurnstileError(null);
  };

  const error = () => {
    setTurnstileToken(null);
    setTurnstileStatus('error');
    setTurnstileError('Security check failed. Please try refreshing the page.');
  };

  const expire = () => {
    setTurnstileToken(null);
    setTurnstileStatus('expired');
    setTurnstileError('Security check expired. Please verify again.');
  };

  const load = () => {
    setTurnstileStatus('required');
    setTurnstileError(null);
  }

  return {
    turnstileToken,
    turnstileStatus,
    turnstileError,
    verify,
    error,
    expire,
    load,
    showTurnstileSkeleton
  };
};

export { useTurnstile };
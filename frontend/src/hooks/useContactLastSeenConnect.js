import { useEffect } from 'react';
import { useAuthStore } from '../store';

export const useContactLastSeenConnect = () => {
  const { disconnectContactLastSeen, connectContactLastSeen } = useAuthStore();
  useEffect(() => {
    connectContactLastSeen();
    return () => disconnectContactLastSeen();
  }, []);
};

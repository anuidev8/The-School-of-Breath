declare global {
    interface Window {
        MSStream?: unknown;
    }
}

import { useEffect, useState } from 'react';

export function useDeviceOS(): string {
    const [os, setOs] = useState<'iOS' | 'Android' | 'unknown'>('unknown');

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            setOs('iOS');
        } else if (/android/i.test(userAgent)) {
            setOs('Android');
        }
    }, []);

    return os;
}



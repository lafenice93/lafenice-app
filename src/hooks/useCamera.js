import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useCamera
 * Wraps getUserMedia for selfie capture.
 *
 * Returns:
 *   - videoRef:        ref to attach to a <video> element
 *   - status:          'idle' | 'requesting' | 'active' | 'denied' | 'error'
 *   - error:           Error message if any
 *   - start():         request permission and begin streaming
 *   - stop():          stop the stream
 *   - capture():       grab current frame as a JPEG dataURL (returns string)
 *
 * Note: HTTPS is required by browsers for camera access (Vercel preview & prod OK).
 */
export default function useCamera({ width = 720, height = 960 } = {}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const start = useCallback(async () => {
    setError(null);
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: width },
          height: { ideal: height },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus('active');
    } catch (e) {
      console.error('camera error', e);
      const denied = e?.name === 'NotAllowedError' || e?.name === 'PermissionDeniedError';
      setStatus(denied ? 'denied' : 'error');
      setError(e?.message || 'Camera unavailable');
    }
  }, [width, height]);

  const stop = useCallback(() => {
    const s = streamRef.current;
    if (s) {
      s.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStatus('idle');
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null;
    const w = video.videoWidth || width;
    const h = video.videoHeight || height;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    // un-mirror so the saved image matches reality
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', 0.9);
  }, [width, height]);

  useEffect(() => {
    return () => {
      // ensure we always clean up the stream
      const s = streamRef.current;
      if (s) s.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { videoRef, status, error, start, stop, capture };
}

import { useMutation } from '@tanstack/react-query';

export function useCreateBusinessProfile() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/b2b-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create profile');
      }

      return res.json();
    },
  });
}

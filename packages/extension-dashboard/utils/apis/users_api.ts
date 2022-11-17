import { fetchWrapped } from './../../../metapavo-website/common/fetch';
import { users } from './index.d';

export async function me(): Promise<users | null> {
  const res = await fetchWrapped('/api/users/me');
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function checkin(): Promise<users | null> {
  const res = await fetchWrapped('/api/users/checkin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getCheckinStatus(): Promise<{
  checked: boolean;
  unbreak_days: number;
} | null> {
  const res = await fetchWrapped('/api/users/checkin/status');
  if (res && res.success) {
    return res.data;
  }
  return null;
}

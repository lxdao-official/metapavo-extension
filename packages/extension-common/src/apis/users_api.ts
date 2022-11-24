import config from '../../config';
import { fetchWrapped } from './fetch';
import { invites, users } from './index.d';

export async function me(): Promise<users | null> {
  const res = await fetchWrapped(config.baseURL + '/users/me');
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function meStatus(): Promise<{
  inviteCount: number;
  checkinStatus: {
    checked: boolean;
    unbreak_days: number;
  };
  score: number;
} | null> {
  const res = await fetchWrapped(config.baseURL + '/users/me/status');
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function checkin(): Promise<users | null> {
  const res = await fetchWrapped(config.baseURL + '/users/checkin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res && res.success) {
    return res.data;
  } else {
    throw new Error(res.message);
  }
  return null;
}

export async function getCheckinStatus(): Promise<{
  checked: boolean;
  unbreak_days: number;
} | null> {
  const res = await fetchWrapped(config.baseURL + '/users/checkin/status');
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getAwailableInvites(): Promise<invites[]> {
  const res = await fetchWrapped(
    config.baseURL + '/users/invite/getawailable',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return [];
}

export async function generateTodayInvites() {
  const res = await fetchWrapped(
    config.baseURL + '/users/invite/createtodays',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return new Error(res.message);
}

import EventEmitter from 'eventemitter3';
import React, { useState } from 'react';

import { invites } from '../utils/apis';
import { getAwailableInvites, meStatus } from '../utils/apis/users_api';

export const CheckinContext = React.createContext<{
  info: {
    inviteCount: number;
    checkinStatus: {
      checked: boolean;
      unbreak_days: number;
    };
    score: number;
  };
  setInfo: (info: any) => void;
  loadScoreInfo: () => Promise<void>;
  awailableInvites: invites[];
  loadAwailableInvites: () => Promise<void>;
}>({} as any);

export function useCheckin() {
  const [info, setInfo] = useState<{
    inviteCount: number;
    checkinStatus: {
      checked: boolean;
      unbreak_days: number;
    };
    score: number;
  }>({
    inviteCount: 0,
    checkinStatus: {
      checked: false,
      unbreak_days: 0,
    },
    score: 0,
  });
  async function loadScoreInfo() {
    const info = await meStatus();
    if (info) {
      setInfo(info);
    }
  }
  const [awailableInvites, setAwailableInvites] = useState<invites[]>([]);
  async function loadAwailableInvites() {
    const invites = await getAwailableInvites();
    if (invites && invites.length) {
      setAwailableInvites(invites);
    }
  }
  return {
    info,
    setInfo,
    loadScoreInfo,
    awailableInvites,
    loadAwailableInvites,
  };
}

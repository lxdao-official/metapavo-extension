import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { CheckinContext } from '../../context/useCheckin';
import { ModuleContext } from '../../context/useModule';
import { checkin } from '../../utils/apis/users_api';

export default function CheckIn() {
  const { info, setInfo, loadScoreInfo } = useContext(CheckinContext);
  const [checking, setchecking] = useState(false);
  async function submitCheckin(e: any) {
    e.preventDefault();
    setchecking(true);
    const loading = toast.loading('Checking in...');

    try {
      const res = await checkin();
      toast.success('Checkin success');
      loadScoreInfo();
    } catch (e) {
      toast.error('Checkin failed');
    }
    toast.dismiss(loading);

    setchecking(false);
  }
  return (
    <div>
      {!info.checkinStatus.checked ? (
        <a onClick={submitCheckin}>Check in</a>
      ) : (
        <span
          style={{
            color: '#999',
          }}
        >
          Checked
        </span>
      )}
    </div>
  );
}

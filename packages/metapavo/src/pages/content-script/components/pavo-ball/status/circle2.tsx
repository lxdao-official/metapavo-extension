import { Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import {
  addFavByProjectId,
  isFaved,
  removeFavByProjectId,
} from '../../../../../utils/apis/nft_api';
import { AutoDecimal } from '../../../../../utils/decimals';
import { getLang } from '../../../../../utils/lang';
import { linkImages } from '../../../../../utils/linkImages';
import { addItem, getLogo } from '../../../../../utils/read-later';
import { GlobalContext } from '../../../context/useGlobal';
import { CircleRootElement } from '../styles';

export default function CirclePopup2({ state }: { state: 'show' | 'hide' }) {
  async function addReadLater() {
    try {
      const logo = await getLogo(window.location.host);
      await addItem(window.location.href, document.title, logo);
      toast.success('add to read later success!');
    } catch (e) {
      toast.error('add to read later failed!');
    }
  }
  return (
    <CircleRootElement
      className={[state === 'show' ? 'mp-circle-show' : 'mp-circle-hide'].join(
        ' ',
      )}
      style={{
        left: '40px',
        bottom: '-40px',
        transformOrigin: '0% 0%',
      }}
      onClick={(e) => {
        addReadLater();
      }}
    >
      <div className="mp-circle-btn">+</div>
    </CircleRootElement>
  );
}

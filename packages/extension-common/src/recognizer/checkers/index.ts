import EventEmitter from 'eventemitter3';

import { IProject, IProjectV2 } from '../../apis/types';
import { ScamResult } from '../../detector/src';
import { contractDomains, tradeDomains } from './data';
import { checkEtherscan } from './etherscan';
import { checkMarketPlace } from './marketplace';
import { checkTwitter } from './twitter';
import { checkTwitterScam } from './twitterScam';
import { CheckResultStatus } from './types';
import { checkWebsite } from './website';

export class Checker extends EventEmitter {
  lastCheckEntryResult?: {
    projectInfo?: IProjectV2;
    status: CheckResultStatus;
  };
  lastCheckTokenId?: string = '';
  lastTwitterScamInfo?: ScamResult;
  async check() {
    setInterval(async () => {
      let checkEntryResult: {
        projectInfo?: IProjectV2;
        status: CheckResultStatus;
        tokenId?: string;
      };
      if (window.location.host.indexOf('twitter.com') !== -1) {
        checkEntryResult = await checkTwitter();
      } else if (tradeDomains.indexOf(window.location.host) !== -1) {
        checkEntryResult = await checkMarketPlace();
      } else if (contractDomains.indexOf(window.location.host) !== -1) {
        checkEntryResult = await checkEtherscan();
      } else {
        checkEntryResult = await checkWebsite();
      }
      // console.log("checkEntryResult", checkEntryResult);
      if (checkEntryResult?.projectInfo) {
        if (this.lastCheckEntryResult?.projectInfo) {
          if (
            this.lastCheckEntryResult?.projectInfo?.id !==
            checkEntryResult.projectInfo.id
          ) {
            this.emit('changed', checkEntryResult.projectInfo);
            this.lastCheckEntryResult = checkEntryResult;
          }
        } else {
          this.emit('changed', checkEntryResult.projectInfo);
          this.lastCheckEntryResult = checkEntryResult;
        }
      } else if (checkEntryResult.status !== CheckResultStatus.NOCHANGE) {
        if (
          this.lastCheckEntryResult &&
          this.lastCheckEntryResult.projectInfo
        ) {
          this.emit('changed', null);
          this.lastCheckEntryResult = checkEntryResult;
        } else if (this.lastTwitterScamInfo) {
          this.emit('changed', null);
        }
        const twitterScamInfo = await checkTwitterScam();
        if (twitterScamInfo) {
          console.log('twitterScamInfo', twitterScamInfo);
          this.lastTwitterScamInfo = twitterScamInfo;
          this.emit('danger', twitterScamInfo);
        }
      } else {
      }

      if (checkEntryResult.tokenId) {
        // if (this.lastCheckTokenId !== checkEntryResult.tokenId) {
        this.emit('tokenIdChanged', checkEntryResult.tokenId);
        // this.lastCheckTokenId = checkEntryResult.tokenId;
        // }
      } else {
        this.emit('tokenIdChanged', null);
      }
    }, 2000);
  }
}

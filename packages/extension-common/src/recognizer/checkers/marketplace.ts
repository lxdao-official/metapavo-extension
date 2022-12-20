import { findNftByAddress, getNftById } from '../../apis/nft_api';
import { findNftByAddressV2, getNftByIdV2 } from '../../apis/nft_api_v2';
import { IProject, IProjectV2 } from '../../apis/types';
import { recognizerBlur } from '../blur';
import { recognizerGEM } from '../gem';
import { recognizerLooksrare } from '../looksrare';
import { recognizerOpenSea } from '../opensea';
import { recognizerSudoswap } from '../sudoswap';
import { recognizerX2Y2 } from '../x2y2';
import { CheckResultStatus } from './types';

let lastCheckId: string | undefined = undefined;
export async function checkMarketPlace(): Promise<{
  projectInfo?: IProjectV2;
  status: CheckResultStatus;
  tokenId?: string;
}> {
  const result = await recognizerOpenSea();
  let nowCheckedResult: {
    contract?: string;
    id?: string;
    tokenId?: string;
  } | null = null;
  if (result && (result.contract || result.id)) {
    nowCheckedResult = result;
  } else {
    const resultX2Y2 = await recognizerX2Y2();
    if (resultX2Y2 && (resultX2Y2.contract || resultX2Y2.id)) {
      nowCheckedResult = resultX2Y2;
    } else {
      const resultGEM = await recognizerGEM();
      if (resultGEM && (resultGEM.contract || resultGEM.id)) {
        nowCheckedResult = resultGEM;
      } else {
        const resultSudoswap = await recognizerSudoswap();
        if (resultSudoswap && resultSudoswap.contract) {
          nowCheckedResult = resultSudoswap;
        } else {
          const resultLooksrare = await recognizerLooksrare();
          if (resultLooksrare && resultLooksrare.contract) {
            nowCheckedResult = resultLooksrare;
          } else {
            const resultBlur = await recognizerBlur();
            if (resultBlur && resultBlur.id) {
              nowCheckedResult = resultBlur;
            }
          }
        }
      }
    }
  }
  if (nowCheckedResult) {
    const nowCheckedId = nowCheckedResult.contract || nowCheckedResult.id;
    if (lastCheckId !== nowCheckedId) {
      lastCheckId = nowCheckedResult.contract || nowCheckedResult.id;
      const projectInfo = nowCheckedResult.id
        ? await getNftByIdV2(nowCheckedResult.id)
        : await findNftByAddressV2(nowCheckedResult.contract!);
      if (projectInfo && projectInfo.id) {
        return {
          projectInfo,
          tokenId: nowCheckedResult.tokenId,
          status: CheckResultStatus.SUCCESS,
        };
      } else {
        return {
          tokenId: nowCheckedResult.tokenId,
          status: CheckResultStatus.NOTINSERVER,
        };
      }
    } else {
      return {
        tokenId: nowCheckedResult.tokenId,
        status: CheckResultStatus.NOCHANGE,
      };
    }
  } else {
    return {
      status: CheckResultStatus.NOENTRY,
    };
  }
}

import { findNftByAddress, getNftById } from "../../apis/nft_api";
import { IProject } from "../../apis/types";
import { recognizerGEM } from "../gem";
import { recognizerOpenSea } from "../opensea";
import { recognizerSudoswap } from "../sudoswap";
import { recognizerX2Y2 } from "../x2y2";
import { CheckResultStatus } from "./types";
let lastCheckId: string | undefined = undefined;
export async function checkMarketPlace(): Promise<{
  projectInfo?: IProject;
  status: CheckResultStatus;
}> {
  const result = await recognizerOpenSea();
  let nowCheckedResult: {
    contract?: string;
    id?: string;
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
        }
      }
    }
  }
  if (nowCheckedResult) {
    const nowCheckedId = nowCheckedResult.contract || nowCheckedResult.id;
    if (lastCheckId !== nowCheckedId) {
      lastCheckId = nowCheckedResult.contract || nowCheckedResult.id;
      const projectInfo = nowCheckedResult.id
        ? await getNftById(nowCheckedResult.id)
        : await findNftByAddress(nowCheckedResult.contract!);
      if (projectInfo) {
        return {
          projectInfo,
          status: CheckResultStatus.SUCCESS,
        };
      } else {
        return {
          status: CheckResultStatus.NOTINSERVER,
        };
      }
    } else {
      return {
        status: CheckResultStatus.NOCHANGE,
      };
    }
  } else {
    return {
      status: CheckResultStatus.NOENTRY,
    };
  }
}

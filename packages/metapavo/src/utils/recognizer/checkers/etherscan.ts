import { findNftByAddress, findNftByURL } from "../../apis/nft_api";
import { findNftByAddressV2 } from "../../apis/nft_api_v2";
import { IProject, IProjectV2 } from "../../apis/types";
import { recognizerEtherscan } from "../etherscan";
import { recognizerWebsite } from "../website";
import { CheckResultStatus } from "./types";
let lastCheckId: string | undefined = undefined;
export async function checkEtherscan(): Promise<{
  projectInfo?: IProjectV2;
  status: CheckResultStatus;
}> {
  const result = await recognizerEtherscan();
  if (result && result.contract) {
    if (lastCheckId === result.contract) {
      return {
        status: CheckResultStatus.NOCHANGE,
      };
    }
    lastCheckId = result.contract;
    const projectInfo = await findNftByAddressV2(result.contract);
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
      status: CheckResultStatus.NOENTRY,
    };
  }
}

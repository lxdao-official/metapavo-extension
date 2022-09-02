import { findNftByAddress, findNftByURL } from "../../apis/nft_api";
import { IProject } from "../../apis/types";
import { recognizerEtherscan } from "../etherscan";
import { recognizerWebsite } from "../website";
import { CheckResultStatus } from "./types";
let lastCheckId: string | undefined = undefined;
export async function checkEtherscan(): Promise<{
  projectInfo?: IProject;
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
    const projectInfo = await findNftByAddress(result.contract);
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

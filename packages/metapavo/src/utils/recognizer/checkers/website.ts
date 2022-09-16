import { findNftByURL } from "../../apis/nft_api";
import { findNftByURLV2 } from "../../apis/nft_api_v2";
import { IProject, IProjectV2 } from "../../apis/types";
import { recognizerWebsite } from "../website";
import { CheckResultStatus } from "./types";

export async function checkWebsite(): Promise<{
  projectInfo?: IProjectV2;
  status: CheckResultStatus;
}> {
  const matchedURL = await recognizerWebsite();
  if (matchedURL && matchedURL[1]) {
    const projectInfo = await findNftByURLV2(matchedURL);
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

import { findNftByURL } from "../../apis/nft_api";
import { IProject } from "../../apis/types";
import { recognizerWebsite } from "../website";
import { CheckResultStatus } from "./types";

export async function checkWebsite(): Promise<{
  projectInfo?: IProject;
  status: CheckResultStatus;
}> {
  const matchedURL = await recognizerWebsite();
  if (matchedURL && matchedURL[1]) {
    const projectInfo = await findNftByURL(matchedURL);
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

import { IProject, IProjectV2 } from "../../apis/types";
import { checkTwitterUser, detectProjectByTwitterId } from "../twitter";
import { CheckResultStatus } from "./types";
let lastCheckTwitterId: string | null = null;
export async function checkTwitter(): Promise<{
  projectInfo?: IProjectV2;
  status: CheckResultStatus;
}> {
  const twitterPageDetail = await checkTwitterUser();
  if (twitterPageDetail && twitterPageDetail.userId) {
    if (lastCheckTwitterId !== twitterPageDetail.userId) {
      lastCheckTwitterId = twitterPageDetail.userId;
      const projectInfo = await detectProjectByTwitterId(twitterPageDetail?.userId);
      if (projectInfo && projectInfo.id) {
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

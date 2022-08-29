import { IProject } from "../../apis/types";
import { CheckResultStatus } from "./types";
import { checkMarketPlace } from "../../../utils/recognizer/checkers/marketplace";
import { checkTwitter } from "../../../utils/recognizer/checkers/twitter";
import { checkWebsite } from "../../../utils/recognizer/checkers/website";
import EventEmitter from "eventemitter3";

export class Checker extends EventEmitter {
  lastCheckEntryResult?: {
    projectInfo?: IProject;
    status: CheckResultStatus;
  };
  async check() {
    setInterval(async () => {
      let checkEntryResult: {
        projectInfo?: IProject;
        status: CheckResultStatus;
      };
      if (window.location.host.indexOf("twitter.com") !== -1) {
        checkEntryResult = await checkTwitter();
      } else if (
        [
          "opensea.io",
          "www.opensea.io",
          "x2y2.io",
          "www.x2y2.io",
          "gem.xyz",
          "www.gem.xyz",
        ].indexOf(window.location.host) !== -1
      ) {
        checkEntryResult = await checkMarketPlace();
      } else {
        checkEntryResult = await checkWebsite();
      }
      console.log(checkEntryResult);
      if (checkEntryResult?.projectInfo) {
        if (this.lastCheckEntryResult?.projectInfo) {
          if (this.lastCheckEntryResult?.projectInfo?.id !== checkEntryResult.projectInfo.id) {
            this.emit("changed", checkEntryResult.projectInfo);
            this.lastCheckEntryResult = checkEntryResult;
          }
        } else {
          this.emit("changed", checkEntryResult.projectInfo);
          this.lastCheckEntryResult = checkEntryResult;
        }
      } else if (checkEntryResult.status !== CheckResultStatus.NOCHANGE) {
        if (this.lastCheckEntryResult && this.lastCheckEntryResult.projectInfo) {
          this.emit("changed", null);
          this.lastCheckEntryResult = checkEntryResult;
        }
      } else {
      }
    }, 2000);
  }
}

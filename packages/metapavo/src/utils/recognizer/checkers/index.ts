import { IProject, IProjectV2 } from "../../apis/types";
import { CheckResultStatus } from "./types";
import { checkMarketPlace } from "../../../utils/recognizer/checkers/marketplace";
import { checkTwitter } from "../../../utils/recognizer/checkers/twitter";
import { checkWebsite } from "../../../utils/recognizer/checkers/website";
import EventEmitter from "eventemitter3";
import { checkEtherscan } from "./etherscan";

export class Checker extends EventEmitter {
  lastCheckEntryResult?: {
    projectInfo?: IProjectV2;
    status: CheckResultStatus;
  };
  lastCheckTokenId?: string = "";
  async check() {
    setInterval(async () => {
      let checkEntryResult: {
        projectInfo?: IProjectV2;
        status: CheckResultStatus;
        tokenId?: string;
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
          "sudoswap.xyz",
          "www.sudoswap.xyz",
          "looksrare.org",
          "www.looksrare.org",
        ].indexOf(window.location.host) !== -1
      ) {
        checkEntryResult = await checkMarketPlace();
      } else if (["etherscan.io"].indexOf(window.location.host) !== -1) {
        checkEntryResult = await checkEtherscan();
      } else {
        checkEntryResult = await checkWebsite();
      }
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
      }

      if (checkEntryResult.tokenId) {
        // if (this.lastCheckTokenId !== checkEntryResult.tokenId) {
        this.emit("tokenIdChanged", checkEntryResult.tokenId);
        // this.lastCheckTokenId = checkEntryResult.tokenId;
        // }
      } else {
        this.emit("tokenIdChanged", null);
      }
    }, 2000);
  }
}

import { contractDomains, socialDomains, tradeDomains } from "./data";

const PhishingDetector = require("eth-phishing-detect/src/detector");

const detector = new PhishingDetector();

export async function checkWebsiteScam() {
  if (
    tradeDomains.concat(contractDomains).concat(socialDomains).indexOf(window.location.host) !== -1
  )
    return undefined;

  const value: {
    type: "blacklist" | "fuzzylist";
    result: boolean;
  } = detector.check(window.location.host);
  if (value && value.result && (value.type === "blacklist" || value.type === "fuzzylist")) {
    return value.type;
  }
  return undefined;
}

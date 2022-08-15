import { Detector, PageDetail, PostDetail, Project, ScamResult } from "../detector/src";

let detector: Detector | null = null;

function initDetector() {
  if (detector === null) {
    detector = new Detector({
      onlyBuiltIn: false,
    });
    detector.update();
  }
}

initDetector();
export function getTwitterMeta() {
  if (!window.location.host.includes("twitter.com")) return null;

  const title = document.title;

  const titleMatched = title.match(/^(\([0-9]+\) |)(.*?) \(\@(.*?)\) \/ Twitter/);
  if (titleMatched) {
    const [, messagecount, name, username] = titleMatched;
    const meta = {
      title: document.title,
      name,
      username,
    };
    return meta;
  } else {
    return null;
  }
}
const getPageDescription = () => {
  const description = document.querySelector("meta[name=description]");
  if (description) {
    return description.getAttribute("description");
  }
  return "";
};
export function getPageMeta() {
  if (!window.location.host.includes("twitter.com")) throw new Error("no twitter page");
  const metaHeads = Array.from(document.querySelectorAll("meta")).reduce((all: any, item: any) => {
    const metaName = item.name || item.getAttribute("property");
    if (metaName) all[metaName] = item.content;
    return all;
  }, {});

  const canonicalEl = document.querySelectorAll("link[rel=canonical]")[0];
  const canonicalLink = canonicalEl ? (canonicalEl as any).href : null;
  const topSourceDomains = Array.from(document.querySelectorAll("img"))
    .map((img: any) => {
      const a = document.createElement("a");
      a.href = img.src;
      return a.hostname;
    })
    .filter((_) => _)
    .reduce((all: any, domain: string) => {
      all[domain] = all[domain] || 0;
      all[domain]++;
      return all;
    }, {});

  return {
    title: document.title,
    metaHeads,
    canonicalLink,
    topSourceDomains: Object.keys(topSourceDomains)
      .map((domain) => {
        return {
          domain,
          count: topSourceDomains[domain],
        };
      })
      .sort((b, a) => a.count - b.count),
  };
}

const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export interface checkTwitterResult {
  postDetail?: PostDetail;
  detectResult?: ScamResult;
}
export const checkTwitterUser: () => Promise<PostDetail | null> = async () => {
  if (detector?.fetching) {
    await delay(1000);
    return await checkTwitterUser();
  }
  try {
    const pageDetails: PageDetail = getPageMeta();
    // 确定是 twitter 主页
    if (pageDetails.metaHeads["og:type"] === "profile") {
      const postDetail: PostDetail = {
        links: [window.location.href],
        userId: "",
        nickname: "",
        content: "",
        pageDetails,
      };

      const description = getPageDescription();
      if (description) {
        const result = description.match(
          /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g,
        );
        if (result) {
          postDetail.links = postDetail.links.concat(result);
        }
        postDetail.content = description;
      }

      const twitterMeta = getTwitterMeta();
      if (twitterMeta) {
        postDetail.userId = twitterMeta.username;
        postDetail.nickname = twitterMeta.name;
      }

      return postDetail;
    }
  } catch (e) {}
  return null;
};

export const checkTwitterScam: (
  postDetail: PostDetail,
) => Promise<checkTwitterResult | null> = async (postDetail: PostDetail) => {
  const detectResult = await detector?.detectScam(postDetail, {
    checkBySim: true,
    checkUserId: true,
    checkContent: true,
    checkPage: true,
    checkName: true,
  });
  console.log("detect result", detectResult);
  return {
    postDetail,
    detectResult,
  } as checkTwitterResult;
};

export const detectProjectByTwitterId: (twitterId: string) => Promise<Project | null> = async (
  twitterId: string,
) => {
  if (detector?.fetching) {
    await delay(1000);
    return await detectProjectByTwitterId(twitterId);
  }

  return (await detector?.detectProjectByTwitterId(twitterId)) || null;
};

export const detectProjectByTwitterIdFromServer: (
  twitterId: string,
) => Promise<Project | null> = async (twitterId: string) => {
  await fetch("");
  return (await detector?.detectProjectByTwitterId(twitterId)) || null;
};

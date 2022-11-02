const labelsContent = chrome.runtime.getURL('data/labels.json');

export async function addressTag() {
  const labels = await fetch(labelsContent).then((response) => response.json());

  // 遍历所有 dom 节点，判断内容是否包含以太坊地址，只判断叶子节点
  const leafDoms = document.querySelectorAll('*:not(:has(*))');

  const leafMatchedElements = [];
  for (let i = 0; i < leafDoms.length; i++) {
    const dom = leafDoms[i];
    if (dom.classList.contains('metapavo-label-processed')) {
      continue;
    }
    const text = dom.textContent;
    if (text && text.length >= 42) {
      if (text.match(/0x[a-fA-F0-9]{40}/)) {
        leafMatchedElements.push(dom);
        const name = labels[text]?.name;
        if (name) {
          const label = document.createElement('span');
          label.classList.add('metapavo-label');
          label.textContent = name;
          label.title = name;
          dom.appendChild(label);
        }
        dom.classList.add('metapavo-eth-address');
        dom.classList.add('metapavo-label-processed');
      }
    }
  }
}
setInterval(addressTag, 2000);

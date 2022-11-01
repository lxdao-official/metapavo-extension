export function addressTag() {
  // 遍历所有 dom 节点，判断内容是否包含以太坊地址
  //   const doms = document.querySelectorAll('*');
  //   const matchedElements = [];
  //   for (let i = 0; i < doms.length; i++) {
  //     const dom = doms[i];
  //     const text = dom.textContent;
  //     if (text && text.length >= 42) {
  //       if (text.match(/0x[a-fA-F0-9]{40}/)) {
  //         matchedElements.push(dom);
  //         dom.classList.add('metapavo-eth-address');
  //       }
  //     }
  //   }

  // 遍历所有 dom 节点，判断内容是否包含以太坊地址，只判断叶子节点
  const leafDoms = document.querySelectorAll('*:not(:has(*))');
  const leafMatchedElements = [];
  for (let i = 0; i < leafDoms.length; i++) {
    const dom = leafDoms[i];
    const text = dom.textContent;
    if (text && text.length >= 42) {
      if (text.match(/0x[a-fA-F0-9]{40}/)) {
        leafMatchedElements.push(dom);
        dom.classList.add('metapavo-eth-address');
      }
    }
  }
}
addressTag();

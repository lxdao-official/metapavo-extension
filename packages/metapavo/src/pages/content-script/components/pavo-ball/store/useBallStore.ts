import { dapps } from 'extension-common/src/apis';
import { recognizerDapp } from 'extension-common/src/recognizer/dapp';
import React, { useContext, useRef, useState } from 'react';

import { GlobalContext } from '../../../context/useGlobal';

export default function useBallStore() {
  const [hide, setHide] = React.useState(true);
  const [barHide, setBarHide] = React.useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const gasRef = useRef<HTMLDivElement>(null);

  const useG = useContext(GlobalContext);
  const [gas, setGas] = useState('');
  const [price, setPrice] = useState('');
  const [gasType, setGasType] = useState('GAS');
  const { showSearch, setShowSearch } = useContext(GlobalContext);
  const [activeDapp, setActiveDapp] = useState<
    ({ installed: boolean } & dapps) | null
  >(null);
  function noDisplay7() {
    setHide(true);
    setMenuOpen(false);
    localStorage.setItem(
      'metapavo-hide-until',
      String(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    );
  }

  function checkHide() {
    const hideUntil = localStorage.getItem('metapavo-hide-until');
    if (hideUntil && Number(hideUntil) > new Date().getTime()) {
      setHide(true);
    } else {
      setHide(false);
    }
  }
  async function checkDapp() {
    const res = await recognizerDapp();
    if (res) {
      setActiveDapp(res);
      useG.setAddRootClass('metapavo-main-box-dapp');
    } else {
      setActiveDapp(null);
    }
  }

  function dragElement() {
    if (!gasRef.current) return;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let mousedownTimestamp: number = 0;
    gasRef.current.onmousedown = dragMouseDown;
    gasRef.current.onmouseup = (e) => {
      e.stopPropagation();
      if (e.button !== 0) return;
      if (new Date().getTime() - mousedownTimestamp < 300) {
        if (!useG.addRootClass) {
          // 点击事件

          window.open(chrome.runtime.getURL('dashboard/index.html'));
        }
      }
      closeDragElement();
      rootRef.current?.classList.remove('notransition');
    };

    function dragMouseDown(e: MouseEvent) {
      e.stopPropagation();
      if (e.button !== 0) return;
      e = e || window.event;
      // e.preventDefault();
      mousedownTimestamp = Date.now();
      rootRef.current?.classList.add('notransition');
      // get the mouse cursor position at startup:
      pos3 = window.innerWidth - e.clientX;
      pos4 = window.innerHeight - e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      const nowPosX = window.innerWidth - e.clientX;
      const nowPosY = window.innerHeight - e.clientY;
      // calculate the new cursor position:
      pos1 = pos3 - nowPosX;
      pos2 = pos4 - nowPosY;
      pos3 = nowPosX;
      pos4 = nowPosY;
      if (rootRef.current) {
        // set the element's new position:
        rootRef.current.style.right =
          Number(rootRef.current.style.right.replace(/[^\d]/g, '')) -
          pos1 +
          'px';
        rootRef.current.style.bottom =
          Number(rootRef.current.style.bottom.replace(/[^\d]/g, '')) -
          pos2 +
          'px';
        localStorage.setItem(
          'metapavo-pos',
          [rootRef.current.style.right, rootRef.current.style.bottom].join('-'),
        );
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }
  }

  function setPriceWithFormat(_v: number) {
    const v = Number(_v) || 0;
    if (v > 10000) {
      setPrice(v.toFixed(0));
    } else if (v > 1000) {
      setPrice(v.toFixed(1));
    } else if (v < 0) {
      setPrice(v.toFixed(4));
    } else {
      setPrice(v.toFixed(2));
    }
  }
  function init() {
    useG.checkPlatform();
    checkDapp();
    if (rootRef.current) {
      rootRef.current.style.right = '150px';
      rootRef.current.style.bottom = '200px';
      if (localStorage.getItem('metapavo-pos')) {
        const pos = (localStorage.getItem('metapavo-pos') || '').split('-');
        if (pos.length === 2) {
          rootRef.current.style.right = pos[0];
          rootRef.current.style.bottom = pos[1];
        }
      }
      rootRef.current && dragElement();
    }

    chrome?.runtime?.onMessage.addListener(function (
      request,
      sender,
      sendResponse,
    ) {
      if (request.cmd === 'pavoInfoUpdate') {
        if (request.type !== 'GAS') {
          setPriceWithFormat(request.value);
        } else {
          setGas(request.value);
        }
        chrome.storage.local.get(['display_info'], async function (data) {
          setGasType(data.display_info);
        });
      }
      if (request.cmd === 'gasUpdate') {
        setGas(request.value);
      }
      sendResponse('ok');
    });
    chrome.storage.local.get(['display_info'], async function (data) {
      let command = 'getGas';
      if (data.display_info === 'GAS') {
        command = 'getGas';
      } else {
        command = 'getPrice';
      }
      chrome.runtime.sendMessage(
        {
          cmd: command,
        },
        function (request) {
          if (!chrome.runtime.lastError) {
            if (request.type !== 'GAS') {
              setPriceWithFormat(request.value);
            } else {
              setGas(request.value);
            }
            chrome.storage.local.get(['display_info'], async function (data) {
              setGasType(data.display_info);
            });
          } else {
          }
        },
      );
    });

    document.body.addEventListener('click', () => {
      setMenuOpen(false);
    });
    document.body.addEventListener('keydown', (e) => {
      if (
        (e.code === 'KeyF' && e.metaKey && e.shiftKey) ||
        (e.code === 'KeyF' && e.ctrlKey && e.shiftKey)
      ) {
        setShowSearch(true);
        e.preventDefault();
      }
    });
  }
  function refreshData() {
    chrome?.runtime?.sendMessage(
      { cmd: 'refresh_gas' },
      function (response) {},
    );
  }
  return {
    hide,
    setHide,
    menuOpen,
    setMenuOpen,
    rootRef,
    gasRef,
    useG,
    gas,
    showSearch,
    setShowSearch,
    activeDapp,
    setActiveDapp,
    noDisplay7,
    checkHide,
    checkDapp,
    dragElement,
    init,
    gasType,
    refreshData,
    barHide,
    setBarHide,
    price,
    setPrice,
  };
}

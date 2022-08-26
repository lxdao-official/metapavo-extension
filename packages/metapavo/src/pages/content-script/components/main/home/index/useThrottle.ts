import React, { useRef, useEffect, useCallback } from "react";

const useThrottle = (fn: any, delay: any, dep: any = []) => {
  const { current }: any = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn],
  );

  return useCallback(function f(...args: any) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
};

export default useThrottle;

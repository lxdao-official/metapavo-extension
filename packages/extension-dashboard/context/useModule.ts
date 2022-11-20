import EventEmitter from 'eventemitter3';
import React from 'react';

export const ModuleContext = React.createContext<{
  eventEmitter: any;
}>({} as any);

export function useModule() {
  const eventEmitter = new EventEmitter();
  return {
    eventEmitter,
  };
}

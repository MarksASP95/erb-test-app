import { contextBridge, ipcRenderer, IpcRendererEvent, app } from 'electron';

export type Channels = 'ipc-example' | 'app-obj';

const fs = require("fs")

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  getAppPath: () => ipcRenderer.invoke("getAppPath"),
  getFiles: (path: string) => ipcRenderer.invoke("getFiles", path),
  joinPaths: (...args: string[]) => ipcRenderer.invoke("joinPaths", args)
});
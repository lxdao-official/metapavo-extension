import React from "react";

export const GlobalContext = React.createContext<{
  showMain: boolean;
  setShowMain: (showMain: boolean) => void;
}>({
  showMain: false,
  setShowMain: () => {},
});
function useGlobal() {
  const [showMain, setShowMain] = React.useState(false);
  return { showMain, setShowMain };
}
export default useGlobal;

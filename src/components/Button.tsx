import { useEffect, useState } from "react";
import type { Message, Response } from "src/types";

export const Button: React.VFC = () => {
  const [state, setState] = useState<Response>({ id: "" });
  useEffect(() => {}, []);

  const handleClick = () => {
    alert(state.id);
  };

  if (!state) return <div>Loading...</div>;

  return (
    <button onClick={handleClick} className="block p-2 mx-auto rounded border">
      Click Me!
    </button>
  );
};

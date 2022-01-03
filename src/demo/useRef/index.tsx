import React, { useRef } from "react";
import Child, { RefObject } from "./Child";

const App = () => {
  const childRef = useRef<RefObject>({} as RefObject);

  const add = () => {
    childRef.current && childRef.current?.addCount();
  };

  return (
    <>
      <Child ref={childRef} />
      <button onClick={add}>count</button>
    </>
  );
};

export default App;

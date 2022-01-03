import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface RefObject {
  addCount: () => void;
}

interface Props {
  name?: string;
}

const Child = forwardRef<RefObject, Props>((props, ref) => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        addCount,
      };
    },
    [addCount]
  );

  return (
    <>
      <p>{count}</p>
    </>
  );
});

export default Child;

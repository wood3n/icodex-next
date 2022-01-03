import React, { useState, useEffect, useRef } from "react";
import CodeBlock from "@/components/CodeBlock";

export default () => {
  const intervalRef = useRef<number>();
  const saveCallback = useRef<() => void>();
  const [count, setCount] = useState(1);

  function startCount() {
    setCount(count + 1);
  }

  useEffect(() => {
    saveCallback.current = startCount;
  });

  useEffect(() => {
    function tick() {
      saveCallback.current!();
    }

    intervalRef.current = window.setInterval(tick, 1000);
  }, []);

  const cancel = () => {
    setCount(0);
    window.clearInterval(intervalRef.current);
    // window.clearInterval(id);
  };

  return (
    <CodeBlock>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h1>{count}</h1>
        <button onClick={cancel}>取消</button>
      </div>
    </CodeBlock>
  );
};

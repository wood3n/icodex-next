import React, { useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export default () => {
  useEffect(() => {
    document.getElementById("div1")?.addEventListener("click", () => {
      alert("在父元素div上触发");
    });

    document.getElementById("btn1")?.addEventListener("click", () => {
      alert("在子元素button上触发");
    });

    document.getElementById("div2")?.addEventListener(
      "click",
      () => {
        alert("在父元素div上触发");
      },
      true
    );

    document.getElementById("btn2")?.addEventListener(
      "click",
      () => {
        alert("在子元素button上触发");
      },
      true
    );
  }, []);

  return (
    <Tabs>
      <TabItem value="1" label="useCapture: false">
        <div id="div1">
          <button id="btn1">测试1</button>
        </div>
      </TabItem>
      <TabItem value="2" label="useCapture: true">
        <div id="div2">
          <button id="btn2">测试2</button>
        </div>
      </TabItem>
    </Tabs>
  );
};

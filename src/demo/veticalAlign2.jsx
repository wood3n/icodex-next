import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export default () => {
  return (
    <Tabs>
      <TabItem value="1" label="vertical-align: baseline">
        <div style={{ background: "gray" }}>
          <img
            src="/img/redfat.png"
            style={{
              height: 100,
              border: "1px solid",
            }}
          />
        </div>
      </TabItem>
      <TabItem value="2" label="vertical-align: middle">
        <div style={{ background: "gray" }}>
          <img
            src="/img/redfat.png"
            style={{
              height: 100,
              verticalAlign: "middle",
              border: "1px solid",
            }}
          />
        </div>
      </TabItem>
    </Tabs>
  );
};

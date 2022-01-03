import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export const Demo1 = () => {
  return (
    <>
      <div
        style={{
          // display: 'inline-block',
          width: 100,
          height: 100,
          background: "red",
          margin: 20,
        }}
      ></div>
      <div
        style={{ width: 100, height: 100, background: "green", margin: 20 }}
      ></div>
    </>
  );
};

export const Demo2 = () => {
  return (
    <div style={{ background: "gray", margin: 20 }}>
      <div
        style={{
          // display: 'inline-block',
          width: 100,
          height: 100,
          background: "red",
          margin: 20,
          padding: 10,
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 100,
          background: "green",
          margin: 20,
        }}
      ></div>
    </div>
  );
};

export const Demo3 = () => {
  return (
    <div style={{ background: "gray", margin: 20, overflow: "auto" }}>
      <div
        style={{
          // display: 'inline-block',
          width: 100,
          height: 100,
          background: "red",
          margin: 20,
          padding: 10,
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 100,
          background: "green",
          margin: 20,
        }}
      ></div>
    </div>
  );
};

export const Demo4 = () => {
  return (
    <div style={{ background: "gray", margin: 20, overflow: "auto" }}>
      <div
        style={{
          // display: 'inline-block',
          width: 100,
          height: 100,
          background: "red",
          margin: 20,
          padding: 10,
          display: "inline-block",
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 100,
          background: "green",
          margin: 20,
        }}
      ></div>
    </div>
  );
};

export const Demo5 = () => {
  return (
    <Tabs>
      <TabItem value="1" label="vertical-align: baseline">
        <div
          style={{
            width: 100,
            height: 100,
            background: "red",
            margin: 20,
          }}
        ></div>
        <div>
          <div
            style={{
              width: 100,
              height: 100,
              background: "green",
              margin: 20,
            }}
          ></div>
        </div>
      </TabItem>
      <TabItem value="2" label="vertical-align: middle">
        <div
          style={{
            width: 100,
            height: 100,
            background: "red",
            margin: 20,
          }}
        ></div>
        <div style={{ overflow: "auto" }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: "green",
              margin: 20,
            }}
          ></div>
        </div>
      </TabItem>
    </Tabs>
  );
};

export const Demo6 = () => {
  return (
    <div style={{ background: "gray", padding: 20 }}>
      <div
        style={{
          width: 100,
          height: 100,
          background: "red",
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 100,
          background: "green",
          marginTop: 40,
        }}
      ></div>
    </div>
  );
};

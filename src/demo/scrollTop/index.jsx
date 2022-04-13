import React from "react";

export default function () {
  const containerDom = React.useRef();

  const handleChange = (e) => {
    if (containerDom.current) {
      containerDom.current.scrollTop = e.target.value;
    }
  };

  return (
    <div>
      <div>
        <input type="range" min="0" max="600" onChange={handleChange} />
      </div>
      <div
        ref={containerDom}
        style={{
          width: "100%",
          height: "300px",
          overflow: "auto",
          background: "green",
        }}
      >
        <div
          style={{
            height: "800px",
            width: "300px",
            background: "red",
            marginTop: 50,
          }}
        ></div>
      </div>
    </div>
  );
}

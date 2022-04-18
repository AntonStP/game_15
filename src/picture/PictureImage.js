import React from "react";

export default function PictureImage({imgAttr} = {}) {
  return <img {...{alt: "img", ...imgAttr}}/>;
}

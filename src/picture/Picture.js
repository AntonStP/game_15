import React from "react";
import PictureImage from "./PictureImage";
import PictureSources from "./PictureSources";

export default function Picture({attr = {}, sourceData = {}, imgAttr} = {}) {
  return (
    <picture {...attr}>
      {imgAttr ? <PictureImage imgAttr={imgAttr}/> : null}
      {sourceData?.sources ?
        <PictureSources srcSetPrefix={sourceData.srcSetPrefix} sources={sourceData.sources}/> : null}
    </picture>
  );
}


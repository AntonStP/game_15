import React, {useState, useCallback} from "react";

const defaults = {
  up: "button_up",
  down: "button_down",
  hover: "button_hover",
  tag: "div"
};

export default function Button(props) {
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const settings = {...defaults, ...props};
  const Tag = settings.tag;

  const pressedOn = useCallback(() => setPressed(true), []);
  const pressedOff = useCallback(() => setPressed(false), []);
  const hoverOn = useCallback(() => setHover(true), []);
  const hoverOff = useCallback(() => setHover(false), []);
  return (
    <Tag
      {...props}
      className={
        `button ${pressed ? settings.down : hover ? settings.hover : settings.up} ${props.className || ""}`
      }
      onMouseUp={pressedOff}
      onMouseDown={pressedOn}
      onMouseMove={hoverOn}
      onMouseLeave={hoverOff}

      onTouchStart={pressedOn}
      onTouchEnd={pressedOff}
      onTouchCancel={pressedOff}
    >
      {props.children}
    </Tag>)
}


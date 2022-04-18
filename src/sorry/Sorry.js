/* eslint-disable */
import React from "react";
import Button from "../button/Button";
import {data} from "../constants/copyright";
import Picture from "../picture/Picture";


export default function Sorry({setModalType}) {

  const click = () => { // сброс модальника
    setModalType(false);
  };

  return (
    <div className={"sorry"}>
      <div className={"sorry__block"}>
        <p className={"sorry__block-text"}>
          {"В скобках для кого было написано? время извиняться"}
        </p>
        <div className={"sorry__image"}>
          <Picture {...data.sorryModal.image} />
        </div>
        <Button onClick={click}>
          <div className={"index-page__button"}>
            <div>Простите</div>
          </div>
        </Button>
      </div>
    </div>
  );
};


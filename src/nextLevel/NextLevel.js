import React from "react";
import Button from "../button/Button";
import Picture from "../picture/Picture";
import {data} from "../constants/copyright";


export default function NextLevel({setModalType,setSize,setIsReset,setClickValue}){

  const click = () => { // сброс игры, модальника, увеличена размерность
    setIsReset(false);
    setModalType(false);
    setSize(prevState=>++prevState);
    setClickValue(0);
  };

  return(
    <div className={"next-level"}>
      <div className={"next-level__block"}>
        <p className={"next-level__block-text"}>{"это победа!дальше будет сложнее"}</p>
        <div className={"next-level__image"}>
          <Picture {...data.winModal.image} />
        </div>
        <Button onClick={click}>
          <div className={"index-page__button"}>
            <div>ОК</div>
          </div>
        </Button>
      </div>
    </div>
  );
}


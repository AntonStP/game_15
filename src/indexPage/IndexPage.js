/* eslint-disable */

import React, {useRef, useState} from "react";
import Button from "../button/Button";
import GameField from "../gameField/GameField";
import NextLevel from "../nextLevel/NextLevel";
import {CSSTransition} from "react-transition-group";
import Sorry from "../sorry/Sorry";
import Info from "../info/Info";


export default function IndexPage() {
  const [isReset, setIsReset] = useState(false); //  сброс/старт
  const [size, setSize] = useState(3); //размерность
  const [modalType, setModalType] = useState(false); // открытие модальника при победе
  const inputRef = useRef();

  const [clickValue, setClickValue] = useState(0); // кол-во перестановок

  const change = () => { //при изменениях в инпуте, менять проп и по пропу выводить значение инпута
    setSize(inputRef.current.value);
    if (isReset) { //  если игра стартовала, инпут залочен на последнем значении
      setSize(size);
    }
  };

  const onReset = () => { // ф-ия сброса/запуска нового уровня
    if (inputRef.current.value < 3 || inputRef.current.value > 10) {
      setSize(3);
      setModalType("sorry");
    } else {
      setIsReset(prevState => !prevState);
      setClickValue(0);
    }
  };


  return (
    <div className={"index-page"}>
      <h1 className={"index-page__title"}>Пятнашки</h1>
      <label className={"index-page__label"}>Размерность (3-10):<input
        className={`index-page__input ${(isReset) ? "index-page__input_blocked" : ""}`} type="text"
        maxLength="2" value={size}
        onChange={() => change(size)} ref={inputRef}/>
      </label>
      <Info clickValue={clickValue} />
      {transitionedSorry(modalType, setModalType)}
      {transitionedGameField(isReset, size, setModalType, setClickValue)}
      {transitionedNextLevel(modalType, setIsReset, setModalType, setSize, setClickValue)}
      <Button onClick={onReset}>
        <div className={"index-page__button"}>
          <div>Reset</div>
        </div>
      </Button>
    </div>
  );
}


const transitionedSorry = (modalType, setModalType) => {  // модальник победы на транзишене
  return (
    <CSSTransition in={modalType==="sorry"} unmountOnExit timeout={{enter:300,exit:300}} classNames={"sorry"}>
      <Sorry setModalType={setModalType} />
    </CSSTransition>
  );
};

const transitionedGameField = (isReset, size, setModalType, setClickValue) => {  // игровое поле на транзишене
  return (
    <CSSTransition in={isReset} unmountOnExit timeout={{enter:100,exit:100}} classNames={"game-field"}>
      <GameField size={size} setModalType={setModalType} setClickValue={setClickValue}/>
    </CSSTransition>
  );
};

const transitionedNextLevel = (modalType, setIsReset, setModalType, setSize, setClickValue) => {  // модальник победы на транзишене
  return (
    <CSSTransition in={modalType==="win"} unmountOnExit timeout={{enter:300,exit:300}} classNames={"next-level"}>
      <NextLevel setModalType={setModalType} setSize={setSize} setIsReset={setIsReset} setClickValue={setClickValue}/>
    </CSSTransition>
  );
};


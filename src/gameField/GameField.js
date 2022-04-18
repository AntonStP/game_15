/* eslint-disable */
import React, {useEffect, useState} from "react";
import Cell from "../cell/Cell";
import {shuffle} from "../utils/shuffleArray";


export default function GameField({size,setModalType, setClickValue}){
  const [data, setData] = useState([]); // хранение массива плашек
  const [myResult, setMyResult] = useState([]);
  const [endGameResult, setEndGameResult] = useState(null);  // правильная последовательность

  console.log("data", data);


  useEffect(()=> {
    generateGame(size,setData);
  },[size]);


  useEffect(()=>{ // при изменении размерности пересчитывать правильную последовательность
    let array = [];
    for(let i=0;i<=size*size-1;i++) {
      if(i===size*size-1) array.push(9);
      else array.push(i+1);
    }
    setEndGameResult(array);
  },[size]);



  useEffect(()=> {
    let end = [];
    end = data.map((el)=>{
      return el.valueForCompare;
    });
    if(JSON.stringify(endGameResult)===JSON.stringify(end)) setModalType("win");
  }, [data]);


  useEffect(()=>{//дописка, чтобы переключать на победу
    if(JSON.stringify(endGameResult)===JSON.stringify(myResult))
      setModalType("win");
  }, [myResult]);
  const fakeWin = () => { //дописка, чтобы переключать на победу
    setMyResult(endGameResult);
  };

  const cellGenerator = () =>  {
    return (
      data.map((el,index)=> {
        if(!el.isEmpty) {
          return <Cell key={`cell-${index}`} valueForCompare={el.valueForCompare} thisDataIndex={index}
                       size={size} isEmpty={el.isEmpty} value={el.value}  coordinate={el.coordinate}
                       data={data} setData={setData} setClickValue={setClickValue}/>
        }
      })
    );
  };

  return(
    <div className={"game-field"}>
      <div className={"game-field__fake-win"} onClick={fakeWin}>Тупо победа</div>
      {cellGenerator()}
    </div>
  );
}





function generateGame(size,setData) {
  const coordinateArray = () => {  // создание массива координат
    let cArray = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cArray.push({coordinate: [j, i]});
      }
    }
    return cArray;
  };

  const indexArray = () => {  // создание массива чисел
    let iArray = [];
    for (let i = 1; i <= size * size; i++) iArray.push(i);
    return iArray;
  };

  const gameData = () => {  // объединение массива координат и перемешанного массива чисел
    const shuffledIndexes = shuffle(indexArray());
    return coordinateArray().map((el, index) => el = {
      ...el, value: shuffledIndexes[index],
      valueForCompare: shuffledIndexes[index],
      isEmpty: shuffledIndexes[index] === shuffledIndexes.length ? true : false
    })
  };


  let currentData = gameData();
  let end = currentData.map((el) => {
    return el.valueForCompare;
  });

  const checkData = () => {
    let inv = 0;
    let r = 0;
    currentData.forEach(el => {
      if(el.isEmpty===true) {
        r = el.coordinate[1]+1
      }
    });

    console.log('currsssssentData', currentData)
    console.log('endendendend', end)

    for (let i = 0; i < size * size; ++i)
      for (let j = 0; j < i; ++j)
        if (end[j] > end[i] && end[j] != end.length) {
          ++inv;
          console.log(`${end[j]} > ${end[i]}`);
        }
    console.log('inv', inv);
    console.log('r', r)
    if((inv + r) % 2 === 0) {
      console.log("зашел сюда");
      console.log('currentData', currentData)
      setData(currentData);
      return;
    }
    else {
      currentData = gameData();
      end = currentData.map((el) => {
        return el.valueForCompare;
      });
      checkData();
    }
  };

  return checkData()
}

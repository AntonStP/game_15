/* eslint-disable */
import React, {useEffect, useState} from "react";


export default function Cell({valueForCompare, thisDataIndex, size, value, coordinate, data, setData, setClickValue}) {
  const [sizeCell, setSizeCell] = useState(null); //рзмер клетки, пересчет при reset
  useEffect(()=> {
    setSizeCell(1 / size * 100);
  }, []);

  const findEmpty = () => { // поиск empty элемента
    let item;
    item = data.find((el) => {
      if (el.isEmpty === true) return el;
    });
    return item;
  };

  // условие поиска: empty слева, сверху, справа, слева
  const condition = (coordinate[0] - 1 === findEmpty().coordinate[0] && coordinate[1] === findEmpty().coordinate[1]) ||
    (coordinate[0] === findEmpty().coordinate[0] && coordinate[1] - 1 === findEmpty().coordinate[1]) ||
    (coordinate[0] + 1 === findEmpty().coordinate[0] && coordinate[1] === findEmpty().coordinate[1]) ||
    (coordinate[0] === findEmpty().coordinate[0] && coordinate[1] + 1 === findEmpty().coordinate[1]);

  // смена значиений в массиве плашек
  const newData = (prevState, value, coordinate, valueForCompare, indexClicked, empty) => {
    let array;
    array = prevState.map((el,index)=>{
      if (el.isEmpty===true) {
        return (
          el= {isEmpty: false, coordinate: el.coordinate,value:
            value, valueForCompare: valueForCompare}
        )
      }
      else if (index === indexClicked) {
        return (
          el = {isEmpty: empty.isEmpty, coordinate: el.coordinate,
            value: empty.value, valueForCompare:empty.valueForCompare}
        )
      }
      else return el;
    });
    return array
  };

  return (
    <div className={"cell"} style={{
      width: `${sizeCell * 0.9}%`,
      height: `${sizeCell*0.9}%`,
      fontSize: `${sizeCell * 2}px`,
      left: `${(sizeCell * coordinate[0]) + sizeCell*0.05}%`,
      top: `${(sizeCell * coordinate[1]) + sizeCell*0.05}%`
    }} onClick={() => {
      if(condition) {
        setData(newData(data,value,coordinate,valueForCompare,thisDataIndex,findEmpty()));
        setClickValue(prevState=>++prevState);
      }

    }}>
      <div className={"cell__value"}>{value}</div>
    </div>
  );
}


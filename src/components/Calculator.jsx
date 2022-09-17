import React, { useState, useEffect } from "react";
import axios from "axios";

import AmazingNumberButton from "./AmazingNumberButton";
import BeautifulScreen from "./BeautifulScreen";
import BrilliantDeleteButton from "./BrilliantDeleteButton";
import GreatOperationButton from "./GreatOperationButton";
import MagnificientEqualButton from "./MagnificientEqualButton";
import SaveOnDbButton from "./SaveOnDbButton";


export default function Calculator(props) {
  const [resultat, setResultat] = useState(0);
  const [numbers, setNumbers] = useState("");
  const [operators, setOperators] = useState(null);
  
  const [calculToDb, setCalculToDb] = useState("");

  const Calculate = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "/": (x, y) => x / y,
    "*": (x, y) => x * y,
  };

  const onClick = (element) => {
    const operatorsArray = ["+", "-", "*", "/"];
    const numbersArray = ["1","2","3","4","5","6","7","8","9","0",".",];
    props.overNineThousandSetter(false);

    // OPERATORS
    if (operatorsArray.includes(element)) {
      if (numbers !== "") {
        dataBaseCalcul(resultat, element, numbers);
        setResultat(Calculate[operators](parseFloat(resultat), parseFloat(numbers)));
        setNumbers("");
      }
      setOperators(element);
    }

    // NUMBERS
    if (numbersArray.includes(element)) {
      const SetNumber = (value, elem) => {
        if (value === 0 || numbers === "") {
          value = "";
        }
        return value + elem;
      };

      if (operators !== null || numbers !== "") {
        setNumbers(SetNumber(numbers, element));
      } else {
        if (resultat === 0) setResultat(element);
        else setResultat(resultat + element);
      }
    }
  };

  const handleEqual = () => {
    if(numbers !== "") {
      dataBaseCalcul(resultat, operators, numbers);
      setResultat(Calculate[operators](parseFloat(resultat), parseFloat(numbers)));
      setNumbers("");
      setOperators(null);
    }
  }

  const dataBaseCalcul = (val1, operator, val2) => {
    setCalculToDb(val1.toString() + operator.toString() + val2.toString());
  };

  const clear = () => {
    setResultat(0);
    setNumbers("");
    setOperators(null);
    props.overNineThousandSetter(false);
  };

  useEffect(() => {
    if (resultat > 9000) props.overNineThousandSetter(true);

    return () => { 
      props.overNineThousandSetter(false);
    };
  }, [resultat, numbers]);


  const postData = (e) => {
    e.preventDefault();

    if(calculToDb !== "" && resultat !== 0) {
      axios.post(`http://localhost:80/Calculator-9000/index.php`, {
        user: `${props.userId}`,
        operation: `${calculToDb}`,
        result: `${resultat}`,
      })
      .then((response) => {
        console.log(response);
        return response
      })
      .catch((error) => {
        console.log("Erreur ! " + error);
        return error
      });
    } else {
      return
    }
  };

  return (
    <section className="calculator">
      <BeautifulScreen
        output={operators !== null ? `${resultat} ${operators}` : resultat}
        result={numbers}
      />
      <article className="calculator_digit">
        <AmazingNumberButton handleClickNumber={onClick} />
        <GreatOperationButton handleClickOperation={onClick} />
      </article>
      <article className="calculator_btn">
        <MagnificientEqualButton equal={handleEqual} />
        <BrilliantDeleteButton delete={clear} />
      </article>
      <SaveOnDbButton postData={postData} />
    </section>
  );
}

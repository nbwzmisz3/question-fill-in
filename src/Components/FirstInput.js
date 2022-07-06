import React, { useState} from "react";
import EmptyMarker from "./EmptyMarker";
import SentencePart from "./SentencePart";
import WordCheckbox from "./WordCheckbox";

const FirstInput = () => {
  const [sentence, setSentence] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [question, setQuestion] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  
  const renderSentence = (e) => {
    e.preventDefault();
    if(!sentence) return
    let wordArray = sentence.split(' ');
    setWordArray(wordArray);
  }

  const renderQuestion = () => {
    let array = Array.from(document.querySelectorAll('input[type=checkbox]'));
    let tempAnswer = '';
    let answerArray = [];
    array.forEach( (checkbox, index) => {
      if(!checkbox.checked){
        return
      } else if(checkbox.checked && array[index + 1] && array[index + 1].checked) {
        tempAnswer += checkbox.value + ' ';
      } else if(checkbox.checked && array[index + 1] && !array[index + 1].checked) {
        tempAnswer += checkbox.value + ' ';
        answerArray.push(tempAnswer);
        tempAnswer = '';
      } else if(checkbox.checked && !array[index + 1]) {
        tempAnswer += checkbox.value + ' ';
        answerArray.push(tempAnswer);
      }
    });
    let questionArray = array.map( checkbox => {
      if(!checkbox.checked) {
        return checkbox.value + ' ';
      } else {
        return 'empty-slot-marker ';
      } 
    })
    let question = <div></div>;
    questionArray.map( word => question += word);
    setQuestion( questionMakeUp(questionArray) );
    setAnswerArray(answerArray);
     
  }

  function questionMakeUp(questionArray) {
    let array = [];
    let lastItemEmpty = false;
   
    for (let item of questionArray) {
      if(item !== 'empty-slot-marker ') {
        array.push( <SentencePart text={item}></SentencePart>);
        lastItemEmpty = false;
      } else if(item === 'empty-slot-marker ' && !lastItemEmpty) {
        array.push( <EmptyMarker></EmptyMarker> );
        lastItemEmpty = true;
      } 
    }
    return array
  }
  return (
    <div className="container question-form">
      <form id="first-input" onSubmit={renderSentence}>
      <textarea
      placeholder="Please enter the question."
      value={sentence} 
      onChange={e => setSentence(e.target.value)}
      name="first-input" id="" cols="30" rows="10"></textarea>
      <button type="submit">Next step</button>
      </form>
      <ul className="checkbox-array">
      { wordArray && wordArray.map( (word, index) => {
          return ( 
            <WordCheckbox key={index} value={word} index={index}/>
          )
        })
      }
      </ul>
      {wordArray && <button onClick={renderQuestion}>Render question, answers</button>}
    
      <div className="question-container">
        <h2>Question:</h2>
        <div className="question">
        {question}
        </div>
      </div>
      <h2>Answers:</h2>
      
      <ul className="answers-list">
        { answerArray && answerArray.map( (answer) => <li className="answer-drag">{answer}</li>)}
      </ul>
    </div>
  )
}
export default FirstInput;
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = async () => {
    
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    
    var next_question = current_question + 1

    if(next_question < contents.length){
      console.log("current_question" + next_question);
      setCurrentQuestion(next_question);

    } else {
      console.log("setComplete" + current_question);
      setComplete(true);
      console.log("ans",ans);
      console.log("ans.length",ans.length);
     
      const {
        data: { score }
      } = await instance.post('/CheckAns',ans )
    }
  
    // console.log(option);
    // setAns([ans, ])
  }

  const choose = (e) => {

    var qId = e.target.id[1] -1 ;
    
    var after = ans;
   
    after[qId] = parseInt(e.target.value);
    console.log("qId",e.target.id[1]);
    console.log("select",e.target.value);
    // after.push
    // setAns([ori, e.target.value]);
    console.log("ans = "+ ans);
    setAns(ans);
    // TODO : update 'ans' for the option you clicked
  }

  const getQuestions = async () => {
    // TODO : get questions from backend
    const { data: { message,contents } } = await instance.get('/getContents')
   
    setContents(contents);
    setCurrentQuestion(0);
    // http://localhost:4000/api/getContents
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  var questionNo = current_question +1;
 
  
  // TODO : fill in the rendering contents and logic
  return (

    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
                Question {questionNo} of {contents.length}

            </div>
          </div>

          <div id="question-title">
            {
              contents[current_question].question}
          </div>
        
          <div id="options">
            {contents[current_question].options.map((option, i) => {     
            console.log(option);       
            var checked = ans.length >= questionNo;
            console.log("checked"+checked);
            i++;          
            // Return the element. Also pass key     
            // return (<Answer key={i} answer={answer} />) 
            return (<div className="each-option"  key={i}> 
            <input
            type="radio"
            id = {'q' + questionNo + '_' + i}
            value={i} 
            name="option"
            onChange= { choose}
            defaultChecked = {false}
           
            
            /><span>{option} </span></div>
           )
            })}
            
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question

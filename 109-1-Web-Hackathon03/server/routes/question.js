import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend

  var query = Question.find({});
  query.exec(function (err, response) {
    if (err) {
        // handle error
        return;
    }
    console.log("GetContents"); 
    // handle success
    console.log(response.length); 
    if(response.length === 0){
      res.status(403).json({ message: 'error', contents: [] })
  
    } else{
      res.status(200).json({ message: 'success', contents: response })
    }
  //message: 'error', contents: [] 包裝成物件回傳
  });


}

exports.CheckAns = async (req, res) => {
  // console.log(req);
  console.log(req.body);
  var query = Answer.find({});
  var numbers;
  var answers;
  await query.exec(function (err, response) {
    if (err) {
      // handle error
      return;
    }
    var yes = 0;
    numbers = response.length;
    answers = response;
    console.log(answers);
    for(var i = 0;i <  numbers; i++){
        if(req.body[i] == answers[i].answer){
          yes+=1;
        }
    }
    res.json({score: yes});

  });
 
  // for(var i = 0;i <  numbers; i++){
  //   if(req.body[i] == )
  // }



  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  // var query = Answer.findOne({questionID: req.query.});
  // query.exec(function (err, response) {
  //   if (err) {
  //       // handle error
  //       return;
  //   }
  //   console.log("GetContents"); 
  //   // handle success
  //   console.log(response.length); 
  //   if(response.length === 0){
  //     res.status(403).json({ message: 'error', contents: [] })
  
  //   } else{
  //     res.status(200).json({ message: 'success', contents: response })
  //   }
  // //message: 'error', contents: [] 包裝成物件回傳
  // });

 
}

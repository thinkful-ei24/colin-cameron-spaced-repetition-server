const initialQuestions = (arr) => {
  let questions = [];
  for(let i=0; i<arr.length; i++){
    let question = {};
    let pair = arr[i];
    question._id = pair._id;
    question.question = pair.question;
    question.answer = pair.answer;
    question.memoryStrength = 1;
    question.next = (i+1)%10;
    questions.push(question);
  }
  return questions;
};

module.exports = initialQuestions;
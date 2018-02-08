const questionList = [
    { question:'질문에 따른 나이를 입력해 주세요'},
    { question:'신체활동량을 평가 해 주세요', min:'낮음', max:'높음', choice:3},
    { question:'지난 한 달 간, 당신의 전반적인 수면상태를 어떻게 평가하시겠습니까?', min:'나쁨', max:'좋음', choice:4},
    { question:'불안하거나 짜증이 난다', min:'아니다', max:'그렇다', choice:4},
    { question:'자주 피곤하고 쉽게 지친다', min:'아니다', max:'그렇다', choice:8},
    { question:'가끔씩 몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.', min:'아니다', max:'그렇다', choice:4},
    { question:'긴장을 풀기 어렵다.', min:'아니다', max: '그렇다', choice:6},
    { question:'의욕이 떨어진다.', min:'아니다', max: '그렇다', choice:6},
    { question:'신경이 날카로워졌다.', min:'아니다', max: '그렇다', choice:6}
]
let answerList = [];

const boxTest = document.querySelector(".box_test");
const indexQuestion = document.getElementsByClassName("index_quesiton")[0];
const boxInput = document.querySelector(".box_input");
const titQuestion = boxTest.querySelector(".tit_question");
const listChoice = document.getElementsByClassName("list_choice")[0];
const btnChoice = document.getElementsByClassName("btn_choice");
// const listChoice = document.querySelector(".list_choice");
// const btnChoice = document.querySelectorAll(".list_choice button");
const txtMin = document.querySelector(".min");
const txtMax = document.querySelector(".max");
const btnStart = document.querySelector(".btn_start");
const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");
const scoreTotal = boxTest.querySelector(".scoreTotal");
const quiz = {
    index: 0,
    score: 0
}


btnStart.addEventListener("click", startQuestion);
btnPrev.addEventListener("click", updateQuestion);
btnNext.addEventListener("click", updateQuestion);



function startQuestion() {
    quiz.index = 0;
    answerList = [];
    updateQuestion();
    goFirstPage()
}


function updateQuestion() {
    if (quiz.index === questionList.length) { showResult(); return false;}
    
    if (this.className === "btn_next") {quiz.index++;updateQuestion();}
    if (this.className === "btn_prev") {quiz.index--;updateQuestion();}

    index = quiz.index;
    console.dir(this)
    currentQuestion = questionList[index];
    indexQuestion.innerText = `Question 0${(index+1)}`;
    titQuestion.innerHTML = currentQuestion.question;
    txtMin.innerHTML = currentQuestion.min || "";
    txtMax.innerHTML = currentQuestion.max || "";
    const choices = []
    for (let i = 0; i < currentQuestion.choice ; i++) {
        choices.push(`<button class="btn_choice" value="${i}" >${i}</button>`) 
    }
    listChoice.innerHTML = choices.join(" ");
    
    
    for (let i=0;i<btnChoice.length;i++){
        btnChoice[i].addEventListener("click", selectChoice);
    }
    
    console.log(listChoice);
    /*
    btnChoice.forEach( el => el.addEventListener("click", selectChoice));
    */
  
}


function selectChoice(){

    answerList[index] = this.value;
    console.log(this.value)
    console.dir(answerList)
}


function showResult(){

    const sum = answerList.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    console.log("the total is", sum)
    
}

function goFirstPage() {
    boxInput.innerHTML = `
        <p>질문에 따른 나이를 입력해 주세요(만 나이로 입력)</p>
        <p><input type="text" name="" id="age"><span>세</span></p>
        <p>첫 출산 연령을 입력해 주세요(출산 경험이 없는 경우 00을 입력)<p>
        <p><input type="text" name="" id="childbirthAge"><span>세</span></p> 
    `
}

function goLastPage() {

    
}


// btnStart.forEach( el => el.addEventListener("click", startQuestion));
// btnPrev.forEach( el => el.addEventListener("click", updateQuestion(-1)));
// btnNext.forEach( el => el.addEventListener("click", updateQuestion(+1)));


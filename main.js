initTest();
function initTest(){

    const questionList = [
        { question:'질문에 따른 나이를 입력해 주세요'},
        { question:'신체활동량을 평가 해 주세요', min:'낮음', max:'높음', choice:4},  
        { question:'지난 한 달 간, 당신의 전반적인 수면상태를 어떻게 평가하시겠습니까?', min:'나쁨', max:'좋음', choice:4},
        { question:'불안하거나 짜증이 난다', min:'아니다', max:'그렇다', choice:4},
        { question:'자주 피곤하고 쉽게 지친다', min:'아니다', max:'그렇다', choice:8},
        { question:'가끔씩 몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.', min:'아니다', max:'그렇다', choice:4},
        { question:'긴장을 풀기 어렵다.', min:'아니다', max: '그렇다', choice:6},
        { question:'의욕이 떨어진다.', min:'아니다', max: '그렇다', choice:6},
        { question:'신경이 날카로워졌다.', min:'아니다', max: '그렇다', choice:6}
    ]
    let answerList = [];
    const test = {
        name: "",
        age: 0,
        childbirthAge: 0,
        index: 0,
        score: 0
    }
    
    const boxTest = document.querySelector(".box_test");
    const boxIntro = document.getElementsByClassName("box_intro")[0];
    const boxQuestion = document.getElementsByClassName("box_question")[0];
    const boxUser = document.getElementsByClassName("box_user")[0];
    const boxInput = document.getElementsByClassName("box_input")[0];
    const boxResult = document.getElementsByClassName("box_result")[0];
    const indexQuestion = document.querySelector(".index_question");
    const titQuestion = document.querySelector(".tit_question");
    const listChoice = document.querySelector(".list_choice");
    const btnChoice = document.getElementsByClassName("btn_choice");
    const txtMin = document.querySelector(".min");
    const txtMax = document.querySelector(".max");
    const btnStart = document.querySelectorAll(".btn_start");
    const btnPrev = document.querySelector(".btn_prev");
    const btnNext = document.querySelector(".btn_next");
    const scoreTotal = document.querySelector(".score_total");
    const name = document.querySelectorAll(".name");
    const age = document.querySelector(".age");
    const childbirth = document.querySelector(".childbirth");
    const valname = document.querySelectorAll("#valName");
    const valAge = document.querySelector("#valAge");
    const valChildbirthAge = document.querySelector("#valChildbirthAge");
    let msg = document.querySelectorAll(".msg");
    
    
    function startQuestion() {
        test.index = 0;
        answerList = [];
        boxResult.classList.remove("on");
        updateQuestion();
    }
    
    function updateQuestion() {
        if (this.className === "btn_next") {test.index++;}
        if (this.className === "btn_prev") {test.index--;}
        
        boxQuestion.classList.add("on")
        if (test.index === -1) {
            // 인트로 페이지 이동
            goIntroPage(); return false;
        } else if (test.index === 0) { 
            // 나이 질문 페이지 이동
            boxIntro.classList.remove("on")
            boxInput.classList.remove("on")
            boxUser.classList.add("on")
        } else if (test.index === questionList.length){
            // 결과 페이지 이동
            goResultPage(); return false;
        } else { 
            boxUser.classList.remove("on");
            boxInput.classList.add("on"); 
        }
        
        index = test.index;
        currentQuestion = questionList[index];
        indexQuestion.innerText = `Question 0${(index+1)}`;
        titQuestion.innerHTML = currentQuestion.question;
        txtMin.innerHTML = currentQuestion.min || "";
        txtMax.innerHTML = currentQuestion.max || "";
        test.name = valName.value; 
        test.age = valAge.value;
        test.childbirthAge = valChildbirthAge.value; 
        
        const choices = []
        for (let i = (index === 1 ?  1 : 0); i < currentQuestion.choice ; i++) {
            choices.push(`<button class="btn_choice" value="${i}" >${i}</button>`) 
        }
        listChoice.innerHTML = choices.join(" ");
        
        
        for (let i=0;i<btnChoice.length;i++){
            btnChoice[i].addEventListener("click", selectChoice);
        }
        
        if (answerList[index]) {
            btnChoice[(answerList[index]-(index === 1 ?  1 : 0))].classList.add("checked");
        }
    
    }
    

    function checkNumber(event){
        event.stopPropagation();
        msg = this.nextElementSibling.nextElementSibling.nextElementSibling;
        
        if (this.value.length > this.maxLength){
            this.value = this.value.slice(0, this.maxLength);
        }   

        if(event.keyCode != 8 && event.keyCode != 0 && (event.keyCode < 48 || event.keyCode > 57)){
            this.value = this.value.replace(/[^0-9]/g,'');   
            msg.innerHTML = "숫자만 입력해주세요!";
            msg.style.opacity = '0';
            return false;
        }
         
    }
    
    
    function selectChoice(){
        for (let i=0;i<btnChoice.length;i++){
            btnChoice[i].classList.remove("checked");
        }
        answerList[index] = this.value;
        this.classList.add("checked");
        console.log(this.value)
        console.dir(answerList)
    
    }
    
    
    function showResult(){
        const sum = answerList.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        console.log("the total is", sum);
        test.score = sum;

    }
    
    
    function goIntroPage() {
        boxQuestion.classList.remove("on");
        boxIntro.classList.add("on");

    }
    
    
    function goResultPage() {
        showResult();
        boxQuestion.classList.remove("on");
        boxResult.classList.add("on");
        name.forEach( el => {el.innerText = test.name});
        scoreTotal.innerHTML = `${test.score} <span>점</span>`;
        age.innerText = test.age;
        childbirth.innerText = test.childbirthAge;
    }
    
    window.addEventListener("load", goIntroPage);
    btnStart.forEach( el => el.addEventListener("click", startQuestion));
    btnPrev.addEventListener("click", updateQuestion);
    btnNext.addEventListener("click", updateQuestion);
    valAge.addEventListener("keyup", checkNumber);
    valChildbirthAge.addEventListener("keyup", checkNumber);
    msg.forEach( el => el.addEventListener("transitionend", () => { el.style.opacity = '1'; el.innerHTML ="";}));
    
}



export default class Quiz
{
    constructor(questions)
    {
        this.questions = questions;
        this.CurrentQues=0;
        this.numOfQues = questions.length;
        this.score =0;
        console.log(questions);
        this.showAnswers()
        document.getElementById('next').addEventListener('click',this.nextQuestion.bind(this));
        $('#tryBtn').click(()=>{
            $('#finish').fadeOut(500,()=>{
                $('#setting').fadeIn(500)
            })
        })
    }

    showAnswers(){
        document.getElementById('question').innerHTML= this.questions[this.CurrentQues].question;
        document.getElementById('current').innerHTML= this.CurrentQues+1;
        document.getElementById('totalAmount').innerHTML= this.numOfQues;

        let AllAnswers =[this.questions[this.CurrentQues].correct_answer,...this.questions[this.CurrentQues].incorrect_answers];
        this.shuffleArray(AllAnswers)
        let answerRow = '';
        for (let i = 0; i < AllAnswers.length; i++) {
            answerRow+= `
            
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" id="easy" value="${AllAnswers[i]}">
            ${AllAnswers[i]}
            </label>
            <br>

            `
        }
        document.getElementById("rowAnswer").innerHTML= answerRow;

    }

    nextQuestion(){
        let correct = this.questions[this.CurrentQues].correct_answer;
        let userAnswer = Array.from(document.getElementsByName('answer')).filter(el=>el.checked)[0].value;
        this.checkUserAnswer(correct,userAnswer);

        this.CurrentQues++;

        if(this.numOfQues>this.CurrentQues){
            this.showAnswers();
        }
        else
        {
            $('#quiz').fadeOut(500,()=>{
                $('#finish').fadeIn(500)
            })
            $('#score').text(this.score)
        }
    }

    checkUserAnswer(correct,userAnswer){
        if(correct==userAnswer){
            this.score++;
            $('#Correct').fadeIn(400).fadeOut(400)
        }else{
            $('#inCorrect').fadeIn(400).fadeOut(400)

        }
    }
    
    shuffleArray(AllAnswers) {
        for (var i = AllAnswers.length - 1; i > 0; i--) {
        
            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));
                        
            var temp = AllAnswers[i];
            AllAnswers[i] = AllAnswers[j];
            AllAnswers[j] = temp;
        }
            
        return AllAnswers;
    }
}

// https://opentdb.com/api.php?amount=10&category=21&difficulty=easy
import  Quiz  from "./Quiz.js";


export class Settings{

    constructor ()
    {
        this.category = document.getElementById('category');
        this.difficulty = document.getElementsByName('difficulty');
        this.numOfQuestions= document.getElementById('numOfQuestions');
        this.startBtn = document.getElementById('startBtn');

        // console.log(this.difficulty);
        this.startBtn.addEventListener('click' , this.getData.bind(this))
    }

    async getData(){
        let dif = Array.from(this.difficulty).filter((el)=>el.checked)[0].value;
        let cat = this.category.value;
        let nums= this.numOfQuestions.value;

        let Api = `https://opentdb.com/api.php?amount=${nums}&category=${cat}&difficulty=${dif}`
        let response =  await this.FetchData(Api);

        if(response.length>0){
            $('#setting').fadeOut(500,()=>{
                $('#quiz').fadeIn(500)

            });
            let quiz = new Quiz(response);
        }

    }
     async FetchData (Api){
        let res = await fetch(Api)
        res= await res.json();
        res= res.results;
        
        return res
    }


}

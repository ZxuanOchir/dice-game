//Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлая
//Тоглоом дууссан эсэхийг хадгалах хувьсагч
var isNewGame;
//Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;
//Хоёр тоглогчийн цуглуулсан оноонууд
var scores;
//Идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо.
var roundScore;

//Шооны зургийг үзүүлэх элемэнтийг дом оос хайж олоод энд хадгаля
var diceDom = document.querySelector('.dice');

//Тоглоомыг эхлүүлнэ.
initGame();
//Тоглоом шинээр эхлэхэд бэлтгэе.
function initGame(){
    //Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;

    //Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогч 0, хоёрдугаар тоглогч 1,
    
    activePlayer = 0;
    
    //Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
    
    scores = [0,0];
    
    //Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;
    //Программ эхлэхэд бэлтгэе.
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    //Тоглогчдийн нэрийг буцааж гаргах 
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');

    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    diceDom.style.display = 'none';
    }
    //Шоог шидэх эвент листенер
    document.querySelector(".btn-roll").addEventListener("click",function(){
        if(isNewGame){//true

     // 1-6 хүртэлх санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1 ; 

    //Шооны зургийг гаргаж ирнэ
    diceDom.style.display = 'block';
    
    //Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.src = 'dice-' + diceNumber + '.png';

    // Буусан тоо нь 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if(diceNumber !== 1){
        //1 ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
        roundScore = roundScore + diceNumber;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }else{
        //1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
        //Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
        switchTheNextPlayer();//DRY Dont repeat yourself
    }
}else{
    alert('Game over click new game ');
};
});
//HOLD товчны эвэнтлистэнэр 
document.querySelector('.btn-hold').addEventListener('click',function(){
    //Уг тоглогчийн цуглуулсан ээлжийн оноог глобал дээр нэмж өгнө.
    // if(activePlayer === 0){
    //     scores[0] = scores [0] + roundScore;
    // }else{
    //     scores[1] = scores [1] + roundScore;
    // }
   if(isNewGame){
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //ДЭлгэц дээр тоог нь өөрчилнө.

    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Уг тоглогч хожсож эсэхийг шалгах (Оноо нь 100 хүрсэн эсэх)
    if(scores[activePlayer] >= 100 ){
        //Тоглоомыг дууссан төлөвт оруулна.
        isNewGame = false;  
        //Ялагч гэсэн техтийг нэрнийх нь оронд гаргана
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }else{
        //Тоглогчийн ээлжийг солино.
        switchTheNextPlayer();
    }
   }else{
    alert('Game over click new game ');
   }

});
//Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг
function switchTheNextPlayer(){
    //Тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;

    //Тоглогчийн ээлжийг солих
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    //Улаан цэгийг шилжүүлэх
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDom.style.display = 'none';
}
//Шинэ тоглоом эхлүүлэх товчний эвэнт листэнэр 
document.querySelector(".btn-new").addEventListener('click',initGame);
///absolutely done!

const gameBoard = (function() {
    const board = Array.from({ length: 3 }, () => Array(3).fill(null))
    const addMark = (mark, x , y) => {
        if (board[x][y] === null){
            board[x][y] = mark;
            return true;
        } else {
            return false;
        }
    };
    const getBoard = () => board.slice();
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                board[i][j] = null;    
                
            };
            
        };
    };
    return {
        addMark,
        resetBoard,
        getBoard
    };
})();

const Players = (function(){
    const playerProto = {
        toggleTurn() {
            this.turn = !this.turn;
        } 
    };

    function createPlayer(name, mark) {
        const player = Object.create(playerProto);
        player.name = name;
        player.mark = mark;
        if(mark=='x'){
            player.turn = true;
        } else {
            player.turn=false;
        }
        
        return player;
    }

    let p1=null;
    let p2=null;

    function setup(player1Data, player2Data) {
        p1 = createPlayer(player1Data.name, player1Data.mark);
        p2 = createPlayer(player2Data.name, player2Data.mark);
    }

    function switchTurn(){
        p1.toggleTurn();
        p2.toggleTurn();
    }
    return {
        setup,
        switchTurn,
        getPlayers() {
            return { p1 : {...p1},
                     p2 : {...p2} 
            };
        }
    };
})();

const Controller = (function(){

    function checkTurn(){
        const {p1,p2} = Players.getPlayers();

        return p1.turn ? p1 : p2;
    };
    
    function checkBoard(){

        function checkLine(Line){
            const score = { x: 0, o: 0 };

            for (let cell of Line) {
                if (cell != null) {
                score[cell]++;
                }
            }

            if (score.x === 3) return 'x';
            if (score.o === 3) return 'o';
            return null;
        };

        const board=gameBoard.getBoard();
        const score ={
            'x':0,
            'o':0
        };

        let x=0;
        let o=0;
        
        
        for (let i = 0;  i< board.length; i++) {
            const winner = checkLine(board[i]);
            if (winner) return winner;
        };

        // Check columns
        for (let j = 0; j < board.length; j++) {
            const col = board.map(row => row[j]);
            const winner = checkLine(col);
            if (winner) return winner;
        }

        // Diagonal
        const diag = board.map((row, i) => row[i]);
        const winnerDiag = checkLine(diag);
        if (winnerDiag) return winnerDiag;

        // Anti-diagonal
        const antiDiag = board.map((row, i) => row[board.length - 1 - i]);
        const winnerAnti = checkLine(antiDiag);
        if (winnerAnti) return winnerAnti;
        
        // Check for tie
        const isFull = board.flat().every(cell => cell !== null);
        if (isFull) return "tie";

    };

    function endGame(results) {
    switch (results) {
        case 'tie':
            return 1; // tie
        case 'x':
            return 2; // x wins
        case 'o':
            return 3; // o wins
        default:
            return 4; // game continues or invalid result
  }
}


    function playGame(x,y){
        
        let change = null;

        let player  = checkTurn();
        change = gameBoard.addMark(player.mark,x,y);
        let results=checkBoard();
        switch (endGame(results)) {
            case 1:
                return "It's a tie!";
                break;
            case 2:
                return `${player.name} wins!`;
                break;
            case 3:
                return `${player.name} wins!`;
                break;
            case 4:
                if (change) {
                    Players.switchTurn();
                }
                return null;
                break;
            default:
                if (change) {
                    Players.switchTurn();
                }
                return null;
                break;
        }
    };

    return {
        playGame,
        checkTurn
    }
})();

const DOM=(function(){

    const p1=document.getElementById('player1');
    const p2=document.getElementById('player2');
    const container =document.querySelector('.player-inputs');
    const start= document.getElementById('startBtn');
    const message = document.getElementById('message');
    const cells = document.querySelectorAll('.board button')
    const reset = document.getElementById('resetBtn')

    start.addEventListener('click',()=>{
        if (p1.value!='' && p2.value!=''){
            Players.setup({ name: p1.value, mark:'x'},{name:p2.value,mark:'o'});
            start.remove();
            p1.remove();
            p2.remove();
            message.textContent=`${p1.value} vs ${p2.value}`;
            message.style.fontSize='1.5rem';
            cells.forEach(btn => {
                btn.addEventListener('click',(e) => {
                let player = Controller.checkTurn();
                    let x = e.target.dataset.x;
                    let y = e.target.dataset.y;
                    message.textContent=Controller.playGame(x,y)===null?message.textContent:Controller.playGame(x,y);
                    e.target.textContent = player.mark;
                    
                });
            });
        } else{
            message.textContent='Insert Names';
            message.style.color='red';
            p1.addEventListener('focus',()=>{
                message.textContent='Waiting to start...'
                message.style.color='black';
            })
        }
    });
    reset.addEventListener('click',() => {
        [p1, p2, start].forEach(el => container.appendChild(el));
        gameBoard.resetBoard();
        message.textContent='Waiting to start...'
        p1.value='';
        p2.value='';
        cells.forEach(btn => btn.textContent='');
        Players.setup({},{})
    });

})();
import './App.css';
import * as mui from '@mui/material'
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as Icons from '@mui/icons-material'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// initialize winning counts 

let xCount = 0, oCount = 0 , scoreTable = []

export default function App() {
 
  // CONFETTI DATA

  const { width, height } = useWindowSize()
 
  // theme handlers
  const [mode, setMode] = useState('dark')
  const themeMode = createTheme({
    palette: {
      mode: mode?'dark':'light',
    },
  });


// game box value initailize

  const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null])

// player state initialize

  const [isXturn, setIsXturn] = useState(null)

// DECIDE THE WINNER

const winnerDecider = ()=>{
  const winCond = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i = 0; i < winCond.length; i++){
    let [a,b,c] = winCond[i]
    if(board[a] !== null && board[a]===board[b] & board[b]===board[c]){
      
      
      // let xSide = {x: 'Won', o: 'Lose'}
      // let oSide = {x: 'Lose', o:'Won'}
      //  board[a] === 'O' ? scoreTable.push(oSide) : scoreTable.push(xSide)
      //  console.log(scoreTable)
       
      return board[a]
    }
  }
  return null
}

let winner = winnerDecider()

ScoreData(winner)

// GET THE MATCH IS GAME i.e NOBODY WON 

let isGame = drawLogic(winner, board)

// handle Value in the box -> x or o

const handleValue = (value, id) =>{
  if(!value && !winner && isXturn !== null){
    board[id] = isXturn? 'X' : 'O'
    setBoard([...board])
    setIsXturn(!isXturn)
  }else if(isXturn === null){

    // ALERT IF CLICK THE BOARD BEFORE TOSSED

  //   <mui.Stack sx={{ width: '100%' }} spacing={2}>
  //   <mui.Alert severity="info">This is an info alert — check it out!</mui.Alert>
  //  </mui.Stack>

    alert('Click the Toss button to Start the Game')
  }
}

// TOSS -> DECIDES THE FIRST PLAYER AND START THE GAME 

const toss = () => {
  Math.random() < 0.5? setIsXturn(true) : setIsXturn(false)
} 

// PLAY AGAIN
// GAME CONTINUES WITHOUT THE TOSS WITH LOSER'S TURN

const playAgain = () => setBoard([null,null,null,null,null,null,null,null,null])

// RESET 
// GAME RESTART FROM TOSS

const reset = () =>{
  setIsXturn(null)
  setBoard([null,null,null,null,null,null,null,null,null])
}

  return (
    <ThemeProvider theme={themeMode}>
      <mui.Paper sx={{minHeight:"100vh", borderRadius:"0px", marginBottom:"0"}}>
        <div className="full-Cont" >
          <h1 style={{width:"100%", textAlign:"center"}}>TIC TAC TOE
          <mui.IconButton onClick={()=>mode? setMode(false) : setMode(true)} color="inherit"> {mode? <Icons.DarkMode/> : <Icons.LightMode/> } </mui.IconButton>
          </h1>

          {/* game box */}

          <mui.Box className="game-cont">
            {
            board.map((value, id) => <GameBox key={id} value = {value} id= {id} handleClick = {()=> handleValue(value, id) } />)
            }  

            {/* winner announcement  */}

            {isGame? 
              <h2 className="winner-text">Game Match 
              <br/>
              <p style={{fontSize:"medium"}}> Nobody Won</p>
              <br/> 
              <mui.Button onClick={playAgain} ><Icons.Replay/> play again </mui.Button>
              </h2> 
              : 
              winner? 
              <h2 className="winner-text">Player {winner} 
              <br/> 
              <p style={{fontSize:"medium"}}> won the Game</p> 
              <br/> 
              <p style={{fontSize:"medium"}}>Won {winner === 'X' ? xCount : oCount} for {scoreTable.length} matches. </p> 
              <br/>
              <mui.Button onClick={playAgain}><Icons.Replay/> play again</mui.Button>
              <Confetti width={width} height={height} />
              </h2>
               : 
              <p></p>
            } 
          </mui.Box> 
        
        {/* SCORE BOARD */}

          <div className="score-board">
            <h1 style={{textAlign:"center", color:"rgb(179, 77, 77)"}} >Score Board</h1>
            <p style={{textAlign:"center"}} >
              {isXturn === null ? 
              <span>
                <mui.Button onClick = {toss} variant="contained" color="info" >Toss</mui.Button>
              </span>
               :
              <span>
                {isXturn? `Player X's Turn`: `Player O's Turn`} 
                <br/> 
                <mui.Button onClick= {reset}> Reset </mui.Button>
              </span>} 
            </p>
            <div className="score">
              <p> Match No. : {scoreTable.length+1} </p>
              <p>Player O : {oCount}</p>
              <p>Player X : {xCount}</p>
            </div>

            {/* score table */}
            
            <TableContainer component={mui.Paper}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Match No.</TableCell>
                    <TableCell>Player X</TableCell>
                    <TableCell>Player O</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scoreTable.map((winData, id) => (
                    <TableRow key={id}>
                      <TableCell>{id+1}</TableCell>
                      <TableCell >{winData.x}</TableCell>
                      <TableCell >{winData.o}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         
          </div>
        </div>
      </mui.Paper>
    </ThemeProvider>
  );
}

//SMALL BOXES IN THE GAME BOARD

let GameBox = ({value, handleClick, id}) =>{

  return (
    <div key={id} className="game-box" onClick= {handleClick}>
      <h1 className="value" >{value}</h1>
    </div>
  )
}

// RECORD EVERY MATCH PLAYED IN A SESSION - TEMPERARY DB

const ScoreData = (winner) =>{
  if(winner === 'X' && winner !== null){
    xCount=xCount+1;
    scoreTable.push({x: 'Won', o: 'Lose'})
  } 
  else if (winner === 'O' && winner !== null){
    oCount= oCount + 1
    scoreTable.push({x: 'Lose', o:'Won'})
  }
}

//Game Match Logic

const drawLogic = (winner, board) =>{
  if (board.filter((acc)=> !acc ).length === 0 && !winner) {
    scoreTable.push({x: 'Game', o: 'Game'})
    return true
  }
  return false
}
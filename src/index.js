import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 1つの正方形を定義している。
class Square extends React.Component {
  render() {
    return (
      //クリック時にBoardのprops.onClickを呼び出す。
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

// Squareを9つ並べたボードを定義している
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} // クリックされた時に、Gameのhandleclickを呼び出す。(何番目のタイルかを渡す)
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // historyにsquaresを配列で入れて履歴を保持する。
  // stepNumberで現在historyのどこにいるかを保持する。
  // xIsNextで次のplayerの情報を保持する。
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // historyに新しい履歴を追加する。現在のstepNumber + 1で追加する。
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // 不変データとする為に、squaresのコピーを作成している
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // 勝者が決まってる時と既に入力されてる時はクリックしても何もしない。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // playerがxの時はそのsquareをXに, 違かったらOにする。
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // squares, stepNumber, xIsNextを更新する。
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // stepNumberとxIsNextを更新する。(stepNumberが更新されるとタイルの情報がその時に書き換わる。)
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // historyの数だけ<li>を用意している。最初はGo to game startとなるようになってる。
    // stepをmoveに格納して展開している。
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // 一番親要素のrender
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// /public/index.html内の#rootに対してGameを返している。
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// 勝ちを判断する関数
function calculateWinner(squares) {
  // 全ての勝ちパターンを格納
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 勝ちパターンと実際の配列を比較して揃ってる場合は勝者(X or O)を返す
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
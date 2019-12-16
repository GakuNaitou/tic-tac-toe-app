import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 1つの正方形を定義している。
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

// Squareを9つ並べたボードを定義している
class Board extends React.Component {
  // サブクラスのコンストラクタを定義するときは常にsuperを呼び出す必要がある。
  // コンストラクターをもつ全てのReactコンポーネントクラスは、super(props)呼び出しで開始する必要がある。
  // Squareの状態を親であるBoardで配列で管理する
  // stateはコンポーネントに対してprivateなのでSquareから直接stateの更新はできない
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, // boolean型で次のプレイヤーを管理する
    }
  }

  handleClick(i) {
    // 不変データとする為に、squaresのコピーを作成している
    const squares = this.state.squares.slice();
    // 勝者が決まってる時と既に入力されてる時はクリックしても何もしない。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)} // onClickはクリックした時にSquareが呼び出すことができる関数
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    // もし勝者がいたらstatusをwinnerにする
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
    // 勝ちパターンと実際の配列を比較して揃ってる場合は勝者(X or 0)を返す
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 1つの正方形を定義している。
class Square extends React.Component {
  // サブクラスのコンストラクタを定義するときは常にsuperを呼び出す必要がある。
  // コンストラクターをもつ全てのReactコンポーネントクラスは、super(props)呼び出しで開始する必要がある。
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  // this.setStateが呼び出される度にSquareが再描画される。
  // また、コンポーネントの内部に子コンポーネントがある場合はそれも再描画される。
  render() {
    return (
      <button 
      className="square" 
      onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

// Squareを9つ並べたボードを定義している
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

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
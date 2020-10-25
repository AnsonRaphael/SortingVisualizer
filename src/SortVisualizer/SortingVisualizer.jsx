import React from "react";
import "./SortingVisualizer.css";
import { getbubbleSortAnimations } from "../sortingAlgorithm/bubbleSort";

var animationDone = true;

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      arrayOrginal: [],
      animation: [],
      arraySize: "10",
      animationSpeed: "0",
    };
    this.arraySizeChange = this.arraySizeChange.bind(this);
    this.arraySpeedChange = this.arraySpeedChange.bind(this);
  }

  componentDidMount() {
    this.resetArray();
  }

  bubbleSort() {
    // If animation in progress stop further processing
    if (!animationDone) {
      return;
    }
    animationDone = false;
    let { array } = this.state;
    let sortResult = getbubbleSortAnimations(array);
    let isAnimation = sortResult.isAnimation; // if onece array is already sorted dont animate again
    this.state.animation = sortResult.animation;
    if (isAnimation){
      animateArray(0, this.state, this.state.animation.length); 
    }else{
      animationDone=true;
    } 
    
    
  }

  resetArray() {
    // If animation in progress stop further processing
    if (!animationDone) {
      return;
    }
    animationDone = false;
    let array = [];
    const max = 500,
      min = 5;
    for (let i = 0; i < this.state.arraySize; i++)
      array.push(Math.floor(Math.random() * (max - min + 1) + min));

    let arrayOrginal = array.slice();
    let animation = [];
    this.setState({ array });
    this.setState({ arrayOrginal });
    this.setState({ animation });

    let arrayList = document.getElementsByClassName("array-bar");
    this.render();
    // make sure already done bars to default color
    for (let i = 0; i < arrayList.length; i++)
      arrayList[i].style.backgroundColor = "blueviolet";

    animationDone = true;
  }
  arraySizeChange(event) {
    this.setState({ arraySize: event.target.value });
  }
  arraySpeedChange(event) {
    this.setState({ animationSpeed: event.target.value });
  }
  render() {
    const { array } = this.state;

    return (
      <div>

      <div className="navbar">
       
        <label htmlFor="arrayS">Array Size (1 to 100) : </label>
        <input
          id="arrayS"
          type="text"
          value={this.state.arraySize}
          onChange={this.arraySizeChange}
        />

        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.bubbleSort()}>Bubble sort</button>
        <label htmlFor="speed">Animation Speed </label>
        <input
          id="speed"
          type="range"
          min="0"
          max="10"
          value={this.state.animationSpeed}
          onChange={this.arraySpeedChange}
        />
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function animateArray(p, state, length) {
  setTimeout(function () {
    const arrayList = document.getElementsByClassName("array-bar");
    if (state.animation[p].comparisonSwap) {
      let m = state.animation[p].comparisonSwap[0];
      let n = state.animation[p].comparisonSwap[1];
      arrayList[m].style.backgroundColor = "red";
      arrayList[n].style.backgroundColor = "red";
      arrayList[m].style.height = `${state.arrayOrginal[n]}px`;
      arrayList[n].style.height = `${state.arrayOrginal[m]}px`;
      let temp = state.arrayOrginal[n];
      state.arrayOrginal[n] = state.arrayOrginal[m];
      state.arrayOrginal[m] = temp;
    }
    if (state.animation[p].comparison) {
      let m = state.animation[p].comparison[0];
      let n = state.animation[p].comparison[1];
      arrayList[m].style.backgroundColor = "blue";
      arrayList[n].style.backgroundColor = "blue";
    }
    if (state.animation[p].comparisonDone) {
      let m = state.animation[p].comparisonDone[0];
      let n = state.animation[p].comparisonDone[1];
      arrayList[m].style.backgroundColor = "blueviolet";
      arrayList[n].style.backgroundColor = "blueviolet";
    }
    if (state.animation[p].done) {
      let m = state.animation[p].done[0];
      arrayList[m].style.backgroundColor = "green";
    }

    p = p + 1;
    if (p < length) {
      animateArray(p, state, length);
    } else {
      animationDone = true;
    }
  }, state.animationSpeed * 100);
}

export default SortingVisualizer;

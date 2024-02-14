import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import questions from './data/questions';

function App() {
  let amounts = [200, 400, 600, 800, 1000];
  let categories = questions.map((dataObject) => {
    return dataObject.category;
  });

  let [clickableCells, setClickableCells] = useState([]);

  useEffect(() => {
    let tableArray = [];
    for (let i = 0; i < amounts.length; i++) {
      let tableRow = [];
      for (let j = 0; j < categories.length; j++) {
        tableRow.push(true);
      }
      tableArray.push(tableRow);
    }

    setClickableCells(tableArray);
  },[]);


  const handleCellClick = (row, column) => {
    // Set value for given cell to false (aka unclickable)
    let clickableCellsCopy = [...clickableCells];
    clickableCellsCopy[row][column] = false;
    setClickableCells(clickableCellsCopy);
  }

  const isCellClickable = (row, column) => {
    return clickableCells[row][column];
  }

  return (
    //<div className="App">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {
                categories.map((categoryName) => {
                  return(
                    <th className='header-cell'>{categoryName}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              clickableCells.map((row, rowIndex) => {
                return (
                  <tr>
                    {
                      row.map((cellValue, colIndex) => {
                        return cellValue === true ?
                          <td
                            className='table-cell active'
                            onClick={() => {
                              handleCellClick(rowIndex, colIndex);
                            }}
                          >
                            ${amounts[rowIndex]}
                          </td>
                         :
                          <td className='table-cell disabled'></td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    //</div>
  );
}

export default App;

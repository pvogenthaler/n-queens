/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  var row = [];

  for (var i = 0; i < n; i++) {
    row.push(0);
  }

  for (var i = 0; i < n; i++) {
    var temp = row.slice();
    temp[i] = 1;
    solution.push(temp);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.findNRooksSolution(3);

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  if (n === 1) {
    return 1;
  } else {
    return n * window.countNRooksSolutions(n - 1);
  }

  // return 
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var row = [];

  if (n === 1) {
    solution.push([1]);
  } else if (n === 2 || n === 3) {
    var board = new Board({n : n});
    solution = board.attributes;
  } 
  else if (n > 3) {

    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    // for (var j = 0; j < n; j++) {
    //   solution.push(row);
    // }


    var i = -1;

    for (var j = 0; j < n; j++) {
      var dup = row.slice();
      i += 2;
      if (i >= n) {
        i = 0;
      }
      dup[i] = 1;
      solution.push(dup);
    }
  }
  // _.each(solution, function (r) {
    
  //   i += 2;
  //   if (i > n) {
  //     i = 0;
  //   }
  //   r[i] = 1;
  //   console.log("row for nqueens", r);
  // });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.findNQueensSolution(4);

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

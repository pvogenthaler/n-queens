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
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board(findNRooksSolution(n));
  var board = matrix.rows();

  var recurse = function(combosLeft, result) {
    if (n === 0) {                                    // exception
      return solutionCount++;
    } else if (combosLeft === 0) {                    // base
      var temp = new Board(result);
      if (!temp.hasAnyRooksConflicts()) {
        solutionCount++;
      }
      return;
    } else {                                          // recursive
      for (var i = 0; i < board.length; i++) {
        recurse(combosLeft - 1, result.concat([board[i]]));
      };
    }
  }

  recurse(n, []);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
  } else if (n > 3) {
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
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

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  // create results counter, combinations array, matrix obj, and board []
  var solutionCount = 0;
  var matrix = new Board(findNRooksSolution(n));
  var board = matrix.rows();

  var recurse = function(combosLeft, result) {
    if (n === 0) {                                    // exception
      return solutionCount++;
    } else if (combosLeft === 0) {                    // base
      var temp = new Board(result);
      if (!temp.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      return;
    } else {                                          // recursive
      for (var i = 0; i < board.length; i++) {
        recurse(combosLeft - 1, result.concat([board[i]]));
      };
    }
  }

  recurse(n, []);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
}
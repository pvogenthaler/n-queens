// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      var matrix = this.attributes;
      var row = matrix[rowIndex];
      // console.log (this)
      // console.log ("row is", row);
      _.each(row, function (item) {
        
        if (item === 1) {
          counter += 1;
        }
      });
      // console.log(counter);
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var output = false;
      var matrix = this.attributes;
      _.each (matrix, function (row, index) {
        if (output === false) {
          output = this.hasRowConflictAt(index);
        }
      }, this);
      return output;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var counter = 0;
      var matrix = this.attributes;
      _.each(matrix, function(row) {
        if (row[colIndex] === 1) {
          counter++;
        }
      });
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var output = false;
      var matrix = this.attributes;
      _.each (matrix, function (row, index) {
        if (output === false) {
          output = this.hasColConflictAt(index);
        }
      }, this);
      return output;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var i = majorDiagonalColumnIndexAtFirstRow;
      var matrix = this.attributes;
      var counter = 0;
      _.each(matrix, function (row) {
        if (row[i] === 1) {
          counter++;
        }
        i++;
      });
      return counter > 1;
    },

    hasMajorDiagonalConflictAtReverse: function(majorDiagonalColumnIndexAtLastRow) {
      var i = majorDiagonalColumnIndexAtLastRow;
      var matrix = this.attributes;
      var counter = 0;
      var length = this.get('n');
      for (var j = length - 1; j >= 0; j--) {
        if (matrix[j][i] === 1) {
          counter++;
        }
        i--;
      }
      return counter > 1;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // iterate with for loop through the matrix for i from 0 to n - 1
      var matrix = this.attributes;
      var length = this.get('n') - 1;
      var output = false;
      _.each(matrix, function (row) {
        _.each(row, function (item, index) {
          if (output === false) {
            output = this.hasMajorDiagonalConflictAt (index);
          }
        }, this);
      }, this);

      for (var i = length; i >= 0; i--) {
        for (var j = length; j >= 0; j--) {
          if (output === false) {
            output = this.hasMajorDiagonalConflictAtReverse(j);
          }
        }
      }

      return output;


      // var storage = [];
      // var matrix = this.attributes;
      // _.each(matrix, function (row, i) {
      //   _.each(row, function (item, j) {
          
      //     if (item === 1) {
      //       storage.push([parseInt(i), j]);
      //     }
      //   });
      // });
      // console.log(storage);

      // _.each(storage, function (positon) {
      //   if (_.contains(storage, [positon[0] + 1, positon[1] + 1])) {
      //     return true;
      //   }
      // });
      // return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var storage = [];
      // _.each(this, function (row, i) {
      //   var item = row [minorDiagonalColumnIndexAtFirstRow];      
      //   if (item === 1) {
      //     storage.push([i, j]);
      //   }
        
      // });

      // _.each(storage, function (positon) {
      //   if (_.contains(storage, [positon[0] + 1, positon[1] + 1])) {
      //     return true;
      //   }
      // });
      // return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //storage array
      //same double each iterations
      //look at each in storage
      //  check if [position[0] + 1, position[1] - 1] is in storage
      // if so, return true
      //outside each, return false
      var storage = [];
      var matrix = this.attributes;
      _.each(matrix, function (row, i) {
        _.each(row, function (item, j) {
          if (item === 1) {
            storage.push([i, j]);
          }
        });
      });

      _.each(storage, function (positon) {
        if (_.contains(storage, [positon[0] + 1, positon[1] - 1])) {
          return true;
        }
      });
      return false;
    },

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

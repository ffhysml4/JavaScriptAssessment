
const prompt = require('prompt-sync')({ sigint: true });


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

class Field {

    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;

    }

    generateField(percentage) {
        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {

                const prob = Math.random();

                this._field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }
        // Set the "home" position before the game starts
        this._field[0][0] = pathCharacter;

        // set the hat location 
        const hatPlacement = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };
        // makw sure the hat is not at the starting point
        // While the hat location equals the start location, get a different random number
        while (hatPlacement.x === 0 && hatPlacement.y === 0) {
            // update the hatPlacement 'x' with new random number
            hatPlacement.x = Math.floor(Math.random() * colNum);
            // update the hatPlacement 'y' with new random number
            hatPlacement.y = Math.floor(Math.random() * rowNum);
        }
        // set the non-starting array location for the y and x arrays index as the hatPlacement/hat symbol '^'
        this._field[hatPlacement.y][hatPlacement.x] = hat;

        return this._field;


    }

    runGame() {
        let playing = true;
        console.log("Start Game");
        while (playing) {
            this.print(); //print field
            this.askQuestion();
            if (!this.isBoundaries()) {
                console.log('Out of bounds, you lose!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Fell into the hole, you lose!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you have found your hat!');
                playing = false;
                break;
            }
            // If the player hasn't died or found their hat update the current location on the map
            this._field[this._locationY][this._locationX] = pathCharacter;
        }
    }

    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion() {

        const direction = prompt('Which way? ').toUpperCase();
        switch (direction) {
            case 'U':
                this._locationY -= 1;
                break;
            case 'D':
                this._locationY += 1;
                break;
            case 'L':
                this._locationX -= 1;
                break;
            case 'R':
                this._locationX += 1;
                break;
            /*case (!this.isBoundaries):
                console.log('Out of bounds, you loser!');
                playing = false;*/

            // the default case will inform the player that they've entered an invalid input and prompt again
            default:
                console.log('Enter U, D, L, or R. ');
                this.askQuestion();
                break;
        }
    }
    isBoundaries() {
        return (this._locationY >= 0 && this._locationX >= 0 && this._locationY < this._field.length && this._locationX < this._field[0].length);
    }
    //check if the coordinates are equal to the 'hat' symbol '^' when called and return true or false
    isHat() {
        return this._field[this._locationY][this._locationX] === hat;
    }
    // Method to check if the coordinates are equal to the 'hole' symbol 'O' when called and return true or false
    isHole() {
        return this._field[this._locationY][this._locationX] === hole;
    }





}

const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();
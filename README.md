# 🎮 Tic Tac Toe – Vanilla JS Edition

A browser-based implementation of the classic Tic Tac Toe game built with **JavaScript**, **HTML**, and **CSS** using modular, maintainable code practices.

---

## 🚀 Features

- 🔒 **Encapsulated logic** using IIFEs and factory functions – no global variables.
- 🎯 **Single-use click listeners** for cells to avoid multiple markings.
- 👨‍👩‍👧 Player names are input dynamically.
- 🎨 Responsive and styled game board with hover and click effects.
- 🔄 **Reset functionality** to replay the game easily.
- 🧠 Game logic handles **win conditions**, **tie detection**, and **turn switching**.

---

## 🧩 Project Structure

### 📁 `index.html`
- Contains the DOM structure: player inputs, game board, message display, and reset/start buttons.

### 🎨 `styles.css`
- Clean and interactive design using:
  - `box-shadow`, `border-radius`, and `linear-gradient`
  - Hover, active, and focus effects
  - Neumorphic styling for modern UX

### 🧠 `script.js`
Organized in modular IIFEs:

#### 🔹 `gameBoard`
- Stores the 3x3 board as a 2D array.
- Functions:
  - `addMark(mark, x, y)`
  - `getBoard()`
  - `resetBoard()`

#### 🔹 `Players`
- Creates and manages two player objects with:
  - Name
  - Mark (`x` or `o`)
  - Turn state
- Uses prototype for `toggleTurn()`
- Exposes `setup()`, `switchTurn()`, and `getPlayers()`

#### 🔹 `Controller`
- Handles:
  - Determining whose turn it is (`checkTurn`)
  - Checking rows, columns, diagonals for win
  - Detecting ties
  - Central `playGame(x, y)` method for progressing game state

#### 🔹 `DOM`
- Binds the UI to logic:
  - Captures player input
  - Dynamically attaches listeners to cells
  - Updates game messages
  - Handles start/reset behavior
  - Uses `{ once: true }` on listeners to ensure proper game flow

---

## 🧪 How It Works

1. Players input their names and press **Start**.
2. A 3x3 grid appears. Players alternate turns, marking either X or O.
3. The game logic checks for a winner or a tie after every move.
4. When a result is found, it’s shown on screen.
5. Press **Reset** to clear the board and start over with the same or new players.

---

## 🛠️ Concepts Practiced

- **Factory Functions** and **Prototypes**
- **Module Pattern** using IIFEs
- **Event Handling** and `{ once: true }`
- **DOM Manipulation**
- **Encapsulation** and Clean Architecture

---

## 🧼 Future Improvements

- Add score tracking across rounds
- Highlight the winning line
- Add AI for single-player mode
- Make it mobile-friendly

---

> Designed with clean code and simplicity in mind 💡


# Calculator-App
A user-friendly calculator application built with React Native. This app provides basic arithmetic operations, history tracking, and a clean, responsive interface.


---


## Features
- **Basic Operations:** Addition, subtraction, multiplication, division, and modulo.
- **History Tracking:** View the history of your calculations.
- **Clear Input:** Reset the input and result with a single tap.
- **Backspace Functionality:** Easily delete the last entered character.
- **Custom Styling:** User-friendly buttons with distinct colors for special operations.
- **Responsive UI:** Works seamlessly across various screen sizes.


---
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hemant177/calculator-App.git
   cd Calculator-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npx react-native run-android
   # or for iOS
   npx react-native run-ios
   ```

---

## Screenshots

![image](https://github.com/user-attachments/assets/a1243821-c5c8-4977-9459-19a115e5cd90)


---

## Usage

- Tap the buttons to perform calculations.
- Use `AC` to clear all inputs.
- Use `←` to delete the last character.
- Tap `H` to open the history of calculations.
- Tap `=` to evaluate the entered expression.

---

## Code Highlights

### Styling Special Buttons
```javascript
styles.deleteButton = {
  backgroundColor: '#FF9500',
};
styles.equalButton = {
  backgroundColor: '#28a745',
};
```

### Handling Button Press
```javascript
const handlePress = (value) => {
  if (value === 'AC') {
    setInput('0');
    setResult('');
  } else if (value === '\u2190') {
    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  } else if (value === 'H') {
    setModalVisible(true);
  } else if (value === '=') {
    try {
      const evalResult = eval(input);
      setResult(evalResult.toString());
      setHistory((prevHistory) => [...prevHistory, `${input} = ${evalResult}`]);
    } catch (error) {
      setResult('Error');
    }
  } else {
    setInput((prev) => (prev === '0' ? value : prev + value));
  }
};
```
---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

---

## Acknowledgments

- Special thanks to [React Native](https://reactnative.dev/) for making mobile development easy and efficient.
- Icon and graphics inspiration from modern UI design.

---

## Author

Developed by **Hemant Patil**.

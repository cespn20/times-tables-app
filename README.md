# Times Tables Practice App

An interactive web application to help users practice and learn multiplication tables.

## Features

- Practice specific multiplication tables (1-12) or random combinations
- Combined practice modes (e.g., "2, 4" for practicing both 2 and 4 times tables)
- Immediate feedback on answers
- Track correct answers and total attempts
- Clean, modern user interface
- Keyboard support (Enter to submit answer)

## Setup Instructions

### Prerequisites
1. Install Python (version 3.7 or higher)
   - Download Python from: https://www.python.org/downloads/
   - During installation, make sure to check "Add Python to PATH"

### Running the App
#### Easy Method (Windows)
1. Simply double-click the `start_app.bat` file
2. The app will automatically install required packages and start
3. Wait for your web browser to open, or visit `http://localhost:5000` manually

#### Manual Method (Alternative)
1. Open a command prompt in the app directory
2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the application:
   ```
   python app.py
   ```
4. Open your web browser and navigate to `http://localhost:5000`

## How to Use

1. Select a specific times table to practice or choose "Random" for mixed practice
   - Use "2, 4" option to practice both 2 and 4 times tables together
2. Enter your answer in the input field
3. Click "Check Answer" or press Enter to submit
4. Receive immediate feedback on your answer
5. The next problem will be generated automatically

## Troubleshooting

If you encounter any issues:
1. Make sure Python is installed and added to PATH
2. Try running the commands manually in a command prompt
3. Check that no other application is using port 5000
4. Make sure all files are in the same directory

## Technologies Used

- Backend: Python/Flask
- Frontend: HTML, CSS, JavaScript
- No external JavaScript libraries required

# Project: Dispense 💡
## Description
<img style="float: right;" height="50px" src="https://user-images.githubusercontent.com/65508654/221480772-26c8019f-c43c-4d5f-9e2f-04e259098924.png"> <img style="float: left;" height="50px" src="https://user-images.githubusercontent.com/65508654/221481520-8f30ef59-9671-402d-b4d2-5ee2b4b41420.png">

Google Developer Student Club project at William & Mary to build a vending machine for the Entrepreneurship Center.

## Setup
### 1. Prerequisites
* [Python](https://www.python.org/downloads/) v.3.11.*
* [Node.js](https://nodejs.org/en/) v.19.* **Very important! You need the `fetch` library.** 

### 2. Download
Clone this repository to your computer
```Bash
git clone https://github.com/jasonycin/project_dispense.git # Download files
cd project_dispense # Change into downloaded directory
```

### 3. Install Python dependencies
All of the required dependencies have been laid out in a `requirements.txt` file.
```Bash
cd scripts
pip install -r requirements.txt
```

### 4. Setup server
This project uses the [Ts.ED](https://tsed.io/) framework for the server which is built upon Node.js and utilizes TypeScript.  

Install the Ts.ED CLI for easily adding tools and files to the project.
```Bash
npm install -g @tsed/cli # You may need sudo privileges
```
Install required dependencies for the NPM project.
```Bash
cd server
npm install # Installs dependencies
```
> 🚨 If you're missing the .env file, obtain permission and [download](https://drive.google.com/file/d/1-tLHlH-VEuKWzolH9jh_zLcyXtPzguAI/view?usp=share_link) it to the `server` directory. You will need to rename the file and add a `.` in the front❗️
```Bash
npm start # Hope it works ✨!
```

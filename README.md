## How to run Backend ?
- Clone the repository.
- Make sure you have python 3.9.x installed in your system, higher versions of python may cause problems, so please downgrade.
- In vscode terminal do `cd backend`
- Then craete a virtual environment `python -m venv venv`
- Activate the virtual environment for the workspace `venv\Scripts\activate`
- Install all the dependencies `pip install -r requirements.txt`
- Run the application `python run.py`

  The backend server will run on port 5000 by default.

  Use *http://localhost:5000* as the base url for routing.



## How to run frontend ?
- Clone the repository.
- In vscode terminal do `cd frontend`
- Run `npm i`
- Run `npm run dev`
- The app runs at *http://localhost:5173/predict*.

 Make sure the backend is also running at port 5000 for disease prediction to work.

# FastAPI Running Log App
![](gif/example.gif)

Create and activate a virutal environment:
```
PS> python -m venv venv
PS> venv\Scripts\activate
```
To install FastAPI:
```
pip install fastapi
pip install "uvicorn[standard]"
```
You could also install all necessary packages using:
```
pip install -r requirements.txt
```
Install the following to connect backend and frontend:
```
pip install fastapi-cors
```
To start the application:
```
(venv) PS> uvicorn app:app --port 8000 --reload
```
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from router import router

app = FastAPI()

# Mount the 'static' directory to serve static files
app.mount('/static', StaticFiles(directory='static'), name='static')

app.include_router(router)
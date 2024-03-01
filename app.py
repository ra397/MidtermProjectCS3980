from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from router import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Mount the 'static' directory to serve static files
app.mount('/static', StaticFiles(directory='static'), name='static')

app.include_router(router)
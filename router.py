from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()

@router.get('/', response_class=FileResponse)
async def welcome():
    return FileResponse('static/index.html')

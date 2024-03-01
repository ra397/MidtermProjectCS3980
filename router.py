from fastapi import APIRouter, status
from fastapi.responses import FileResponse, JSONResponse
from fastapi.encoders import jsonable_encoder
from model import RunEntry, RunRequest
from typing import List

router = APIRouter()

run_entries = []
current_id: int = 0

@router.get('/', response_class=FileResponse)
async def welcome():
    return FileResponse('static/index.html')

@router.post('/runs/')
async def add_run(run: RunRequest) -> dict:
    # update the ID 
    global current_id
    current_id += 1

    # create new run entry and added to the run entries
    new_run = RunEntry(id=current_id, title=run.title, num_miles=run.num_miles, time_elapsed=run.time_elapsed)
    run_entries.append(new_run)
    json_compatible_run_data = new_run.model_dump()

    print(len(run_entries))

    # send JSON response to validate the POST was successful
    return JSONResponse(json_compatible_run_data, status_code=status.HTTP_201_CREATED)

@router.get('/runs/', response_model=List[RunEntry])
async def get_runs():
    json_compatible_run_data = jsonable_encoder(run_entries)
    return JSONResponse(content=json_compatible_run_data)
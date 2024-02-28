from fastapi import APIRouter

router = APIRouter()
todo_list = []

@router.post('/todos')
async def add_todo(todo: dict) -> dict:
    todo_list.append(todo)
    return {'message' : 'Task added successfully'}

@router.get('/todos')
async def get_todos() -> dict:
    return {'todos': todo_list}
from pydantic import BaseModel

class RunEntry(BaseModel):
    id: int
    title: str
    num_miles: float
    time_elapsed: float

class RunRequest(BaseModel):
    title: str
    num_miles: float
    time_elapsed: float
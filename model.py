from pydantic import BaseModel

class RunEntry(BaseModel):
    id: int
    title: str
    num_miles = float
    num_minutes = float
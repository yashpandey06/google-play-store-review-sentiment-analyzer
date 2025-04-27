from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    
    ALLOWED_ORIGINS: List[str] = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    
    DEFAULT_REVIEWS_COUNT: int = 100
    BATCH_SIZE: int = 5
    BATCH_DELAY: float = 1.0  # seconds

    class Config:
        env_file = ".env"

settings = Settings()

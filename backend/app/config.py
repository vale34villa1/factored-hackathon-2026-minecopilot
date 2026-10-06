from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "MineCopilot AI"
    environment: str = "development"
    log_level: str = "INFO"
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"
    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

"""Entrypoint of backend API exposing the FastAPI `app` to be served by an application server such as uvicorn."""

from fastapi import FastAPI
from .api import static_files

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

description = """
Welcome to the Computer Science Experience Labs' Connected by AI.
"""

app = FastAPI(
    title="Connected by AI",
    version="0.0.1",
    description=description,
)

app.mount("/", static_files.StaticFileMiddleware(directory="./static"))
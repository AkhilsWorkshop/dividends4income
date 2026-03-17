import uvicorn

def main():

    uvicorn.run(
        "app.main:app",
        host="localhost",
        port=3001,
        reload=True
    )

if __name__ == "__main__":
    main()
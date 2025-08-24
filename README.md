# Exam Paper Generator

AI Exam Paper Generator For Primary School Math Teachers

## Worktree

[exam-paper-generator](https://github.com/ChetanSaini726/exam-paper-generator/tree/main)

- [frontend](https://github.com/ChetanSaini726/exam-paper-generator/tree/frontend)
- [backend](https://github.com/ChetanSaini726/exam-paper-generator/tree/backend)

## Setup

```bash
git worktree add ./frontend frontend
git worktree add ./backend backend

npm i
```

## Run (Locally using npm)

```bash
npm run build && npm start # Builds and then starts frontend

# Do run in a separate terminal
npm run server # starts backend
```

> [!CAUTION]
> Only use while developing
>
> ```bash
> npm run full # Runs both frontend and backend simultaneously
> ```

## Run (Locally using docker)

```bash
docker-compose up -d # or 'npm run docker'
```

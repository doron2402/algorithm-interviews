# Worker

Write a simple worker which perform asynchronous tasks

## specs
 - A worker can only execute a defined amount of tasks at a time (max concurrency depending on the server it is deployed on).
 - We must be able to deploy multiple instances to increase the global amount of tasks performed simultaneously.
 - Each task can only be performed once (if successful)
 - If a task fails, it should be aotomatically retried.
 - If a task fails 3 times, it should not be retried anymore.


## Env'
- Node v6.0.0 and newer


## Doron


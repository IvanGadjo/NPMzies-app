### Docker commands

| Command                           | Effect                                                      |
| --------------------------------- | ----------------------------------------------------------- |
| docker build -t myImg .           | build image (choose a random name)                          |
| docker run -it myImg              | run image                                                   |
| docker run -it -d myImg           | run in background                                           |
| docker ps                         | list all running images                                     |
| docker stop \<hashOfImg>          | stop container                                              |
| docker exec -it \<hashOfImg> bash | if container runs in bg, go to CMD in the Dockerfile        |
| docker run -it -p 3002:8080 myImg | forward port 3002 of container to port 8080 of your machine |

- with every change of Dockerfile, you need to build it
- in the Dockerfile, _CMD_ executes on every run, _RUN_ executes on every build

### Docker-compose commands

| Command                                         | Effect                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| docker-compose build                            |                                                                  |
| docker-compose run \<myService>                 | \<myService> - the name of the service in the dockercompose yaml |
| docker-compose run --service-ports \<myService> | run, but use _ports_ prop in docker-compose file                 |
| docker-compose down                             | kill all images                                                  |
| docker-compose up --build                       | build & start                                                    |
| docker-compose up -d --build                    | build & start in bg                                              |
| docker-compose exec \<myService> bash           | start & enter bash shell of container                            |

- always start containers with _up_, not with _run_. Otherwise the container name is hashed and you cannot kill it with _down_, only via the GUI
- Flow: down -> make changes -> up -> down ....

Nice overview of docker-compose: https://www.linux.com/topic/cloud/docker-volumes-and-networks-compose/

### Drizzle commands

- On schema update, first run _npm run generate-migration_, then _npm migrate_

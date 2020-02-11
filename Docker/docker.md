# Docker
Docker is a containerization technology that uses OS level virtualization to delivers softwares in packages called containers. It aims to package software into standardized units for development, shipment and deployment. 

The term Docker may refer to any of the following:
- the containerization technology/software
- the open source Docker community
- the company Docker Inc. that builds on top of the work by docker community and gives back the advancements. It then provides it to their enterprise clients. 

Read more:
- https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/
- https://slideshare.net/GiacomoVacca/docker-from-scratch
- https://www.redhat.com/en/topics/containers/what-is-docker

## Why is Docker used?

Docker is used to containerize apps and ship them conveniently for deployment. Developers have their own environment. Other developers have different environment. A business will have its own production and development environment. To ensure that your application works on their environment you'll have to emulate those environments locally but also prevent the overhead of recreating the environment. Containerization helps to achieve this by packaging your apps, their dependencies, files etc into a single container. This container can then be sent to any environment and be run just as expected. 

Some example scenario:
- Your developers write code locally and share their work with their colleagues using Docker containers.
- They use Docker to push their applications into a test environment and execute automated and manual tests.
- When developers find bugs, they can fix them in the development environment and redeploy them to the test environment for testing and validation.
- When testing is complete, getting the fix to the customer is as simple as pushing the updated image to the production environment.

Read more: 
- https://www.redhat.com/en/topics/containers/whats-a-linux-container
- https://docs.docker.com/engine/docker-overview/#docker-architecture
  
## Docker features 

- Secure: Docker provides strongest default isolation capabilities
- Lightweight: It shares linux kernel instead of creating new virtual machines.
- Portable: Creates containers that run across multiple environments
- Modular: Supports micro-service approach where one part of the application can be brought down without affect the whole app. 

## How does Docker work?

Docker uses the host linux kernel instead of creating a new virtual machine. It makes use of Control Groups(`cgroups`) and `namespaces` to create independent and separated processes. it creates and makes use of Linux Containers. They are a set of one or more processes that are isolated from rest of the system. All files needed for running these processes are provided from a distinct image file. 

Read more: 
- https://www.redhat.com/en/topics/containers/whats-a-linux-container

## Architecture

Docker engine is a client server application which consists of the following components:

Add image: https://docs.docker.com/engine/images/engine-components-flow.png

- Docker daemon: the server, `dockerd` is a long running process. It manages images, containers, networks etc. 
- REST API: which specifies interfaces for interacting with the daemon.
- Command line interface (CLI): the Docker client, it interacts with the Docker daemon using the REST APIs. 

Add image: https://docs.docker.com/engine/images/architecture.svg

- Docker daemon: it is the system that runs the `dockerd` daemon server. It can be different from the client system.
- Docker client: it is the system that runs `docker` client program. 
- Docker registries: it stores Docker images. By default Docker looks for images in the Docker Hub public registry. it can be configured to use private registries. 

## Docker objects (components)

### Images

Images are a stack of layers which are often based on some other read-only images. For example you image could be using ubuntu as the base image and then install node on it. Images contain all data and dependencies on which your app runs. This image can then be shared on a Docker registry. Images need to be built using Dockerfile or they need to be committed while they are running. When we use a Dockerfile to build images only those layers are built which have been modified by the instructions in the Dockerfile and the ones after that. This is know as layer caching.

For example:
```
FROM rails:onbuild
ENV RAILS_ENV production
ENTRYPOINT ["bundle", "exec", "puma"]
```

In this dockerfile, we first take the base image as `rails:onbuild` which already has many layers. On top of this we set the environment thus adding another layer. On top of that we call `bundle exec puma` which adds another layer to the image. 

- Layers
  - https://medium.com/@jessgreb01/digging-into-docker-layers-c22f948ed612
  - https://stackoverflow.com/questions/31222377/what-are-docker-image-layers

### Containers

Containers are running instances of images. Multiple containers can be made to run on the host which are well isolated from each other. The state of the container can be committed to create a new image. Containers are defined by the configurations present in the images as well as those provided while starting it. When a Docker container is stopped, any changes that are not stored in persistent storage, are lost. 

Read more:
- https://www.docker.com/resources/what-container
- https://docs.docker.com/engine/docker-overview/#docker-architecture

### Services

Services allows one to deploy containers across multiple Docker daemons which work together as a swarm. A service allows you to set the desired state, such as number of replicas at a particular time. To the consumer, Docker service looks like a single service where as in the background it is multiple daemons communicating and orchestrating with each other using REST APIs. Docker service is know as `docker swarm` where as the most popular one right now is Kubernetes. 

### Volumes

When we start a container, Docker takes the read-only image and adds a read-and-write layer on top of it. While running if a file needs to be modified, first the file is copied from the read-only layer to the read-and-write layer and then the change is made. When a Docker container is deleted the read-and-write layer is destroyed is along with it and thus the modified file is lost. 

In order to persist data and to share data between containers, volumes are used. Volumes are pointers to file or directories on the host system that are mounted onto the containers. Volume acts persistent storage for the containers. The files present in the volume on the host is also present inside the container. Also any changes being made to these files/directories inside the containers are reflected on the host as these volumes are only pointers to the actual files on the host. 

Read more:
- https://blog.container-solutions.com/understanding-volumes-docker

### Networks

Networks in Docker is used to allow communication between containers and/or hosts. By default Docker has 3 networks of 3 types:

1. Bridge: Containers attach to this network by default. Used when multiple containers needs to communicate on the same host. An IP is allocated to each container. 
2. Host:  Is a special network which skips the virtual networking of docker and attach the container directly to host interface. It's really not recommended but, in certain situations, can improve the performance of high throughput networking and in other, you will loose out of few benefits of containerization.
3. None: Used to disable all networking.

Read more:
- https://stackoverflow.com/questions/41083328/what-is-the-use-of-host-and-none-network-in-docker
- https://docs.docker.com/network/

#### Published ports

By default no ports is exposed to the outside world by Docker. Internally containers can access the ports to another containers but this is now allowed for objects residing outside the Docker instance. For this ports can be published to the host there by allowing communications with the outside world. -p or --publish is used to create a firewall rule which maps a container port to a port on the Docker host. 

## Docker commands

### Image commands

- List all images
  - `docker image ls`
  - `docker images`
- Remove image
  - `docker rmi <IMAGE-ID>`
  - `docker rmi <USERNAME>/<IMAGE-NAME>:<:TAG>`
  - Example: `docker rmi AS65C78HU9SH`
- Build image from Dockerfile
  - `docker build -t <USERNAME>/<IMAGE-NAME>:<:TAG> <DOCKERFILE-PATH>` 
  - Example: `docker build -t rishavanand:latest .`
- Tag an image
  - `docker tag <USERNAME>/<IMAGE-NAME> <MY-USERNAME>:<TAG>` or `docker tag <IMAGE-ID> <MY-IMAGE>:<TAG>`
  - Example: `docker tag AS65C78HU9SH rishavanand:latest`
- Export image
  - `docker save -o <FILENAME>.tar`
- Load image
  - `docker load -i <FILENAME>.tar`
- Push image to registry
  - `docker push <REGISTRY-SERVER-ADDRESS>/<USERNAME>/<IMAGE-NAMGE>:<TAG>`
  - Example: `docker push registry-host:5000/rishavanand/website:v2`
  - Note: If register server address is not specified, Docker hub is taken as default.

### Container commands

- List containers
  - `docker ps`
    - all running containers
  - `docker ps -a `
    - all containers
- Run a container
    - interactive mode
      - `docker run -it <IMAGE-NAME|IMAGE-ID> /bin/bash`
    - detached mode
      - `docker run --name my-webapp -d <IMAGE-NAME|IMAGE-ID>`
    - with container name
      - `docker run --name my-webapp -d <IMAGE-NAME|IMAGE-ID>`
    - with port publishing
      - `docker run -d -p 8080:8080 <IMAGE-NAME|IMAGE-ID>`
    - with particular network attachment
      - `docker run -d --net <NETWORK-NAME> <IMAGE-NAME|IMAGE-ID>`
    - with mounted folder
      - `docker run -v myfolder:/root/app <IMAGE-NAME|IMAGE-ID>`
- Logs
  - `docker logs -f <CONTAINER-ID|CONTAINER-NAME>`
- Stop a container
  - `docker stop <CONTAINER-ID|CONTAINER-NAME>`
- Remove container
  - Normal remove
    - `docker rm <CONTAINER-ID|CONTAINER-NAME>`
  - Force remove
    - `docker rm -f <CONTAINER-ID|CONTAINER-NAME>`
- Execute process inside a container
  - `docker exec -it <IMAGE-NAME|IMAGE-ID> bash`

### Network commands

### Registry commands

### Volume commands

## Dockerfile
- Every command creates a new layer and while updating image only the modified layer needs to be pulled/pushed thereby reducing transfer size. 

## Dockerfile commands

## Tips and tricks

### Cleaning

### Commit vs Dockerfile

### Changes after volume in dockerfile are not made

Read more:
https://stackoverflow.com/questions/26110828/should-i-use-dockerfiles-or-image-commits

## Appendix

### Virtual machines vs Docker
- Virtual machine includes all applications, binaries and libraries to run the guest operating system
- Containers include the application and their dependencies but share kernel with the host

### Docker on Linux machine vs on OSX/Windows
- https://www.guru99.com/docker-tutorial.html

### Hypervisor

### CI/CD

### Kubernetes

### Daemon

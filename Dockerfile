# WHich node image from docker hub to use 
FROM node:hydrogen

# Set a custom workdir in the container
WORKDIR /usr/src/npmzies-app

# Copy everything from proj directory to the container
COPY ./ /usr/src/npmzies-app/

# Commands to run in the bash shell of the container - executed on every buildof the container
# You can have multiple RUNs to build the docker image
RUN npm install

# Commands to exec in the container (/bin/bash opens up a bash shell) - executed on every run of the container
CMD ["/bin/bash"]
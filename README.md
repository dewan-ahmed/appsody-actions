# Appsody GitHub-Actions Tutorial
Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. This tutorial walks through creating a continuous integration flow by using GitHub Actions for an Appsody Node.js/Express application. 

## Prerequisites

The steps in this tutorial are executed on Linux (Ubuntu 18.04), but you can follow similar steps for Windows or macOS.

### Install Docker

Execute the following lines of code on your terminal to install docker and have it run during system start.

```
sudo curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker dewan
sudo systemctl start docker
sudo systemctl enable docker
```

Log out and log back in for the above changes to reflect on your account.

### Install Appsody

To get the latest Appsody version, follow [Appsody Installation Doc](https://appsody.dev/docs/getting-started/installation/) and update the following code/version as well as build.yml under "Add continuous integration to your repository using GitHub Actions" section, if required.

```
wget https://github.com/appsody/appsody/releases/download/0.5.4/appsody_0.5.4_amd64.deb
sudo apt install -f ./appsody_0.5.4_amd64.deb
```

Once the above steps are done, type in **appsody** on your terminal and hit enter. If you see something like the following, your installation was successful:

```
The Appsody command-line tool (CLI) enables the rapid development of cloud native applications.

Complete documentation is available at https://appsody.dev

...
...
...
```

## Create your Appsody project

Follow the commands below to create a project folder and initiate an Appsody Node.js/Express project:

```
mkdir appsody-actions
cd appsody-actions
appsody init nodejs-express
```

Once the project initializes, create a repository on GitHub, and push your project contents to that repository. 

## Create a Docker hub image registry

1. Go to hub.docker.com and login or register a new account.
2. Create a new image registry by going to hub.docker.com/repository/create and following the prompts.

## Add continuous integration to your repository using GitHub Actions

1. From your newly created GitHub repository, go to **Settings > Secret** and add two parameters: `DOCKER_HUB_USER` and `DOCKER_HUB_KEY`. Use your dockerhub username for the first parameter and dockerhub password for the latter.
2. Create a new file called `build.yml` in the root of your project folder `/.github/workflows/build.yml`.
3. Copy the following contents into that file. **The repo name will be the name of your Appsody project.**

```
name: Appsody-Actions CI

on:
  push:
    branches:
    - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: build-push
      env:
        DOCKER_HUB_USER: ${{ secrets.DOCKER_HUB_USER }}
        DOCKER_HUB_KEY: ${{ secrets.DOCKER_HUB_KEY }}
      run: |
        echo 'Docker Login...'
        docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_KEY
        echo 'Installing Appsody...'
        wget https://github.com/appsody/appsody/releases/download/0.5.4/appsody_0.5.4_amd64.deb
        sudo apt install -f ./appsody_0.5.4_amd64.deb
        echo 'Running Appsody build and pushing to docker registry...'
        appsody build --tag appsody-actions:v1 --push-url $DOCKER_HUB_USER
```       

That's it. Now you can go back to your project, make any change to any source file and push to master; for example, change line#4 on app.js to display *Hello from Appsody-Actions*. You will see live logs on your CI build and have the image pushed to your Docker image registry after a successful build.

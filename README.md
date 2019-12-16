# Appsody GitHub-Actions Tutorial
Appsody provides everything you need to iteratively develop applications, ready for deployment to Kubernetes environments. This tutorial walks through creating a continuous integration flow by using GitHub Actions for an Appsody Node.js/Express application. 

## Prerequisites

The steps in this tutorial are executed on Linux (Ubuntu 18.04), but you can follow similar steps for Windows or macOS.

### Install Java

Get the latest version from [openJDK](https://jdk.java.net).

During the writing of this tutorial, version 13.0.1 is the latest. You can replace the jdk version in the following block of code with the version you're using.

```
wget https://download.java.net/java/GA/jdk13.0.1/cec27d702aa74d5a8630c65ae61e4305/9/GPL/openjdk-13.0.1_linux-x64_bin.tar.gz
tar xvf openjdk-13.0.1_linux-x64_bin.tar.gz
export JAVA_HOME=$PWD/jdk-13.0.1/
export PATH=${PATH}:${JAVA_HOME}/bin
```

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

Get the latest version from [Appsody Installation Doc](https://appsody.dev/docs/getting-started/installation/) and update the following code/version, if required.

```
wget https://github.com/appsody/appsody/releases/download/0.5.0/appsody_0.5.0_amd64.deb
sudo apt install -f ./appsody_0.5.0_amd64.deb
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

1. From your newly created GitHub repository, go to **Settings > Secret** and add two parameters: `DOCKER_HUB` and `DOCKER_HUB_KEY`. Use your dockerhub username for the first parameter and dockerhub password for the latter.
2. Create a new file called `build.yml` in the root of your project folder `/.github/workflows/build.yml`.
3. Copy the following contents into that file. **Make sure to replace the `--push-url` value with your docker username. The repo name will be the name of your Appsody project.**

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
        DOCKER_HUB: ${{ secrets.DOCKER_HUB }}
        DOCKER_HUB_KEY: ${{ secrets.DOCKER_HUB_KEY }}
      run: |
        echo 'Docker Login...'
        docker login -u $DOCKER_HUB -p $DOCKER_HUB_KEY
        echo 'Installing Appsody...'
        wget https://github.com/appsody/appsody/releases/download/0.5.0/appsody_0.5.0_amd64.deb
        sudo apt install -f ./appsody_0.5.0_amd64.deb
        echo 'Running Appsody build and pushing to docker registry...'
        appsody build --push-url dewan2018
```       

That's it. Now you can go back to your project, make any change to any source file and push to master; for example, change line#4 on app.js to display *Hello from Appsody-Actions*. You will seelive logs on your CI build and have the image pushed to your Docker image registry after a successful build.

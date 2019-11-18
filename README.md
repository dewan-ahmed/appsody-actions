# Appsody GitHub-Actions Tutorial
Continuous Integration using GitHub Actions for an Appsody Node.js/Express application

## Taking care of the pre-requisites

These steps are executed on linux(Ubuntu 18.04) but you can follow similar steps for Windows/Mac.

### Installing Java

Get the latest version from [openJDK](https://jdk.java.net)
During the time of this tutorial, version 13.0.1 is the latest. Update the following code to the jdk version you're using.

```
wget https://download.java.net/java/GA/jdk13.0.1/cec27d702aa74d5a8630c65ae61e4305/9/GPL/openjdk-13.0.1_linux-x64_bin.tar.gz
tar xvf openjdk-13.0.1_linux-x64_bin.tar.gz
export JAVA_HOME=$PWD/jdk-13.0.1/
export PATH=${PATH}:${JAVA_HOME}/bin
```

### Installing Docker

```
sudo curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker dewan
sudo systemctl start docker
sudo systemctl enable docker
```
Log-out and log back in for the above changes to reflect on your account.

### Installing Appsody:

Get the latest version from [Appsody Installation Doc](https://appsody.dev/docs/getting-started/installation/) and update the following code/version, if required.
```
wget https://github.com/appsody/appsody/releases/download/0.4.9/appsody_0.4.9_amd64.deb
sudo apt install -f $PWD/appsody_0.4.9_amd64.deb
```
Once the above steps are done, type in **appsody** on your terminal and hit enter. If you see something like the following, your installation was successful:
```
The Appsody command-line tool (CLI) enables the rapid development of cloud native applications.

Complete documentation is available at https://appsody.dev

...
...
...
```

## Creating your Appsody project

Create a project folder and follow the commands below to init an Appsody Node.js/Express project

```
mkdir appsody-actions
cd appsody-actions
appsody init nodejs-express
```
Once the project initializes, create a repository on GitHub and push your project contents to that repository.

## Creating a docker hub image repository

1. Go to hub.docker.com and login/register.
2. Create a new image repository by going to hub.docker.com/repository/create

## Adding Continuous Integration to your repository using GitHub Actions

1. Go to github.com and navigate to your repositoy
2. Find *Actions* tab

#!/usr/bin/env groovy

pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    environment {
        DOCKER_IMAGE = "asset-tracer-ui"
        tag = "${env.BUILD_NUMBER}"
    }
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Build") {
            steps {
                echo "Install Node modules..."
                sh "npm install -f"
                sh 'echo " The directory : $(pwd) "'
            }
        }
        stage("Test") {
            steps {
                echo "Ot dg test eii te  !!!!"
            }
        }
        stage("Build Image") {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${tag} ."
            }
        }
        stage("Deploy") {
            steps {
                script {
                    def containerId = sh(script: 'docker ps -q --filter "name=${DOCKER_IMAGE}:${tag}"', returnStatus: true).trim()
                    echo "containerID : ${containerId}"
                    if (containerId) {
                        echo "Removing existing container ${containerId}"
                        sh "docker rm -f ${containerId}"
                    } else {
                        echo "No existing container found."
                    }
                    
                    echo "Deploying container..."
                    sh "docker run -d -p 3003:3000 --name ${DOCKER_IMAGE}:${tag} ${DOCKER_IMAGE}:${tag}"
                    
                    echo "List Docker Containers"
                    sh "docker ps | grep ${DOCKER_IMAGE}:${tag}"
                }
            }
        }
    }
}

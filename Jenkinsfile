pipeline {
     agent any
     tools{
          nodejs 'nodejs'
     }
     environment {
          DOCKER_IMAGE = "asset-tracer-ui"
          tag = ${env.BUILD_NUMBER}
     }
     stages{
          stage("Checkout"){
               steps{
                     checkout scm
               }
          }
          stage("Build"){
               steps{
                    echo " Install Node modules .."
                    sh "npm install -f"
                    
                    echo "Build React Project ... "
                    sh "npm run build"
               }
          }
          stage("Test"){
               steps {
                    echo " Ot dg test eii te  !!!!"
               }
          }
          stage("Buid Image"){
               steps{
                    sh 'docker build -t \${DOCKER_IMAGE}:\${tag}'
               }
          }
          stage("Deploy"){
               steps{
                    sh 'echo "Remove existed container $(docker ps | grep \${DOCKER_IMAGE}:\${tag} | awk "{print $1}")"'
                    echo "Deploy container "
                    sh "docker run -d -p 3003:3000 --name \${DOCKER_IMAGE} \${DOCKER_IMAGE}:\${tag}"
                    echo "List Docker Container"
                    sh "docker ps | grep \${DOCKER_IMAGE} "
               }
          }
     }
}
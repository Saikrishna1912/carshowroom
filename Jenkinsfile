pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Ensure the name matches the NodeJS installation configured in Jenkins
    }
    
    environment {
        FRONTEND_REPO = 'https://github.com/Saikrishna1912/carshowroom.git'
        FRONTEND_BRANCH = 'main'
        SONAR_URL = 'http://3.109.213.179:9000/' // Replace this URL with your SonarQube server URL
        REGISTRY_CREDENTIALS = credentials('docker-cred')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${env.FRONTEND_REPO}", branch: "${env.FRONTEND_BRANCH}"
            }
        }
        
        stage('Install Dependencies') {
            steps {
                withEnv(['CI=false']) {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'npm run build' 
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_AUTH_TOKEN')]) {
                    sh 'npx sonar-scanner -Dsonar.login=$SONAR_AUTH_TOKEN -Dsonar.host.url=${SONAR_URL} -Dsonar.projectKey=carshowroom_frontend -Dsonar.projectName="Car Showroom Frontend" -Dsonar.sources=src'
                }
            }
        }
        
        stage('Build and Push Docker Image') {
            environment {
                DOCKER_IMAGE = "saikrishna1912/carshowroom:${env.BUILD_NUMBER}"
            }
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                    def dockerImage = docker.image("${DOCKER_IMAGE}")
                    docker.withRegistry('https://index.docker.io/v1/', "docker-cred") {
                        dockerImage.push()
                    }
                }
            }
        }
        
        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "carshowroom"
                GIT_USER_NAME = "Saikrishna1912"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                    git config user.email "saikrishna.galipelly@gmail.com"
                    git config user.name "${GIT_USER_NAME}"
                    sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" manifests/deployment.yaml
                    git add manifests/deployment.yaml
                    git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                    git push https://${GIT_USER_NAME}:${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git HEAD:main
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up any workspace or resources
            cleanWs()
        }
    }
}

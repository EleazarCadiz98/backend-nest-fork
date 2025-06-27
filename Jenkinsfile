pipeline {

    agent any

    // escenarios -> escenario -> pasos
    environment {
        NPM_CONFIG_CACHE= "${WORKSPACE}/.npm"
        DOCKER_IMAGE_NAME= "us-west1-docker.pkg.dev/lab-agibiz/docker-repository"
        DOCKER_REGISTRY= "https://us-west1-docker.pkg.dev"
        DOCKER_REGISTRY_CREDENTIALS= "gcp-registry-ele" 
    }
    stages {
        stage ("Saludo a usuario"){
            steps {
                sh 'echo "Comenzando mi pipeline"'
            }
        }
        stage ("Saliendo de otro escenarios"){
            steps {
                sh 'echo "Saliendo de este grupo de escenarios"'
            }
        }
        stage ("Proceso de Build & Test"){
            agent {
                docker {
                    image 'node:22'
                    reuseNode true // Permite reutilizar la imagen docker
                }
            }
            stages {
                stage ("Instalación de Dependencias") {
                    steps {
                        sh 'npm ci' // Elimina el node_modules y lo vuelve a instalar 
                    }
                }
                stage ("Ejecución de Pruebas") {
                    steps {
                        sh 'npm run test:cov' 
                    }
                }
                stage ("Construcción de la aplicación") {
                    steps {
                        sh 'npm run build' 
                    }
                }
            }
        }
        stage ("Build y Push de imagen Docker"){
            steps {
                docker.withRegistry("${DOCKER_REGISTRY}", DOCKER_REGISTRY_CREDENTIALS){
                    sh "docker login -u -p ${registry}"
                    sh "docker build -t backend-nest-image-ele ."
                    sh "docker tag backend-nest-image-ele ${DOCKER_IMAGE_NAME}/backend-nest-elemagen"
                    sh "docker push ${DOCKER_IMAGE_NAME}/backend-nest-elemagen"
                }
                
            }
        }
    }
}
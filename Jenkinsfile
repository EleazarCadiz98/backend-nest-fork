pipeline {

    agent any

    // escenarios -> escenario -> pasos
    environment {
        NPM_CONFIG_CACHE= "${WORKSPACE}/.npm"
        DOCKER_IMAGE_PREFIX_NAME= "us-west1-docker.pkg.dev/lab-agibiz/docker-repository" // Repositorio en GCP
        DOCKER_REGISTRY= "https://us-west1-docker.pkg.dev" // Usuario ("registry") de GCP
        DOCKER_REGISTRY_CREDENTIALS= "gcp-registry-ele"  // Credenciales ("REGISTRY") de GCP
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
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", DOCKER_REGISTRY_CREDENTIALS){ // Funcion que permite hacer login en el REPO DOCKER
                        sh "docker build -t backend-nest-image-ele ." // Se compila la imagen con un nombre personalizado
                        sh "docker tag backend-nest-image-ele ${DOCKER_IMAGE_PREFIX_NAME}/backend-nest-elemagen" // Se crea un tag de la imagen creada hacia el repo en GCP
                        sh "docker push ${DOCKER_IMAGE_PREFIX_NAME}/backend-nest-elemagen" // Se realiza la subida de la imagen al repo GCP
                        sh "docker push ${DOCKER_IMAGE_PREFIX_NAME}/backend-nest-elemagen:${BUILD_NUMBER}" // Se realiza la subida de la imagen al repo GCP
                    }
                }
                
            }
        }
        stage ("Actualizacion de kubernetes"){
            agent {
                docker {
                    image 'alpine/k8s:1.30.2'
                    reuseNode true
                }
            }
            steps {
                withKubeConfig([credentialsId: 'gcp-kubeconfig']){
                    sh "kubectl -n lab-ele set image deployments/backend-nest-ele backend-nest-ele=${DOCKER_IMAGE_PREFIX_NAME}/backend-nest-ele:${BUILD_NUMBER}"
                }
            }
        }
    }
}
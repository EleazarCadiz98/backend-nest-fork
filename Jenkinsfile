pipeline {

    agent any

    // escenarios -> escenario -> pasos
    environment {
        NPM_CONFIG_CACHE= "${WORKSPACE}/.npm"
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
    }
}
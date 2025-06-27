pipeline {

    agent any

    // escenarios -> escenario -> pasos

    stages {
        stage ("Saludo a usuario"){
            steps {
                sh 'echo "Comenzando mi pipeline"'
            }
        }
        stage ("Saludo a usuario"){
            steps {
                sh 'echo "Saliendo de este grupo de escenarios"'
            }
        }
    }
    stages {
        stage ("Proceso de Build & Test"){
            agent {
                docker {
                    image: 'node:22'
                    reuseNode true // Permite reutilizar la imagen docker
                }
            }
            stages {
                stage ("Instalación de Dependencias") {
                    steps {
                        sh 'npm ci' // Elimina el node_modules y lo vuelve a instalar 
                    }
                }
            }

            
        }
    }
}
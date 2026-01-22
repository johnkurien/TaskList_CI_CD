pipeline {
    agent any

    stages {

        stage('Build & Test') {
            steps {
                sh 'chmod +x mvnw'
                sh './mvnw clean test'
            }
        }

        stage('Package') {
            steps {
                sh './mvnw package -DskipTests'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t tasklist-ci-cd:1.0 .'
            }
        }
    }
}

pipeline {
    agent any

    stages {

        stage('Build & Test') {
            steps {
                sh './mvnw clean test'
            }
        }

        stage('Package') {
            steps {
                sh './mvnw clean package'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t tasklist-ci-cd:latest .'
            }
        }
    }
}

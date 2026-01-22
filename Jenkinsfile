pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/johnkurien/TaskList_CI_CD.git'
            }
        }

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

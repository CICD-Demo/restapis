#!/bin/bash -e

cd $(dirname $0)

. utils
. ../../environment

if [ $PROJECT = $PROD ]; then
  REPLICAS=2
else
  REPLICAS=1
fi

osc create -f - <<EOF || true
kind: ImageStream
apiVersion: v1beta1
metadata:
  name: apiserver
  labels:
    service: apiserver
    function: application
EOF

osc create -f - <<EOF
kind: List
apiVersion: v1beta3
items:
- kind: DeploymentConfig
  apiVersion: v1beta1
  metadata:
    name: apiserver
    labels:
      service: apiserver
      function: application
  triggers:
  - type: ConfigChange
  - type: ImageChange
    imageChangeParams:
      automatic: true
      containerNames:
      - apiserver
      from:
        name: apiserver
      tag: latest
  template:
    strategy:
      type: Recreate
    controllerTemplate:
      replicas: $REPLICAS
      replicaSelector:
        service: apiserver
        function: application
      podTemplate:
        desiredState:
          manifest:
            version: v1beta2
            containers:
            - name: apiserver
              image: apiserver:latest
              ports:
              - containerPort: 8080
#              - containerPort: 8787
#                hostPort: 8787
              - containerPort: 8778
                name: jolokia
              env:
#              - name: ENABLE_JPDA
#                value: "true"
              - name: DB_SERVICE_PREFIX_MAPPING
                value: mysql
              - name: mysql_JNDI
                value: "java:jboss/datasources/MySQLDS"
              - name: mysql_USERNAME
                value: "$MYSQL_USER"
              - name: mysql_PASSWORD
                value: "$MYSQL_PASSWORD"
              - name: mysql_DATABASE
                value: "$MYSQL_DATABASE"
              - name: MQ_SERVICE_PREFIX_MAPPING
                value: amq
              - name: AMQ_TCP_SERVICE_HOST
                value: amq
              - name: AMQ_TCP_SERVICE_PORT
                value: "61616"
              - name: amq_JNDI
                value: "java:/ConnectionFactory"
              - name: amq_USERNAME
                value: admin
              - name: amq_PASSWORD
                value: admin
        labels:
          service: apiserver
          function: application

- kind: Service
  apiVersion: v1beta3
  metadata:
    name: apiserver
    labels:
      service: apiserver
      function: application
  spec:
    ports:
    - port: 80
      targetPort: 8080
    selector:
      service: apiserver
      function: application
EOF

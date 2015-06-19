#!/bin/bash -e

cd $(dirname $0)

. utils
. ../../environment

PROJECT=$(osc status | sed -n '1 { s/.* //; p; }')

if [ $PROJECT = $PROD ]; then
  REPLICAS=2
else
  REPLICAS=1
fi

osc create -f - <<EOF || true
kind: ImageStream
apiVersion: v1beta1
metadata:
  name: restapis
  labels:
    service: restapis
    function: application
EOF

osc create -f - <<EOF
kind: List
apiVersion: v1beta3
items:
- kind: DeploymentConfig
  apiVersion: v1beta1
  metadata:
    name: restapis
    labels:
      service: restapis
      function: application
  triggers:
  - type: ConfigChange
  - type: ImageChange
    imageChangeParams:
      automatic: true
      containerNames:
      - restapis
      from:
        name: restapis
      tag: latest
  template:
    strategy:
      type: Recreate
    controllerTemplate:
      replicas: $REPLICAS
      replicaSelector:
        service: restapis
        function: application
      podTemplate:
        desiredState:
          manifest:
            version: v1beta2
            containers:
            - name: restapis
              image: restapis:latest
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
              - name: MYSQL_SERVICE_HOST
                value: db
              - name: MYSQL_SERVICE_PORT
                value: "3306"
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
                value: broker
              - name: AMQ_TCP_SERVICE_PORT
                value: "61616"
              - name: amq_JNDI
                value: "java:/ConnectionFactory"
              - name: amq_USERNAME
                value: admin
              - name: amq_PASSWORD
                value: admin
        labels:
          service: restapis
          function: application

- kind: Service
  apiVersion: v1beta3
  metadata:
    name: restapis
    labels:
      service: restapis
      function: application
  spec:
    ports:
    - port: 80
      targetPort: 8080
    selector:
      service: restapis
      function: application
EOF

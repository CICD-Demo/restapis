#!/bin/bash -e

cd $(dirname $0)

. utils
. ../environment

osc create -f - <<EOF || true
kind: ImageStream
apiVersion: v1beta1
metadata:
  name: apiserver
  labels:
    component: apiserver
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
      component: apiserver
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
      replicas: 1
      replicaSelector:
        component: apiserver
      podTemplate:
        desiredState:
          manifest:
            version: v1beta2
            containers:
            - name: apiserver
              image: apiserver:latest
              ports:
              - containerPort: 8080
              - containerPort: 8787
                hostPort: 8787
              env:
              - name: MYSQL_DB_NAME
                value: "$MYSQL_DATABASE"
              - name: MYSQL_USER
                value: "$MYSQL_USER"
              - name: MYSQL_PASSWORD
                value: "$MYSQL_PASSWORD"
              - name: ENABLE_JPDA
                value: "true"
              - name: MQ_SERVICE_PREFIX_MAPPING
                value: amq
              - name: amq_JNDI
                value: "java:/ConnectionFactory"
              - name: amq_USERNAME
                value: admin
              - name: amq_PASSWORD
                value: admin
        labels:
          component: apiserver

- kind: Service
  apiVersion: v1beta3
  metadata:
    name: apiserver
    labels:
      component: apiserver
  spec:
    ports:
    - port: 80
      targetPort: 8080
    selector:
      component: apiserver
EOF

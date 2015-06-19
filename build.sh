#!/bin/bash -e

cd $(dirname $0)

. utils
. ../../environment

PROJECT=$(osc status | sed -n '1 { s/.* //; p; }')

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
kind: BuildConfig
apiVersion: v1beta1
metadata:
  name: restapis
  labels:
    service: restapis
    function: application
triggers:
- type: generic
  generic:
    secret: secret
parameters:
  strategy:
    type: STI
    stiStrategy:
      image: docker.io/cicddemo/sti-eap
      env:
      - name: MAVEN_MIRROR
        value: "$MAVEN_MIRROR"
  source:
    type: Git
    git:
      ref: master
      uri: http://gogs.$INFRA/$PROJECT/restapis
  output:
    to:
      name: restapis
EOF

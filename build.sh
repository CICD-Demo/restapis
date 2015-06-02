#!/bin/bash -e

cd $(dirname $0)

. utils
. ../environment

PROJECT=$(osc status | sed -n '1 { s/.* //; p; }')

osc create -f - <<EOF || true
kind: ImageStream
apiVersion: v1beta1
metadata:
  name: apiserver
  labels:
    component: apiserver
EOF

osc create -f - <<EOF
kind: BuildConfig
apiVersion: v1beta1
metadata:
  name: apiserver-build
  labels:
    component: apiserver
triggers:
- type: generic
  generic:
    secret: secret
parameters:
  strategy:
    type: STI
    stiStrategy:
      image: jminter-sti-wildfly
  source:
    type: Git
    git:
      ref: master
      uri: http://gogs.gogs/$PROJECT/apiserver
  output:
    to:
      name: apiserver
EOF

#!/bin/bash -e

cd $(dirname $0)

. utils
. ../../environment

PROJECT=$(oc status | sed -n '1 { s/.* //; p; }')

oc create -f - <<EOF || true
kind: ImageStream
apiVersion: v1
metadata:
  name: restapis
  labels:
    service: restapis
    function: application
EOF

oc create -f - <<EOF
kind: BuildConfig
apiVersion: v1
metadata:
  name: restapis
  labels:
    service: restapis
    function: application
spec:
  triggers:
  - type: generic
    generic:
      secret: secret
  strategy:
    type: Source
    sourceStrategy:
      from:
        kind: ImageStreamTag
        name: jboss-eap6-openshift:6.4
        namespace: openshift
      env:
      - name: http_proxy
        value: "$http_proxy"
  source:
    type: Git
    git:
      uri: http://gogs.$INFRA/$PROJECT/restapis
      ref: master
  output:
    to:
      name: restapis
EOF

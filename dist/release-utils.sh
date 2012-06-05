#!/bin/bash

REQUIRED_BASH_VERSION=3.0.0

if [[ $BASH_VERSION < $REQUIRED_BASH_VERSION ]]; then
  echo "You must use Bash version 3 or newer to run this script"
  exit
fi


DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# SCRIPT

usage()
{
cat << EOF
usage: $0 options

This script aids in releasing TicketMonster 

OPTIONS:
   -u      Updates version numbers in all POMs, used with -o and -n      
   -o      Old version number to update from
   -n      New version number to update to
   -h      Shows this message
EOF
}

update()
{
cd $DIR/../
echo "Updating versions from $OLDVERSION TO $NEWVERSION for all Java and XML files under $PWD"
perl -pi -e "s/${OLDVERSION}/${NEWVERSION}/g" `find . -name \*.xml -or -name \*.java`
}

OLDVERSION="1.0.0-SNAPSHOT"
NEWVERSION="1.0.0-SNAPSHOT"
VERSION="1.0.0-SNAPSHOT"
CMD="usage"

while getopts “muo:n:r:” OPTION

do
     case $OPTION in
         u)
             CMD="update"
             ;;
         h)
             usage
             exit
             ;;
         o)
             OLDVERSION=$OPTARG
             ;;
         n)
             NEWVERSION=$OPTARG
             ;;
         [?])
             usage
             exit
             ;;
     esac
done

$CMD


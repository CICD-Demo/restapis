#!/bin/bash

REQUIRED_BASH_VERSION=3.0.0

if [[ $BASH_VERSION < $REQUIRED_BASH_VERSION ]]; then
  echo "You must use Bash version 3 or newer to run this script"
  exit
fi

DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# DEFINE

VERSION_REGEX='([0-9]*)\.([0-9]*)([a-zA-Z0-9\.]*)'

# EAP team email subject
EMAIL_SUBJECT="\${RELEASEVERSION} of Ticket Monster released, please merge with https://github.com/jboss-eap/ticket-monster, tag and add to EAP maven repo build"
# EAP team email To ?
EMAIL_TO="pgier@redhat.com kpiwko@redhat.com lvogel@redhat.com"
EMAIL_FROM="\"JDF Publish Script\" <benevides@redhat.com>"


# SCRIPT

usage()
{
cat << EOF
usage: $0 options

This script performs a release of TicketMonster 

OPTIONS:
   -s      Snapshot version number to update from
   -n      New snapshot version number to update to, if undefined, defaults to the version number updated from
   -r      Release version number
EOF
}

notify_email()
{
   echo "***** Performing Ticket Monster release notifications"
   echo "*** Notifying JBoss EAP team"
   subject=`eval echo $EMAIL_SUBJECT`
   echo "Email from: " $EMAIL_FROM
   echo "Email to: " $EMAIL_TO
   echo "Subject: " $subject
   # send email using sendmail
   printf "Subject: $subject\nSee \$subject :)\n" | /usr/bin/env sendmail -f "$EMAIL_FROM" "$EMAIL_TO"

}

release()
{
   echo "Releasing TicketMonster version $RELEASEVERSION"
   default="Y"
   read -p "Do you want to update the Performance dates in import.sql [Y/n]? " yn
   yn=${yn:-$default}
   case $yn in
       [Yy] ) 
              $DIR/release-utils.sh -t -u -o $SNAPSHOTVERSION -n $RELEASEVERSION
              ;;
       [Nn] ) 
              $DIR/release-utils.sh -u -o $SNAPSHOTVERSION -n $RELEASEVERSION
              ;;
       *) echo "Invalid input"
              ;;
   esac
   git commit -a -m "Prepare for $RELEASEVERSION release"
   git tag -a $RELEASEVERSION -m "Tag $RELEASEVERSION"
   git branch $RELEASEVERSION tags/$RELEASEVERSION   
   $DIR/release-utils.sh -u -o $RELEASEVERSION -n $NEWSNAPSHOTVERSION
   git commit -a -m "Prepare for development of $NEWSNAPSHOTVERSION"
   $DIR/release-utils.sh -p $RELEASEVERSION
   read -p "Do you want to send release notifcations to $EAP_EMAIL_TO[y/N]? " yn
   case $yn in
       [Yy]* ) notify_email;;
       * ) exit;
   esac
   echo "Don't forget to push the tag and the branch"
   echo "   git push --tags upstream refs/heads/$RELEASEVERSION"
}

SNAPSHOTVERSION="UNDEFINED"
RELEASEVERSION="UNDEFINED"
NEWSNAPSHOTVERSION="UNDEFINED"
MAJOR_VERSION="UNDEFINED"
MINOR_VERSION="UNDEFINED"

while getopts “hn:r:s:” OPTION

do
     case $OPTION in
         h)
             usage
             exit
             ;;
         s)
             SNAPSHOTVERSION=$OPTARG
             ;;
         r)
             RELEASEVERSION=$OPTARG
             ;;
         n)
             NEWSNAPSHOTVERSION=$OPTARG
             ;;
         [?])
             usage
             exit
             ;;
     esac
done

if [ "$NEWSNAPSHOTVERSION" == "UNDEFINED" ]
then
   NEWSNAPSHOTVERSION=$SNAPSHOTVERSION
fi

if [ "$SNAPSHOTVERSION" == "UNDEFINED" -o  "$RELEASEVERSION" == "UNDEFINED" ]
then
   echo "\nMust specify -r and -s\n"
   usage
   exit
fi

release


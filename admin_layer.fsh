@/* Forge Script - Generates the administration view */;

@/* Clear the screen */;
clear;
    
@/* This means less typing. If a script is automated, or is not meant to be interactive, use this command */; 
set ACCEPT_DEFAULTS true;

@/* Enable scaffolding from entities */;

scaffold setup;

@/* Enable RichFaces for wizzy widgets from entities */;

richfaces setup;


@/* Scaffold CRUD views for the entities that an admin would start drilling down into the data model from */;

scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Venue --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.TicketCategory --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.TicketPriceCategory --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Show --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.EventCategory --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Event --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Section --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Show --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.Performance --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.EventCategory --targetDir admin;
scaffold from-entity org.jboss.jdf.example.ticketmonster.model.MediaItem --targetDir admin;


@/* Deploy this to JBoss AS 7 to see the result */;
build clean package jboss-as:deploy;

echo Examine the app so far at http://localhost:8080/ticket-monster;

wait;

@/* Ask the user whether they want to patch in the changes described in the tutorial */;

set ACCEPT_DEFAULTS false;

if ( SHELL.promptBoolean("Apply manual changes described in tutorial?") ) {
    echo Applying manual changes described in tutorial based on admin_layer.patch
    git apply < admin_layer.patch    

    @/* Deploy this to JBoss AS 7 to see the result */;
    build clean package jboss-as:deploy;

    echo Examine the app so far at http://localhost:8080/ticket-monster;

    wait;

}



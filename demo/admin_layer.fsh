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

scaffold from-entity org.jboss.jdf.example.ticketmonster.model.* --targetDir admin;

@/* Ask the user whether they want to patch in the changes described in the tutorial */;

set ACCEPT_DEFAULTS false;

if ( SHELL.promptBoolean("Apply manual functional changes described in tutorial?") ) {
    echo Applying manual changes described in tutorial based on admin_layer_functional.patch;
    git apply --ignore-whitespace --ignore-space-change admin_layer_functional.patch;
}

if ( SHELL.promptBoolean("Apply manual fixes for FORGE-587,FORGE-589?") ) {
    echo "Applying manual fixes for FORGE-587,FORGE-589 based on admin_layer_fixes.patch";
    git apply --ignore-whitespace --ignore-space-change admin_layer_fixes.patch;
}

if ( SHELL.promptBoolean("Apply manual visual changes?") ) {
    echo Applying manual visual changes based on admin_layer_graphics.patch;
    git apply --ignore-whitespace --ignore-space-change --inaccurate-eof admin_layer_graphics.patch;
}

if ( SHELL.promptBoolean("Deploy to JBoss AS 7?") ) {
    @/* Deploy this to JBoss AS 7 to see the result */;
    build clean package jboss-as:deploy;

    echo Examine the app so far at http://localhost:8080/ticket-monster/faces/admin/index.xhtml;

} else {
    build clean package;
}



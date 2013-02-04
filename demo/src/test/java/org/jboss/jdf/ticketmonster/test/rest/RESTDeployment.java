package org.jboss.jdf.ticketmonster.test.rest;

import org.jboss.jdf.example.ticketmonster.model.Booking;
import org.jboss.jdf.example.ticketmonster.rest.BaseEntityService;
import org.jboss.jdf.example.ticketmonster.rest.CartService;
import org.jboss.jdf.example.ticketmonster.service.*;
import org.jboss.jdf.example.ticketmonster.util.MultivaluedHashMap;
import org.jboss.jdf.ticketmonster.test.TicketMonsterDeployment;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.DependencyResolvers;
import org.jboss.shrinkwrap.resolver.api.maven.MavenDependencyResolver;

public class RESTDeployment {

    public static WebArchive deployment() {


        return TicketMonsterDeployment.deployment()
                .addPackage(Booking.class.getPackage())
                .addPackage(BaseEntityService.class.getPackage())
                .addPackage(MultivaluedHashMap.class.getPackage())
                .addClass(CartStore.class)
                .addClass(CartService.class)
                .addClass(SectionAllocationKey.class)
                .addClass(SeatAllocationService.class)
                .addClass(AllocatedSeats.class)
                .addClass(MediaPath.class)
                .addClass(MediaManager.class)
                .addAsLibraries(DependencyResolvers.use(MavenDependencyResolver.class)
                        .loadMetadataFromPom("pom.xml")
                        .artifact("org.infinispan:infinispan-core").scope("test").resolveAsFiles());
    }
    
}

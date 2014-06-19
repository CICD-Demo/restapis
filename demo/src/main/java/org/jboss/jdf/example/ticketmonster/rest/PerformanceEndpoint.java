package org.jboss.jdf.example.ticketmonster.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import org.jboss.jdf.example.ticketmonster.rest.dto.PerformanceDTO;
import org.jboss.jdf.example.ticketmonster.model.Performance;

/**
 * 
 */
@Stateless
@Path("/performances")
public class PerformanceEndpoint
{
   @PersistenceContext(unitName="primary")
   private EntityManager em;

   @POST
   @Consumes("application/json")
   public Response create(PerformanceDTO dto)
   {
      Performance entity = dto.fromDTO(null, em);
      em.persist(entity);
      return Response.created(UriBuilder.fromResource(PerformanceEndpoint.class).path(String.valueOf(entity.getId())).build()).build();
   }

   @DELETE
   @Path("/{id:[0-9][0-9]*}")
   public Response deleteById(@PathParam("id") Long id)
   {
      Performance entity = em.find(Performance.class, id);
      if (entity == null) {
        return Response.status(Status.NOT_FOUND).build();
      }
      em.remove(entity);
      return Response.noContent().build();
   }

   @GET
   @Path("/{id:[0-9][0-9]*}")
   @Produces("application/json")
   public Response findById(@PathParam("id") Long id)
   {
      TypedQuery<Performance> findByIdQuery = em.createQuery("SELECT DISTINCT p FROM Performance p LEFT JOIN FETCH p.show WHERE p.id = :entityId ORDER BY p.id", Performance.class);
      findByIdQuery.setParameter("entityId", id);
      Performance entity;
      try {
         entity = findByIdQuery.getSingleResult();
      } catch (NoResultException nre) {
         entity = null;
      }
      if (entity == null) {
        return Response.status(Status.NOT_FOUND).build();
      }
      PerformanceDTO dto = new PerformanceDTO(entity);
      return Response.ok(dto).build();
   }

   @GET
   @Produces("application/json")
   public List<PerformanceDTO> listAll(@QueryParam("start") Integer startPosition, @QueryParam("max") Integer maxResult)
   {
      TypedQuery<Performance> findAllQuery = em.createQuery("SELECT DISTINCT p FROM Performance p LEFT JOIN FETCH p.show ORDER BY p.id", Performance.class);
      if (startPosition != null)
      {
         findAllQuery.setFirstResult(startPosition);
      }
      if (maxResult != null)
      {
         findAllQuery.setMaxResults(maxResult);
      }
      final List<Performance> searchResults = findAllQuery.getResultList();
      final List<PerformanceDTO> results = new ArrayList<PerformanceDTO>();
      for(Performance searchResult: searchResults) {
        PerformanceDTO dto = new PerformanceDTO(searchResult);
        results.add(dto);
      }
      return results;
   }

   @PUT
   @Path("/{id:[0-9][0-9]*}")
   @Consumes("application/json")
   public Response update(@PathParam("id") Long id, PerformanceDTO dto)
   {
      TypedQuery<Performance> findByIdQuery = em.createQuery("SELECT DISTINCT p FROM Performance p LEFT JOIN FETCH p.show WHERE p.id = :entityId ORDER BY p.id", Performance.class);
      findByIdQuery.setParameter("entityId", id);
      Performance entity;
      try {
         entity = findByIdQuery.getSingleResult();
      } catch (NoResultException nre) {
         entity = null;
      }
      entity = dto.fromDTO(entity, em);
      entity = em.merge(entity);
      return Response.noContent().build();
   }
}
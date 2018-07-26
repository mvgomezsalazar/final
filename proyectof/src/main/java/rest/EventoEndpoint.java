/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;


import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import dao.EventoDao;
import javax.inject.Inject;
import model.Evento;

/**
 *
 */
@Stateless
@Path("/eventos")
@Produces("application/json")
@Consumes("application/json")
public class EventoEndpoint {

    @Inject
    EventoDao eventoService;

    @POST
    public Response create(Evento entity) {
        eventoService.create(entity);

        return Response.created(
                UriBuilder.fromResource(EventoEndpoint.class)
                        .path(String.valueOf(entity.getId())).build()).build();
    }

    @DELETE
    @Path("/{id:[0-9][0-9]*}")
    public Response deleteById(@PathParam("id") Long id) {
        Evento entity = eventoService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        eventoService.deleteById(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id:[0-9][0-9]*}")
    public Response findById(@PathParam("id") Long id) {

        Evento entity = eventoService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok(entity).build();
    }

    @GET
    public List<Evento> listAll(@QueryParam("start") Integer startPosition,
            @QueryParam("max") Integer maxResult) {
        
        final List<Evento> results = eventoService.listAll(startPosition, maxResult);
        return results;
    }

    @PUT
    @Path("/{id:[0-9][0-9]*}")
    public Response update(@PathParam("id") Long id, Evento entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (id == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (!id.equals(entity.getId())) {
            return Response.status(Status.CONFLICT).entity(entity).build();
        }
        if (eventoService.findById(id) == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        try {
            entity = eventoService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }
}
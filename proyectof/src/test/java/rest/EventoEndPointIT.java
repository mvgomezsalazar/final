/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import dao.EventoDao;
import model.Evento;
import util.TestConfig;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.junit.Test;
import org.junit.runner.RunWith;


@RunWith(Arquillian.class)
public class EventoEndPointIT {
    private static Long eventoId;

    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap
                .create(WebArchive.class, "proyectof-rest-test.war")
                .addClasses(EventoEndpoint.class, RestApplication.class,
                        EventoDao.class, Evento.class)
                .addAsWebInfResource("test-beans.xml", "beans.xml")
                .addAsWebInfResource("test-beans.xml", "beans.xml")
                .addAsResource("test-persistence.xml", "META-INF/persistence.xml");
    }
//
    @Test
    @InSequence(1)
    public void testAddBid() {
        WebTarget target = ClientBuilder.newClient()
                .target(TestConfig.TEST_BASE_URL + "/proyectof-rest-test/rest/eventos");
        // Save a new item.
        Evento evento = new Evento();

        evento.setNombre("Rest evento");
        evento.setLugar("Evento over rest");
        evento.setFecha("29/07/2017");
        evento.setHora(10);

        Evento item = target.request("application/json").post(Entity.json(evento), Evento.class);
        eventoId = item.getId();

        // Make sure it was correctly saved.
        item = target.path("{id}").resolveTemplate("id", eventoId)
                .request("application/json").get(Evento.class);

        assertEquals("Rest evento", item.getNombre());
    }

    @Test
    @InSequence(2)
    public void testUpdateItem() {
//        WebTarget target = ClientBuilder.newClient()
//                .target(TestConfig.TEST_BASE_URL + "/evento-rest-test/rest/items/{id}")
//                .resolveTemplate("id", eventoId);
//
//        // Update item.
//        Evento evento = target.request("application/json").get(Evento.class);
//
//        evento.setLugar("Updated lugar");
//
//        target.request().put(Entity.json(evento));
//
//        // Make sure item was updated.
//        evento = target.request("application/json").get(Evento.class);
//
//        assertEquals("Rest evento", evento.getNombre());
//        assertEquals("Updated lugar", evento.getLugar());
    }

    @Test
    @InSequence(3)
    public void testDeleteBid() {
//        WebTarget target = ClientBuilder.newClient()
//                .target(TestConfig.TEST_BASE_URL + "/evento-rest-test/rest/items/{id}")
//                .resolveTemplate("id", eventoId);
//        System.out.println(eventoId);
//        target.request().delete();
//        Evento evento = null;
//        try {
//            evento = target.request("application/json").get(Evento.class);
//        } catch (NotFoundException e) {
//        }
//        assertNull(evento);
    }
    
}

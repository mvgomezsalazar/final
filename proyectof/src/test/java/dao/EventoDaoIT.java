package dao;

import static org.junit.Assert.assertEquals;

import javax.ejb.EJB;
import model.Evento;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;


import static org.junit.Assert.assertNull;

@RunWith(Arquillian.class)
public class EventoDaoIT {
	
	private static Long eventoId;

    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap
                .create(WebArchive.class, "evento-dao-test.war")
                .addClasses(EventoDao.class, Evento.class)
                .addAsWebInfResource("test-beans.xml", "beans.xml")
                .addAsResource("test-persistence.xml", "META-INF/persistence.xml");
    }
    
    @EJB
    private EventoDao eventoService;
    
    @Test
    @InSequence(1)
    public void testAddItem() {
        // Save a new bid.
        Evento evento = new Evento();
        evento.setNombre("Test evento");
        evento.setLugar("Lugar Evento");
        evento.setHora(5);
        evento.setFecha("30/07/2018");

        eventoService.create(evento);

        // Make sure it was correctly saved.
        eventoId = evento.getId();

        evento = eventoService.findById(eventoId);
        assertEquals("Test evento", evento.getNombre());
    }
    
    @Test
    @InSequence(2)
    public void testModifyItem() {
        // Retrieve from database
        Evento evento = eventoService.findById(eventoId);
        evento.setLugar("Lugar del evento modificado");
        eventoService.update(evento);
        
        // Make sure it was correctly saved.
        eventoId = evento.getId();
        evento = eventoService.findById(eventoId);
        assertEquals("Test evento", evento.getNombre());
        assertEquals("Lugar del evento modificado", evento.getLugar());
    }
    
    @Test
    @InSequence(3)
    public void testDeleteItem() {
        eventoService.deleteById(eventoId);
        
        Evento ev = eventoService.findById(eventoId);
        assertNull(ev);
    }

}

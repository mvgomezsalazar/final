/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import model.Evento;

/**
 *
 * @author mvgomez
 */
@Stateless
public class EventoDao {
    
    @PersistenceContext(unitName = "demo-persistence-unit")
	private EntityManager em;
    
    public void create(Evento entity) {
		em.persist(entity);
	}

	public void deleteById(Long id) {
		Evento entity = em.find(Evento.class, id);
		if (entity != null) {
			em.remove(entity);
		}
	}

	public Evento findById(Long id) {
		return em.find(Evento.class, id);
	}

	public Evento update(Evento entity) {
		return em.merge(entity);
	}

	public List<Evento> listAll(Integer startPosition, Integer maxResult) {
		TypedQuery<Evento> findAllQuery = em.createQuery(
				"SELECT DISTINCT p FROM Evento p ORDER BY p.id", Evento.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		return findAllQuery.getResultList();
	}
    
}

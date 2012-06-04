package org.jboss.jdf.example.ticketmonster.service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Timer;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

import org.jboss.errai.bus.server.annotations.Service;
import org.jboss.jdf.example.ticketmonster.monitor.client.shared.BotService;
import org.jboss.jdf.example.ticketmonster.monitor.client.shared.qualifier.BotCreated;

/**
 * Implementation of {@link BotService}.
 * 
 * Errai's @Service annotation exposes this service as an RPC endpoint.
 * 
 * @author Christian Sadilek <csadilek@redhat.com>
 * @author Pete Muir
 */
@ApplicationScoped
@Service
public class BotServiceImpl implements BotService {

    private List<String> log;

    @Inject
    private Bot bot;
    
    @Inject
    private Logger logger;

    private Timer timer;
    
    public BotServiceImpl() {
        log = new ArrayList<String>();
    }

    @Override
    public void start() {
        synchronized (bot) {
            logger.info("Starting bot");
            timer = bot.start();
        }
    }

    @Override
    public void stop() {
        synchronized (bot) {
            if (timer != null) {
                logger.info("Stopping bot");
                bot.stop(timer);
                timer = null;
            }
        }
    }

    public void newBookingRequest(@Observes @BotCreated String bookingRequest) {
        log.add(bookingRequest);
    }

    @Override
    public List<String> fetchLog() {
        return log;
    }

}
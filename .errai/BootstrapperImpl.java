package org.jboss.errai.ioc.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.RunAsyncCallback;
import java.lang.annotation.Annotation;
import java.util.Set;
import javax.inject.Provider;
import org.jboss.errai.bus.client.api.Message;
import org.jboss.errai.bus.client.framework.Subscription;
import org.jboss.errai.enterprise.client.cdi.AbstractCDIEventCallback;
import org.jboss.errai.enterprise.client.cdi.CDIEventTypeLookup;
import org.jboss.errai.enterprise.client.cdi.CDIProtocol;
import org.jboss.errai.enterprise.client.cdi.EventProvider;
import org.jboss.errai.enterprise.client.cdi.InstanceProvider;
import org.jboss.errai.enterprise.client.cdi.api.CDI;
import org.jboss.errai.ioc.client.api.ContextualTypeProvider;
import org.jboss.errai.ioc.client.api.builtin.CallerProvider;
import org.jboss.errai.ioc.client.api.builtin.DisposerProvider;
import org.jboss.errai.ioc.client.api.builtin.IOCBeanManagerProvider;
import org.jboss.errai.ioc.client.api.builtin.InitBallotProvider;
import org.jboss.errai.ioc.client.api.builtin.MessageBusProvider;
import org.jboss.errai.ioc.client.api.builtin.RequestDispatcherProvider;
import org.jboss.errai.ioc.client.api.builtin.RootPanelProvider;
import org.jboss.errai.ioc.client.api.builtin.SenderProvider;
import org.jboss.errai.ioc.client.api.qualifiers.Any;
import org.jboss.errai.ioc.client.api.qualifiers.BuiltInQualifiers;
import org.jboss.errai.ioc.client.container.BeanRef;
import org.jboss.errai.ioc.client.container.CreationalCallback;
import org.jboss.errai.ioc.client.container.CreationalContext;
import org.jboss.errai.ioc.client.container.DestructionCallback;
import org.jboss.errai.ioc.client.container.IOCBeanManager;
import org.jboss.errai.ioc.client.container.InitializationCallback;
import org.jboss.jdf.example.ticketmonster.admin.client.local.TicketMonsterAdmin;
import org.jboss.jdf.example.ticketmonster.model.Booking;

public class BootstrapperImpl implements Bootstrapper {
  private native static void org_jboss_errai_ioc_client_api_builtin_DisposerProvider_beanManager(DisposerProvider instance, IOCBeanManager value) /*-{
    instance.@org.jboss.errai.ioc.client.api.builtin.DisposerProvider::beanManager = value;
  }-*/;

  // The main IOC bootstrap method.
  public BootstrapperInjectionContext bootstrapContainer() {
    CDIEventTypeLookup.get().addLookup("org.jboss.jdf.example.ticketmonster.model.Booking", "java.io.Serializable");
    CDIEventTypeLookup.get().addLookup("org.jboss.jdf.example.ticketmonster.model.Booking", "java.lang.Object");
    new CDI().__resetSubsystem();
    new CDI().initLookupTable(CDIEventTypeLookup.get());
    final BootstrapperInjectionContext injContext = new BootstrapperInjectionContext();
    CreationalContext context = injContext.getRootContext();
    final CreationalCallback<CallerProvider> inj1658_CallerProvider_creationalCallback = new CreationalCallback<CallerProvider>() {
      public CallerProvider getInstance(final CreationalContext context) {
        Class beanType = CallerProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final CallerProvider inj1641_CallerProvider = new CallerProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1641_CallerProvider);
        return inj1641_CallerProvider;
      }
    };
    final CallerProvider inj1641_CallerProvider = inj1658_CallerProvider_creationalCallback.getInstance(context);
    final CreationalCallback<RequestDispatcherProvider> inj1659_RequestDispatcherProvider_creationalCallback = new CreationalCallback<RequestDispatcherProvider>() {
      public RequestDispatcherProvider getInstance(final CreationalContext context) {
        Class beanType = RequestDispatcherProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final RequestDispatcherProvider inj1639_RequestDispatcherProvider = new RequestDispatcherProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1639_RequestDispatcherProvider);
        return inj1639_RequestDispatcherProvider;
      }
    };
    final RequestDispatcherProvider inj1639_RequestDispatcherProvider = inj1659_RequestDispatcherProvider_creationalCallback.getInstance(context);
    final CreationalCallback<SenderProvider> inj1660_SenderProvider_creationalCallback = new CreationalCallback<SenderProvider>() {
      public SenderProvider getInstance(final CreationalContext context) {
        Class beanType = SenderProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final SenderProvider inj1653_SenderProvider = new SenderProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1653_SenderProvider);
        return inj1653_SenderProvider;
      }
    };
    final SenderProvider inj1653_SenderProvider = inj1660_SenderProvider_creationalCallback.getInstance(context);
    final CreationalCallback<RootPanelProvider> inj1661_RootPanelProvider_creationalCallback = new CreationalCallback<RootPanelProvider>() {
      public RootPanelProvider getInstance(final CreationalContext context) {
        Class beanType = RootPanelProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final RootPanelProvider inj1655_RootPanelProvider = new RootPanelProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1655_RootPanelProvider);
        return inj1655_RootPanelProvider;
      }
    };
    final RootPanelProvider inj1655_RootPanelProvider = inj1661_RootPanelProvider_creationalCallback.getInstance(context);
    final CreationalCallback<IOCBeanManagerProvider> inj1662_IOCBeanManagerProvider_creationalCallback = new CreationalCallback<IOCBeanManagerProvider>() {
      public IOCBeanManagerProvider getInstance(final CreationalContext context) {
        Class beanType = IOCBeanManagerProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final IOCBeanManagerProvider inj1649_IOCBeanManagerProvider = new IOCBeanManagerProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1649_IOCBeanManagerProvider);
        return inj1649_IOCBeanManagerProvider;
      }
    };
    final IOCBeanManagerProvider inj1649_IOCBeanManagerProvider = inj1662_IOCBeanManagerProvider_creationalCallback.getInstance(context);
    final CreationalCallback<MessageBusProvider> inj1663_MessageBusProvider_creationalCallback = new CreationalCallback<MessageBusProvider>() {
      public MessageBusProvider getInstance(final CreationalContext context) {
        Class beanType = MessageBusProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final MessageBusProvider inj1647_MessageBusProvider = new MessageBusProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1647_MessageBusProvider);
        return inj1647_MessageBusProvider;
      }
    };
    final MessageBusProvider inj1647_MessageBusProvider = inj1663_MessageBusProvider_creationalCallback.getInstance(context);
    final CreationalCallback<InstanceProvider> inj1664_InstanceProvider_creationalCallback = new CreationalCallback<InstanceProvider>() {
      public InstanceProvider getInstance(final CreationalContext context) {
        Class beanType = InstanceProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final InstanceProvider inj1657_InstanceProvider = new InstanceProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1657_InstanceProvider);
        return inj1657_InstanceProvider;
      }
    };
    final InstanceProvider inj1657_InstanceProvider = inj1664_InstanceProvider_creationalCallback.getInstance(context);
    final CreationalCallback<EventProvider> inj1665_EventProvider_creationalCallback = new CreationalCallback<EventProvider>() {
      public EventProvider getInstance(final CreationalContext context) {
        Class beanType = EventProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final EventProvider inj1651_EventProvider = new EventProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1651_EventProvider);
        return inj1651_EventProvider;
      }
    };
    final EventProvider inj1651_EventProvider = inj1665_EventProvider_creationalCallback.getInstance(context);
    final CreationalCallback<DisposerProvider> inj1666_DisposerProvider_creationalCallback = new CreationalCallback<DisposerProvider>() {
      public DisposerProvider getInstance(final CreationalContext context) {
        Class beanType = DisposerProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final DisposerProvider inj1645_DisposerProvider = new DisposerProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1645_DisposerProvider);
        org_jboss_errai_ioc_client_api_builtin_DisposerProvider_beanManager(inj1645_DisposerProvider, inj1649_IOCBeanManagerProvider.get());
        return inj1645_DisposerProvider;
      }
    };
    final DisposerProvider inj1645_DisposerProvider = inj1666_DisposerProvider_creationalCallback.getInstance(context);
    final CreationalCallback<InitBallotProvider> inj1667_InitBallotProvider_creationalCallback = new CreationalCallback<InitBallotProvider>() {
      public InitBallotProvider getInstance(final CreationalContext context) {
        Class beanType = InitBallotProvider.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final InitBallotProvider inj1643_InitBallotProvider = new InitBallotProvider();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1643_InitBallotProvider);
        return inj1643_InitBallotProvider;
      }
    };
    final InitializationCallback<TicketMonsterAdmin> init_inj1543_TicketMonsterAdmin = new InitializationCallback<TicketMonsterAdmin>() {
      public void init(final TicketMonsterAdmin obj) {
        obj.createAndShowUI();
      }
    };
    final InitBallotProvider inj1643_InitBallotProvider = inj1667_InitBallotProvider_creationalCallback.getInstance(context);
    final CreationalCallback<TicketMonsterAdmin> inj1668_TicketMonsterAdmin_creationalCallback = new CreationalCallback<TicketMonsterAdmin>() {
      public TicketMonsterAdmin getInstance(final CreationalContext context) {
        Class beanType = TicketMonsterAdmin.class;
        Annotation[] qualifiers = new Annotation[] { new Any() {
            public Class annotationType() {
              return Any.class;
            }
        } };
        final TicketMonsterAdmin inj1543_TicketMonsterAdmin = new TicketMonsterAdmin();
        BeanRef beanRef = context.getBeanReference(beanType, qualifiers);
        context.addBean(beanRef, inj1543_TicketMonsterAdmin);
        final Subscription var1 = CDI.subscribe("org.jboss.jdf.example.ticketmonster.model.Booking", new AbstractCDIEventCallback() {
          {

          }
          public void callback(final Message message) {
            Set<String> msgQualifiers = message.get(Set.class, CDIProtocol.Qualifiers);
            if (qualifierSet.equals(msgQualifiers) || ((msgQualifiers == null) && qualifierSet.isEmpty())) {
              GWT.runAsync(new RunAsyncCallback() {
                public void onFailure(Throwable throwable) {
                  throw new RuntimeException("failed to run asynchronously", throwable);
                }
                public void onSuccess() {
                  inj1543_TicketMonsterAdmin.onBooking(message.get(Booking.class, CDIProtocol.BeanReference));
                }
              });
            }
          }
          public String toString() {
            return "Observer: org.jboss.jdf.example.ticketmonster.model.Booking []";
          }
        });
        final Subscription var2 = inj1647_MessageBusProvider.get().subscribe("cdi.event:org.jboss.jdf.example.ticketmonster.model.Booking", CDI.ROUTING_CALLBACK);
        context.addDestructionCallback(inj1543_TicketMonsterAdmin, new DestructionCallback<Booking>() {
          public void destroy(final Booking obj) {
            var1.remove();
            var2.remove();
          }
        });
        context.addInitializationCallback(inj1543_TicketMonsterAdmin, init_inj1543_TicketMonsterAdmin);
        return inj1543_TicketMonsterAdmin;
      }
    };
    final TicketMonsterAdmin inj1543_TicketMonsterAdmin = inj1668_TicketMonsterAdmin_creationalCallback.getInstance(context);
    injContext.addBean(CallerProvider.class, inj1658_CallerProvider_creationalCallback, inj1641_CallerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1658_CallerProvider_creationalCallback, inj1641_CallerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(RequestDispatcherProvider.class, inj1659_RequestDispatcherProvider_creationalCallback, inj1639_RequestDispatcherProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(Provider.class, inj1659_RequestDispatcherProvider_creationalCallback, inj1639_RequestDispatcherProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(SenderProvider.class, inj1660_SenderProvider_creationalCallback, inj1653_SenderProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1660_SenderProvider_creationalCallback, inj1653_SenderProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(RootPanelProvider.class, inj1661_RootPanelProvider_creationalCallback, inj1655_RootPanelProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(Provider.class, inj1661_RootPanelProvider_creationalCallback, inj1655_RootPanelProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(IOCBeanManagerProvider.class, inj1662_IOCBeanManagerProvider_creationalCallback, inj1649_IOCBeanManagerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(Provider.class, inj1662_IOCBeanManagerProvider_creationalCallback, inj1649_IOCBeanManagerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(MessageBusProvider.class, inj1663_MessageBusProvider_creationalCallback, inj1647_MessageBusProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(Provider.class, inj1663_MessageBusProvider_creationalCallback, inj1647_MessageBusProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(InstanceProvider.class, inj1664_InstanceProvider_creationalCallback, inj1657_InstanceProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1664_InstanceProvider_creationalCallback, inj1657_InstanceProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(EventProvider.class, inj1665_EventProvider_creationalCallback, inj1651_EventProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1665_EventProvider_creationalCallback, inj1651_EventProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(DisposerProvider.class, inj1666_DisposerProvider_creationalCallback, inj1645_DisposerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1666_DisposerProvider_creationalCallback, inj1645_DisposerProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(InitBallotProvider.class, inj1667_InitBallotProvider_creationalCallback, inj1643_InitBallotProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(ContextualTypeProvider.class, inj1667_InitBallotProvider_creationalCallback, inj1643_InitBallotProvider, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    injContext.addBean(TicketMonsterAdmin.class, inj1668_TicketMonsterAdmin_creationalCallback, inj1543_TicketMonsterAdmin, BuiltInQualifiers.DEFAULT_QUALIFIERS);
    return injContext;
  }
}
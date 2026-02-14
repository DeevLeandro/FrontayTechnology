import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    servico: '',
    mensagem: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs para animações
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const statItemsRef = useRef([]);
  const testimonialCardsRef = useRef([]);

  // Slides do carrossel
  const heroSlides = [
    {
      id: 1,
      title: 'Sites Institucionais',
      subtitle: 'Presença digital profissional com design exclusivo e alta performance.',
      image: '/images/Institucional.png',
      cta: 'Solicitar Orçamento'
    },
    {
      id: 2,
      title: 'E-commerces',
      subtitle: 'Lojas virtuais completas para impulsionar suas vendas online.',
      image: '/images/Ecommerce.png',
      cta: 'Solicitar Orçamento'
    },
    {
      id: 3,
      title: 'Landing Pages',
      subtitle: 'Páginas de alta conversão para campanhas e produtos.',
      image: '/images/Landing.png',
      cta: 'Solicitar Orçamento'
    },
    {
      id: 4,
      title: 'Aplicativos Mobile',
      subtitle: 'Apps nativos e híbridos para iOS e Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      cta: 'Solicitar Orçamento'
    }
  ];

  // Serviços com imagens
  const services = [
    {
      id: 1,
      name: 'Sites Institucionais',
      description: 'Desenvolvimento de sites profissionais com design responsivo, animações elegantes e otimização SEO avançada.',
      image: 'images/Institucional.png',
      icon: '🌐'
    },
    {
      id: 2,
      name: 'E-commerces',
      description: 'Lojas virtuais completas com gestão de produtos, carrinho inteligente e múltiplos gateways de pagamento.',
      image: '/images/Ecommerce.png',
      icon: '🛒'
    },
    {
      id: 3,
      name: 'Landing Pages',
      description: 'Páginas de alta conversão com copywriting estratégico, formulários inteligentes e integração com CRM.',
      image: 'images/Landing.png',
      icon: '🎯'
    },
    {
      id: 4,
      name: 'Aplicativos Mobile',
      description: 'Apps nativos e híbridos para iOS e Android com experiência fluida e notificações push.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      icon: '📱'
    },
    {
      id: 5,
      name: 'Sistemas Web',
      description: 'Sistemas personalizados para gestão empresarial, automação de processos e dashboards interativos.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
      icon: '⚙️'
    },
    {
      id: 6,
      name: 'UI/UX Design',
      description: 'Design de interfaces focado na experiência do usuário, prototipagem interativa e testes de usabilidade.',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      icon: '🎨'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'André Luiz',
      text: 'A Frontay desenvolveu o site institucional da minha empresa. Ficou exatamente como imaginei, com design moderno e rápido. As vendas aumentaram 40%!',
      rating: 5,
      city: 'Camboriú',
      avatar: '👨‍💼',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    },
    {
      id: 2,
      name: 'Carolina Menezes',
      text: 'Contratamos a Frontay para criar nosso e-commerce. O projeto foi entregue antes do prazo e as vendas já cresceram 150% em 3 meses.',
      rating: 5,
      city: 'Balneário Camboriú',
      avatar: '👩‍💼',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80'
    },
    {
      id: 3,
      name: 'Felipe Rocha',
      text: 'Precisávamos de um aplicativo para nossa startup. A equipe entendeu perfeitamente nossa visão e entregou um produto excelente. 5 estrelas!',
      rating: 5,
      city: 'Itajaí',
      avatar: '👨‍💻',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    }
  ];

  const whyChooseUs = [
    {
      id: 1,
      title: '2+ Anos de Experiência',
      description: 'Expertise comprovada em desenvolvimento de software',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Tecnologias Modernas',
      description: 'React, Node.js, Next.js, React Native, TypeScript',
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Projetos Personalizados',
      description: 'Soluções sob medida para cada necessidade',
      icon: '🎯'
    },
    {
      id: 4,
      title: 'Suporte Contínuo',
      description: 'Acompanhamento pós-lançamento e manutenção',
      icon: '🛡️'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquear scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  // Animações GSAP
  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );

    // Hero animations
    gsap.fromTo(".carousel-content",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power4.out" }
    );

    gsap.fromTo(".carousel-buttons .btn",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1, stagger: 0.2, ease: "backOut(1.7)" }
    );

    // Service cards animation
    serviceCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotationY: 30,
            rotationX: -10
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            delay: index * 0.1,
            ease: "power4.out"
          }
        );
      }
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out"
        }
      );
    });

    // About section
    gsap.fromTo(".sobre-text",
      { x: -100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out"
      }
    );

    gsap.fromTo(".sobre-image-container",
      { x: 100, opacity: 0, rotationY: 15 },
      {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power4.out"
      }
    );

    // Stats animation
    statItemsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(stat,
          { scale: 0, opacity: 0, rotation: -10 },
          {
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "backOut(1.7)"
          }
        );
      }
    });

    // Testimonials animation
    testimonialCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.9, rotationY: 20 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power4.out"
          }
        );
      }
    });

    // Form animation
    gsap.fromTo(".contact-form-container",
      { y: 80, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Carrossel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleNavClick = (e) => {
    // Fecha o menu mobile
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `Olá Frontay Technology! Gostaria de solicitar um orçamento para desenvolvimento de software.%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.telefone}%0A` +
      `*Cidade:* ${formData.cidade || 'Não informada'}%0A` +
      `*Tipo de Serviço:* ${formData.servico}%0A` +
      `*Detalhes:* ${formData.mensagem || 'Sem detalhes adicionais'}`;
    
    const whatsappNumber = '5547984658166';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cidade: '',
      servico: '',
      mensagem: ''
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const solicitarOrcamentoServico = (nomeServico) => {
    const whatsappMessage = `Olá Frontay Technology! Gostaria de solicitar um orçamento para o serviço de *${nomeServico}*.%0A%0APoderia me passar mais informações sobre valores, prazos e como funciona o processo de desenvolvimento?`;
    const whatsappNumber = '5547984658166';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const openWhatsAppHero = () => {
    const whatsappMessage = `Olá Frontay Technology! Vi o site de vocês e gostaria de mais informações sobre os serviços de desenvolvimento.`;
    const whatsappNumber = '5547984658166';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const openWhatsAppPersonalizado = () => {
    const whatsappMessage = `Olá Frontay Technology! Preciso de um projeto de software personalizado. Gostaria de conversar sobre uma solução sob medida.`;
    const whatsappNumber = '5547984658166';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const openWhatsAppFlutuante = () => {
    const whatsappMessage = `Olá Frontay Technology! Gostaria de solicitar um orçamento.`;
    const whatsappNumber = '5547984658166';
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    handleNavClick();
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/frontaytechnology/', '_blank');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header" ref={headerRef}>
        <div className="container">
          <div className="logo-container">
            <div className="logo">
              <img src='/images/Logo.png' alt='logo Frontay'/>
            </div>
          </div>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Início</a>
            <a href="#servicos" onClick={handleNavClick}>Serviços</a>
            <a href="#sobre" onClick={handleNavClick}>Sobre</a>
            <a href="#avaliacoes" onClick={handleNavClick}>Clientes</a>
            <a href="#contato" onClick={handleNavClick} className="nav-cta">Orçamento</a>
          </nav>
        </div>
      </header>

      {/* Overlay para fechar menu mobile */}
      {isMenuOpen && isMobile && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Hero Section */}
      <section className="hero-carousel" ref={heroRef}>
        <div className="carousel-container">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="carousel-overlay"></div>
              <div className="container">
                <div className="carousel-content">
                  <span className="hero-tag">Frontay Technology</span>
                  <h1 className="carousel-title">{slide.title}</h1>
                  <p className="carousel-subtitle">{slide.subtitle}</p>
                  <div className="carousel-buttons">
                    <a href="#contato" className="btn btn-primary" onClick={handleNavClick}>
                      Solicitar Orçamento
                    </a>
                    <button className="btn btn-outline" onClick={openWhatsAppHero}>
                      Fale com Especialista
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {!isMobile && (
            <>
              <button className="carousel-control prev" onClick={prevSlide} aria-label="Anterior">
                <span>←</span>
              </button>
              <button className="carousel-control next" onClick={nextSlide} aria-label="Próximo">
                <span>→</span>
              </button>
            </>
          )}
          
          <div className="carousel-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="section servicos" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">NOSSOS SERVIÇOS</span>
            <h2 className="section-title">Soluções Digitais que <span>Transformam Negócios</span></h2>
            <p className="section-subtitle">Desenvolvemos produtos digitais de alta performance que geram resultados reais</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="service-card"
                ref={el => serviceCardsRef.current[index] = el}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.name} />
                  <div className="service-overlay">
                    <div className="service-icon-large">{service.icon}</div>
                    <button 
                      className="btn-service-quick"
                      onClick={() => solicitarOrcamentoServico(service.name)}
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
                <div className="service-info">
                  <div className="service-icon-small">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-features">
                    <span>✓ Design Responsivo</span>
                    <span>✓ SEO Otimizado</span>
                    <span>✓ Alta Performance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cta-container">
            <div className="cta-content">
              <h3>Projeto Personalizado?</h3>
              <p>Tem uma ideia inovadora? Desenvolvemos soluções sob medida para o seu negócio.</p>
              <button className="btn btn-primary btn-large" onClick={openWhatsAppPersonalizado}>
                Falar sobre Projeto Personalizado
              </button>
            </div>
            <div className="cta-pattern"></div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="section sobre" ref={aboutRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">SOBRE NÓS</span>
            <h2 className="section-title">Inovação e Tecnologia com <span>Propósito</span></h2>
          </div>
          
          <div className="sobre-content">
            <div className="sobre-text">
              <p className="sobre-highlight">
                <strong>Frontay Technology</strong> é uma empresa de desenvolvimento de software localizada em <strong>Camboriú - SC</strong>.
              </p>
              <p>
                Combinamos <strong>tecnologia de ponta</strong> com <strong>design estratégico</strong> para criar experiências digitais que conectam marcas ao futuro. Nossa missão é transformar ideias em produtos digitais de alto impacto.
              </p>
              
              <div className="features-grid">
                {whyChooseUs.map(item => (
                  <div key={item.id} className="feature-item">
                    <div className="feature-icon">{item.icon}</div>
                    <div className="feature-content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="sobre-stats">
                <div className="stat-item" ref={el => statItemsRef.current[0] = el}>
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Anos</span>
                </div>
                <div className="stat-item" ref={el => statItemsRef.current[1] = el}>
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projetos</span>
                </div>
                <div className="stat-item" ref={el => statItemsRef.current[2] = el}>
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfação</span>
                </div>
              </div>
            </div>
            
            <div className="sobre-image-container">
              <div className="sobre-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Equipe Frontay Technology" 
                />
                <div className="image-badge">
                  <span>📍</span>
                  <p>Camboriú - SC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="avaliacoes" className="section testimonials" ref={testimonialsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">DEPOIMENTOS</span>
            <h2 className="section-title">O que nossos <span>clientes dizem</span></h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                ref={el => testimonialCardsRef.current[index] = el}
              >
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.city}</span>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section contato" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">CONTATO</span>
            <h2 className="section-title">Vamos criar algo <span>incrível juntos?</span></h2>
            <p className="section-subtitle">Solicite um orçamento gratuito e sem compromisso</p>
          </div>
          
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Orçamento Solicitado!</h3>
              <p>Você será redirecionado para o WhatsApp em instantes.</p>
              <a href="https://wa.me/5547984658166" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Clique aqui se não for redirecionado
              </a>
            </div>
          ) : (
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label htmlFor="nome">Nome Completo *</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label htmlFor="email">E-mail *</label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label htmlFor="telefone">Telefone *</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label htmlFor="cidade">Cidade *</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <select 
                    id="servico" 
                    name="servico" 
                    value={formData.servico}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione um serviço</option>
                    <option value="Site Institucional">Site Institucional</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Aplicativo Mobile">Aplicativo Mobile</option>
                    <option value="Sistema Web">Sistema Web</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                  <label htmlFor="servico">Tipo de Serviço *</label>
                </div>
                
                <div className="form-group">
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder=" "
                    rows="4"
                  ></textarea>
                  <label htmlFor="mensagem">Descrição do Projeto</label>
                </div>
                
                <button type="submit" className="btn btn-primary btn-submit">
                  Solicitar orçamento via WhatsApp
                </button>
                
                <p className="form-note">
                  Orçamento 100% gratuito e sem compromisso!
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" ref={footerRef}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>FRONTAY</h3>
              <p>Tecnologia e inovação para transformar seu negócio.</p>
              <div className="contact-info">
                <p><span>📱</span> (47) 98465-8166</p>
                <p><span>📍</span> Camboriú - SC</p>
                <p><span>📧</span> contato@frontay.com</p>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Navegação</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Início</a>
              <a href="#servicos" onClick={handleNavClick}>Serviços</a>
              <a href="#sobre" onClick={handleNavClick}>Sobre</a>
              <a href="#avaliacoes" onClick={handleNavClick}>Clientes</a>
              <a href="#contato" onClick={handleNavClick}>Contato</a>
            </div>
            
            <div className="footer-social">
              <h4>Redes Sociais</h4>
              <p>Acompanhe nossos projetos</p>
              <div className="social-icons">
                <button className="social-btn" onClick={openInstagram}>
                  <span>📸</span> Instagram
                </button>
                <button className="social-btn whatsapp-btn" onClick={openWhatsAppFlutuante}>
                  <span>💬</span> WhatsApp
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Frontay Technology. Todos os direitos reservados.</p>
            <p>Desenvolvido com 💙 em Camboriú - SC</p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <div className="floating-whatsapp">
        <button onClick={openWhatsAppFlutuante} aria-label="WhatsApp">
          💬
        </button>
      </div>
    </div>
  );
}

export default App;
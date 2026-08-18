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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Refs para animações
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const testimonialCardsRef = useRef([]);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const heroImageRef = useRef(null);
  const aboutImageRef = useRef(null);
  const aboutTextRef = useRef(null);
  const contactFormRef = useRef(null);

  // Slides do carrossel
  const heroSlides = [
    {
      id: 1,
      title: 'Sites Institucionais',
      subtitle: 'Presença digital profissional com design exclusivo e alta performance.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
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

  // Serviços
  const services = [
    {
      id: 1,
      name: 'Sites Institucionais',
      description: 'Desenvolvimento de sites profissionais com design responsivo, animações elegantes e otimização SEO avançada.',
      image: 'images/Institucional.png',
    },
    {
      id: 2,
      name: 'E-commerces',
      description: 'Lojas virtuais completas com gestão de produtos, carrinho inteligente e múltiplos gateways de pagamento.',
      image: '/images/Ecommerce.png',
    },
    {
      id: 3,
      name: 'Landing Pages',
      description: 'Páginas de alta conversão com copywriting estratégico, formulários inteligentes e integração com CRM.',
      image: 'images/Landing.png',
    },
    {
      id: 4,
      name: 'Aplicativos Mobile',
      description: 'Apps nativos e híbridos para iOS e Android com experiência fluida e notificações push.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    },
    {
      id: 5,
      name: 'Sistemas Web',
      description: 'Sistemas personalizados para gestão empresarial, automação de processos e dashboards interativos.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    },
    {
      id: 6,
      name: 'UI/UX Design',
      description: 'Design de interfaces focado na experiência do usuário, prototipagem interativa e testes de usabilidade.',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'André Luiz',
      text: 'A Frontay desenvolveu o site institucional da minha empresa. Ficou exatamente como imaginei, com design moderno e rápido. As vendas aumentaram 40%!',
      city: 'Camboriú',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    },
    {
      id: 2,
      name: 'Carolina Menezes',
      text: 'Contratamos a Frontay para criar nosso e-commerce. O projeto foi entregue antes do prazo e as vendas já cresceram 150% em 3 meses.',
      city: 'Balneário Camboriú',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80'
    },
    {
      id: 3,
      name: 'Felipe Rocha',
      text: 'Precisávamos de um aplicativo para nossa startup. A equipe entendeu perfeitamente nossa visão e entregou um produto excelente.',
      city: 'Itajaí',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80'
    }
  ];

  const realProjects = [
    {
      id: 1,
      name: 'E-commerce Moda Express',
      description: 'Loja virtual completa com integração de pagamentos, gestão de estoque e dashboard analítico.',
      result: 'Aumento de 150% nas vendas em 3 meses'
    },
    {
      id: 2,
      name: 'App Rápido Entregas',
      description: 'Aplicativo de delivery com rastreamento em tempo real, otimização de rotas e notificações push.',
      result: 'Redução de 30% no tempo médio de entrega'
    },
    {
      id: 3,
      name: 'Site Construtora Alpha',
      description: 'Site institucional com vitrine de empreendimentos, tour virtual e sistema de captação de leads.',
      result: 'Geração de leads aumentada em 200%'
    },
    {
      id: 4,
      name: 'Sistema Clínica Saúde Total',
      description: 'Sistema de agendamento online, gestão de pacientes e envio automático de lembretes.',
      result: 'Redução de 40% nas faltas e cancelamentos'
    }
  ];

  // --- Efeitos de responsividade e menu ---
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isMobile]);

  // --- Carrossel automático ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // --- ANIMAÇÕES GSAP COMPLETAS (RESTAURADAS) ---
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ============================================================
      // 1. HEADER - interação com scroll
      // ============================================================
      const header = headerRef.current;
      if (header) {
        gsap.set(header, { 
          backgroundColor: 'rgba(10, 15, 28, 0)',
          backdropFilter: 'blur(0px)',
          borderBottom: '1px solid rgba(72, 169, 197, 0)',
          padding: '15px 0'
        });

        const headerTL = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '+=200',
            scrub: 1,
          }
        });
        headerTL
          .to(header, {
            backgroundColor: 'rgba(10, 15, 28, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(72, 169, 197, 0.2)',
            padding: '10px 0',
            duration: 1,
            ease: 'power1.inOut'
          });

        let lastScrollY = window.scrollY;
        let headerHidden = false;
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 200) {
            if (currentScrollY > lastScrollY && !headerHidden) {
              headerHidden = true;
              gsap.to(header, { y: -100, opacity: 0, duration: 0.4, ease: 'power2.out' });
            } else if (currentScrollY < lastScrollY && headerHidden) {
              headerHidden = false;
              gsap.to(header, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
            }
          } else {
            if (headerHidden) {
              headerHidden = false;
              gsap.to(header, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
            }
          }
          lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        window._headerScrollCleanup = () => window.removeEventListener('scroll', handleScroll);
      }

      // ============================================================
      // 2. HERO - entrada em camadas com parallax
      // ============================================================
      const hero = heroRef.current;
      if (hero) {
        const heroTag = heroTagRef.current;
        const heroTitle = heroTitleRef.current;
        const heroSub = heroSubRef.current;
        const heroBtns = heroBtnsRef.current;
        const heroOverlay = heroOverlayRef.current;
        const heroImage = heroImageRef.current;

        gsap.set(heroTag, { y: 80, opacity: 0, scale: 0.8 });
        gsap.set(heroTitle, { y: 100, opacity: 0, scale: 0.9 });
        gsap.set(heroSub, { y: 60, opacity: 0 });
        gsap.set(heroBtns, { y: 50, opacity: 0 });
        gsap.set(heroOverlay, { opacity: 0.7 });
        if (heroImage) gsap.set(heroImage, { scale: 1.15 });

        const entryTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
        entryTL
          .to(heroTag, { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.3 })
          .to(heroTitle, { y: 0, opacity: 1, scale: 1, duration: 1.4, delay: 0.2 }, '-=0.6')
          .to(heroSub, { y: 0, opacity: 1, duration: 1.2, delay: 0.1 }, '-=0.8')
          .to(heroBtns, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'backOut(1.7)' }, '-=0.6');

        if (!isMobile) {
          // Parallax no overlay e imagem
          ScrollTrigger.create({
            trigger: hero,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              if (heroOverlay) {
                gsap.to(heroOverlay, { 
                  opacity: 0.7 - progress * 0.3,
                  duration: 0.1,
                  overwrite: 'auto'
                });
              }
              if (heroImage) {
                const scale = 1.15 - progress * 0.2;
                gsap.to(heroImage, { 
                  scale: Math.max(1, scale),
                  duration: 0.1,
                  overwrite: 'auto'
                });
              }
            }
          });

          gsap.to(heroTitle, {
            y: -80,
            scale: 0.95,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
          gsap.to(heroSub, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
          gsap.to(heroTag, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });

          // Transição hero → serviços com clip-path
          const heroContainer = hero.querySelector('.carousel-container');
          if (heroContainer) {
            gsap.to(heroContainer, {
              clipPath: 'inset(0% 0% 100% 0%)',
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: servicesRef.current,
                start: 'top bottom',
                end: 'top top',
                scrub: 1.5,
                pin: hero,
                pinSpacing: true,
              }
            });
            gsap.to(hero, {
              scale: 0.92,
              opacity: 0.3,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: servicesRef.current,
                start: 'top bottom',
                end: 'top top',
                scrub: 1.5,
              }
            });
          }
        }
      }

      // ============================================================
      // 3. SERVIÇOS - entrada cinematográfica com stagger e parallax
      // ============================================================
      const servicesSection = servicesRef.current;
      if (servicesSection) {
        const cards = serviceCardsRef.current.filter(el => el);
        const sectionTitle = servicesSection.querySelector('.section-title');
        const sectionBadge = servicesSection.querySelector('.section-badge');
        const sectionSub = servicesSection.querySelector('.section-subtitle');

        gsap.set(sectionBadge, { opacity: 0, y: 40 });
        gsap.set(sectionTitle, { opacity: 0, y: 60 });
        gsap.set(sectionSub, { opacity: 0, y: 40 });
        cards.forEach((card) => {
          gsap.set(card, { 
            opacity: 0, 
            y: 100, 
            scale: 0.95,
            rotationX: 5,
            clipPath: 'inset(0% 0% 100% 0%)'
          });
        });

        // Título dividido em palavras
        if (sectionTitle) {
          const words = sectionTitle.textContent.split(' ');
          sectionTitle.innerHTML = words.map(word => 
            `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:top;">${word}</span>`
          ).join(' ');
          const wordEls = sectionTitle.querySelectorAll('.word');
          gsap.set(wordEls, { y: '100%', opacity: 0 });
          gsap.to(wordEls, {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: servicesSection,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });
        }

        gsap.to(sectionBadge, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });
        gsap.to(sectionSub, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });

        cards.forEach((card, index) => {
          const speed = 0.1 + index * 0.05;
          gsap.to(card, {
            y: (i) => -60 + (i % 3) * 20,
            ease: 'none',
            scrollTrigger: {
              trigger: servicesSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });

          gsap.to(card, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });

          const img = card.querySelector('.service-image img');
          if (img) {
            gsap.to(img, {
              yPercent: -15,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              }
            });
          }
        });

        // Transição serviços → sobre (imagem com máscara)
        const aboutSection = aboutRef.current;
        if (aboutSection) {
          const aboutImgContainer = aboutSection.querySelector('.sobre-image-wrapper');
          const aboutImg = aboutImgContainer?.querySelector('img');
          if (aboutImgContainer) {
            gsap.set(aboutImgContainer, { clipPath: 'inset(0% 0% 0% 100%)' });
            gsap.to(aboutImgContainer, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.5,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: aboutSection,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1.5,
                toggleActions: 'play none none reverse'
              }
            });
            if (aboutImg) {
              gsap.to(aboutImg, {
                yPercent: -10,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: aboutSection,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                }
              });
            }
          }
        }
      }

      // ============================================================
      // 4. SOBRE - texto progressivo, projetos reais e parallax
      // ============================================================
      const aboutSection = aboutRef.current;
      if (aboutSection) {
        const textBlocks = aboutSection.querySelectorAll('.sobre-text p, .sobre-highlight');
        const features = aboutSection.querySelectorAll('.feature-item');
        const projectItems = aboutSection.querySelectorAll('.projeto-item');

        // Texto com stagger
        gsap.set(textBlocks, { opacity: 0, y: 40 });
        gsap.to(textBlocks, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
          }
        });

        // Features
        gsap.set(features, { opacity: 0, x: -30 });
        gsap.to(features, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
          }
        });

        // Projetos reais com stagger e efeito de destaque
        gsap.set(projectItems, { opacity: 0, y: 40, scale: 0.95 });
        gsap.to(projectItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'backOut(1.4)',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 65%',
            end: 'top 20%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
          }
        });
      }

      // ============================================================
      // 5. DEPOIMENTOS - apresentação editorial com stagger e parallax
      // ============================================================
      const testimonialsSection = testimonialsRef.current;
      if (testimonialsSection) {
        const cards = testimonialCardsRef.current.filter(el => el);
        const sectionTitle = testimonialsSection.querySelector('.section-title');
        const sectionBadge = testimonialsSection.querySelector('.section-badge');

        if (sectionTitle) {
          const words = sectionTitle.textContent.split(' ');
          sectionTitle.innerHTML = words.map(word => 
            `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:top;">${word}</span>`
          ).join(' ');
          const wordEls = sectionTitle.querySelectorAll('.word');
          gsap.set(wordEls, { y: '100%', opacity: 0 });
          gsap.to(wordEls, {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: testimonialsSection,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });
        }

        gsap.to(sectionBadge, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: testimonialsSection,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });

        cards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 80, scale: 0.9, rotationY: 10 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });

          const img = card.querySelector('img');
          if (img) {
            gsap.to(img, {
              yPercent: -8,
              scale: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              }
            });
          }
        });
      }

      // ============================================================
      // 6. CONTATO - entrada forte com campos progressivos
      // ============================================================
      const contactSection = contactRef.current;
      if (contactSection) {
        const formContainer = contactSection.querySelector('.contact-form-container');
        const form = contactSection.querySelector('.contact-form');
        const title = contactSection.querySelector('.section-title');
        const badge = contactSection.querySelector('.section-badge');
        const subtitle = contactSection.querySelector('.section-subtitle');
        const formGroups = form?.querySelectorAll('.form-group');
        const submitBtn = form?.querySelector('.btn-submit');

        if (title) {
          const words = title.textContent.split(' ');
          title.innerHTML = words.map(word => 
            `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:top;">${word}</span>`
          ).join(' ');
          const wordEls = title.querySelectorAll('.word');
          gsap.set(wordEls, { y: '100%', opacity: 0 });
          gsap.to(wordEls, {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: contactSection,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });
        }

        gsap.to(badge, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });
        gsap.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });

        if (formContainer) {
          gsap.set(formContainer, { opacity: 0, y: 60, scale: 0.96 });
          gsap.to(formContainer, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: contactSection,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1.5,
              toggleActions: 'play none none reverse'
            }
          });
        }

        if (formGroups) {
          gsap.set(formGroups, { opacity: 0, y: 30 });
          gsap.to(formGroups, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: contactSection,
              start: 'top 65%',
              end: 'top 25%',
              scrub: 1.2,
              toggleActions: 'play none none reverse'
            }
          });
        }

        if (submitBtn) {
          gsap.to(submitBtn, {
            scale: 1.02,
            boxShadow: '0 15px 40px rgba(72, 169, 197, 0.5)',
            duration: 0.3,
            yoyo: true,
            repeat: -1,
            repeatDelay: 3,
            ease: 'power1.inOut'
          });
        }
      }

      // ============================================================
      // 7. FOOTER - encerramento com movimento sutil
      // ============================================================
      const footer = footerRef.current;
      if (footer) {
        gsap.set(footer, { y: 60, opacity: 0 });
        gsap.to(footer, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.5,
            toggleActions: 'play none none reverse'
          }
        });

        const footerLogo = footer.querySelector('.footer-info h3');
        if (footerLogo) {
          gsap.to(footerLogo, {
            x: 15,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
          });
        }

        const links = footer.querySelectorAll('.footer-links a');
        gsap.set(links, { opacity: 0, x: -20 });
        gsap.to(links, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.2,
            toggleActions: 'play none none reverse'
          }
        });
      }

      // ============================================================
      // 8. PARALLAX GERAL - elementos com classes .parallax-*
      // ============================================================
      const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
      parallaxElements.forEach(el => {
        let speed = 0;
        if (el.classList.contains('parallax-slow')) speed = -8;
        else if (el.classList.contains('parallax-medium')) speed = -15;
        else if (el.classList.contains('parallax-fast')) speed = -25;
        
        if (speed !== 0 && !isMobile) {
          gsap.to(el, {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
        }
      });

      // ============================================================
      // 9. CURSOR PERSONALIZADO (desktop)
      // ============================================================
      if (!isMobile && !prefersReducedMotion) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 20px;
          height: 20px;
          border: 2px solid #48A9C5;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s, border-color 0.2s;
          mix-blend-mode: difference;
          will-change: transform;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        cursorDot.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 6px;
          height: 6px;
          background: #48A9C5;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.15s, height 0.15s;
          will-change: transform;
        `;
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        const animateCursor = () => {
          cursorX += (mouseX - cursorX) * 0.12;
          cursorY += (mouseY - cursorY) * 0.12;
          dotX += (mouseX - dotX) * 0.25;
          dotY += (mouseY - dotY) * 0.25;

          cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
          cursorDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

          requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .btn, .social-btn, .service-card, .testimonial-card');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = '#0077BE';
            cursor.style.background = 'rgba(72, 169, 197, 0.15)';
            cursorDot.style.width = '10px';
            cursorDot.style.height = '10px';
          });
          el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = '#48A9C5';
            cursor.style.background = 'transparent';
            cursorDot.style.width = '6px';
            cursorDot.style.height = '6px';
          });
        });

        if ('ontouchstart' in window) {
          cursor.style.display = 'none';
          cursorDot.style.display = 'none';
        }

        window._cursorCleanup = () => {
          if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
          if (cursorDot.parentNode) cursorDot.parentNode.removeChild(cursorDot);
        };
      }

    }, { scope: document });

    return () => {
      ctx.revert();
      if (window._headerScrollCleanup) window._headerScrollCleanup();
      if (window._cursorCleanup) window._cursorCleanup();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  // --- Funções de navegação e WhatsApp ---
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
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setFormData({ nome: '', email: '', telefone: '', cidade: '', servico: '', mensagem: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const solicitarOrcamentoServico = (nomeServico) => {
    const whatsappMessage = `Olá Frontay Technology! Gostaria de solicitar um orçamento para o serviço de *${nomeServico}*.%0A%0APoderia me passar mais informações sobre valores, prazos e como funciona o processo de desenvolvimento?`;
    window.open(`https://wa.me/5547984658166?text=${whatsappMessage}`, '_blank');
  };

  const openWhatsAppHero = () => {
    window.open(`https://wa.me/5547984658166?text=Olá Frontay Technology! Vi o site de vocês e gostaria de mais informações sobre os serviços de desenvolvimento.`, '_blank');
  };

  const openWhatsAppPersonalizado = () => {
    window.open(`https://wa.me/5547984658166?text=Olá Frontay Technology! Preciso de um projeto de software personalizado. Gostaria de conversar sobre uma solução sob medida.`, '_blank');
  };

  const openWhatsAppFlutuante = () => {
    window.open(`https://wa.me/5547984658166?text=Olá Frontay Technology! Gostaria de solicitar um orçamento.`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNavClick();
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/frontaytechnology/', '_blank');
  };

  // --- Render ---
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
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay" ref={index === currentSlide ? heroOverlayRef : null}></div>
              <div className="container">
                <div className="carousel-content">
                  <h1 className="carousel-title" ref={heroTitleRef}>{slide.title}</h1>
                  <p className="carousel-subtitle" ref={heroSubRef}>{slide.subtitle}</p>
                  <div className="carousel-buttons" ref={heroBtnsRef}>
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
                  <img src={service.image} alt={service.name} loading="lazy" />
                  <div className="service-overlay">
                    <button 
                      className="btn-service-quick"
                      onClick={() => solicitarOrcamentoServico(service.name)}
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
                <div className="service-info">
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
            <div className="sobre-text" ref={aboutTextRef}>
              <p className="sobre-highlight">
                <strong>Frontay Technology</strong> é uma empresa de desenvolvimento de software localizada em <strong>Camboriú - SC</strong>.
              </p>
              <p>
                Combinamos <strong>tecnologia de ponta</strong> com <strong>design estratégico</strong> para criar experiências digitais que conectam marcas ao futuro. Nossa missão é transformar ideias em produtos digitais de alto impacto.
              </p>
              
              {/* Projetos reais */}
              <div className="projetos-reais">
                <h4>Projetos que Entregamos com Sucesso</h4>
                <div className="projetos-grid">
                  {realProjects.map((project) => (
                    <div key={project.id} className="projeto-item">
                      <h5>{project.name}</h5>
                      <p>{project.description}</p>
                      <span className="projeto-resultado">{project.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="sobre-image-container">
              <div className="sobre-image-wrapper" ref={aboutImageRef}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Equipe Frontay Technology" 
                  loading="lazy"
                />
                <div className="image-badge">
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
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.city}</span>
                  </div>
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
            <div className="contact-form-container" ref={contactFormRef}>
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
                  Solicitar orçamento
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
                <p>(47) 98465-8166</p>
                <p>Camboriú - SC</p>
                <p>contato@frontay.com</p>
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
                  Instagram
                </button>
                <button className="social-btn whatsapp-btn" onClick={openWhatsAppFlutuante}>
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </span>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Frontay Technology. Todos os direitos reservados.</p>
            <p>Desenvolvido em Camboriú - SC</p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <div className="floating-whatsapp">
        <button onClick={openWhatsAppFlutuante} aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
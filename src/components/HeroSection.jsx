import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import espelho from '../assets/Espelho.png';
import espelhoDark from '../assets/EspelhoDark.png';
import isabela from '../assets/Isabela.png';
import danielle from '../assets/Danielle.png';
import leticia from '../assets/Leticia.png';
import gabriela from '../assets/Gabriela.png';

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const titleTexts = [
    "ONDE MODA E TECNOLOGIA SE ENCONTRAM.",
    "ONDE INOVAÇÃO E ESTILO SE CONECTAM.",
    "ONDE O FUTURO DA MODA COMEÇA."
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

  
  }, []);

  useEffect(() => {
    const currentText = titleTexts[currentTitleIndex];
    
    const handleTyping = () => {
      if (!isDeleting && displayText.length < currentText.length) {
       
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(100);
      } else if (isDeleting && displayText.length > 0) {
     
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else if (!isDeleting && displayText.length === currentText.length) {

        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length === 0) {
    
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titleTexts.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, titleTexts, typingSpeed]);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendToWhatsApp = (data) => {
    const message = `Nova mensagem do site Áurea:%0A%0A*Nome:* ${data.name}%0A*E-mail:* ${data.email}%0A*Mensagem:* ${data.message}`;
    const phoneNumber = '5511937623721';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Envia para o WhatsApp
    sendToWhatsApp(formData);
    
    // Também envia para o e-mail como backup usando FormSubmit
    const form = e.target;
    const formDataToSubmit = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          const formSection = document.getElementById('contact-form');
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } catch (error) {
      console.error('Erro ao enviar para e-mail:', error);
    }
  };

  return (
    <div className="bg-[#FAE6DD] dark:bg-[#8A6157] min-h-screen transition-colors duration-300 pt-16">
      
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto pt-28 px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div 
              className="text-center lg:text-left transition-all duration-700 opacity-0 translate-y-10"
              ref={el => sectionRefs.current[0] = el}
              id="section-0"
              style={visibleSections['section-0'] ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfairsc text-[#61372F] dark:text-[#B39889] mb-6 transition-colors duration-300">
                {displayText}<span className="animate-pulse">|</span>
              </h2>
              <p className="text-lg md:text-xl font-poppins text-[#61372F] dark:text-[#B39889] mb-8 transition-colors duration-300">
                Navegue, experimente e compre – sem tocar nas araras.
              </p>
            </div>
            
            <div 
              className="flex justify-center lg:justify-end transition-all duration-700 opacity-0 translate-y-10"
              ref={el => sectionRefs.current[1] = el}
              id="section-1"
              style={visibleSections['section-1'] ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              <img 
                src={isDarkMode ? espelhoDark : espelho} 
                alt="Espelho Áurea" 
                className="w-80 md:w-96 lg:w-[500px] h-auto object-contain transition-transform duration-300 hover:scale-105" 
              />
            </div>
          </div>

          <div className="w-full h-0.5 bg-[#CDA6A2] dark:bg-[#A17E74] my-16 transition-colors duration-300"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            <div 
              className="bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-10 rounded-lg text-center h-80 transition-all duration-300 hover:scale-105 hover:shadow-xl opacity-0 translate-y-10"
              ref={el => sectionRefs.current[2] = el}
              id="section-2"
              style={visibleSections['section-2'] ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              <h3 className="text-3xl font-playfairsc font-bold text-[#704943] mb-6">
                EXPERIÊNCIA IMERSIVA
              </h3>
              <p className="text-xl font-poppins text-[#704943] mb-10 leading-relaxed"> 
                Você pode explorar, combinar e até comprar as peças diretamente pelo totem, sem precisar procurar nas araras.
              </p>
            </div>

            <div 
              className="bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-10 rounded-lg text-center h-80 transition-all duration-300 hover:scale-105 hover:shadow-xl opacity-0 translate-y-10"
              ref={el => sectionRefs.current[3] = el}
              id="section-3"
              style={visibleSections['section-3'] ? { opacity: 1, transform: 'translateY(0)' } : {}}
            >
              <h3 className="text-3xl font-playfairsc font-bold text-[#704943] mb-8">
                TECNOLOGIA PARA LOJAS INOVADORAS
              </h3>
              <p className="text-xl font-poppins text-[#704943] mb-8 leading-relaxed">
                Ideal para clientes que valorizam praticidade, estilo e atendimento inteligente, sem abrir mão do toque humano.
              </p>
            </div>
          </div>

          <div 
            className="bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-10 rounded-lg text-center mb-20 max-w-2xl mx-auto h-96 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl opacity-0 translate-y-10"
            ref={el => sectionRefs.current[4] = el}
            id="section-4"
            style={visibleSections['section-4'] ? { opacity: 1, transform: 'translateY(0)' } : {}}
          >
            <h3 className="text-3xl font-playfairsc font-bold text-[#704943] mb-8">
              SUA ROUPA. SEU ESTILO. SUA LOJA, REPENSADA.
            </h3>
            <p className="text-xl font-poppins text-[#704943] mb-8 leading-relaxed">
              Com ÁUREA, vestir-se bem é tão simples quanto ser você mesmo. Descubra sugestões inteligentes e práticas direto no totem da loja.
            </p>
            <Link to="/funcionamento" className="group relative inline-block">
              <button className="bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] px-8 py-3 rounded-lg hover:bg-[#D4B9A9] dark:hover:bg-[#8A6B61] transition-all duration-300 group-hover:scale-105">
                <span className="text-xl font-playfair font-bold text-[#61372F] dark:text-[#61372F]">
                  Ver como funciona
                </span>
              </button>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61372F] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl font-playfairsc italic font-bold text-[#61372F] dark:text-[#F9E5DE] text-center mb-12 transition-colors duration-300">
              ÁUREA — A MODA INTELIGENTE
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              <div className="text-center bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-8 rounded-lg mx-auto w-full max-w-[400px] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-center font-playfairsc font-bold text-[#704943] mb-4">
                  DIFERENCIAL
                </h4>
                <p className="text-lg font-poppins text-[#704943]">
                  Traz praticidade e personalização para lojas físicas. Evita filas, reduz o tempo de busca e aumenta a conversão de vendas.
                </p>
              </div>

              <div className="text-center bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-8 rounded-lg mx-auto w-full max-w-[400px] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-xl font-playfairsc font-bold text-[#704943] mb-4">
                  PÚBLICO-ALVO
                </h4>
                <p className="text-lg font-poppins text-[#704943]">
                  Clientes que frequentam lojas físicas, mas desejam uma experiência rápida e interativa. Lojas físicas de pequeno a grande porte.
                </p>
              </div>

              <div className="text-center bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-8 rounded-lg mx-auto w-full max-w-[400px] transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h4 className="text-xl font-playfairsc font-bold text-[#704943] mb-4 text-center">
                  OBJETIVO
                </h4>
                <p className="text-lg font-poppins text-[#704943]">
                  Revolucionar a experiência de compra em lojas físicas, unindo moda, tecnologia e interatividade.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-playfairsc italic font-bold text-[#61372F] dark:text-[#F9E5DE] text-center mb-8 transition-colors duration-300">
             APLICATIVO ÁUREA
            </h2>

            <p className="text-lg md:text-xl font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-12 max-w-2xl mx-auto transition-colors duration-300">
              Conecte sua experiência de compra com tecnologia e estilo.
            </p>

            <div className="bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-8 rounded-lg w-full max-w-4xl mx-auto transition-colors duration-300">
              <p className="text-lg font-poppins font-light text-[#704943] text-center mb-8 leading-relaxed ">
                O app da ÁUREA permite que você acesse as peças disponíveis na loja diretamente do seu celular. Através da integração com o espelho equipado com câmera, o sistema reconhece a peça que você está vestindo e envia as informações para o totem — e de lá, direto para seu app. Simples, rápido e sem precisar procurar nas araras.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-playfairsc text-[#61372F] dark:text-[#F9E5DE] text-center mb-8 transition-colors duration-300">
              QUEM SOMOS?
            </h2>

            <p className="text-lg font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-12 transition-colors duration-300">
              Conheça quem faz o ÁUREA acontecer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <img src={isabela} alt="Isabela" className="w-40 h-40 object-contain mb-4 rounded-full border-2 border-[#CDA6A2] dark:border-[#8A665C] transition-colors duration-300" />
                <p className="text-sm font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  @iisacost_
                </p>
                <p className="text-lg font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  Isabela Costa
                </p>
                <div className="w-24 h-0.5 bg-[#61372F] dark:bg-[#F9E5DE] transition-colors duration-300"></div>
              </div>

              <div className="flex flex-col items-center">
                <img 
                  src={danielle} 
                  alt="Danielle" 
                  className="w-40 h-40 object-contain mb-4 rounded-full border-2 border-[#CDA6A2] dark:border-[#8A665C] transition-colors duration-300" 
                />
                <p className="text-sm font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  @_dany.elle_
                </p>
                <p className="text-lg font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  Danielle Freitas
                </p>
                <div className="w-24 h-0.5 bg-[#61372F] dark:bg-[#F9E5DE] transition-colors duration-300"></div>
              </div>

              <div className="flex flex-col items-center">
                <img 
                  src={leticia} 
                  alt="Leticia" 
                  className="w-40 h-40 object-contain mb-4 rounded-full border-2 border-[#CDA6A2] dark:border-[#8A665C] transition-colors duration-300" 
                />
                <p className="text-sm font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  @lelealmeida__
                </p>
                <p className="text-lg font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  Letícia Moreira
                </p>
                <div className="w-24 h-0.5 bg-[#61372F] dark:bg-[#F9E5DE] transition-colors duration-300"></div>
              </div>

              <div className="flex flex-col items-center">
                <img 
                  src={gabriela} 
                  alt="Gabriela" 
                  className="w-40 h-40 object-contain mb-4 rounded-full border-2 border-[#CDA6A2] dark:border-[#8A665C] transition-colors duration-300" 
                />
                <p className="text-sm font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  @gabiheerculano_
                </p>
                <p className="text-lg font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center mb-2 transition-colors duration-300">
                  Gabriela Herculano
                </p>
                <div className="w-24 h-0.5 bg-[#61372F] dark:bg-[#F9E5DE] transition-colors duration-300"></div>
              </div>
            </div>
          </div>

          <div className="pb-20" id="contact-form">
            <h2 className="text-4xl font-playfairsc text-[#61372F] dark:text-[#F9E5DE] text-center mb-8 transition-colors duration-300">
              ENTRE EM CONTATO
            </h2>

            <p className="text-lg font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-12 max-w-2xl mx-auto transition-colors duration-300">
              Estamos prontas para te ajudar! Envie sua mensagem e responderemos o mais rápido possível.
            </p>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8 max-w-md mx-auto text-center">
                <p className="font-bold">Mensagem enviada com sucesso!</p>
                <p>Retornaremos em breve. Obrigada pelo contato!</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-[#61372F] text-[#FAE6DD] dark:text-[#F9E5DE] py-2 px-6 rounded-lg hover:bg-[#7A4A42] transition-colors"
                >
                  <span className="text-sm font-playfair font-bold">
                    Enviar nova mensagem
                  </span>
                </button>
              </div>
            ) : (
              <form 
                action="https://formsubmit.co/aureaa2k25@gmail.com" 
                method="POST"
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto"
              >
                <input type="text" name="_honey" style={{display: 'none'}} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="Novo contato do site Áurea" />
                <input type="hidden" name="_next" value="#" />
                
                <div className="flex flex-col items-start mb-6">
                  <label className="text-lg font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-2 transition-colors duration-300">
                    Nome
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite aqui..." 
                    className="w-full h-12 bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] pl-4 text-base font-playfair text-[#61372F] placeholder-[#61372F] rounded-lg transition-colors duration-300"
                    required
                  />
                </div>

                <div className="flex flex-col items-start mb-6">
                  <label className="text-lg font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-2 transition-colors duration-300">
                    E-mail
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite aqui..." 
                    className="w-full h-12 bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] pl-4 text-base font-playfair text-[#61372F] placeholder-[#61372F] rounded-lg transition-colors duration-300"
                    required
                  />
                </div>

                <div className="flex flex-col items-start mb-8">
                  <label className="text-lg font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-2 transition-colors duration-300">
                    Mensagem
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Digite aqui..." 
                    className="w-full h-32 bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] p-4 text-base font-playfair text-[#61372F] placeholder-[#61372F] resize-none rounded-lg transition-colors duration-300"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button 
                    type="submit"
                    className="bg-[#61372F] text-[#FAE6DD] dark:text-[#F9E5DE] py-3 px-12 rounded-lg hover:bg-[#7A4A42] transition-colors"
                  >
                    <span className="text-lg font-playfair font-bold">
                      Enviar Mensagem
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* VERSÃO MOBILE */}
      <div className="lg:hidden flex flex-col items-center pt-24 px-4 pb-12">
        <h2 className="text-[27.8px] font-playfairsc text-[#61372F] dark:text-[#F9E5DE] text-center mb-4 transition-colors duration-300">
          {displayText}<span className="animate-pulse">|</span>
        </h2>
      
        <img src={isDarkMode ? espelhoDark : espelho} alt="Espelho Áurea" className="w-64 h-64 object-contain mb-8 transition-transform duration-300 hover:scale-105"/>

        <div className="flex flex-row gap-4 justify-center mb-6">
          <div className="w-[132px] h-[151px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-2 flex flex-col rounded-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-[14px] font-playfairsc font-bold text-[#704943] text-center mb-2 leading-tight">
              EXPERIÊNCIA IMERSIVA
            </h3>
            <p className="text-[11px] font-poppins text-[#704943] text-center leading-tight">
              Você pode explorar, combinar e até comprar as peças diretamente pelo totem, sem precisar procurar nas araras.
            </p>
          </div>

          <div className="w-[132px] h-[151px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-2 flex flex-col rounded-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-[14px] font-playfairsc font-bold text-[#704943] text-center mb-2 leading-tight">
              TECNOLOGIA PARA LOJAS INOVADORAS
            </h3>
            <p className="text-[11px] font-poppins text-[#704943] text-center leading-tight">
              Ideal para clientes que valorizam praticidade, estilo e atendimento inteligente, sem abrir mão do toque humano.
            </p>
          </div>
        </div>

        <div className="w-[273px] h-[230px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-4 flex flex-col items-center justify-between mb-6 rounded-lg transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-[18px] font-playfairsc text-[#704943] text-center leading-tight">
            SUA ROUPA.
            <br />
            SEU ESTILO.
            <br />
            SUA LOJA, REPENSADA.
          </h3>

          <p className="text-[12px] font-poppins text-[#704943] text-center leading-tight">
            Com ÁUREA, vestir-se bem é tão simples quanto ser você mesmo.
            <br />
            Descubra sugestões inteligentes e práticas direto no totem da loja.
          </p>

          <Link to="/funcionamento" className="group relative inline-block">
            <button className="w-[98px] h-[18px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1px] border-[#61372F] flex items-center justify-center rounded transition-colors duration-300 group-hover:scale-105">
              <span className="text-[10px] font-playfair font-bold text-[#61372F]">
                Ver como funciona
              </span>
            </button>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61372F] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex flex-col gap-7 justify-center w-full max-w-[170px] mb-6">
          <div className="w-[170px] h-[155px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-3 flex flex-col rounded-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-[15px] font-playfairsc font-bold text-[#704943] text-center mb-2 leading-tight">
              DIFERENCIAL
            </h3>
            <p className="text-[11px] font-poppins text-[#704943] text-center leading-tight">
              Traz praticidade e personalização para lojas física.
              <br /><br />
              Evita filas, reduz o tempo de busca e aumenta a conversão de vendas.
            </p>
          </div>

          <div className="w-[170px] h-[160px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-3 flex flex-col rounded-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-[15px] font-playfairsc font-bold text-[#704943] text-center mb-1 leading-tight">
              PÚBLICO-ALVO
            </h3>
            <p className="text-[10.5px] font-poppins text-[#704943] text-center leading-tight">
              Clientes que frequentam lojas físicas, mas desejam uma experiência rápida e interativa.
              <br /><br />
              Lojas físicas de pequeno a grande porte que querem se destacar com inovação and estilo.
            </p>
          </div>

          <div className="w-[170px] h-[155px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-3 flex flex-col rounded-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-[15px] font-playfairsc font-bold text-[#704943] text-center mb-2 leading-tight">
              OBJETIVO
            </h3>
            <p className="text-[11px] font-poppins text-[#704943] text-center leading-tight">
              Revolucionar a experiência de compra em lojas físicas, unindo moda, tecnologia e interatividade, criando uma jornada personalizada para o cliente và aumentando as vendas do lojista.
            </p>
          </div>
        </div>

        <h2 className="text-[20px] font-playfairsc font-bold text-[#61372F] dark:text-[#F9E5DE] text-center mb-1 transition-colors duration-300">
          APLICATIVO ÁUREA
        </h2>

        <p className="text-[13px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-6 transition-colors duration-300">
          Conecte sua experiência de compra com tecnologia e estilo.
        </p>

        <div className="w-[273px] h-[240px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-[1.8px] border-[#CDA6A2] dark:border-[#8A665C] p-4 flex flex-col items-center justify-center mb-8 rounded-lg transition-colors duration-300">
          <p className="text-[12px] font-poppins font-light text-[#704943] text-center leading-tight max-w-[220px] mx-auto">
            O app da ÁUREA permite que você acesse as peças disponíveis na loja diretamente do seu celular. Através da integração com o espelho equipado com câmera, o sistema reconhece a peça que você está vestindo e envia as informações para o totem — e de lá, direto para seu app. Simples, rápido e sem precisar procurar nas araras.
          </p>
        </div>

        <h2 className="text-[24px] font-playfairsc font-bold text-[#61372F] dark:text-[#F9E5DE] text-center mt-4 transition-colors duration-300">
          QUEM SOMOS?
        </h2>

        <p className="text-[12px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-4 transition-colors duration-300">
          Conheça quem faz o ÁUREA acontecer.
        </p>

        <img src={isabela} alt="Isabela" className="w-[122.47px] h-[132.91px] object-contain mb-1 transition-transform duration-300 hover:scale-105" />
        <p className="text-[9px] font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">@iisacost_</p>
        <p className="text-[15px] font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">Isabela Costa</p>
        <div className="w-[135.76px] h-[0.98px] bg-[#61372F] dark:bg-[#F9E5DE] mb-4 transition-colors duration-300"></div>

        <img src={danielle} alt="Danielle" className="w-[122.47px] h-[132.91px] object-contain mb-1 transition-transform duration-300 hover:scale-105" />
        <p className="text-[9px] font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">@_dany.elle_</p>
        <p className="text-[15px] font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">Danielle Freitas</p>
        <div className="w-[135.76px] h-[0.98px] bg-[#61372F] dark:bg-[#F9E5DE] mb-4 transition-colors duration-300"></div>

        <img src={leticia} alt="Leticia" className="w-[122.47px] h-[132.91px] object-contain mb-1 transition-transform duration-300 hover:scale-105" />
        <p className="text-[9px] font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">@lelealmeida__</p>
        <p className="text-[15px] font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">Letícia Moreira</p>
        <div className="w-[135.76px] h-[0.98px] bg-[#61372F] dark:bg-[#F9E5DE] mb-4 transition-colors duration-300"></div>

        <img src={gabriela} alt="Gabriela" className="w-[122.47px] h-[132.91px] object-contain mb-1 transition-transform duration-300 hover:scale-105" />
        <p className="text-[9px] font-poppins text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">@gabiheerculano_</p>
        <p className="text-[15px] font-playfair text-[#61372F] dark:text-[#F9E5DE] text-center transition-colors duration-300">Gabriela Herculano</p>
        <div className="w-[135.76px] h-[0.98px] bg-[#61372F] dark:bg-[#F9E5DE] mb-4 transition-colors duration-300"></div>

        <h2 className="text-[24px] font-playfairsc font-bold text-[#61372F] dark:text-[#F9E5DE] text-center mt-4 transition-colors duration-300">
          ENTRE EM CONTATO
        </h2>

        <p className="text-[14px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] text-center mb-4 transition-colors duration-300">
          Estamos prontas para te ajudar! Envie sua mensagem e responderemos o mais rápido possível.
        </p>

        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative mb-8 w-[241px] text-center">
            <p className="font-bold text-sm">Mensagem enviada com sucesso!</p>
            <p className="text-xs">Retornaremos em breve.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-2 bg-[#61372F] text-[#FAE6DD] dark:text-[#F9E5DE] py-1 px-4 rounded text-xs transition-colors duration-300 hover:bg-[#7A4A42]"
            >
              Nova mensagem
            </button>
          </div>
        ) : (
          <form 
            action="https://formsubmit.co/aureaa2k25@gmail.com" 
            method="POST"
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <input type="text" name="_honey" style={{display: 'none'}} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="Novo contato do site Áurea" />
            <input type="hidden" name="_next" value="#" />
            
            <div className="flex flex-col items-start mb-4" style={{ width: '241px' }}>
              <p className="text-[12px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-1 ml-1 transition-colors duration-300">Nome</p>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite aqui..." 
                className="w-[241px] h-[33px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] pl-3 text-[12px] font-playfair text-[#61372F] placeholder-[#61372F] rounded transition-colors duration-300"
                required
              />
            </div>

            <div className="flex flex-col items-start mb-4" style={{ width: '241px' }}>
              <p className="text-[12px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-1 ml-1 transition-colors duration-300">E-mail</p>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite aqui..." 
                className="w-[241px] h-[33px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] pl-3 text-[12px] font-playfair text-[#61372F] placeholder-[#61372F] rounded transition-colors duration-300"
                required
              />
            </div>

            <div className="flex flex-col items-start mb-6" style={{ width: '241px' }}>
              <p className="text-[12px] font-poppins font-light italic text-[#61372F] dark:text-[#F9E5DE] mb-1 ml-1 transition-colors duration-300">Mensagem</p>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Digite aqui..." 
                className="w-[241px] h-[91px] bg-[#DEC8BC] dark:bg-[#9D7C71] border-2 border-[#61372F] p-3 text-[12px] font-playfair text-[#61372F] placeholder-[#61372F] resize-none rounded transition-colors duration-300"
                required
              />
            </div>

            <div className="flex justify-center mb-12">
              <button 
                type="submit"
                className="bg-[#61372F] text-[#FAE6DD] dark:text-[#F9E5DE] py-2 px-8 rounded transition-colors duration-300 hover:bg-[#7A4A42]"
              >
                <span className="text-[12px] font-playfair font-bold">
                  Enviar Mensagem
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HeroSection;

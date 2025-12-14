import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- ДАННЫЕ ДЛЯ ЛЕГКОГО РЕДАКТИРОВАНИЯ ---

const heroImage = "/mashinka.jpg";

// 2. ВЫПОЛНЕННЫЕ РАБОТЫ (Добавил 2 блока, теперь всего 5)
const worksData = [
  {
    id: 1,
    title: "Полная оклейка кузова",
    desc: "Использована широкоформатная печать на виниловой пленке Oracal (Аракал).",
    img: "/gorilla.jpg"
  },
  {
    id: 2,
    title: "Комплект фасадных табличек - Министерство цифровых технологий РУз",
    desc: "Изготовление официальных фасадных табличек для структур Министерства цифровых технологий Узбекистана. Использованы премиальные металлические панели, фрезеровка и долговечные покрытия.",
    img: "/uzgov.jpg"
  },
  {
    id: 3,
    title: "Декоративные картины со звездой",
    desc: "Минималистичные премиальные картины с объемной металлической звездой и рамой с золотым покрытием. Отличный вариант для интерьера или подарка.",
    img: "/pezda.jpg"
  },
  {
    id: 4,
    title: "Двусторонний/Односторонний круглый лайтбокс (Консольная вывеска).",
    desc: "Вывеска выполнена из акрила с аппликацией из транслюцентной пленки по периметру и лицевой части. Основа – корпус из ПВХ с внутренней LED-подсветкой для равномерного свечения.",
    img: "/lightbox.jpg"
  },
  {
    id: 5,
    title: "Фигурный световой короб",
    desc: "Лицевая панель — акрил с УФ-печатью, борт — ПВХ (Фомакс). Контурная светодиодная подсветка.",
    img: "/viveska.jpg"
  }, 
  {
    id: 6,
    title: "Рекламная стела на металлокаркасе.",
    desc: "Облицовка зеркальным АКП. Сложная фрезеровка, световые акриловые элементы.",
    img: "/newyear.jpg"
  },
  {
    id: 7,
    title: "Объемные световые буквы.",
    desc: "Лицо — акрил, борт — ПВХ (Фомакс). Скрытый металлокаркас, яркая LED-подсветка.",
    img: "svetbukvi.jpg"
  },
    {
    id: 8,
    title: "Серийное производство бейджей из акрила.",
    desc: "Прямая УФ-печать по матовой основе.",
    img: "/samsung.jpg"
  },
  {
    id: 9,
    title: "Объемные буквы из акрила (металлизированный эффект).",
    desc: "Изготовление с помощью высокоточной лазерной резки.",
    img: "/bukvi.jpg"
  },
];

// 3. ОТЗЫВЫ
const reviewsData = [
  {
    id: 1,
    name: "Алексей Петров",
    text: "Заказывал баннер для магазина — сделали за один день, всё чётко по размерам. Качество отличное.",
    stars: 5
  },
  {
    id: 2,
    name: "Дилшод Каримов",
    text: "Делали вывеску для кафе. Команда сработала быстро и аккуратно. Очень понравился подход.",
    stars: 4
  },
  {
    id: 3,
    name: "Екатерина Иванова",
    text: "Спасибо за оперативность! Помогли с дизайном, всё получилось даже лучше, чем ожидала.",
    stars: 5
  }
];

// --- КОМПОНЕНТЫ ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <img src="/logoo.PNG" alt="Logo" className="h-10 w-auto object-contain" />
    
    <span className="font-header font-bold text-lg tracking-widest text-black">ADNOVA</span>
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Состояние полей формы
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    consent: true
  });

  // Скролл к секции
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    // Небольшая задержка, чтобы меню успело начать закрываться
    setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 50);
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Обработка формы (ОТПРАВКА НА СЕРВЕР)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // Используем относительный путь. Vercel сам направит это в папку api/
        const response = await fetch('/api/send-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setIsModalOpen(true);
            setFormData({ phone: '', name: '', consent: true }); // Сброс формы
        } else {
            // Пытаемся прочитать ошибку
            const errData = await response.json().catch(() => ({}));
            alert('Ошибка отправки: ' + (errData.error || 'Попробуйте позже.'));
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось соединиться с сервером.');
    } finally {
        setIsSubmitting(false);
    }
  };

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, isModalOpen]);

  return (
    <div className="min-h-screen">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-adnova-cream z-50 shadow-sm h-16">
        <div className="max-w-md mx-auto px-4 h-full flex justify-between items-center md:max-w-4xl lg:max-w-6xl">
          <Logo />

          <div className="flex gap-3">
            <a href="tel:+998912345678" className="w-10 h-10 border-2 border-adnova-blue rounded-lg flex items-center justify-center text-adnova-blue hover:bg-adnova-blue hover:text-white transition-colors">
              <i className="fa-solid fa-phone"></i>
            </a>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 border-2 border-adnova-blue rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-adnova-blue group transition-colors cursor-pointer"
            >
              <span className="w-5 h-0.5 bg-adnova-blue group-hover:bg-white transition-colors pointer-events-none"></span>
              <span className="w-5 h-0.5 bg-adnova-blue group-hover:bg-white transition-colors pointer-events-none"></span>
              <span className="w-5 h-0.5 bg-adnova-blue group-hover:bg-white transition-colors pointer-events-none"></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU (SIDEBAR STYLE) */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-adnova-cream z-[70] shadow-2xl transition-transform duration-300 ease-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Drawer Header */}
        <div className="p-6 flex justify-between items-center">
            <Logo />
            <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 border-2 border-adnova-red text-adnova-red rounded-xl flex items-center justify-center hover:bg-adnova-red hover:text-white transition-colors text-xl"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-8 py-4 flex flex-col gap-6 overflow-y-auto">
            <button onClick={scrollToTop} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-solid fa-house group-hover:scale-110 transition-transform"></i></div>
                <span>Главная</span>
            </button>
            
            <button onClick={() => scrollToSection('about')} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-solid fa-circle-info group-hover:scale-110 transition-transform"></i></div>
                <span>О нас</span>
            </button>

            <button onClick={() => scrollToSection('works')} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-regular fa-image group-hover:scale-110 transition-transform"></i></div>
                <span>Портфолио</span>
            </button>

            <button onClick={() => scrollToSection('services')} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-solid fa-briefcase group-hover:scale-110 transition-transform"></i></div>
                <span>Услуги</span>
            </button>

            <button onClick={() => scrollToSection('reviews')} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-regular fa-comment group-hover:scale-110 transition-transform"></i></div>
                <span>Отзывы</span>
            </button>

            <button onClick={() => scrollToSection('contact')} className="flex items-center gap-4 text-adnova-blue font-header font-bold text-xl uppercase tracking-wide hover:text-adnova-red transition-colors group text-left">
                <div className="w-8 flex justify-center"><i className="fa-regular fa-envelope group-hover:scale-110 transition-transform"></i></div>
                <span>Контакты</span>
            </button>
        </nav>

        {/* Drawer Footer */}
        <div className="p-6 text-center">
            <p className="text-gray-400 text-sm font-body">© 2024 Adnova Printing</p>
        </div>
      </div>


      <main className="pt-20 pb-10 overflow-hidden">
        
        {/* HERO */}
        <section className="relative flex flex-col items-center">
          <div className="bg-adnova-blue text-white p-8 rounded-[2.5rem] w-[90%] max-w-md text-center z-10 mt-4 shadow-xl md:w-full md:max-w-2xl">
            <h1 className="font-header text-2xl uppercase font-bold leading-tight mb-6">
              Печать рекламы без задержек —<br/>качественно и надёжно
            </h1>
            <button onClick={() => scrollToSection('contact')} className="bg-adnova-red text-white font-medium py-3 px-8 rounded-2xl hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform duration-150">
              Оставить заявку
            </button>
          </div>

          <div className="w-full max-w-md md:max-w-3xl -mt-10 rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white relative z-0 mx-auto">
            <img src={heroImage} alt="Printing Press" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-12 px-5 max-w-md mx-auto md:max-w-3xl">
          <h2 className="text-center font-header text-3xl font-bold text-adnova-blue mb-4">
            Немного о <span className="text-adnova-red">нас</span>
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8">
Мы - команда профессионалов в области печатной продукции, которая помогает бизнесу и частным клиентам создавать яркие и запоминающие рекламные материалы.
Баннеры, вывески, плакаты - мы беремся за проекты любой сложности и масштаба
Мы ценим время наших клиентов, поэтому гарантируем оперативное изготовление и доставку прямо к вам. С нами ваш проект станет заметным, а реклама - эффективной
          </p>

          <div className="flex flex-col gap-4">
            <div className="bg-white border-2 border-adnova-blue rounded-3xl p-4 flex items-center justify-between shadow-sm">
              <div className="text-center flex-1">
                <span className="block text-adnova-red font-bold text-xl">1000+</span>
                <span className="text-adnova-blue text-sm">Реализованных проектов</span>
              </div>
              <div className="w-10 h-10 bg-adnova-red/10 rounded-full flex items-center justify-center text-adnova-red">
                <i className="fa-solid fa-briefcase"></i>
              </div>
            </div>
            <div className="bg-white border-2 border-adnova-blue rounded-3xl p-4 flex items-center justify-between shadow-sm">
              <div className="text-center flex-1">
                <span className="block text-adnova-red font-bold text-xl">15+</span>
                <span className="text-adnova-blue text-sm">Экспертов в команде</span>
              </div>
              <div className="w-10 h-10 bg-adnova-red/10 rounded-full flex items-center justify-center text-adnova-red">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>
            <div className="bg-white border-2 border-adnova-blue rounded-3xl p-4 flex items-center justify-between shadow-sm">
              <div className="text-center flex-1">
                <span className="block text-adnova-red font-bold text-xl">10+</span>
                <span className="text-adnova-blue text-sm">Лет на рынке</span>
              </div>
              <div className="w-10 h-10 bg-adnova-red/10 rounded-full flex items-center justify-center text-adnova-red">
                <i className="fa-regular fa-clock"></i>
              </div>
            </div>
          </div>
        </section>

        {/* WORKS */}
        <section id="works" className="mt-16 max-w-md mx-auto md:max-w-4xl px-4">
          <h2 className="text-center font-header text-3xl font-bold text-adnova-blue mb-8">
            Выполненные работы
          </h2>
          
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory hide-scrollbar">
            {worksData.map((work) => (
              <div key={work.id} className="snap-center shrink-0 w-72 bg-adnova-cream border border-blue-400 rounded-[2rem] overflow-hidden shadow-card flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col items-center bg-gray-50 flex-grow">
                  <h3 className="font-header font-bold text-adnova-blue mb-2 text-center leading-tight">{work.title}</h3>
                  <p className="text-xs text-gray-600 text-center">{work.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button onClick={() => scrollToSection('contact')} className="bg-adnova-red text-white font-medium py-3 px-8 rounded-2xl hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform duration-150">
              Оставить заявку
            </button>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mt-16 px-4 max-w-md mx-auto md:max-w-3xl flex flex-col gap-8">
          
          <div className="bg-adnova-blue text-white rounded-[2.5rem] p-8 pt-12 relative shadow-xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-adnova-blue border-4 border-adnova-cream rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-eye"></i>
            </div>
            <p className="text-center mb-6 leading-relaxed">
              Привлекаем внимание клиентов с улицы
            </p>
            <div className="border border-white/30 rounded-2xl p-6">
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Вывески</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Лайтбоксы</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Крышные конструкции</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Таблички</li>
              </ul>
            </div>
          </div>

          <div className="bg-adnova-blue text-white rounded-[2.5rem] p-8 pt-12 relative shadow-xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-adnova-blue border-4 border-adnova-cream rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-print"></i>
            </div>
            <p className="text-center mb-6 leading-relaxed">
              Печатная продукция
            </p>
            <div className="border border-white/30 rounded-2xl p-6">
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Визитки</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Бейджики</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Рекламные Roll-Up</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Печать на баннерах</li>
              </ul>
            </div>
          </div>

           <div className="bg-adnova-blue text-white rounded-[2.5rem] p-8 pt-12 relative shadow-xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-adnova-blue border-4 border-adnova-cream rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-shirt"></i>
            </div>
            <p className="text-center mb-6 leading-relaxed">
              Одежда и аксессуары
            </p>
            <div className="border border-white/30 rounded-2xl p-6">
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Эко-сумки</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Футболки и поло</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Кепки</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Спецодежда</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <button onClick={() => scrollToSection('contact')} className="bg-adnova-red text-white font-medium py-3 px-8 rounded-2xl hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform duration-150">
                Оставить заявку
            </button>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="mt-16 px-4 max-w-md mx-auto md:max-w-3xl">
          <h2 className="text-center font-header text-3xl font-bold text-adnova-blue mb-8">
            Отзывы заказчиков
          </h2>

          <div className="space-y-6">
            {reviewsData.map((review) => (
               <div key={review.id} className="bg-white border-2 border-adnova-blue rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <i className="fa-solid fa-user text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-header font-bold text-adnova-blue text-lg">{review.name}</h4>
                    <div className="text-adnova-red flex text-sm">
                      {[...Array(5)].map((_, i) => (
                          <i key={i} className={`${i < review.stars ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="mt-16 px-4 max-w-md mx-auto md:max-w-3xl mb-12">
            <h2 className="text-center font-header text-3xl font-bold text-adnova-red mb-2">
                Воспользуйтесь
            </h2>
            <h3 className="text-center font-header text-3xl font-bold text-adnova-blue mb-6">
                нашими услугами
            </h3>
            
            <p className="text-center text-sm text-gray-600 mb-8 leading-relaxed">
                Наша цель - сделать процесс печати простым, быстрым и удобным для вас. Мы используем качественные материалы и современное оборудование, чтобы каждая работа радовала своим результатом. Закажите уже сегодня - ответим в течение 10 минут!
            </p>

            <form onSubmit={handleSubmit} className="bg-white/50 border border-gray-300 rounded-[2.5rem] p-8 shadow-inner">
                <div className="space-y-4">
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel" 
                      placeholder="Телефон" 
                      required 
                      className="w-full bg-gray-100 border border-adnova-blue rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-adnova-blue/50 transition-all placeholder-gray-500 text-adnova-blue"
                    />
                    
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="Имя" 
                      required 
                      className="w-full bg-gray-100 border border-adnova-blue rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-adnova-blue/50 transition-all placeholder-gray-500 text-adnova-blue" 
                    />
                    
                    <div className="flex items-start gap-3 mt-4">
                        <div className="relative flex items-center">
                            <input 
                              name="consent"
                              checked={formData.consent}
                              onChange={handleInputChange}
                              type="checkbox" 
                              id="consent" 
                              required 
                              className="peer h-6 w-6 cursor-pointer appearance-none rounded border border-gray-400 checked:bg-adnova-blue checked:border-transparent transition-all" 
                            />
                            <i className="fa-solid fa-check text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none text-xs"></i>
                        </div>
                        <label htmlFor="consent" className="text-xs text-gray-500 leading-tight cursor-pointer">
                            Даю согласие на обработку<br/>персональных данных
                        </label>
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-adnova-red text-white font-medium py-3 px-6 rounded-2xl hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform duration-150 mt-6 flex justify-between items-center group disabled:opacity-70 disabled:cursor-wait">
                        {isSubmitting ? (
                          <span className="w-full text-center"><i className="fa-solid fa-spinner fa-spin"></i></span>
                        ) : (
                          <>
                            <span>Оставить заявку</span>
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-adnova-red transition-colors">
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                          </>
                        )}
                    </button>
                </div>
            </form>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-adnova-cream border-t border-adnova-blue/20 py-10 rounded-t-[3rem] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
             <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                 <div className="w-3 h-8 bg-cyan-400 rounded-full transform -rotate-12 absolute left-0 top-1"></div>
                 <div className="w-3 h-8 bg-yellow-400 rounded-full transform -rotate-12 absolute left-3 top-1"></div>
                 <div className="w-3 h-8 bg-pink-500 rounded-full transform -rotate-12 absolute left-6 top-1"></div>
            </div>
            <span className="font-header font-bold text-xl tracking-widest text-gray-500">ADNOVA</span>
          </div>

          <div className="text-center">
            <a href="tel:+998912345678" className="block text-adnova-blue text-xl font-medium mb-1 hover:text-adnova-red transition-colors">+998 91 234 56 78</a>
            <a href="#" className="block text-adnova-blue text-lg hover:text-adnova-red transition-colors">@telegram</a>
          </div>
        </div>
      </footer>

      {/* SUCCESS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 modal-show" onClick={() => setIsModalOpen(false)}>
          <div className="bg-adnova-cream rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl relative modal-content-show" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-adnova-red rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg">
                <i className="fa-solid fa-check"></i>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
                Спасибо! Ваша заявка принята. Менеджер свяжется с вами в течение 10 минут.
            </p>

            <button onClick={() => setIsModalOpen(false)} className="w-full bg-adnova-red text-white font-medium py-3 px-6 rounded-2xl hover:bg-red-800 transition-colors shadow-lg active:scale-95 transform duration-150">
                Назад
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

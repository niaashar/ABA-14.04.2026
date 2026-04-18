/* ===== ABA_PRO — ОСНОВНОЙ JAVASCRIPT (версия 2.0) ===== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('✅ ABA_pro: JavaScript загружен');

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            console.log('📱 Меню:', !isExpanded ? 'открыто' : 'закрыто');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Закрытие при выборе ссылки
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== АКТИВНАЯ ССЫЛКА В МЕНЮ =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ===== FAQ АККОРДЕОН =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('✅ FAQ: найдено вопросов:', faqItems.length);
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Закрыть все остальные
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherIcon = otherItem.querySelector('.faq-icon');
                            if (otherIcon) otherIcon.textContent = '+';
                        }
                    });
                    
                    // Переключить текущий
                    if (isActive) {
                        item.classList.remove('active');
                        if (icon) icon.textContent = '+';
                        console.log('❌ FAQ: вопрос', index + 1, 'закрыт');
                    } else {
                        item.classList.add('active');
                        if (icon) icon.textContent = '×';
                        console.log('✅ FAQ: вопрос', index + 1, 'открыт');
                    }
                });
            }
        });
    }

    // ===== СЕРТИФИКАТЫ — МОДАЛЬНОЕ ОКНО =====
    const certificatesData = [
        { src: 'images/Диплом 2018 Екатеринбург.jpg', title: 'Диплом Логопедия', org: 'Уральский государственный педагогический университет', year: '2018' },
        { src: 'images/Диплом 2020 Москва.jpg', title: 'Диплом ABA-терапия', org: 'Институт прикладного анализа поведения', year: '2020' },
        { src: 'images/Сертификат Теория и практика ABA BCBA.jpg', title: 'Теория и практика ABA', org: 'Курс Ольги Шаповаловой, BCBA', year: '2023' },
        { src: 'images/приложение к сертификату.jpg', title: 'Приложение к сертификату №1', org: 'Курс Ольги Шаповаловой, BCBA', year: '2023' },
        { src: 'images/приложение к сертификату2.jpg', title: 'Приложение к сертификату №2', org: 'Курс Ольги Шаповаловой, BCBA', year: '2023' },
        { src: 'images/Сертификат Ирина Слесь_page-0001.jpg', title: 'Точное обучение', org: 'Курс Ольги Шаповаловой, BCBA', year: '2024' },
        { src: 'images/365.jpg', title: 'Туалетный тренинг', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/88.jpg', title: 'Социальные цепочки', org: 'Школа ABA Ольги Мелешкевич', year: '2023' },
        { src: 'images/111.jpg', title: 'Применение с детьми с РАС', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/139.jpg', title: 'Эффективные способы обучения', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/161.jpg', title: '6 методов коррекции', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/192.jpg', title: 'Стратегии предотвращения непослушания', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/197..jpg', title: 'Непонимающий речь ребенок', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/207.jpg', title: 'Причинно-следственные связи', org: 'Школа ABA Ольги Мелешкевич', year: '2023' },
        { src: 'images/220..jpg', title: 'Использование лекарств', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/228.jpg', title: 'Обучение имитации', org: 'Школа ABA Ольги Мелешкевич', year: '2023' },
        { src: 'images/248.jpg', title: 'Тренинг с помощью Матрицы', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/261.jpg', title: 'Слогострой', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/280.jpg', title: 'Многошаговые инструкции', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/292.jpg', title: 'Развитие социального взаимодействия', org: 'Школа ABA Ольги Мелешкевич', year: '2024' },
        { src: 'images/349.jpg', title: 'Взаимопонимание с ребенком', org: 'Школа ABA Ольги Мелешкевич', year: '2024' }
    ];

    let currentCertificateIndex = 0;

    // Открытие модального окна
    window.openCertificateModal = function(index) {
        if (index < 0 || index >= certificatesData.length) return;
        
        currentCertificateIndex = index;
        const modal = document.getElementById('certificateModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        
        if (modal && modalImage && modalCaption) {
            modalImage.src = certificatesData[index].src;
            modalCaption.textContent = `${certificatesData[index].title} — ${certificatesData[index].org}, ${certificatesData[index].year}`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('✅ Сертификат открыт:', index);
        }
    };

    // Закрытие модального окна
    window.closeCertificateModal = function() {
        const modal = document.getElementById('certificateModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Навигация по сертификатам
    window.navigateCertificate = function(direction) {
        currentCertificateIndex += direction;
        if (currentCertificateIndex < 0) currentCertificateIndex = certificatesData.length - 1;
        if (currentCertificateIndex >= certificatesData.length) currentCertificateIndex = 0;
        openCertificateModal(currentCertificateIndex);
    };

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });

    // ===== СКРОЛЛ СЕРТИФИКАТОВ =====
    const certTrack = document.getElementById('certificatesTrack');
    const certScrollLeftBtn = document.getElementById('certScrollLeft');
    const certScrollRightBtn = document.getElementById('certScrollRight');
    const certIndicatorsContainer = document.getElementById('certIndicators');

    if (certTrack && certScrollLeftBtn && certScrollRightBtn) {
        const certItems = certTrack.querySelectorAll('.certificate-scroll-item');
        const certScrollAmount = 374;
        let certCurrentIndex = 0;

        console.log('✅ Сертификаты: найдено', certItems.length);

        certScrollLeftBtn.addEventListener('click', function() {
            if (certCurrentIndex > 0) {
                certCurrentIndex--;
                certTrack.scrollBy({ left: -certScrollAmount, behavior: 'smooth' });
                updateCertIndicators();
                updateCertButtons();
            }
        });

        certScrollRightBtn.addEventListener('click', function() {
            if (certCurrentIndex < certItems.length - 1) {
                certCurrentIndex++;
                certTrack.scrollBy({ left: certScrollAmount, behavior: 'smooth' });
                updateCertIndicators();
                updateCertButtons();
            }
        });

        function updateCertIndicators() {
            if (!certIndicatorsContainer) return;
            const indicators = certIndicatorsContainer.querySelectorAll('.scroll-indicator');
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === certCurrentIndex);
            });
        }

        function updateCertButtons() {
            certScrollLeftBtn.style.opacity = certCurrentIndex === 0 ? '0.5' : '1';
            certScrollLeftBtn.style.pointerEvents = certCurrentIndex === 0 ? 'none' : 'auto';
            certScrollRightBtn.style.opacity = certCurrentIndex >= certItems.length - 1 ? '0.5' : '1';
            certScrollRightBtn.style.pointerEvents = certCurrentIndex >= certItems.length - 1 ? 'none' : 'auto';
        }

        if (certIndicatorsContainer && certItems.length > 0) {
            certIndicatorsContainer.innerHTML = '';
            certItems.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'scroll-indicator' + (index === 0 ? ' active' : '');
                indicator.addEventListener('click', function() {
                    certCurrentIndex = index;
                    certTrack.scrollTo({ left: index * certScrollAmount, behavior: 'smooth' });
                    updateCertIndicators();
                    updateCertButtons();
                });
                certIndicatorsContainer.appendChild(indicator);
            });

            certTrack.addEventListener('scroll', function() {
                const scrollPosition = certTrack.scrollLeft;
                const activeIndex = Math.round(scrollPosition / certScrollAmount);
                if (activeIndex !== certCurrentIndex && activeIndex >= 0 && activeIndex < certItems.length) {
                    certCurrentIndex = activeIndex;
                    updateCertIndicators();
                    updateCertButtons();
                }
            });
        }

        updateCertButtons();
    }

    // ===== СКРОЛЛ КЕЙСОВ =====
    const caseTrack = document.getElementById('casesTrack');
    const caseScrollLeftBtn = document.getElementById('caseScrollLeft');
    const caseScrollRightBtn = document.getElementById('caseScrollRight');
    const caseIndicatorsContainer = document.getElementById('casesIndicators');

    if (caseTrack && caseScrollLeftBtn && caseScrollRightBtn) {
        const caseItems = caseTrack.querySelectorAll('.case-scroll-item');
        const caseScrollAmount = 474;
        let caseCurrentIndex = 0;

        console.log('✅ Кейсы: найдено', caseItems.length);

        caseScrollLeftBtn.addEventListener('click', function() {
            if (caseCurrentIndex > 0) {
                caseCurrentIndex--;
                caseTrack.scrollBy({ left: -caseScrollAmount, behavior: 'smooth' });
                updateCaseIndicators();
                updateCaseButtons();
            }
        });

        caseScrollRightBtn.addEventListener('click', function() {
            if (caseCurrentIndex < caseItems.length - 1) {
                caseCurrentIndex++;
                caseTrack.scrollBy({ left: caseScrollAmount, behavior: 'smooth' });
                updateCaseIndicators();
                updateCaseButtons();
            }
        });

        function updateCaseIndicators() {
            if (!caseIndicatorsContainer) return;
            const indicators = caseIndicatorsContainer.querySelectorAll('.scroll-indicator');
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === caseCurrentIndex);
            });
        }

        function updateCaseButtons() {
            caseScrollLeftBtn.style.opacity = caseCurrentIndex === 0 ? '0.5' : '1';
            caseScrollLeftBtn.style.pointerEvents = caseCurrentIndex === 0 ? 'none' : 'auto';
            caseScrollRightBtn.style.opacity = caseCurrentIndex >= caseItems.length - 1 ? '0.5' : '1';
            caseScrollRightBtn.style.pointerEvents = caseCurrentIndex >= caseItems.length - 1 ? 'none' : 'auto';
        }

        if (caseIndicatorsContainer && caseItems.length > 0) {
            caseIndicatorsContainer.innerHTML = '';
            caseItems.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'scroll-indicator' + (index === 0 ? ' active' : '');
                indicator.addEventListener('click', function() {
                    caseCurrentIndex = index;
                    caseTrack.scrollTo({ left: index * caseScrollAmount, behavior: 'smooth' });
                    updateCaseIndicators();
                    updateCaseButtons();
                });
                caseIndicatorsContainer.appendChild(indicator);
            });

            caseTrack.addEventListener('scroll', function() {
                const scrollPosition = caseTrack.scrollLeft;
                const activeIndex = Math.round(scrollPosition / caseScrollAmount);
                if (activeIndex !== caseCurrentIndex && activeIndex >= 0 && activeIndex < caseItems.length) {
                    caseCurrentIndex = activeIndex;
                    updateCaseIndicators();
                    updateCaseButtons();
                }
            });
        }

        updateCaseButtons();
    }

    // ===== ФОРМА КОНТАКТОВ =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        console.log('✅ Форма контактов: найдена');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Скрыть предыдущие сообщения
            if (successMessage) successMessage.style.display = 'none';

            // Блокировка кнопки
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Отправка...';
            }

            // Сбор данных формы
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                service: formData.get('service'),
                format: formData.get('format'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };

            console.log('📋 Данные формы:', data);

            // Имитация отправки (замените на реальную)
            setTimeout(function() {
                if (contactForm) contactForm.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                    console.log('✅ Форма отправлена успешно');
                }

                // Здесь можно добавить реальную отправку:
                // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            }, 1500);
        });
    }

    // ===== ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-box, .ethics-topic').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    console.log('✅ ABA_pro: все скрипты инициализированы');
});
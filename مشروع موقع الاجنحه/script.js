/**
 * Royal Wings Aviation Academy - Interactive Engine
 * أكاديمية الأجنحة الملكية للطيران - محرك التفاعل والأمان والواتساب
 * Fully responsive, secured, accessible & performance-optimized
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- Helper: HTML Sanitizer for XSS Protection ---
    function sanitizeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // --- Helper: Floating Toast Notification System ---
    let toastTimeout = null;
    function showToast(message, icon = 'fa-solid fa-check') {
        let toast = document.querySelector('.site-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'site-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="${icon}"></i> <span>${sanitizeHTML(message)}</span>`;
        toast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // --- DOM Elements ---
    const admissionForm = document.getElementById('admissionForm');
    const hpTrap = document.getElementById('hpTrap');
    const formAlert = document.getElementById('formValidationAlert');
    const studentNameInput = document.getElementById('studentName');
    const studentPhoneInput = document.getElementById('studentPhone');
    const studentWhatsappInput = document.getElementById('studentWhatsapp');
    const certTypeSelect = document.getElementById('certType');
    const gradYearInput = document.getElementById('gradYear');
    const targetDeptSelect = document.getElementById('targetDept');
    const studyPeriodSelect = document.getElementById('studyPeriod');
    const studyModeSelect = document.getElementById('studyMode');

    // Live WhatsApp Mockup Elements
    const liveMsgText = document.getElementById('liveMsgText');
    const liveMsgTime = document.getElementById('liveMsgTime');
    const btnCopyMessage = document.getElementById('btnCopyMessage');
    const btnPrintReceipt = document.getElementById('btnPrintReceipt');

    // Receipt Modal Elements
    const receiptModal = document.getElementById('receiptModal');
    const closeReceiptModal = document.getElementById('closeReceiptModal');
    const recRegId = document.getElementById('recRegId');
    const recDate = document.getElementById('recDate');
    const recName = document.getElementById('recName');
    const recPhone = document.getElementById('recPhone');
    const recCert = document.getElementById('recCert');
    const recDegreeType = document.getElementById('recDegreeType');
    const recDept = document.getElementById('recDept');
    const recPeriod = document.getElementById('recPeriod');
    const recMode = document.getElementById('recMode');

    // Header & Mobile Drawer Elements
    const siteHeader = document.getElementById('siteHeader');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const closeTopBar = document.getElementById('closeTopBar');
    const topBar = document.getElementById('topBar');

    // Floating WhatsApp Elements
    const whatsappFloatToggle = document.getElementById('whatsappFloatToggle');
    const whatsappFloatBox = document.getElementById('whatsappFloatBox');
    const whatsappBoxClose = document.getElementById('whatsappBoxClose');

    // FAQ Elements
    const faqItems = document.querySelectorAll('.faq-item');

    // --- 1. Real-Time WhatsApp Message Generator ---
    function getCleanFormData() {
        const name = studentNameInput ? studentNameInput.value.trim() : '';
        const phone = studentPhoneInput ? studentPhoneInput.value.trim() : '';
        const whatsapp = studentWhatsappInput && studentWhatsappInput.value.trim() ? studentWhatsappInput.value.trim() : phone;
        const cert = certTypeSelect ? certTypeSelect.value : '';
        const year = gradYearInput ? gradYearInput.value.trim() : '';
        const dept = targetDeptSelect ? targetDeptSelect.value : '';
        const period = studyPeriodSelect ? studyPeriodSelect.value : '';
        const mode = studyModeSelect ? studyModeSelect.value : '';
        const degreeRadio = document.querySelector('input[name="programDegreeType"]:checked');
        const degreeType = degreeRadio ? degreeRadio.value : 'دبلوم';

        return {
            name: name || '(لم يحدد بعد)',
            phone: phone || '(لم يحدد بعد)',
            whatsapp: whatsapp || '(لم يحدد بعد)',
            cert: cert || 'الشهادة السودانية',
            year: year || '2024 / 2025',
            dept: dept || 'إدارة المطارات',
            period: period || 'المجموعة الصباحية (8:00 ص - 1:00 م)',
            mode: mode || 'حضور مباشر بمقر الأكاديمية (الخرطوم المقرن)',
            degreeType: degreeType || 'دبلوم'
        };
    }

    function generateWhatsAppMessageText() {
        const d = getCleanFormData();
        return `✈️ *طلب تقديم وقبول - أكاديمية الأجنحة الملكية للطيران* ✈️\n` +
               `━━━━━━━━━━━━━━━━━━━━\n` +
               `👤 *اسم الطالب:* ${d.name}\n` +
               `📱 *رقم الهاتف:* ${d.phone}\n` +
               `💬 *رقم الواتساب:* ${d.whatsapp}\n` +
               `🎓 *المؤهل الأكاديمي:* ${d.cert}\n` +
               `📅 *سنة المؤهل:* ${d.year}\n` +
               `📜 *نوع البرنامج المطلوب:* ${d.degreeType}\n` +
               `🎯 *التخصص المطلوب:* ${d.dept}\n` +
               `⏰ *الفترة:* ${d.period}\n` +
               `🏛️ *نظام الدراسة:* ${d.mode}\n` +
               `📍 *مقر الأكاديمية:* الخرطوم المقرن (شرق برج زين وبرج التعاونية)\n` +
               `📅 *الدفعة:* 2026 - 2027\n` +
               `━━━━━━━━━━━━━━━━━━━━\n` +
               `السلام عليكم، أود تأكيد تسجيلي واستكمال إجراءات القبول ودفع الرسوم واستلام الزي الرسمي. شكراً جزيلاً.`;
    }

    function updateLivePreview() {
        if (!liveMsgText) return;
        const d = getCleanFormData();
        
        // Escape content safely to prevent XSS
        const safeName = sanitizeHTML(d.name);
        const safePhone = sanitizeHTML(d.phone);
        const safeCert = sanitizeHTML(d.cert);
        const safeDegree = sanitizeHTML(d.degreeType);
        const safeDept = sanitizeHTML(d.dept);
        const safePeriod = sanitizeHTML(d.period);
        const safeMode = sanitizeHTML(d.mode);

        const html = `✈️ <strong>طلب تقديم وقبول - أكاديمية الأجنحة الملكية للطيران</strong><br>` +
                     `━━━━━━━━━━━━━━━━━━<br>` +
                     `👤 <strong>الاسم:</strong> ${safeName}<br>` +
                     `📱 <strong>الهاتف:</strong> ${safePhone}<br>` +
                     `🎓 <strong>المؤهل:</strong> ${safeCert}<br>` +
                     `📜 <strong>نوع البرنامج:</strong> ${safeDegree}<br>` +
                     `🎯 <strong>التخصص المطلوب:</strong> ${safeDept}<br>` +
                     `⏰ <strong>الفترة:</strong> ${safePeriod}<br>` +
                     `🏛️ <strong>نظام الدراسة:</strong> ${safeMode}<br>` +
                     `📅 <strong>الدفعة:</strong> 2026 - 2027<br>` +
                     `━━━━━━━━━━━━━━━━━━<br>` +
                     `أرغب في إكمال إجراءات القبول والتسجيل، يرجى تزويدي بالرسوم والمستندات المطلوبة.`;

        liveMsgText.innerHTML = html;

        // Update live time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        if (liveMsgTime) {
            liveMsgTime.innerHTML = `${hours}:${minutes} <i class="fa-solid fa-check-double text-blue"></i>`;
        }
    }

    // Attach dynamic input listeners
    const formInputs = [
        studentNameInput, studentPhoneInput, studentWhatsappInput,
        certTypeSelect, gradYearInput, targetDeptSelect,
        studyPeriodSelect, studyModeSelect
    ];

    formInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                if (formAlert) formAlert.style.display = 'none';
                updateLivePreview();
            });
            input.addEventListener('change', updateLivePreview);
        }
    });

    // Degree type radios
    const degreeRadios = document.querySelectorAll('input[name="programDegreeType"]');
    degreeRadios.forEach(radio => {
        radio.addEventListener('change', updateLivePreview);
    });

    // Auto-sync WhatsApp number if empty
    if (studentPhoneInput && studentWhatsappInput) {
        studentPhoneInput.addEventListener('blur', () => {
            if (!studentWhatsappInput.value.trim() && studentPhoneInput.value.trim()) {
                studentWhatsappInput.value = studentPhoneInput.value.trim();
                updateLivePreview();
            }
        });
    }

    // --- 2. Form Validation & Secure WhatsApp Submission ---
    function showError(inputEl, message) {
        if (formAlert) {
            formAlert.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${sanitizeHTML(message)}</span>`;
            formAlert.style.display = 'flex';
        }
        if (inputEl) {
            inputEl.classList.add('input-error');
            inputEl.focus();
            inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Anti-Spam Honeypot Check
            if (hpTrap && hpTrap.value.trim() !== '') {
                // Silently block bot submissions
                console.warn('Bot submission blocked.');
                return;
            }

            // Remove previous error states
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            if (formAlert) formAlert.style.display = 'none';

            // 1. Name Validation
            const name = studentNameInput ? studentNameInput.value.trim() : '';
            if (!name || name.length < 5) {
                showError(studentNameInput, 'يرجى إدخال اسم الطالب كاملاً (5 أحرف على الأقل).');
                return;
            }

            // 2. Phone Validation
            const phone = studentPhoneInput ? studentPhoneInput.value.replace(/\s+/g, '') : '';
            const phoneRegex = /^[0-9+]{9,15}$/;
            if (!phone || !phoneRegex.test(phone)) {
                showError(studentPhoneInput, 'يرجى إدخال رقم هاتف اتصال صحيح ومكون من 9 إلى 15 رقماً.');
                return;
            }

            // 3. WhatsApp Validation
            const whatsapp = studentWhatsappInput ? studentWhatsappInput.value.replace(/\s+/g, '') : phone;
            if (whatsapp && !phoneRegex.test(whatsapp)) {
                showError(studentWhatsappInput, 'يرجى إدخال رقم واتساب صحيح.');
                return;
            }

            // 4. Certificate Validation
            const cert = certTypeSelect ? certTypeSelect.value : '';
            if (!cert) {
                showError(certTypeSelect, 'يرجى اختيار نوع المؤهل الأكاديمي.');
                return;
            }

            // 5. Department Validation
            const dept = targetDeptSelect ? targetDeptSelect.value : '';
            if (!dept) {
                showError(targetDeptSelect, 'يرجى اختيار أحد التخصصات الـ 13 المتاحة.');
                return;
            }

            // Mark successful inputs
            if (studentNameInput) studentNameInput.classList.add('input-success');
            if (studentPhoneInput) studentPhoneInput.classList.add('input-success');

            // Select Advisor WhatsApp Number
            const selectedRadio = document.querySelector('input[name="advisorNumber"]:checked');
            const advisorNumber = selectedRadio ? selectedRadio.value : '249912205587';

            // Generate sanitized URL message
            const fullMessage = generateWhatsAppMessageText();
            const encodedText = encodeURIComponent(fullMessage);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${advisorNumber}&text=${encodedText}`;

            // Prepare Admission Receipt
            populateReceiptData();

            // Directly launch WhatsApp (NO popup-blocking confirm!)
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            // Notify User & Display Receipt Modal
            showToast('تم فتح محادثة الواتساب بنجاح! تم تجهيز إشعار القبول.', 'fa-brands fa-whatsapp');
            setTimeout(() => {
                openReceiptModal();
            }, 600);
        });
    }

    // --- 3. Copy Message to Clipboard ---
    if (btnCopyMessage) {
        btnCopyMessage.addEventListener('click', () => {
            const rawText = generateWhatsAppMessageText();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(rawText).then(() => {
                    showToast('تم نسخ نص رسالة التقديم إلى الحافظة بنجاح!', 'fa-solid fa-copy');
                }).catch(() => {
                    fallbackCopyText(rawText);
                });
            } else {
                fallbackCopyText(rawText);
            }
        });
    }

    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('تم نسخ نص رسالة التقديم بنجاح!', 'fa-solid fa-copy');
        } catch (err) {
            alert('يرجى نسخ النص من صندوق المحادثة يدوياً.');
        }
        document.body.removeChild(textArea);
    }

    // --- 4. Provisional Admission Receipt Logic ---
    function populateReceiptData() {
        const d = getCleanFormData();
        const randId = Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toLocaleDateString('ar-SD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (recRegId) recRegId.textContent = `RWA-2026-${randId}`;
        if (recDate) recDate.textContent = today;
        if (recName) recName.textContent = d.name;
        if (recPhone) recPhone.textContent = d.phone;
        if (recCert) recCert.textContent = d.cert;
        if (recDegreeType) recDegreeType.textContent = d.degreeType;
        if (recDept) recDept.textContent = d.dept;
        if (recPeriod) recPeriod.textContent = d.period;
        if (recMode) recMode.textContent = d.mode;
    }

    function openReceiptModal() {
        populateReceiptData();
        if (receiptModal) {
            receiptModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeReceipt() {
        if (receiptModal) {
            receiptModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (btnPrintReceipt) {
        btnPrintReceipt.addEventListener('click', openReceiptModal);
    }

    if (closeReceiptModal) {
        closeReceiptModal.addEventListener('click', closeReceipt);
    }

    if (receiptModal) {
        receiptModal.addEventListener('click', (e) => {
            if (e.target === receiptModal) {
                closeReceipt();
            }
        });
    }

    // --- 5. Department Filter System ---
    const filterButtons = document.querySelectorAll('.dept-filter-bar .filter-btn');
    const deptCards = document.querySelectorAll('.departments-grid .dept-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            deptCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.35s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 6. Quick Select Department from Cards ---
    window.selectDepartment = function(deptName) {
        if (targetDeptSelect) {
            targetDeptSelect.value = deptName;
            updateLivePreview();
            
            showToast(`تم اختيار تخصص "${deptName}" في الاستمارة`, 'fa-solid fa-graduation-cap');

            // Smooth scroll to register section
            const regSection = document.getElementById('register');
            if (regSection) {
                regSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    targetDeptSelect.focus();
                    targetDeptSelect.classList.add('input-success');
                    setTimeout(() => {
                        targetDeptSelect.classList.remove('input-success');
                    }, 2200);
                }, 500);
            }
        }
    };

    window.quickFillForm = function(deptName) {
        window.selectDepartment(deptName);
    };

    // --- 7. Floating WhatsApp Widget Logic ---
    if (whatsappFloatToggle && whatsappFloatBox) {
        whatsappFloatToggle.addEventListener('click', () => {
            whatsappFloatBox.classList.toggle('active');
        });
    }

    if (whatsappBoxClose && whatsappFloatBox) {
        whatsappBoxClose.addEventListener('click', () => {
            whatsappFloatBox.classList.remove('active');
        });
    }

    window.quickWhatsappChat = function(question) {
        const phone = '249912205587';
        const fullMsg = `السلام عليكم، بخصوص أكاديمية الأجنحة الملكية للطيران:\n${question}`;
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(fullMsg)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        if (whatsappFloatBox) {
            whatsappFloatBox.classList.remove('active');
        }
    };

    // --- 8. Sticky Header & Top Bar Optimization (Passive, RequestAnimationFrame) ---
    if (closeTopBar && topBar) {
        closeTopBar.addEventListener('click', () => {
            topBar.style.display = 'none';
        });
    }

    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (siteHeader) {
                    if (window.scrollY > 45) {
                        siteHeader.classList.add('scrolled');
                    } else {
                        siteHeader.classList.remove('scrolled');
                    }
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // --- 9. Mobile Menu Drawer ---
    if (mobileMenuToggle && mobileDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMobileDrawer() {
        if (mobileDrawer) {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMobileDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    // Close on backdrop click for mobile drawer
    if (mobileDrawer) {
        mobileDrawer.addEventListener('click', (e) => {
            if (e.target === mobileDrawer) {
                closeMobileDrawer();
            }
        });
    }

    // --- 10. Global Escape Key Listener (Accessibility) ---
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeReceipt();
            closeMobileDrawer();
            if (whatsappFloatBox) {
                whatsappFloatBox.classList.remove('active');
            }
        }
    });

    // --- 11. FAQ Accordion ---
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Initial trigger to populate default live message
    updateLivePreview();

    // --- 12. Scroll-Based Animations (Lightweight IntersectionObserver) ---
    const animatableElements = document.querySelectorAll(
        '.dept-card, .feature-card, .doc-card, .about-feature-box, .c-info-card, .faq-item, .section-header, .b-feature, .stat-box, .highlight-item'
    );

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    animatableElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.06}s, transform 0.5s ease ${(index % 4) * 0.06}s`;
        animationObserver.observe(el);
    });

    // Add animate-in class style dynamically
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animStyle);

    // --- 13. Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => sectionObserver.observe(section));

    // --- 14. Animated Count-Up for Stats ---
    function animateCounter(element, target, duration = 1400) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(start);
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numEl = entry.target.querySelector('.stat-num');
                if (numEl) {
                    const rawText = numEl.textContent.replace('%', '');
                    const target = parseInt(rawText, 10);
                    if (!isNaN(target)) {
                        const hasPercent = numEl.textContent.includes('%');
                        animateCounter(numEl, target, 1400);
                        if (hasPercent) {
                            setTimeout(() => {
                                numEl.textContent = target + '%';
                            }, 1450);
                        }
                    }
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-box').forEach(el => statsObserver.observe(el));

    // ==========================================================================
    // 15. PROMO REEL PLAYER & AVIATION AMBIENCE
    // ==========================================================================
    const promoScenes = document.querySelectorAll('.promo-scene');
    const promoChapters = document.querySelectorAll('.chapter-btn');
    const promoPlayBtn = document.getElementById('promoPlayBtn');
    const promoPlaySmallBtn = document.getElementById('promoPlaySmallBtn');
    const promoPlayIcon = document.getElementById('promoPlayIcon');
    const promoSmallPlayIcon = document.getElementById('promoSmallPlayIcon');
    const promoPrevBtn = document.getElementById('promoPrevBtn');
    const promoNextBtn = document.getElementById('promoNextBtn');
    const promoTimeline = document.getElementById('promoTimeline');
    const timelineFill = document.getElementById('timelineFill');
    const promoTimeCounter = document.getElementById('promoTimeCounter');
    const promoScreen = document.getElementById('promoScreen');
    const promoSoundToggle = document.getElementById('promoSoundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');
    const promoFullscreenBtn = document.getElementById('promoFullscreenBtn');
    const promoPlayer = document.getElementById('promoPlayer');

    let currentScene = 0;
    const totalScenes = promoScenes.length || 5;
    const sceneDurationSec = 5;
    const totalDurationSec = totalScenes * sceneDurationSec;
    let promoTimer = null;
    let isPromoPlaying = false;
    let promoElapsedSec = 0;
    let audioCtx = null;
    let isSoundOn = false;

    // Web Audio API Synthesizer for Airplane Cabin Ambient & Chime
    function initAviationAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
    }

    function playFlightChime() {
        if (!isSoundOn || !audioCtx) return;
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const now = audioCtx.currentTime;
            // High note (Ding)
            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(587.33, now); // D5
            gain1.gain.setValueAtTime(0.08, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.start(now);
            osc1.stop(now + 0.8);

            // Lower note (Dong)
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(440, now + 0.25); // A4
            gain2.gain.setValueAtTime(0.08, now + 0.25);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.start(now + 0.25);
            osc2.stop(now + 1.2);
        } catch (e) {
            console.warn('Audio chime note error:', e);
        }
    }

    function toggleAmbientSound() {
        initAviationAudio();
        if (!audioCtx) return;

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            if (promoSoundToggle) promoSoundToggle.classList.add('active-sound');
            if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
            if (soundText) soundText.textContent = 'صوت الأجواء: مفعّل';
            playFlightChime();
            showToast('تم تفعيل صوت أجواء الطيران والمؤثرات التفاعلية ✈️', 'fa-solid fa-volume-high');
        } else {
            if (promoSoundToggle) promoSoundToggle.classList.remove('active-sound');
            if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
            if (soundText) soundText.textContent = 'صوت الأجواء';
            showToast('تم كتم صوت الأجواء', 'fa-solid fa-volume-xmark');
        }
    }

    if (promoSoundToggle) {
        promoSoundToggle.addEventListener('click', toggleAmbientSound);
    }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function updatePromoTimeDisplay() {
        if (promoTimeCounter) {
            promoTimeCounter.textContent = `${formatTime(promoElapsedSec)} / ${formatTime(totalDurationSec)}`;
        }
        if (timelineFill) {
            const pct = (promoElapsedSec / totalDurationSec) * 100;
            timelineFill.style.width = `${Math.min(pct, 100)}%`;
        }
    }

    function switchScene(index) {
        if (index < 0) index = totalScenes - 1;
        if (index >= totalScenes) index = 0;

        currentScene = index;
        promoScenes.forEach((scene, i) => {
            if (i === currentScene) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });

        promoChapters.forEach((ch, i) => {
            if (i === currentScene) {
                ch.classList.add('active');
            } else {
                ch.classList.remove('active');
            }
        });

        promoElapsedSec = currentScene * sceneDurationSec;
        updatePromoTimeDisplay();

        if (isSoundOn) {
            playFlightChime();
        }
    }

    function startPromoPlayback() {
        if (isPromoPlaying) return;
        isPromoPlaying = true;
        if (promoScreen) promoScreen.classList.add('playing');
        if (promoPlayIcon) promoPlayIcon.className = 'fa-solid fa-pause';
        if (promoSmallPlayIcon) promoSmallPlayIcon.className = 'fa-solid fa-pause';

        if (promoElapsedSec >= totalDurationSec) {
            promoElapsedSec = 0;
            switchScene(0);
        }

        promoTimer = setInterval(() => {
            promoElapsedSec += 0.25;
            const targetScene = Math.floor(promoElapsedSec / sceneDurationSec);
            if (targetScene !== currentScene && targetScene < totalScenes) {
                switchScene(targetScene);
            }
            updatePromoTimeDisplay();

            if (promoElapsedSec >= totalDurationSec) {
                promoElapsedSec = 0;
                switchScene(0);
            }
        }, 250);
    }

    function pausePromoPlayback() {
        isPromoPlaying = false;
        clearInterval(promoTimer);
        if (promoScreen) promoScreen.classList.remove('playing');
        if (promoPlayIcon) promoPlayIcon.className = 'fa-solid fa-play';
        if (promoSmallPlayIcon) promoSmallPlayIcon.className = 'fa-solid fa-play';
    }

    function togglePromoPlayback() {
        if (isPromoPlaying) {
            pausePromoPlayback();
        } else {
            startPromoPlayback();
        }
    }

    if (promoPlayBtn) promoPlayBtn.addEventListener('click', togglePromoPlayback);
    if (promoPlaySmallBtn) promoPlaySmallBtn.addEventListener('click', togglePromoPlayback);
    if (promoPrevBtn) {
        promoPrevBtn.addEventListener('click', () => {
            switchScene(currentScene - 1);
        });
    }
    if (promoNextBtn) {
        promoNextBtn.addEventListener('click', () => {
            switchScene(currentScene + 1);
        });
    }

    promoChapters.forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index, 10);
            if (!isNaN(idx)) {
                switchScene(idx);
            }
        });
    });

    if (promoTimeline) {
        promoTimeline.addEventListener('click', (e) => {
            const rect = promoTimeline.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(1, clickX / rect.width));
            promoElapsedSec = pct * totalDurationSec;
            const targetScene = Math.min(Math.floor(promoElapsedSec / sceneDurationSec), totalScenes - 1);
            switchScene(targetScene);
        });
    }

    if (promoFullscreenBtn && promoPlayer) {
        promoFullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (promoPlayer.requestFullscreen) {
                    promoPlayer.requestFullscreen();
                } else if (promoPlayer.webkitRequestFullscreen) {
                    promoPlayer.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }

    // ==========================================================================
    // 16. PHOTO GALLERY FILTERING
    // ==========================================================================
    const gFilterBtns = document.querySelectorAll('.g-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    gFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.gfilter;

            galleryItems.forEach(item => {
                const itemCat = item.dataset.category || '';
                if (filter === 'all' || itemCat.includes(filter)) {
                    item.classList.remove('hide-item');
                } else {
                    item.classList.add('hide-item');
                }
            });
        });
    });

    // ==========================================================================
    // 17. FULLSCREEN LIGHTBOX MODAL & VIEWER
    // ==========================================================================
    const galleryData = [
        {
            src: 'assets/images/hero.jpg',
            title: 'أسطول الأجنحة الملكية والطلاب في ساحة المطار',
            desc: 'صورة جماعية لطلاب وطالبات الأكاديمية على مدرج المطار مع كابتن الطائرة خلال فترة الغروب بالخرطوم، تبرز طائرة التدريب والأسطول الجوي للأكاديمية.',
            cat: 'علوم الطيران والمحاكاة'
        },
        {
            src: 'assets/images/training.jpg',
            title: 'غرفة محاكاة الطيران والرادار الجوي',
            desc: 'قاعة الملاحة المتقدمة ومحاكاة أبراج المراقبة الجوية والخرائط الملاحية بالأكاديمية؛ تدريب تطبيقي يحاكي أحدث مطارات العالم.',
            cat: 'قاعات المحاكاة'
        },
        {
            src: 'assets/images/gallery-1.jpg',
            title: 'التدريب الميداني بمحطات الشحن والموانئ',
            desc: 'جولة تطبيقية لطلاب تخصصات إدارة الجمارك والمناولة الأرضية والشحن الجوي في المنشآت الحيوية مع مهندس السلامة الميداني.',
            cat: 'التدريب الميداني'
        },
        {
            src: 'assets/images/gallery-2.jpg',
            title: 'الدفعة الرسمية للأكاديمية بالزي الملكي الموحد',
            desc: 'صورة تذكارية رسمية لطلاب وطالبات الأكاديمية بالزي الرسمي ذو الرتب الملكية برفقة كبار المحاضرين وعمادة الأكاديمية.',
            cat: 'الزي الموحد'
        },
        {
            src: 'assets/images/gallery-3.jpg',
            title: 'طالبات كادر الضيافة وإدارة المطارات',
            desc: 'طالبات الأكاديمية بأناقة الزي الموحد خلال الأنشطة الأكاديمية والاحتفالات بحرم الأكاديمية بالخرطوم المقرن.',
            cat: 'كادر الطالبات'
        },
        {
            src: 'assets/images/gallery-4.jpg',
            title: 'قيادة الأكاديمية وضباط أمن الطيران',
            desc: 'اجتماع تدريبي وتنسيقي يجمع مسؤولي أمن وسلامة الطيران مع إدارة الأكاديمية وطلاب قسم إدارة المطارات.',
            cat: 'الإدارة والقيادة'
        },
        {
            src: 'assets/images/gallery-5.jpg',
            title: 'قاعات المحاضرات النظرية والعملية',
            desc: 'تدريب مكثف وتفاعل مباشر داخل القاعات الدراسية بالأكاديمية تحت إشراف نخبة من كبار المدربين بمقر المقرن.',
            cat: 'القاعات الدراسية'
        },
        {
            src: 'assets/images/academy_logo.jpg',
            title: 'الشعار الملكي الذهبي المعتمد',
            desc: 'الأجنحة الملكية والتاج الذهبي، رمز الريادة والاعتماد الدولي لأكاديمية الأجنحة الملكية للطيران G.M.A.S.T.A.',
            cat: 'الهوية الملكية'
        }
    ];

    const lightboxModal = document.getElementById('lightboxModal');
    const lbBackdrop = document.getElementById('lbBackdrop');
    const lbCloseBtn = document.getElementById('lbCloseBtn');
    const lbMainImage = document.getElementById('lbMainImage');
    const lbCounter = document.getElementById('lbCounter');
    const lbToolbarTitle = document.getElementById('lbToolbarTitle');
    const lbCaptionTitle = document.getElementById('lbCaptionTitle');
    const lbCaptionDesc = document.getElementById('lbCaptionDesc');
    const lbPrevBtn = document.getElementById('lbPrevBtn');
    const lbNextBtn = document.getElementById('lbNextBtn');
    const lbZoomBtn = document.getElementById('lbZoomBtn');
    const zoomIcon = document.getElementById('zoomIcon');
    const lbImageHolder = document.getElementById('lbImageHolder');
    const lbDownloadBtn = document.getElementById('lbDownloadBtn');
    const lbShareBtn = document.getElementById('lbShareBtn');
    const lbAutoplayBtn = document.getElementById('lbAutoplayBtn');
    const lbAutoPlayIcon = document.getElementById('lbAutoPlayIcon');

    let currentLbIndex = 0;
    let isLbZoomed = false;
    let lbAutoplayTimer = null;
    let isLbAutoplaying = false;

    function openLightbox(index) {
        if (!lightboxModal) return;
        currentLbIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (isLbZoomed) toggleLbZoom();
        if (isLbAutoplaying) toggleLbAutoplay();
    }

    function updateLightboxContent() {
        const item = galleryData[currentLbIndex];
        if (!item) return;

        if (lbMainImage) {
            lbMainImage.src = item.src;
            lbMainImage.alt = item.title;
        }
        if (lbCounter) lbCounter.textContent = `${currentLbIndex + 1} / ${galleryData.length}`;
        if (lbToolbarTitle) lbToolbarTitle.textContent = item.title;
        if (lbCaptionTitle) lbCaptionTitle.textContent = item.title;
        if (lbCaptionDesc) lbCaptionDesc.textContent = item.desc;
        if (lbDownloadBtn) {
            lbDownloadBtn.href = item.src;
            lbDownloadBtn.setAttribute('download', `royal-wings-photo-${currentLbIndex + 1}.jpg`);
        }
    }

    function nextLbImage() {
        currentLbIndex = (currentLbIndex + 1) % galleryData.length;
        if (isLbZoomed) toggleLbZoom();
        updateLightboxContent();
    }

    function prevLbImage() {
        currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
        if (isLbZoomed) toggleLbZoom();
        updateLightboxContent();
    }

    function toggleLbZoom() {
        if (!lbImageHolder) return;
        isLbZoomed = !isLbZoomed;
        if (isLbZoomed) {
            lbImageHolder.classList.add('zoomed');
            if (zoomIcon) zoomIcon.className = 'fa-solid fa-magnifying-glass-minus';
        } else {
            lbImageHolder.classList.remove('zoomed');
            if (zoomIcon) zoomIcon.className = 'fa-solid fa-magnifying-glass-plus';
        }
    }

    function toggleLbAutoplay() {
        isLbAutoplaying = !isLbAutoplaying;
        if (isLbAutoplaying) {
            if (lbAutoPlayIcon) lbAutoPlayIcon.className = 'fa-solid fa-pause';
            showToast('بدء العرض التلقائي للصور 🔄');
            lbAutoplayTimer = setInterval(nextLbImage, 3500);
        } else {
            if (lbAutoPlayIcon) lbAutoPlayIcon.className = 'fa-solid fa-play';
            clearInterval(lbAutoplayTimer);
            showToast('تم إيقاف العرض التلقائي');
        }
    }

    function sharePhotoToWhatsApp(index) {
        const item = galleryData[index];
        if (!item) return;
        const text = `✈️ شاهد هذه الصورة الرائعة من *أكاديمية الأجنحة الملكية للطيران* (الخرطوم المقرن):%0A%0A*${encodeURIComponent(item.title)}*%0A${encodeURIComponent(item.desc)}%0A%0Aللتسجيل والاستفسار:%0Ahttps://royalwings-academy.sd/#gallery`;
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    // Attach click handlers to gallery items & buttons
    document.querySelectorAll('.gallery-item').forEach(item => {
        const idx = parseInt(item.dataset.index, 10);
        const viewBtn = item.querySelector('.btn-view');
        const shareBtn = item.querySelector('.btn-share-wa');
        const img = item.querySelector('img');

        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(idx);
            });
        }
        if (img) {
            img.addEventListener('click', () => openLightbox(idx));
        }
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sharePhotoToWhatsApp(idx);
            });
        }
    });

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lbNextBtn) lbNextBtn.addEventListener('click', nextLbImage);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', prevLbImage);
    if (lbZoomBtn) lbZoomBtn.addEventListener('click', toggleLbZoom);
    if (lbAutoplayBtn) lbAutoplayBtn.addEventListener('click', toggleLbAutoplay);
    if (lbShareBtn) {
        lbShareBtn.addEventListener('click', () => {
            sharePhotoToWhatsApp(currentLbIndex);
        });
    }

    // Keyboard support for Lightbox
    window.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') prevLbImage();
        if (e.key === 'ArrowLeft') nextLbImage();
        if (e.key === ' ') {
            e.preventDefault();
            toggleLbAutoplay();
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (lightboxModal) {
        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    prevLbImage();
                } else {
                    nextLbImage();
                }
            }
        }, { passive: true });
    }
});


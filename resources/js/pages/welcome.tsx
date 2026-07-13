// resources/js/pages/welcome.tsx

import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { useEffect, useState } from 'react';

// ============================================
// IMPORT IMAGES FROM ASSETS FOLDER
// ============================================
// Hero Images
import cchImage from './assets/images/cch_image.png';
import hero1 from './assets/images/hero1.png';
import hero2 from './assets/images/hero2.jpg';
import hero3 from './assets/images/hero3.jpg';
import hero4 from './assets/images/hero4.jpg';
import hero5 from './assets/images/hero5.png';

// Gallery Images
import gallery1 from './assets/images/gallery1.png';
import gallery2 from './assets/images/gallery2.png';

// News Images
import news1 from './assets/images/news1.png';

// Management Images
import sms from './assets/images/sms.jpg';
import pa from './assets/images/pa.jpg';
import pno from './assets/images/pno.jpeg';

// Partner Logos
import moh from './assets/images/moh.png';
import unicef from './assets/images/unicef.png';
import partner from './assets/images/unicef.png';

export default function Welcome() {
    const { auth } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Hero slides with imported images
    const slides = [cchImage, hero2, hero3, hero4, hero5];

    useEffect(() => {
        // Auto-slide
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        // Hide loader
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        // Initialize AOS
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 900,
                once: true
            });
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    // Back to top
    useEffect(() => {
        const handleScroll = () => {
            const backTop = document.getElementById('backTop');
            if (backTop) {
                if (window.scrollY > 400) {
                    backTop.classList.add('show');
                } else {
                    backTop.classList.remove('show');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <Head title="Chipata Central Hospital" />

            {/* Loader */}
            {isLoading && (
                <div id="loader" className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[99999] transition-opacity duration-500">
                    <div className="w-[70px] h-[70px] border-6 border-[#ededed] border-t-[#5E35B1] rounded-full animate-spin mb-6"></div>
                    <h3 className="text-lg font-semibold text-[#1d2433]">Chipata Central Hospital</h3>
                </div>
            )}

            {/* ===================================================
                 HERO SECTION
            =================================================== */}
            <header className="hero relative min-h-screen overflow-hidden flex items-center justify-center bg-white">

                {/* Hero Slider */}
                <div className="hero-slider absolute inset-0 overflow-hidden z-[1]">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-100 z-[2]' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={slide}
                                alt={`Chipata Central Hospital ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    <div className="hero-overlay absolute inset-0 z-[3] bg-gradient-to-r from-white/10 to-white/18"></div>
                </div>

                {/* Menu Button */}
                <div className="top-right fixed top-5 right-5 z-[999999]">
                    <div className="menu-container relative">
                        <button
                            id="menuBtn"
                            onClick={toggleMenu}
                            className={`menu-btn relative w-[60px] h-[60px] border-none cursor-pointer flex flex-col justify-center items-center gap-1.5 bg-white/95 backdrop-blur-[18px] border border-white/45 rounded-[18px] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:translate-y-[-4px] hover:scale-105 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)] overflow-hidden ${
                                isMenuOpen ? 'active bg-[#5E35B1]' : ''
                            }`}
                        >
                            <span className={`relative w-7 h-[3px] rounded-full bg-[#5E35B1] transition-all duration-300 ${
                                isMenuOpen ? 'bg-white transform translate-y-[10px] rotate-45' : ''
                            }`} />
                            <span className={`relative w-7 h-[3px] rounded-full bg-[#5E35B1] transition-all duration-300 ${
                                isMenuOpen ? 'opacity-0 transform scale-0' : ''
                            }`} />
                            <span className={`relative w-7 h-[3px] rounded-full bg-[#5E35B1] transition-all duration-300 ${
                                isMenuOpen ? 'bg-white transform -translate-y-[10px] -rotate-45' : ''
                            }`} />
                        </button>

                        <nav
                            id="menuList"
                            className={`menu-list absolute top-[78px] right-0 w-[320px] max-h-[80vh] overflow-y-auto bg-white/97 backdrop-blur-[25px] border border-white/55 rounded-[22px] shadow-[0_25px_60px_rgba(0,0,0,0.20)] transition-all duration-300 z-[999999] ${
                                isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'
                            }`}
                        >
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    onClick={closeMenu}
                                    className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold border-b border-black/6 hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                                >
                                    <i className="fas fa-gauge-high w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                    <span>Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        onClick={closeMenu}
                                        className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold border-b border-black/6 hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                                    >
                                        <i className="fas fa-right-to-bracket w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        href={register()}
                                        onClick={closeMenu}
                                        className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold border-b border-black/6 hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                                    >
                                        <i className="fas fa-user-plus w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                        <span>Register</span>
                                    </Link>
                                </>
                            )}
                            <a
                                href="#services"
                                onClick={closeMenu}
                                className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold border-b border-black/6 hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                            >
                                <i className="fas fa-building w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                <span>Departments</span>
                            </a>
                            <a
                                href="#gallery"
                                onClick={closeMenu}
                                className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold border-b border-black/6 hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                            >
                                <i className="fas fa-image w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                <span>Gallery</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={closeMenu}
                                className="flex items-center gap-4 px-6 py-4 text-[#1d2433] font-semibold hover:bg-gradient-to-r hover:from-[#5E35B1] hover:to-[#4527A0] hover:text-white hover:pl-8 transition-all duration-300"
                            >
                                <i className="fas fa-phone w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-[#F1ECFF] text-[#5E35B1] text-lg transition-all duration-300 group-hover:bg-white/18 group-hover:text-white group-hover:rotate-10 group-hover:scale-105"></i>
                                <span>Contact Us</span>
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Hero Highlights */}
                <div className="hero-highlights absolute left-1/2 bottom-[35px] -translate-x-1/2 w-[min(1280px,92%)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-[25]">
                    <div className="highlight-card bg-white/94 backdrop-blur-[18px] rounded-[18px] p-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] border border-white/70">
                        <i className="fas fa-truck-medical text-[42px] text-[#5E35B1] mb-4"></i>
                        <h4 className="text-xl font-bold mb-3 text-[#1d2433]">24 Hour Emergency</h4>
                        <p className="text-[#6d7588]">Rapid emergency medical response.</p>
                    </div>
                    <div className="highlight-card bg-white/94 backdrop-blur-[18px] rounded-[18px] p-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] border border-white/70">
                        <i className="fas fa-user-doctor text-[42px] text-[#5E35B1] mb-4"></i>
                        <h4 className="text-xl font-bold mb-3 text-[#1d2433]">Specialist Care</h4>
                        <p className="text-[#6d7588]">Experienced healthcare professionals.</p>
                    </div>
                    <div className="highlight-card bg-white/94 backdrop-blur-[18px] rounded-[18px] p-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] border border-white/70">
                        <i className="fas fa-heart-pulse text-[42px] text-[#5E35B1] mb-4"></i>
                        <h4 className="text-xl font-bold mb-3 text-[#1d2433]">Quality Healthcare</h4>
                        <p className="text-[#6d7588]">Compassionate patient-centred services.</p>
                    </div>
                    <div className="highlight-card bg-white/94 backdrop-blur-[18px] rounded-[18px] p-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] border border-white/70">
                        <i className="fas fa-laptop-medical text-[42px] text-[#5E35B1] mb-4"></i>
                        <h4 className="text-xl font-bold mb-3 text-[#1d2433]">Digital Health</h4>
                        <p className="text-[#6d7588]">Secure and modern healthcare systems.</p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator absolute left-1/2 bottom-2 -translate-x-1/2 z-40">
                    <span className="block w-8 h-[55px] border-2 border-white rounded-[40px] relative">
                        <span className="absolute left-1/2 top-2.5 w-[7px] h-[7px] rounded-full bg-white -translate-x-1/2 animate-[scrollMove_2s_infinite]"></span>
                    </span>
                </div>
            </header>

            {/* ===================================================
                 WELCOME STRIP
            =================================================== */}
            <section className="welcome-strip bg-white py-[130px] pb-[90px]">
                <div className="welcome-box max-w-[980px] mx-auto bg-white p-[60px] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-center">
                    <span className="section-tag inline-block px-[22px] py-2.5 bg-[#F1ECFF] text-[#5E35B1] font-bold rounded-[50px] mb-[22px]">
                        CHIPATA CENTRAL HOSPITAL
                    </span>
                    <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-6">
                        Delivering Safe, Quality and Compassionate Healthcare
                    </h2>
                    <p className="text-[1.08rem] text-[#6d7588] leading-[1.9]">
                        Chipata Central Hospital is one of Zambia's major referral
                        hospitals serving Eastern Province and surrounding districts.
                        Through highly qualified healthcare professionals, modern
                        medical technologies and digital healthcare innovations,
                        we remain committed to improving lives every day.
                    </p>
                </div>
            </section>

            {/* ===================================================
                 HOSPITAL STATISTICS
            =================================================== */}
            <section className="stats-section bg-[#f8f9fc] py-[100px] relative">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
                        <div className="stat-card bg-white rounded-[22px] p-[45px_25px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-user-doctor text-[50px] text-[#5E35B1] mb-5"></i>
                            <h2 className="text-[2.7rem] font-extrabold text-[#5E35B1] mb-2.5">250+</h2>
                            <p className="text-[#6d7588]">Medical Professionals</p>
                        </div>
                        <div className="stat-card bg-white rounded-[22px] p-[45px_25px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-bed-pulse text-[50px] text-[#5E35B1] mb-5"></i>
                            <h2 className="text-[2.7rem] font-extrabold text-[#5E35B1] mb-2.5">500+</h2>
                            <p className="text-[#6d7588]">Hospital Beds</p>
                        </div>
                        <div className="stat-card bg-white rounded-[22px] p-[45px_25px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-heart-circle-check text-[50px] text-[#5E35B1] mb-5"></i>
                            <h2 className="text-[2.7rem] font-extrabold text-[#5E35B1] mb-2.5">24/7</h2>
                            <p className="text-[#6d7588]">Emergency Services</p>
                        </div>
                        <div className="stat-card bg-white rounded-[22px] p-[45px_25px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-users text-[50px] text-[#5E35B1] mb-5"></i>
                            <h2 className="text-[2.7rem] font-extrabold text-[#5E35B1] mb-2.5">100,000+</h2>
                            <p className="text-[#6d7588]">Patients Served Annually</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 ABOUT HOSPITAL
            =================================================== */}
            <section id="about" className="about-section bg-white py-[100px]">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">ABOUT US</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">
                            Providing Trusted Healthcare Services Since Establishment
                        </h2>
                        <p className="text-[1.05rem] text-[#6d7588]">
                            Chipata Central Hospital provides specialized medical,
                            surgical, emergency, maternal, child health and diagnostic
                            services for Eastern Province while supporting research,
                            training and digital healthcare transformation.
                        </p>
                    </div>
                    <div className="about-grid grid grid-cols-1 lg:grid-cols-2 items-center gap-[70px]">
                        <div className="about-image overflow-hidden rounded-[24px] shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <img src={hero1} alt="Chipata Central Hospital" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                        </div>
                        <div className="about-content">
                            <h3 className="text-[2.2rem] font-bold text-[#1d2433] mb-[22px]">Healthcare Excellence Through Innovation</h3>
                            <p className="text-[1.05rem] text-[#6d7588] mb-[28px] leading-[1.9]">
                                The hospital combines experienced healthcare professionals,
                                modern equipment and digital information systems to ensure
                                quality, efficient and patient-centred healthcare.
                            </p>
                            <ul className="mb-[35px]">
                                <li className="flex items-center gap-3.5 py-3 text-[#1d2433]">
                                    <i className="fas fa-circle-check text-xl text-[#5E35B1]"></i>
                                    24 Hour Emergency Department
                                </li>
                                <li className="flex items-center gap-3.5 py-3 text-[#1d2433]">
                                    <i className="fas fa-circle-check text-xl text-[#5E35B1]"></i>
                                    Specialist Outpatient Clinics
                                </li>
                                <li className="flex items-center gap-3.5 py-3 text-[#1d2433]">
                                    <i className="fas fa-circle-check text-xl text-[#5E35B1]"></i>
                                    Modern Diagnostic Services
                                </li>
                                <li className="flex items-center gap-3.5 py-3 text-[#1d2433]">
                                    <i className="fas fa-circle-check text-xl text-[#5E35B1]"></i>
                                    Maternal & Child Healthcare
                                </li>
                                <li className="flex items-center gap-3.5 py-3 text-[#1d2433]">
                                    <i className="fas fa-circle-check text-xl text-[#5E35B1]"></i>
                                    Digital Hospital Information Systems
                                </li>
                            </ul>
                            <a href="#services" className="inline-block px-[35px] py-[14px] bg-[#5E35B1] text-white font-semibold rounded-[60px] hover:bg-[#4527A0] transition-all duration-300">
                                Explore Services
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 SERVICES (Full Section)
            =================================================== */}
            <section id="services" className="services-section bg-[#f8f9fc] py-[100px] relative">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">OUR SERVICES</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">Healthcare Services We Provide</h2>
                    </div>
                    <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[35px] mt-[60px]">
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-truck-medical text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Emergency Care</h3>
                            <p className="text-[#6d7588] leading-[1.8]">24-hour emergency medical services for critical patients.</p>
                        </div>
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-user-doctor text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Specialist Clinics</h3>
                            <p className="text-[#6d7588] leading-[1.8]">Consultations by experienced specialists across multiple disciplines.</p>
                        </div>
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-heart-pulse text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Maternal Health</h3>
                            <p className="text-[#6d7588] leading-[1.8]">Safe pregnancy, delivery and postnatal care services.</p>
                        </div>
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-flask-vial text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Laboratory</h3>
                            <p className="text-[#6d7588] leading-[1.8]">Reliable laboratory investigations using modern equipment.</p>
                        </div>
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-x-ray text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Radiology</h3>
                            <p className="text-[#6d7588] leading-[1.8]">Digital imaging and diagnostic radiology services.</p>
                        </div>
                        <div className="service-card bg-white p-[45px_35px] rounded-[22px] text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] relative overflow-hidden before:absolute before:left-0 before:top-0 before:w-full before:h-1.5 before:bg-gradient-to-r before:from-[#5E35B1] before:to-[#009688] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300">
                            <i className="fas fa-laptop-medical text-[55px] text-[#5E35B1] mb-[25px] transition-all duration-300 hover:scale-110 hover:rotate-3"></i>
                            <h3 className="text-[1.45rem] font-bold text-[#1d2433] mb-[15px]">Digital Health</h3>
                            <p className="text-[#6d7588] leading-[1.8]">Electronic records, reporting, screening and hospital systems.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 EXECUTIVE MANAGEMENT
            =================================================== */}
            <section className="management-section bg-[#f8f9fc] py-[100px] relative">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">HOSPITAL LEADERSHIP</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">Executive Management</h2>
                        <p className="text-[1.05rem] text-[#6d7588]">
                            Our experienced leadership team is committed to providing
                            high-quality healthcare services through good governance,
                            innovation and patient-centred care.
                        </p>
                    </div>
                    <div className="management-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[35px] mt-[60px]">
                        <div className="management-card bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] text-center">
                            <img src={sms} alt="Medical Superintendent" className="w-full h-[360px] object-cover transition-transform duration-1000 hover:scale-105" />
                            <h3 className="pt-[30px] text-[1.45rem] font-bold text-[#1d2433]">Medical Superintendent</h3>
                            <p className="px-[30px] py-[18px] pb-[35px] text-[#6d7588] leading-[1.8]">
                                Providing strategic leadership and ensuring quality healthcare delivery throughout the hospital.
                            </p>
                        </div>
                        <div className="management-card bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] text-center">
                            <img src={pa} alt="Principal Administrator" className="w-full h-[360px] object-cover transition-transform duration-1000 hover:scale-105" />
                            <h3 className="pt-[30px] text-[1.45rem] font-bold text-[#1d2433]">Principal Administrator</h3>
                            <p className="px-[30px] py-[18px] pb-[35px] text-[#6d7588] leading-[1.8]">
                                Overseeing hospital administration, operations, resource management, and institutional development.
                            </p>
                        </div>
                        <div className="management-card bg-white rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)] text-center">
                            <img src={pno} alt="Chief Nursing Officer" className="w-full h-[360px] object-cover transition-transform duration-1000 hover:scale-105" />
                            <h3 className="pt-[30px] text-[1.45rem] font-bold text-[#1d2433]">Chief Nursing Officer</h3>
                            <p className="px-[30px] py-[18px] pb-[35px] text-[#6d7588] leading-[1.8]">
                                Leading nursing excellence and improving patient experiences through compassionate care.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 GALLERY SECTION
            =================================================== */}
            <section id="gallery" className="gallery-section bg-white py-[100px]">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">PHOTO GALLERY</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">Life At Chipata Central Hospital</h2>
                    </div>
                    <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] mt-[60px]">
                        <img src={hero1} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                        <img src={hero2} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                        <img src={hero3} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                        <img src={hero4} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                        <img src={gallery1} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                        <img src={gallery2} alt="Hospital" className="w-full h-[280px] object-cover rounded-[20px] cursor-pointer transition-transform duration-300 hover:scale-105 shadow-[0_12px_40px_rgba(0,0,0,0.08)]" />
                    </div>
                </div>
            </section>

            {/* ===================================================
                 PARTNERS
            =================================================== */}
            <section className="partners-section bg-[#f8f9fc] py-[100px] relative">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">OUR PARTNERS</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">Working Together For Better Healthcare</h2>
                    </div>
                    <div className="partners-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[30px] mt-[60px] items-center">
                        <img src={moh} alt="Ministry of Health" className="w-full h-[90px] object-contain bg-white p-5 rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]" />
                        <img src={unicef} alt="UNICEF" className="w-full h-[90px] object-contain bg-white p-5 rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]" />
                        <img src={partner} alt="Partner" className="w-full h-[90px] object-contain bg-white p-5 rounded-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]" />
                        {/* Add more partner logos as needed */}
                    </div>
                </div>
            </section>

            {/* ===================================================
                 CONTACT SECTION
            =================================================== */}
            <section id="contact" className="contact-section bg-white py-[100px]">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="section-title max-w-[760px] mx-auto text-center mb-[70px]">
                        <span className="inline-block px-[22px] py-2 bg-[#F1ECFF] text-[#5E35B1] rounded-[50px] font-semibold tracking-wider mb-[18px] text-sm">CONTACT US</span>
                        <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px] leading-[1.3]">Get In Touch</h2>
                        <p className="text-[1.05rem] text-[#6d7588]">
                            We are always ready to provide healthcare information, emergency support and hospital services.
                        </p>
                    </div>
                    <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[35px] mt-[60px]">
                        <div className="contact-card bg-white p-[45px_30px] text-center rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-location-dot text-[50px] text-[#5E35B1] mb-[22px]"></i>
                            <h3 className="text-[1.35rem] font-bold text-[#1d2433] mb-[18px]">Location</h3>
                            <p className="text-[#6d7588] leading-[1.9]">
                                Chipata Central Hospital<br />
                                Chipata<br />
                                Eastern Province<br />
                                Zambia
                            </p>
                        </div>
                        <div className="contact-card bg-white p-[45px_30px] text-center rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-phone text-[50px] text-[#5E35B1] mb-[22px]"></i>
                            <h3 className="text-[1.35rem] font-bold text-[#1d2433] mb-[18px]">Emergency</h3>
                            <p className="text-[#6d7588] leading-[1.9]">+260 961517604</p>
                        </div>
                        <div className="contact-card bg-white p-[45px_30px] text-center rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-envelope text-[50px] text-[#5E35B1] mb-[22px]"></i>
                            <h3 className="text-[1.35rem] font-bold text-[#1d2433] mb-[18px]">Email</h3>
                            <p className="text-[#6d7588] leading-[1.9]">Chipata.centralhospital@moh.gov.zm</p>
                        </div>
                        <div className="contact-card bg-white p-[45px_30px] text-center rounded-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]">
                            <i className="fas fa-clock text-[50px] text-[#5E35B1] mb-[22px]"></i>
                            <h3 className="text-[1.35rem] font-bold text-[#1d2433] mb-[18px]">Working Hours</h3>
                            <p className="text-[#6d7588] leading-[1.9]">
                                Emergency Services<br />
                                24 Hours Everyday
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 GOOGLE MAP
            =================================================== */}
            <section className="map-section">
                <iframe
                    src="https://maps.google.com/maps?q=Chipata%20Central%20Hospital&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-[500px] border-0"
                    loading="lazy"
                    allowFullScreen
                ></iframe>
            </section>

            {/* ===================================================
                 CALL TO ACTION
            =================================================== */}
            <section className="cta-section py-[110px] px-5 bg-gradient-to-br from-[#5E35B1] to-[#4527A0] text-center text-white">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <h2 className="text-5xl font-bold mb-[25px]">Need Medical Assistance?</h2>
                    <p className="max-w-[760px] mx-auto text-[1.1rem] leading-[1.9] mb-[45px] opacity-95">
                        Our dedicated healthcare professionals are available to
                        provide quality healthcare services and emergency support.
                    </p>
                    <div className="cta-buttons flex justify-center gap-5 flex-wrap">
                        <a href="#contact" className="btn-outline inline-block px-[38px] py-[18px] border-2 border-white text-white font-semibold rounded-[60px] transition-all duration-300 hover:bg-white hover:text-[#5E35B1]">
                            Contact Hospital
                        </a>
                    </div>
                </div>
            </section>

            {/* ===================================================
                 NEWSLETTER
            =================================================== */}
            <section className="newsletter bg-[#f8f9fc] py-[100px] text-center">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <h2 className="text-[2.6rem] font-bold text-[#1d2433] mb-[18px]">Stay Updated</h2>
                    <p className="text-[#6d7588] mb-[35px]">Subscribe for hospital announcements and health updates.</p>
                    <form className="max-w-[700px] mx-auto flex gap-[18px] flex-wrap justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            className="flex-1 min-w-[280px] px-6 py-[18px] border border-[#e7eaf3] rounded-[60px] text-base outline-none focus:border-[#5E35B1]"
                        />
                        <button className="px-[38px] py-[18px] bg-[#5E35B1] text-white border-none rounded-[60px] cursor-pointer font-semibold transition-all duration-300 hover:bg-[#4527A0] relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* ===================================================
                 FOOTER
            =================================================== */}
            <footer className="main-footer bg-[#1f2330] text-white py-[90px] pb-[25px]">
                <div className="container w-[min(1280px,92%)] mx-auto">
                    <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[45px] mb-[45px]">
                        <div>
                            <h3 className="text-xl font-semibold mb-5">Chipata Central Hospital</h3>
                            <p className="text-[#cfd5e0] leading-[1.9]">
                                Providing quality healthcare through innovation,
                                professionalism and compassionate care.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
                            <ul className="list-none">
                                <li className="mb-3.5"><a href="#" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Home</a></li>
                                <li className="mb-3.5"><a href="#about" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">About</a></li>
                                <li className="mb-3.5"><a href="#services" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Services</a></li>
                                <li className="mb-3.5"><a href="#contact" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-5">Hospital Systems</h4>
                            <ul className="list-none">
                                <li className="mb-3.5"><a href="/dashboard" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Staff Dashboard</a></li>
                                <li className="mb-3.5"><a href="/consultations" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Consultations</a></li>
                                <li className="mb-3.5"><a href="/laboratory" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Laboratory</a></li>
                                <li className="mb-3.5"><a href="/community-outreach" className="text-[#cfd5e0] hover:text-white hover:pl-2 transition-all duration-300">Community Outreach</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-5">Follow Us</h4>
                            <div className="social-links flex gap-3.5 mt-5">
                                <a href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-[#5E35B1] hover:-translate-y-1.5">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-[#5E35B1] hover:-translate-y-1.5">
                                    <i className="fab fa-x-twitter"></i>
                                </a>
                                <a href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-[#5E35B1] hover:-translate-y-1.5">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-[#5E35B1] hover:-translate-y-1.5">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center pt-[30px] text-[0.95rem] text-[#bfc6d5] border-t border-white/10">
                        <p>
                            © {new Date().getFullYear()} Chipata Central Hospital.
                            All Rights Reserved.
                            Developed by Zamcomputers Consultant Company.
                        </p>
                    </div>
                </div>
            </footer>

            {/* ===================================================
                 BACK TO TOP BUTTON
            =================================================== */}
            <button
                id="backTop"
                onClick={scrollToTop}
                className="fixed right-[25px] bottom-[25px] w-[55px] h-[55px] border-none rounded-full bg-[#5E35B1] text-white text-xl cursor-pointer shadow-[0_20px_55px_rgba(0,0,0,0.14)] opacity-0 invisible transition-all duration-300 z-[9999] hover:bg-[#4527A0] hover:-translate-y-1.5"
            >
                <i className="fas fa-arrow-up"></i>
            </button>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scrollMove {
                    0% { opacity: 0; top: 10px; }
                    40% { opacity: 1; }
                    100% { opacity: 0; top: 30px; }
                }
                .top-right {
                    position: fixed !important;
                    top: 20px !important;
                    right: 20px !important;
                    left: auto !important;
                    bottom: auto !important;
                    width: auto !important;
                    z-index: 9999999;
                }
                .menu-container {
                    position: relative !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .menu-btn {
                    position: relative !important;
                }
                .menu-list {
                    position: absolute !important;
                    top: 75px !important;
                    right: 0 !important;
                }
                .menu-btn:active {
                    transform: scale(0.95);
                }
                .menu-btn::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0));
                    opacity: 0.8;
                }
                @keyframes menuItem {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .menu-list a {
                    animation: menuItem 0.35s ease both;
                }
                .menu-list a:nth-child(1) { animation-delay: 0.05s; }
                .menu-list a:nth-child(2) { animation-delay: 0.1s; }
                .menu-list a:nth-child(3) { animation-delay: 0.15s; }
                .menu-list a:nth-child(4) { animation-delay: 0.2s; }
                .menu-list a:nth-child(5) { animation-delay: 0.25s; }
                .menu-list a:nth-child(6) { animation-delay: 0.3s; }
            `}} />
        </>
    );
}

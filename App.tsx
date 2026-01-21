
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Calendar, Camera, UserPlus, Star, Heart, X, ChevronLeft, ChevronRight, ExternalLink, Navigation, Utensils } from 'lucide-react';
import FallingFlowers from './components/FallingFlowers';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';
import { Participant } from './types';

const App: React.FC = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    'https://lh3.googleusercontent.com/pw/AP1GczOiqsfVE4ii6jrG_yXCn_QJhytHKuPhxOMuyDEc2WulAetTqrvtN3cUObBzHL1d30yyFjOZrSqSEzlX6wNho2Igi3yJc2U6xURuIks5Ja-3MRNVGie9k2suRpa-42TExvufoTNx3pVdNT9aZU3XUIquIA=w708-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczMvWsChjfwWx4vD8jagNMbKlBd2MLR6OujdI7KK0DjD5UpzhlUcykzBy-q7htNvteJah9ghP7L8ZKtzuL91_VuXU4ZyuLEXKiK3AazuoP4L-uMixcK1oPVTl_dYuCRkJx1hRBQc1tqVtySGKRFtojbfcQ=w1260-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczNLgabpaTq5wAyjdhyB2p0k50RGiyf27q2jbpsj3KPAtydV2Cv-mgK1D2INPSZVzKk3-S46aau6dO9H5E1eLr0VRSRu_lESMbDXYEq1tJKE892-qqWmrecbj6JKLT8-Opyy0ETLhJRP2ulEaESoFH_xnA=w1260-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczOLAJYqcKVolU37u1JpVBVZJSo_yXby6V-aHDdzjd5WCTf5y5l7wL0BjitpOgAiNgCdPuTpDT3N1RN_cQEA6qWdlVXdcuJ9p2Niqp6u-apvSb4jH_j0gct5bc56vGjF7qY_AayqCm9efPkZ0XSGxZKmBA=w1680-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczObK04MYnD3EIhaW7uk6okdUdYFAqYfRaotHHCYN36ls63_HTniNNzMXd5NhxXUwmzeNy_104-oAsW7l0BSf2iwK4BQ_LepxoP_vdWENY7XjtRJ19VNJ1Vzj7lZ30QyExptjko9K31g_bC7h4K9EGzo0A=w1681-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczPghmJ6N9gW1TjJfLZlaB_BMZ7W2V1t1jrNjk-lZnVrkntQaFUQ5_0JCYWmcNM_ajoIClN94fvzjShNbl26v9nM5TMKKaKQAHwY3LShfeOoNMeX7ZoZeMGNrTajQ4AithjfTweajPZ2tDO02zfdqnixxw=w1260-h945-s-no-gm?authuser=0',
  ];

  const placeName = "Giang Ghẹ Tân Bình";
  const detailedAddress = "680 Đ. Trường Chinh, Phường 15, Tân Bình, Thành phố Hồ Chí Minh";
  const googleMapsUrl = "https://www.google.com/maps/place/Giang+Gh%E1%BA%B9+T%C3%A2n+B%C3%ACnh/@10.8060675,106.633694,17.45z/data=!4m15!1m8!3m7!1s0x3175295a2caa99fb:0x48634e3400189849!2zNjgwIMSQLiBUcsaw4budbmcgQ2hpbmgsIFBoxrDhu51uZyBUw6JuIELDrG5oLCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!3b1!8m2!3d10.8063285!4d106.6353962!16s%2Fg%2F11xvmgpq61!3m5!1s0x3175295a2caa9981:0x7ad5924d0883e3f7!8m2!3d10.8062351!4d106.6352005!16s%2Fg%2F11by_n85ss?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D";

  const handleOpenInvitation = () => {
    setIsTransitioning(true);
    // Chuyển sang trang chính nhanh hơn (0.5s)
    setTimeout(() => {
      setShowMainPage(true);
    }, 500);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  if (!showMainPage) {
    return (
      <div className={`h-screen w-full flex items-center justify-center transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100'}`}>
        <div className="fixed inset-0 bg-[url('https://lh3.googleusercontent.com/pw/AP1GczNHyg6kFvjOKI1GljBaPd-aoSU22yZbYSUj0CqVfuXmdDaROwqRQEBoLzPsprcvl7zK8pH-UPmJ1ovIpqXIKswT_8wfLorWnwCC70nwagGmXMr4BDbVZKe_x8PA8diFvX2oezUw4A3uUmajl_756ycugA=w1260-h945-s-no-gm?authuser=0')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <div className={`relative z-10 max-w-lg w-[90%] bg-white/95 p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-orange-200 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-90' : 'animate-fadeIn'}`}>
          <h1 className="font-dancing text-4xl md:text-5xl text-orange-600 font-bold mb-6">Hội Hủ Tiếu Kính Mời</h1>
          <div className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed">
            <p>Chào bạn thân mến,</p>
            <p>
              Hội Hủ Tiếu – nơi hủ tiếu là phụ, nhậu nhẹt là chính, tụ họp đúng hẹn mỗi tháng để ăn no, uống đã, đi chơi cho quên deadline và kể chuyện đời cho tới khuya.
            </p>
            <p className="font-semibold text-orange-500 italic">"Ăn ngon, chơi vui, tình anh em bền chặt!"</p>
          </div>
          <button
            onClick={handleOpenInvitation}
            className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            Mở Thiệp Tham Gia <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen animate-pageEnter`}>
      <FallingFlowers />
      <MusicPlayer />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczNHyg6kFvjOKI1GljBaPd-aoSU22yZbYSUj0CqVfuXmdDaROwqRQEBoLzPsprcvl7zK8pH-UPmJ1ovIpqXIKswT_8wfLorWnwCC70nwagGmXMr4BDbVZKe_x8PA8diFvX2oezUw4A3uUmajl_756ycugA=w1260-h945-s-no-gm?authuser=0" 
            alt="Group Gathering" 
            className="w-full h-full object-cover scale-105 animate-slowZoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-orange-50/100"></div>
        </div>
        
        <div className="relative z-10 px-4">
          <h2 className="text-white text-xl md:text-2xl uppercase tracking-[0.3em] font-medium mb-4 drop-shadow-md animate-slideUp">Chào mừng đến với</h2>
          <h1 className="font-pacifico text-7xl md:text-9xl text-white mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-float animate-slideUp [animation-delay:200ms]">
            Hội Hủ Tiếu
          </h1>
          <button
            onClick={scrollToForm}
            className="bg-white text-orange-600 hover:bg-orange-600 hover:text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-2 mx-auto animate-slideUp [animation-delay:400ms]"
          >
            Đăng Ký Tham Gia <Star fill="currentColor" size={20} />
          </button>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-400 to-red-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <Calendar size={60} className="mx-auto mb-6 text-white/80" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-dancing">Sự Kiện Đặc Biệt</h2>
          <p className="text-2xl md:text-3xl font-light mb-12 opacity-90">Hẹn gặp bạn vào: <span className="font-bold border-b-2 border-white/50">31 Tháng 01, 2026</span></p>
          <Countdown />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-12">
            <div className="w-full md:w-1/2 reveal-on-scroll flex flex-col justify-center">
              <div className="flex items-center gap-3 text-orange-600 mb-4">
                <MapPin size={32} />
                <h2 className="text-3xl md:text-4xl font-bold">Địa Điểm Họp Mặt</h2>
              </div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Buổi tiệc sẽ diễn ra tại nhà hàng hải sản nổi tiếng, với không gian ấm cúng. 
                Vui lòng xem kỹ bản đồ và địa chỉ chi tiết bên dưới để tới đúng chỗ nhé!
              </p>
              
              <div className="bg-orange-50 p-8 rounded-3xl border-l-8 border-orange-400 shadow-md transition-all hover:shadow-lg">
                <p className="text-orange-600 font-bold mb-2 flex items-center gap-2 text-xl">
                  <Utensils size={24} /> {placeName}
                </p>
                <div className="mb-6">
                  <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Địa chỉ chi tiết:</p>
                  <p className="text-gray-700 text-xl font-medium leading-snug">{detailedAddress}</p>
                </div>
                
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-700 transition-colors group"
                >
                  Dẫn đường qua Google Maps <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-100 reveal-on-scroll delay-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123405703952!2d106.63261!3d10.806235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295a2caa9981%3A0x7ad5924d0883e3f7!2zR2lhbmcgR2jhu4UgVMOibiBCw6xuaA!5e0!3m2!1svi!2s!4v1715424859000!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto text-center">
          <Camera size={60} className="mx-auto mb-6 text-orange-500" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-dancing text-orange-600">Những Kỷ Niệm Đẹp</h2>
          <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">Nhấn vào từng hình ảnh để xem lại những giây phút tuyệt vời nhất của Hội chúng mình nhé!</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-3xl shadow-lg aspect-[4/3] cursor-pointer reveal-on-scroll"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => openLightbox(idx)}
              >
                <img 
                  src={src} 
                  alt={`Memory ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-orange-600 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                    <Star fill="currentColor" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fadeIn"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-[110]" onClick={closeLightbox}>
            <X size={40} />
          </button>
          <button className="absolute left-4 md:left-10 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full z-[110]" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] select-none" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[selectedImageIndex]} 
              alt="Memory" 
              className="w-full h-full object-contain rounded-lg shadow-2xl animate-scaleIn"
            />
          </div>
          <button className="absolute right-4 md:right-10 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full z-[110]" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}

      {/* Registration Section */}
      <section ref={formRef} className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-[3rem] shadow-2xl p-10 md:p-16 border border-orange-100">
            <div className="text-center mb-12">
              <UserPlus size={48} className="mx-auto mb-4 text-orange-600" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-dancing">Ghi Danh Tham Dự</h2>
              <p className="text-gray-600">Xác nhận sự hiện diện của bạn để chúng mình chuẩn bị tốt nhất nhé!</p>
            </div>

            {formSuccess ? (
              <div className="text-center py-12 animate-bounce text-green-600">
                <h3 className="text-3xl font-bold mb-4">Đăng Ký Thành Công! 🎉</h3>
                <p className="text-gray-600">Hẹn sớm gặp lại bạn!</p>
              </div>
            ) : (
              <form onSubmit={handleRegistration} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Họ và Tên</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/30" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Số Điện Thoại</label>
                    <input type="tel" required className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/30" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:bg-orange-700 active:scale-95 transition-all">
                  {isSubmitting ? 'Đang gửi...' : 'Xác Nhận Tham Gia'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white text-center">
        <h2 className="font-pacifico text-3xl mb-4 text-orange-400">Hội Hủ Tiếu</h2>
        <p className="text-gray-500 text-sm">&copy; 2024 Hội Hủ Tiếu Sài Gòn. Chúc bạn một ngày tốt lành!</p>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pageEnter { 
          from { opacity: 0; transform: scale(1.05); } 
          to { opacity: 1; transform: scale(1); } 
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-pageEnter { animation: pageEnter 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slowZoom { animation: slowZoom 15s linear infinite alternate; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        
        .reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal-on-scroll.active { opacity: 1; transform: translateY(0); }
      `}</style>
      <ScrollTracker />
    </div>
  );
};

const ScrollTracker: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return null;
};

export default App;

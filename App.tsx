
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Calendar, Camera, UserPlus, Star, Heart, X, ChevronLeft, ChevronRight, Navigation, Utensils } from 'lucide-react';
import FallingFlowers from './components/FallingFlowers';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';

const App: React.FC = () => {
  const [showMainPage, setShowMainPage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    'https://lh3.googleusercontent.com/pw/AP1GczOiqsfVE4ii6jrG_yXCn_QJhytHKuPhxOMuyDEc2WulAetTqrvtN3cUObBzHL1d30yyFjOZrSqSEzlX6wNho2Igi3yJc2U6xURuIks5Ja-3MRNVGie9k2suRpa-42TExvufoTNx3pVdNT9aZU3XUIquIA=w1600-h1200-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczMvWsChjfwWx4vD8jagNMbKlBd2MLR6OujdI7KK0DjD5UpzhlUcykzBy-q7htNvteJah9ghP7L8ZKtzuL91_VuXU4ZyuLEXKiK3AazuoP4L-uMixcK1oPVTl_dYuCRkJx1hRBQc1tqVtySGKRFtojbfcQ=w1600-h1200-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczNLgabpaTq5wAyjdhyB2p0k50RGiyf27q2jbpsj3KPAtydV2Cv-mgK1D2INPSZVzKk3-S46aau6dO9H5E1eLr0VRSRu_lESMbDXYEq1tJKE892-qqWmrecbj6JKLT8-Opyy0ETLhJRP2ulEaESoFH_xnA=w1600-h1200-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczOLAJYqcKVolU37u1JpVBVZJSo_yXby6V-aHDdzjd5WCTf5y5l7wL0BjitpOgAiNgCdPuTpDT3N1RN_cQEA6qWdlVXdcuJ9p2Niqp6u-apvSb4jH_j0gct5bc56vGjF7qY_AayqCm9efPkZ0XSGxZKmBA=w1680-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczM8lAzAfIF9CT3VABLRogO_t90fmmefED_EqEA34MgmQNQ-1vxQ3zS-1LKUyGQ34xk_gU4K2vkCIuKWVCri0Dwz4_0GBMLpiI9aKpEvA4o9Cl0Y2XrDTtHEMhHu_WRZ6XkRjqSW-8uRTAUc3r38RCpdTA=w1040-h780-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczPghmJ6N9gW1TjJfLZlaB_BMZ7W2V1t1jrNjk-lZnVrkntQaFUQ5_0JCYWmcNM_ajoIClN94fvzjShNbl26v9nM5TMKKaKQAHwY3LShfeOoNMeX7ZoZeMGNrTajQ4AithjfTweajPZ2tDO02zfdqnixxw=w1600-h1200-s-no-gm?authuser=0',
  ];

  const placeName = "Quán Đường phố";
  const detailedAddress = "1191 Hoàng Sa, phường tân sơn nhất, Thành phố Hồ Chí Minh";
  const googleMapsUrl = "https://www.google.com/maps/place/Qu%C3%A1n+%C4%90%C6%B0%E1%BB%9Dng+ph%E1%BB%91/@10.7904613,106.6627405,17z/data=!3m1!4b1!4m6!3m5!1s0x31752ed2ae036151:0xd8f668ef77b005b1!8m2!3d10.790456!4d106.6653154!16s%2Fg%2F1hc3zpv3x?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D";

  const handleOpenInvitation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowMainPage(true);
    }, 500);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      wish: '', 
    };

    try {
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRMqR1u-r7EVaHCGTQzL7U0coTDYnh0T0mAmLsqAYEH47-enhMukiu_i0c7JhyGB4Ang/exec"; 

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 8000);
    } catch (error) {
      console.error("Lỗi gửi form:", error);
      setIsSubmitting(false);
      alert("Đã có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại!");
    }
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
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
      <div className={`fixed inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/pw/AP1GczNHyg6kFvjOKI1GljBaPd-aoSU22yZbYSUj0CqVfuXmdDaROwqRQEBoLzPsprcvl7zK8pH-UPmJ1ovIpqXIKswT_8wfLorWnwCC70nwagGmXMr4BDbVZKe_x8PA8diFvX2oezUw4A3uUmajl_756ycugA=w1260-h945-s-no-gm?authuser=0')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className={`relative z-10 max-w-lg w-[90%] bg-white/95 p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-orange-200 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-90' : 'animate-fadeIn'}`}>
          <h1 className="font-dancing text-4xl md:text-5xl text-orange-600 font-bold mb-6">Hội Hủ Tiếu Kính Mời</h1>
          <div className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed">
            <p>Chào bạn thân mến,</p>
            <p>
              Hội Hủ Tiếu – nơi hủ tiếu là phụ, nhậu nhẹt là chính, tụ họp đúng hẹn mỗi tháng để ăn no, uống đã, kể chuyện đời cho tới khuya.
            </p>
            <p className="font-semibold text-orange-500 italic">"Ăn ngon, chơi vui, tình anh em bền chặt!"</p>
          </div>
          <button
            onClick={handleOpenInvitation}
            className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 md:py-4 px-10 rounded-3xl md:rounded-full text-xl shadow-lg transform transition hover:scale-105 active:scale-95 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center leading-tight">
              <span>Mở Thiệp</span>
              <span className="md:ml-2">Tham Gia</span>
            </div>
            <ChevronDown size={28} className="animate-bounce mt-1 md:mt-0" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <FallingFlowers />
      <MusicPlayer autoPlay={showMainPage} />

      <div className="relative min-h-screen bg-orange-50 overflow-x-hidden">
        <div className="animate-pageEnter">
          <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczNHyg6kFvjOKI1GljBaPd-aoSU22yZbYSUj0CqVfuXmdDaROwqRQEBoLzPsprcvl7zK8pH-UPmJ1ovIpqXIKswT_8wfLorWnwCC70nwagGmXMr4BDbVZKe_x8PA8diFvX2oezUw4A3uUmajl_756ycugA=w1260-h945-s-no-gm?authuser=0" 
                alt="Group Gathering" 
                className="w-full h-full object-cover scale-105 animate-slowZoom"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-orange-50/100"></div>
            </div>
            
            <div className="relative z-10 px-4 flex flex-col items-center">
              <h2 className="text-white text-xl md:text-2xl uppercase tracking-[0.3em] font-medium mb-4 drop-shadow-md animate-slideUp">Chào mừng đến với</h2>
              <h1 className="font-pacifico text-7xl md:text-9xl text-white mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-float animate-slideUp [animation-delay:200ms]">
                Hội Hủ Tiếu
              </h1>
              
              <div className="flex justify-center gap-2 md:gap-4 mb-10 animate-slideUp [animation-delay:350ms]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    size={28} 
                    fill="#fbbf24" 
                    className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-star-twinkle" 
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>

              <button
                onClick={scrollToForm}
                className="bg-white text-orange-600 hover:bg-orange-600 hover:text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-2 mx-auto animate-slideUp [animation-delay:500ms]"
              >
                Đăng Ký Tham Gia <Star fill="currentColor" size={20} />
              </button>
            </div>
          </section>

          <section className="py-24 px-6 bg-gradient-to-br from-orange-400 to-red-500 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10 text-white px-2">
              <Calendar size={60} className="mx-auto mb-6 text-white/80" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-dancing">Sự Kiện Đặc Biệt</h2>
              <p className="text-2xl md:text-3xl font-light mb-12 opacity-90 leading-snug">
                Hẹn gặp lại bạn vào: <br className="block md:hidden" />
                <span className="font-bold border-b-2 border-white/50 inline-block mt-2 md:mt-0">31 tháng 01. 2026</span>
              </p>
              <Countdown />
            </div>
          </section>

          <section className="py-24 px-6 bg-white relative">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
                    <MapPin size={20} /> Địa Điểm Tụ Họp
                  </div>
                  <h2 className="text-4xl md:text-5xl font-dancing font-bold text-gray-900 leading-tight animate-softFloat drop-shadow-sm">
                    {placeName}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">{detailedAddress}</p>
                  <div className="pt-6">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-orange-100 text-orange-600 font-bold py-4 px-8 rounded-2xl hover:bg-orange-200 transition-colors w-full justify-center md:w-auto">
                      <Navigation size={20} /> Xem Trên Google Maps
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-orange-50">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2638367527663!2d106.6627405!3d10.7904613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2ae036151%3A0xd8f668ef77b005b1!2zUXXDoW4gxJDGsOG7nW5nIHBo4buR!5e0!3m2!1svi!2s!4v1737600000000!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-orange-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <Camera size={48} className="mx-auto text-orange-400" />
                <h2 className="text-4xl md:text-5xl font-bold font-dancing text-gray-800">Kỷ Niệm Của Chúng Ta</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {galleryImages.map((src, index) => (
                  <button key={index} onClick={() => openLightbox(index)} className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer shadow-lg transform transition-all duration-500 hover:scale-[1.02] block w-full p-0 border-none appearance-none bg-gray-200">
                    <img src={src} alt={`Kỷ niệm ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <Heart className="text-white fill-white" size={40} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section ref={formRef} className="py-24 px-6 bg-white">
            <div className="max-w-xl mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(255,140,66,0.2)] p-8 md:p-12 border border-orange-100">
              <div className="text-center mb-10">
                <UserPlus size={48} className="mx-auto text-orange-500 mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Tham Gia Ngay</h2>
                <p className="text-gray-500">Vui lòng để lại thông tin để Hội sắp xếp chu đáo nhất!</p>
              </div>
              {formSuccess ? (
                <div className="text-center py-10 animate-fadeIn">
                  <div className="relative inline-block">
                    <Heart fill="#f97316" size={80} className="mx-auto mb-6 text-orange-500 animate-pulse" />
                    <Star size={24} fill="#fbbf24" className="absolute -top-2 -right-2 text-amber-400 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Đăng Ký Thành Công!</h3>
                  <p className="text-gray-600 mt-2">Cảm ơn bạn, Hội đã nhận được thông tin. Hẹn sớm gặp lại bạn!</p>
                </div>
              ) : (
                <form onSubmit={handleRegistration} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2">Tên của bạn</label>
                    <input 
                      name="name" 
                      required 
                      type="text" 
                      placeholder="Ví dụ: Nguyễn Anh Đen" 
                      title="Ví dụ: Nguyễn Anh Đen"
                      className="w-full bg-orange-50/50 border-2 border-orange-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2">Số điện thoại</label>
                    <input 
                      name="phone" 
                      required 
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                      placeholder="Ví dụ: 0901234567" 
                      className="w-full bg-orange-50/50 border-2 border-orange-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-all" 
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-5 rounded-2xl text-xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform hover:shadow-orange-200 hover:shadow-2xl">
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang gửi thông tin...</span>
                      </div>
                    ) : "Xác Nhận Tham Gia"}
                  </button>
                </form>
              )}
            </div>
          </section>

          <footer className="py-16 bg-gray-900 text-white text-center">
            <h2 className="font-pacifico text-4xl mb-4 text-orange-400">Hội Hủ Tiếu</h2>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star 
                  key={i} 
                  size={20} 
                  fill="#fbbf24" 
                  className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-star-twinkle cursor-pointer hover:scale-125 transition-transform" 
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>

            <p className="text-gray-500 text-sm tracking-widest uppercase">&copy; 2026 - Hội Hủ Tiếu Group. Made with ❤️</p>
          </footer>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center animate-fadeIn select-none overflow-hidden" 
          onClick={closeLightbox}
          role="dialog"
        >
          <button 
            className="absolute top-6 right-6 z-[10001] text-white/80 hover:text-white bg-black/40 p-4 rounded-full transition-all active:scale-90 shadow-2xl" 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-[90%] md:max-w-4xl lg:max-w-5xl w-full flex flex-col items-center justify-center animate-imageAppear p-2"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative bg-white p-2 rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.7)] group">
              <img 
                key={selectedImageIndex}
                src={galleryImages[selectedImageIndex]} 
                className="max-w-full max-h-[75vh] md:max-h-[80vh] w-auto h-auto rounded-lg object-contain"
                alt="Kỷ niệm"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block" onClick={prevImage}><ChevronLeft size={32} /></button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block" onClick={nextImage}><ChevronRight size={32} /></button>
            </div>

            <div className="mt-6 flex items-center justify-between w-full px-4 text-white md:max-w-md mx-auto">
              <button onClick={prevImage} className="md:hidden bg-white/20 p-3 rounded-full active:scale-90"><ChevronLeft size={24} /></button>
              <div className="text-sm font-bold tracking-[0.3em] bg-black/40 px-8 py-2 rounded-full border border-white/20">{selectedImageIndex + 1} / {galleryImages.length}</div>
              <button onClick={nextImage} className="md:hidden bg-white/20 p-3 rounded-full active:scale-90"><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes imageAppear { 
          from { opacity: 0; transform: scale(0.9) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        @keyframes pageEnter { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.7; transform: scale(1); filter: brightness(1); }
          50% { opacity: 1; transform: scale(1.3); filter: brightness(1.4); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-imageAppear { animation: imageAppear 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-pageEnter { animation: pageEnter 1s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-softFloat { animation: softFloat 3s ease-in-out infinite; }
        .animate-slowZoom { animation: slowZoom 20s linear infinite alternate; }
        .animate-star-twinkle { animation: starTwinkle 2.5s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default App;

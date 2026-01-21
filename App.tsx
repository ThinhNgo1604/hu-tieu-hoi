
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
    'https://lh3.googleusercontent.com/pw/AP1GczObK04MYnD3EIhaW7uk6okdUdYFAqYfRaotHHCYN36ls63_HTniNNzMXd5NhxXUwmzeNy_104-oAsW7l0BSf2iwK4BQ_LepxoP_vdWENY7XjtRJ19VNJ1Vzj7lZ30QyExptjko9K31g_bC7h4K9EGzo0A=w1681-h945-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczPghmJ6N9gW1TjJfLZlaB_BMZ7W2V1t1jrNjk-lZnVrkntQaFUQ5_0JCYWmcNM_ajoIClN94fvzjShNbl26v9nM5TMKKaKQAHwY3LShfeOoNMeX7ZoZeMGNrTajQ4AithjfTweajPZ2tDO02zfdqnixxw=w1600-h1200-s-no-gm?authuser=0',
  ];

  const placeName = "Giang Ghẹ Tân Bình";
  const detailedAddress = "680 Đ. Trường Chinh, Phường 15, Tân Bình, Thành phố Hồ Chí Minh";
  const googleMapsUrl = "https://www.google.com/maps/place/Giang+Gh%E1%BA%B9+T%C3%A2n+B%C3%ACnh/@10.8060675,106.633694,17.45z/data=!4m15!1m8!3m7!1s0x3175295a2caa99fb:0x48634e3400189849!2zNjgwIMSQLiBUcsaw4budbmcgQ2hpbmgsIFBoxrDhu51uZyBUw6JuIELDrG5oLCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!3b1!8m2!3d10.8063285!4d106.6353962!16s%2Fg%2F11xvmgpq61!3m5!1s0x3175295a2caa9981:0x7ad5924d0883e3f7!8m2!3d10.8062351!4d106.6352005!16s%2Fg%2F11by_n85ss?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D";

  const handleOpenInvitation = () => {
    setIsTransitioning(true);
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
          <p className="mt-8 text-lg italic opacity-80">"Mọi sự chờ đợi đều xứng đáng khi chúng ta gặp lại nhau!"</p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm">
                <MapPin size={20} /> Địa Điểm Tụ Họp
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {placeName}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {detailedAddress}
              </p>
              <div className="pt-6 space-y-4">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-orange-100 text-orange-600 font-bold py-4 px-8 rounded-2xl hover:bg-orange-200 transition-colors w-full justify-center md:w-auto"
                >
                  <Navigation size={20} /> Xem Trên Google Maps
                </a>
                <div className="flex items-center gap-4 text-gray-500 text-sm italic">
                  <Utensils size={18} /> Đồ ăn ngon, hải sản tươi sống và không gian cực chill!
                </div>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-orange-50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.167236545759!2d106.6326255757362!3d10.8062350893441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295a2caa9981%3A0x7ad5924d0883e3f7!2sGiang%20Gh%E1%BA%B9%20T%C3%A2n%20B%C3%ACnh!5e0!3m2!1svi!2s!4v1705300000000!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Camera size={48} className="mx-auto text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-bold font-dancing text-gray-800">Kỷ Niệm Của Chúng Ta</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Những khoảnh khắc đáng nhớ của Hội Hủ Tiếu qua các năm tháng gắn bó.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((src, index) => (
              <div 
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1"
              >
                <img src={src} alt={`Kỷ niệm ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <Heart className="text-white fill-white animate-pulse" size={40} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section ref={formRef} className="py-24 px-6 bg-white">
        <div className="max-w-xl mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(255,140,66,0.2)] p-8 md:p-12 border border-orange-100">
          <div className="text-center mb-10">
            <UserPlus size={48} className="mx-auto text-orange-500 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Tham Gia Ngay</h2>
            <p className="text-gray-500">Xác nhận sự có mặt của bạn để chúng mình chuẩn bị chu đáo nhất nhé!</p>
          </div>

          {formSuccess ? (
            <div className="text-center py-10 animate-fadeIn">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart fill="currentColor" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Đăng Ký Thành Công!</h3>
              <p className="text-gray-500">Cảm ơn bạn, Hội Hủ Tiếu rất mong chờ sự góp mặt của bạn.</p>
            </div>
          ) : (
            <form onSubmit={handleRegistration} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">Họ và Tên</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full bg-orange-50/50 border-2 border-orange-100 focus:border-orange-400 focus:ring-0 rounded-2xl py-4 px-6 transition-all text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">Số Điện Thoại</label>
                <input 
                  required
                  type="tel" 
                  placeholder="Để tụi mình liên lạc khi cần..."
                  className="w-full bg-orange-50/50 border-2 border-orange-100 focus:border-orange-400 focus:ring-0 rounded-2xl py-4 px-6 transition-all text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-wider">Ghi Chú (Nếu có)</label>
                <textarea 
                  placeholder="Lời nhắn nhủ hoặc món bạn muốn ăn..."
                  rows={3}
                  className="w-full bg-orange-50/50 border-2 border-orange-100 focus:border-orange-400 focus:ring-0 rounded-2xl py-4 px-6 transition-all text-lg resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-5 rounded-2xl text-xl shadow-xl hover:shadow-orange-200 transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Xác Nhận Tham Gia <Heart size={24} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-pacifico text-4xl mb-6 text-orange-400">Hội Hủ Tiếu</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed text-lg italic">
            "Không quan trọng chúng ta đi đâu, quan trọng là chúng ta đi cùng nhau."
          </p>
          <div className="flex justify-center gap-6 mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500/20 transition-colors cursor-pointer border border-white/10">
                <Star size={20} className="text-orange-400" />
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm tracking-widest uppercase">&copy; 2024 Hội Hủ Tiếu Sài Gòn. Made with ❤️</p>
        </div>
      </footer>

      {/* Lightbox / Image Preview Overlay */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn select-none" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full shadow-lg" 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            title="Đóng (Esc)"
          >
            <X size={28} />
          </button>
          
          {/* Previous Button */}
          <button 
            className="absolute left-2 md:left-10 z-[110] text-white/60 hover:text-white transition-all p-4 md:p-6 bg-white/5 hover:bg-white/15 rounded-full group"
            onClick={prevImage}
            title="Ảnh trước (Left Arrow)"
          >
            <ChevronLeft size={48} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          {/* Image Container */}
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-16" 
            onClick={e => e.stopPropagation()}
          >
            <div className="relative max-w-full max-h-full flex flex-col items-center justify-center gap-4">
              <img 
                key={selectedImageIndex}
                src={galleryImages[selectedImageIndex]} 
                className="max-w-full max-h-[75vh] md:max-h-[85vh] w-auto h-auto rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] object-contain animate-imageAppear border-2 border-white/10"
                alt={`Kỷ niệm ${selectedImageIndex + 1}`}
                onContextMenu={(e) => e.preventDefault()}
              />
              
              {/* Pagination Info */}
              <div className="bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white font-medium tracking-[0.2em] shadow-lg flex items-center gap-3">
                <span className="text-orange-400 font-bold">{selectedImageIndex + 1}</span>
                <span className="opacity-30">/</span>
                <span className="opacity-80">{galleryImages.length}</span>
              </div>
            </div>
          </div>
          
          {/* Next Button */}
          <button 
            className="absolute right-2 md:right-10 z-[110] text-white/60 hover:text-white transition-all p-4 md:p-6 bg-white/5 hover:bg-white/15 rounded-full group"
            onClick={nextImage}
            title="Ảnh sau (Right Arrow)"
          >
            <ChevronRight size={48} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes imageAppear { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes pageEnter { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-imageAppear { animation: imageAppear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-pageEnter { animation: pageEnter 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slowZoom { animation: slowZoom 20s linear infinite alternate; }

        /* Lightbox visual polish */
        button { outline: none !important; }
        img { image-rendering: -webkit-optimize-contrast; }
      `}</style>
    </div>
  );
};

export default App;

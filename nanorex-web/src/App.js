import React, { useState, useEffect } from 'react';
import { 
    Award as AwardIcon, Shield, ShoppingCart, 
    X, Menu, ChevronDown, Zap, DollarSign, Star, 
    ExternalLink, Activity, BookOpen, Clock, ArrowRight,
    Gauge, Thermometer, Droplets, Wrench, Users, FileText, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- [ 1. Reusable UI Components ] ---
const Card = ({ className = '', children, bgWhite = false, ...props }) => (
    <div className={`border rounded-xl flex-shrink-0 snap-center ${
        bgWhite ? 'bg-white text-gray-900 border-gray-200 shadow-lg' : 'bg-[#1a1a1a] text-white border-[#2a2a2a] shadow-md'
    } ${className}`} {...props}>
        {children}
    </div>
);

const Badge = ({ className = '', children, ...props }) => (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`} {...props}>
        {children}
    </span>
);

const Button = ({ className = '', children, as = 'button', ...props }) => {
    const Tag = as; 
    return (
        <Tag className={`inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer ${className}`} {...props}>
            {children}
        </Tag>
    );
};

const AmazonButton = ({ asin = "nanorex", className = "", children }) => (
    <Button as="a" href={`https://www.amazon.com/s?k=${asin}`} target="_blank" rel="noopener noreferrer" className={`bg-[#ff9900] hover:bg-[#ff9900]/90 text-black ${className}`}>
        {children || <><ShoppingCart className="w-5 h-5 mr-2" />Buy on Amazon</>}
    </Button>
);

const GradientText = ({ children }) => <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-transparent bg-clip-text">{children}</span>;
const LogoGradientText = ({ children }) => <span className="bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">{children}</span>;

// --- [ 2. Header ] ---
const Header = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = [
        { name: "Home", page: "Home" },
        { name: "Products", page: "Home", anchor: "#products" },
        { name: "How It Works", page: "Home", anchor: "#how-it-works" },
        { name: "Science Base", page: "Science" },
        { name: "Proven Credibility", page: "Credibility" },
        { name: "FAQ", page: "Home", anchor: "#faq" },
    ];

    const handleNavigate = (page, anchor) => {
        navigate(page);
        if (anchor) setTimeout(() => document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' }), 100);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
                <div className="text-2xl font-black text-white cursor-pointer" onClick={() => handleNavigate('Home')}>
                    Nano<LogoGradientText>Rex</LogoGradientText>
                </div>
                <div className="hidden md:flex items-center space-x-5">
                    {links.map((link) => (
                        <button key={link.name} onClick={() => handleNavigate(link.page, link.anchor)} className="text-gray-300 hover:text-white transition-colors font-semibold text-sm tracking-tight">
                            {link.name}
                        </button>
                    ))}
                    <AmazonButton className="!text-xs !px-3 !py-1.5" />
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0a0a0a] border-t border-[#2a2a2a]">
                        <div className="flex flex-col px-6 py-4 space-y-4">
                            {links.map((link) => (
                                <button key={link.name} onClick={() => handleNavigate(link.page, link.anchor)} className="text-gray-300 hover:text-white text-left font-semibold">
                                    {link.name}
                                </button>
                            ))}
                            <AmazonButton className="w-full" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// --- [ 3. Hero & Static Trust Banner ] ---
const TrustBanner = () => (
    <div className="bg-[#111] border-y border-[#2a2a2a] py-4 w-full">
        <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm md:text-base text-gray-400 font-bold">
            <span className="flex items-center"><AwardIcon className="w-5 h-5 mr-2 text-[#ff9900]" /> Supplies Products to Hyundai & Kia</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="flex items-center"><AwardIcon className="w-5 h-5 mr-2 text-[#3b82f6]" /> 1,309km Drive Without Oil Certified</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="flex items-center"><Shield className="w-5 h-5 mr-2 text-green-500" /> Safe for All Internal Combustion Engines</span>
        </div>
    </div>
);

const Hero = () => {
    return (
        <section id="home" className="relative text-white pt-24 overflow-hidden min-h-[90vh] flex flex-col justify-between">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a]/80 z-20"></div>
            
            <div className="container mx-auto px-6 relative z-30 max-w-7xl pt-8 md:pt-20 flex-grow flex flex-col md:flex-row items-center justify-between">
                
                {/* 텍스트 영역 */}
                <div className="w-full md:w-[55%] text-left z-40">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">Fuel the <GradientText>Difference</GradientText></h1>
                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10 max-w-xl">
                            Experience maximum engine performance and protection with our advanced Nano Carbon Crystal technology.
                        </p>
                        <AmazonButton className="!text-xl !px-12 !py-6 w-full sm:w-auto shadow-2xl" />
                    </motion.div>
                </div>

                {/* 병 이미지 영역 (단위 통일: px 기반 절대 좌표계 적용) */}
                <div className="w-full md:w-[45%] h-[50vh] md:h-[70vh] relative mt-12 md:mt-0 flex justify-center items-center z-10">
                    {/* Thunder (뒤쪽 기준점: 우측에서 150px) */}
                    <motion.img 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.1 }} 
                        src="/images/bt_0010_Thunder.png" 
                        alt="Thunder" 
                        className="absolute right-[20px] md:right-[150px] top-0 h-[85%] md:h-[95%] object-contain z-10 drop-shadow-2xl opacity-90" 
                    />
                    {/* Volt (Thunder 기준 400px 이격: 150px + 400px = 550px) */}
                    <motion.img 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.3 }} 
                        src="/images/bt_0011_Volt.png" 
                        alt="Volt" 
                        className="absolute right-[150px] md:right-[280px] bottom-[10%] md:bottom-0 h-[75%] md:h-[85%] object-contain z-20 drop-shadow-2xl" 
                    />
                </div>
            </div>
            
            <div className="relative z-30 w-full">
                <TrustBanner />
            </div>
        </section>
    );
};

// --- [ 4. Fuel Savings Estimator ] ---
const FuelSavingsEstimator = () => {
    const [vehicleType, setVehicleType] = useState('Sedan');
    const [mileage, setMileage] = useState('1200'); 
    const [mpg, setMpg] = useState('25'); 
    const [gasPrice, setGasPrice] = useState('3.98');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateSavings = (e) => {
        e.preventDefault();
        setIsLoading(true); setResponse(''); setError('');
        const monthlyMiles = parseInt(mileage); const currentMPG = parseInt(mpg); const currentGasPrice = parseFloat(gasPrice);
        if (!monthlyMiles || !currentMPG || !currentGasPrice || monthlyMiles <= 0) {
            setError("Please enter valid positive numbers."); setIsLoading(false); return;
        }
        const improvementRate = 0.09;
        const currentCost = (monthlyMiles / currentMPG) * currentGasPrice;
        const newCost = (monthlyMiles / (currentMPG * (1 + improvementRate))) * currentGasPrice;
        const monthlySavings = (currentCost - newCost).toFixed(2);
        
        setTimeout(() => {
            setResponse(`
                <p>Based on your input, here's your estimated ROI:</p>
                <div class="mt-4 flex flex-col items-center">
                    <p class="text-gray-400 font-semibold mb-1">Monthly Savings</p>
                    <h3 class="text-6xl font-black text-[#ff9900] mb-4">$${monthlySavings}</h3>
                    <p class="text-xl font-bold text-green-400">Annual Savings: $${(monthlySavings * 12).toFixed(2)}</p>
                    <p class="text-sm text-gray-500 mt-4">Based on 9% average efficiency improvement</p>
                </div>
            `);
            setIsLoading(false);
        }, 500); 
    };

    return (
        <section id="savings-estimator" className="py-24 bg-[#0f0f0f]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="w-full lg:w-1/2">
                        <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4">ROI CALCULATOR</Badge>
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Estimate Your <GradientText>Savings</GradientText></h2>
                        <p className="text-lg text-gray-400 mb-8">Enter your local gas price and driving habits to see your potential net return.</p>
                        
                        <form onSubmit={calculateSavings} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm text-gray-400 font-semibold mb-1">Vehicle Type</label><select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-white"><option>Sedan</option><option>SUV</option><option>Truck</option></select></div>
                                <div><label className="block text-sm text-gray-400 font-semibold mb-1">Gas Price ($/gal)</label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 absolute left-3 top-4 text-gray-500" />
                                        <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 pl-9 text-white" />
                                    </div>
                                </div>
                                <div><label className="block text-sm text-gray-400 font-semibold mb-1">Monthly Miles</label><input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-white" /></div>
                                <div><label className="block text-sm text-gray-400 font-semibold mb-1">Current MPG</label><input type="number" value={mpg} onChange={(e) => setMpg(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 text-white" /></div>
                            </div>
                            <Button type="submit" className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white w-full !mt-6" disabled={isLoading}>{isLoading ? "Calculating..." : <><Zap className="w-5 h-5 mr-2" /> Calculate My ROI</>}</Button>
                        </form>
                    </div>
                    
                    <div className="w-full lg:w-1/2">
                        <Card className="p-8 min-h-[350px] flex flex-col justify-center border-[#3b82f6]/30 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                            {error && <p className="text-red-400 text-center">{error}</p>}
                            {response ? <div className="text-gray-300 text-center" dangerouslySetInnerHTML={{ __html: response }} /> : <div className="text-gray-500 text-center flex flex-col items-center"><Zap className="w-12 h-12 mb-4 opacity-50"/>Your personalized ROI will appear here.</div>}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- [ 5. Products ] ---
const Products = () => (
    <section id="products" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Choose Your <GradientText>Formula</GradientText></h2>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 md:grid md:grid-cols-2 md:overflow-visible custom-scrollbar justify-items-center">
                {/* Volt */}
                <Card className="p-10 text-center w-[85vw] md:w-full max-w-lg flex flex-col group bg-white border border-gray-200 shadow-2xl relative overflow-hidden" bgWhite={true}>
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                    <img src="/images/bx_0011_Volt.jpg" alt="Volt" className="h-56 md:h-72 object-contain mx-auto mb-8 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <h3 className="text-4xl font-black mb-3 text-black">Nano<span className="text-red-600">Rex</span> Volt</h3> 
                    <Badge className="bg-blue-100 text-blue-700 mb-4 px-4 py-2 font-bold tracking-wide">SEDANS & COMPACT CARS</Badge>
                    <p className="text-gray-600 mb-8 flex-grow text-lg">Optimized for daily sedans, compacts, and hybrid engines. <strong className="text-black">Treats up to 5L (5.3 Quarts) of oil.</strong></p>
                    <AmazonButton asin="nanorex-volt" className="w-full !py-4 !text-lg shadow-xl" />
                </Card>
                
                {/* Thunder */}
                <Card className="p-10 text-center w-[85vw] md:w-full max-w-lg flex flex-col group bg-white border border-gray-200 shadow-2xl relative overflow-hidden" bgWhite={true}>
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
                    <img src="/images/bx_0010_Thunder.jpg" alt="Thunder" className="h-56 md:h-72 object-contain mx-auto mb-8 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <h3 className="text-4xl font-black mb-3 text-black">Nano<span className="text-red-600">Rex</span> Thunder</h3>
                    <Badge className="bg-red-100 text-red-700 mb-4 px-4 py-2 font-bold tracking-wide">SUVS, TRUCKS & DIESEL</Badge>
                    <p className="text-gray-600 mb-8 flex-grow text-lg">Optimized for larger engines, towing, and high loads. <strong className="text-black">Treats up to 8L (8.5 Quarts) of oil.</strong></p>
                    <AmazonButton asin="nanorex-thunder" className="w-full !py-4 !text-lg shadow-xl" />
                </Card>
            </div>
        </div>
    </section>
);

// --- [ 6. Technical Advantages ] ---
const TechnicalAdvantages = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[#0f0f0f] border-t border-[#2a2a2a]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4">THE SCIENCE</Badge>
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Technical <GradientText>Advantages</GradientText></h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">NanoRex isn't magic, it's advanced science. Our technology works in three key ways to protect and enhance your engine.</p>
                </div>
                
                <div className="space-y-10">
                    <Card className="p-8 md:p-12 border-[#3b82f6]/30 bg-gradient-to-br from-[#1a1a1a] to-[#111]">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-3xl font-bold mb-6 text-white">Strong Sealing Effect (Stops Blow-by)</h3>
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">The NanoRex film restores and enhances the seal between piston rings and the cylinder wall.</p>
                                <p className="text-lg text-gray-300 leading-relaxed">This stops "blow-by" gas from leaking, which increases compression, restores lost power, and improves fuel efficiency while cutting emissions.</p>
                            </div>
                            <div className="w-full md:w-1/2">
                                <video autoPlay muted loop playsInline className="w-full rounded-xl border-2 border-gray-800 shadow-2xl">
                                    <source src="/images/nanorex_detail_08.mp4" type="video/mp4" />
                                </video>
                                <div className="flex justify-between text-sm mt-4 px-4 font-semibold">
                                    <div className="text-gray-500 text-center">Typical Engine<br/><span className="text-xs font-normal">(Blow-by Leakage)</span></div>
                                    <div className="text-blue-400 text-center">With NanoRex<br/><span className="text-xs font-normal">(Protective Seal)</span></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Activity, t: "Ball Bearing Effect", d: "Nano-carbon spheres convert high-friction sliding into low-resistance rolling friction, reducing wear by an average of 70%." },
                            { icon: Clock, t: "Extended Oil Lifespan", d: "Enhances oil's thermal stability and reduces oxidation, allowing it to protect 2-4x longer than standard oil." },
                            { icon: Thermometer, t: "Heat Management", d: "Carbon particles' high conductivity rapidly pulls heat away from friction points, restraining oil degradation." },
                            { icon: Shield, t: "Safe Dispersion", d: "Patented technology ensures particles remain 100% dispersed, preventing sediment or clogging. (Unlike competitors)." }
                        ].map((item, i) => (
                            <Card key={i} className="p-8 hover:border-[#3b82f6]/50 transition-all group">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors"><item.icon className="w-6 h-6 text-[#3b82f6]" /></div>
                                <h4 className="text-xl font-bold mb-4 text-white">{item.t}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.d}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- [ 6.5. Deep Dive Navigation Buttons ] ---
const DeepDiveLinks = ({ navigate }) => (
    <section className="py-16 bg-[#0a0a0a] border-t border-[#2a2a2a]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Want to learn more?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button onClick={() => { navigate('Science'); window.scrollTo(0,0); }} className="bg-transparent border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white !text-lg !px-10 !py-5 shadow-xl w-full sm:w-auto transition-all">
                    <BookOpen className="w-6 h-6 mr-3" /> Explore Science Base
                </Button>
                <Button onClick={() => { navigate('Credibility'); window.scrollTo(0,0); }} className="bg-transparent border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white !text-lg !px-10 !py-5 shadow-xl w-full sm:w-auto transition-all">
                    <AwardIcon className="w-6 h-6 mr-3" /> View Proven Credibility
                </Button>
            </div>
        </div>
    </section>
);

// --- [ 7. FAQ ] ---
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        { q: "How do I use NanoRex?", a: "Simply add one bottle of NanoRex to your engine's oil crankcase during an oil change or when topping off. Volt treats up to 5L (5.3 Quarts) of oil, and Thunder treats up to 8L (8.5 Quarts)." },
        { q: "Is NanoRex compatible with all engine types?", a: "Yes, NanoRex is compatible with all internal combustion engines, including gasoline, diesel, LPG, and CNG. It works with conventional, synthetic-blend, and full synthetic oils." },
        { q: "Will this void my vehicle's warranty?", a: "No. In the United States, the Magnuson-Moss Warranty Act legally prevents manufacturers from voiding your warranty simply for using a high-quality aftermarket additive. NanoRex is designed to be safe and effective." },
        { q: "What is the 'Ball Bearing Effect'?", a: "The spherical nano carbon crystals act as microscopic ball bearings, rolling between metal surfaces. This changes sliding friction to rolling friction, dramatically reducing wear and heat." }
    ];

    return (
        <section id="faq" className="py-24 bg-[#0f0f0f] border-t border-[#2a2a2a]">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">Frequently Asked <GradientText>Questions</GradientText></h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="overflow-hidden bg-[#111]">
                            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 text-left flex justify-between items-center outline-none hover:bg-[#1a1a1a] transition-colors">
                                <span className="text-lg font-bold text-white">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-[#3b82f6] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                        <div className="px-6 pb-6 text-gray-400 border-t border-gray-800 pt-4 leading-relaxed">{faq.a}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- [ 8. CTA & Footer ] ---
const CTA = () => (
    <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] border-t border-[#2a2a2a] overflow-hidden">
        <div className="w-full px-4 text-center"> 
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-8 whitespace-nowrap tracking-tight">Experience <GradientText>Real Results</GradientText> in Your Vehicle</h2>
            <AmazonButton className="!text-xl !px-12 !py-6 shadow-2xl" />
        </div>
    </section>
);

const Footer = ({ navigate }) => (
    <footer className="bg-[#050505] border-t border-[#2a2a2a] py-12">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="text-3xl font-black text-gray-700 mb-8 opacity-50">Nano<span className="text-red-800">Rex</span></div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-500 mb-8 font-semibold">
                <button onClick={() => { navigate('Home'); window.scrollTo(0,0); }} className="hover:text-white">Home</button>
            </div>
            <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">Disclaimer: Individual results may vary based on vehicle condition, maintenance history, and driving habits. Calculations provided by the savings estimator are estimates based on average testing data.</p>
            <p className="text-sm text-gray-600">© 2026 NanoRex USA. A company of DAT Advanced Materials. All rights reserved.</p>
        </div>
    </footer>
);

// --- [ 9. STANDALONE PAGES (Science Base & Credibility) ] ---

const ArticleModal = ({ article, onClose }) => {
    if (!article) return null;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#111] border border-[#2a2a2a] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-800 pb-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0"><article.icon className="w-6 h-6 text-[#3b82f6]" /></div>
                                <div><Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-2">{article.category}</Badge><h2 className="text-2xl font-bold text-white">{article.title}</h2></div>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white bg-gray-900 p-2 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="prose prose-invert text-gray-300 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.fullDescription }} />
                        <Button as="a" href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-[#3b82f6] hover:bg-blue-600 text-white w-full !py-4"><ExternalLink className="w-5 h-5 mr-2" />View Source Publication ({article.readTime})</Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ScienceBaseView = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const articles = [
        { icon: Activity, category: "Friction Reduction", title: "The 'Ball Bearing Effect' of Nano Carbon", excerpt: "Spherical nano-particles act as microscopic ball bearings, converting sliding friction into rolling friction, which dramatically reduces wear and heat.", readTime: "Source: MDPI", featured: true, sourceUrl: "https://www.mdpi.com/2079-4991/12/1/139", fullDescription: "<p>One of the primary mechanisms of nano-additives is the physical transformation of friction. Traditional liquid lubricants create a film, but under high pressure, metal-to-metal contact can still occur (asperity contact).</p><p>Spherical carbon nanoparticles, including nanodiamonds, get trapped at these contact points. Instead of the metal surfaces grinding against each other, they roll over these ball bearings. This changes high-resistance sliding friction into much lower-resistance rolling friction.</p><ul class='list-disc pl-5 mt-4'><li><strong>Reduces Wear:</strong> Prevents direct metal contact, measurably decreasing wear scar diameter.</li><li><strong>Lowers Heat:</strong> Less friction means less heat generated, which helps maintain oil viscosity.</li></ul>" },
        { icon: Shield, category: "Engine Protection", title: "Surface Mending & Protective Film", excerpt: "Nano-particles polish metal surfaces and fill microscopic grooves (mending), creating a durable, low-friction protective film.", readTime: "Source: ResearchGate", featured: true, sourceUrl: "https://www.researchgate.net/publication/395799943", fullDescription: "<p>Engine surfaces are not perfectly smooth; they have microscopic valleys and peaks (asperities). Over time, friction wears these peaks down.</p><p>Carbon nano-additives contribute to protection in two ways:</p><ol class='list-decimal pl-5 mt-4'><li><strong>Mending/Polishing Effect:</strong> The nanoparticles gently polish the metal asperities, leading to a smoother surface over time. They also fill in the microscopic valleys.</li><li><strong>Tribo-Film Formation:</strong> Under the heat and pressure of the engine, the particles adhere to the metal, forming a highly durable, low-friction tribo-film.</li></ol><p>This mending and film-forming capability is what allows NanoRex to achieve such significant reductions in engine wear (up to 78% in some tests).</p>" },
        { icon: Thermometer, category: "Heat Management", title: "Superior Thermal Conductivity", excerpt: "Carbon nanomaterials are far more conductive than oil. They pull heat away from critical engine parts, preventing oil breakdown.", readTime: "Source: MDPI", featured: false, sourceUrl: "https://www.mdpi.com/2075-4442/13/10/427", fullDescription: "<p>Base oil is a poor conductor of heat. Carbon nanomaterials, especially forms like graphene, are exceptionally conductive.</p><p>By dispersing these nano-particles in the oil, the lubricant's overall thermal conductivity is significantly increased. This nanofluid can absorb and transfer heat away from hotspots like pistons and bearings much more efficiently.</p>" },
        { icon: Gauge, category: "Performance", title: "Improved Efficiency & Power", excerpt: "By reducing friction and improving sealing, nano-additives allow the engine to produce more power and waste less fuel.", readTime: "Source: JHMTR", featured: false, sourceUrl: "https://jhmtr.semnan.ac.ir/article_8875.html", fullDescription: "<p>The benefits of friction reduction, mending, and heat management all lead to one final outcome: improved engine efficiency.</p><p><strong>1. Reduced Parasitic Loss:</strong> An engine wastes significant energy (horsepower) just to overcome its own internal friction. By reducing this friction, more of the engine's power can be sent to the wheels.</p><p><strong>2. Improved Sealing:</strong> The protective tribo-film also enhances the seal between the piston rings and the cylinder wall. This increases compression and stops blow-by.</p>" },
        { icon: Wrench, category: "Engine Protection", title: "How Nano Additives Reduce Wear", excerpt: "Lab tests show up to a 78% decrease in wear compared to base oil. Learn how the protective film and mending effect work.", readTime: "Source: MDPI", featured: false, sourceUrl: "https://www.mdpi.com/2075-4442/13/10/427", fullDescription: "<p>This article dives deep into the anti-wear (AW) properties of nano-additives. Wear in an engine is primarily caused by metal-to-metal contact during startup (dry friction) and under extreme loads.</p><p>Block-on-ring tests, a standard for measuring wear, demonstrated up to a 78% decrease in wear scar diameter for oils treated with nano-additives compared to the base oil alone.</p>" },
        { icon: Droplets, category: "Performance", title: "Cutting Emissions with NanoTech", excerpt: "The sealing effect of the nano-film improves combustion, leading to a dramatic reduction in CO, NOx, and particulate matter.", readTime: "Source: JHMTR", featured: false, sourceUrl: "https://jhmtr.semnan.ac.ir/article_8875.html", fullDescription: "<p>Harmful emissions are a direct result of incomplete or inefficient combustion. This is often caused by poor compression and blow-by in older or worn engines.</p><p>The Strong Sealing Effect created by the nano-particle film restores compression. This ensures the air-fuel mixture burns more completely and efficiently.</p><p>The result is a cleaner burn, which scientific studies have measured as a significant reduction in harmful exhaust gases.</p>" }
    ];

    const categories = ["All", "Friction Reduction", "Performance", "Engine Protection", "Heat Management"];
    const filteredArticles = selectedCategory === "All" ? articles : articles.filter(a => a.category === selectedCategory);

    return (
        <section className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen border-t border-[#2a2a2a]">
            <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4">SCIENCE BASE & DATA</Badge>
                    <h1 className="text-5xl font-black text-white mb-6">The Science Behind <LogoGradientText>NanoRex</LogoGradientText></h1>
                    <p className="text-xl text-gray-400">Explore the research and data that prove the performance of our nano carbon technology.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${selectedCategory === cat ? 'bg-[#3b82f6] text-white shadow-lg' : 'bg-[#111] text-gray-400 border border-gray-800 hover:text-white hover:border-gray-600'}`}>
                            {cat} <span className="ml-1 opacity-50">({cat === "All" ? articles.length : articles.filter(a => a.category === cat).length})</span>
                        </button>
                    ))}
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-[#2a2a2a] pb-4"><GradientText>Featured</GradientText> Research</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredArticles.filter(a => a.featured).map((article, i) => (
                            <Card key={i} className="p-8 hover:border-[#3b82f6]/50 transition-colors cursor-pointer bg-[#111]" onClick={() => setSelectedArticle(article)}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center"><article.icon className="w-6 h-6 text-[#3b82f6]" /></div>
                                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6]">{article.category}</Badge>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 leading-snug">{article.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">{article.excerpt}</p>
                                <div className="flex justify-between items-center text-sm font-bold text-[#3b82f6]">
                                    <span className="text-gray-500 font-normal">{article.readTime}</span>
                                    <span className="flex items-center hover:translate-x-2 transition-transform">Read Details <ArrowRight className="w-4 h-4 ml-2"/></span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-[#2a2a2a] pb-4">All <GradientText>Research</GradientText></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.filter(a => !a.featured).map((article, i) => (
                            <Card key={i} className="p-6 hover:border-[#3b82f6]/50 transition-colors cursor-pointer flex flex-col h-full bg-[#111]" onClick={() => setSelectedArticle(article)}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center"><article.icon className="w-5 h-5 text-[#3b82f6]" /></div>
                                    <Badge className="bg-gray-800 text-gray-300">{article.category}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{article.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{article.excerpt}</p>
                                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-[#2a2a2a]">
                                    <span>{article.readTime}</span>
                                    <ArrowRight className="w-4 h-4 text-blue-500"/>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CredibilityView = () => {
    const proofPoints = [
        { icon: AwardIcon, category: "Official Certification", title: "1,309km Drive Without Oil", desc: "Officially certified by the Korea Record Institution (KRI) for driving 813 miles (1,309km) on a highway after draining the engine oil. This proves the physical existence of our protective nano-film.", link: "https://www.korearecords.co.kr/cms/bbs/cms.php?dk_cms=act_01&dk_id=151" },
        { icon: FileText, category: "R&D and Patents", title: "Joint R&D with KAERI", desc: "NanoRex was developed through international R&D with the Korea Atomic Energy Research Institute (KAERI) and Russia IBP Institute. It utilizes state-of-the-art safe dispersion tech.", link: "https://www.djtimes.co.kr/news/articleView.html?idxno=66908" },
        { icon: Users, category: "Major Domestic Partners", title: "Supplies Products to Hyundai & Kia", desc: "Supplying NanoRex to Korea's largest service networks: SK Speedmate, GS Auto Oasis, Hankook T-Station, Hyundai Bluehands, and Kia AutoQ.", link: "https://www.etoday.co.kr/news/view/1696861" },
        { icon: Globe, category: "Global Exports", title: "Exported to USA, Germany, Japan", desc: "Our technology is proven and exported to major, highly-regulated markets including the USA, Japan, Germany, Canada, India, and China.", link: "https://www.etoday.co.kr/news/view/1696861" },
        { icon: AwardIcon, category: "Official Award", title: "Ministry of Trade, Industry & Energy", desc: "Awarded by the Minister of Trade, Industry and Energy (2020) for our advanced nano-ceramic dispersion technology.", link: "https://www.kmunews.co.kr/news/articleView.html?idxno=11544" }
    ];

    return (
        <section className="pt-32 pb-24 bg-[#0a0a0a] min-h-screen border-t border-[#2a2a2a]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4">INDUSTRY RECOGNITION</Badge>
                    <h1 className="text-5xl font-black text-white mb-6">Proven <GradientText>Credibility</GradientText></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">Verified by national institutions, major automotive networks, and scientific bodies.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {proofPoints.map((point, i) => (
                        <Card key={i} className={`p-8 md:p-10 flex flex-col items-start text-left bg-[#111] hover:border-blue-500/30 transition-colors ${i === 0 ? 'md:col-span-2' : ''}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center"><point.icon className="w-7 h-7 text-[#3b82f6]" /></div>
                                <div><Badge className="bg-gray-800 text-gray-300">{point.category}</Badge></div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{point.title}</h3>
                            <p className="text-lg text-gray-400 flex-grow mb-8 leading-relaxed">{point.desc}</p>
                            <Button as="a" href={point.link} target="_blank" rel="noopener noreferrer" className="bg-transparent text-gray-300 border border-gray-700 hover:text-white hover:bg-gray-800"><ExternalLink className="w-5 h-5 mr-2" /> Verify the Source</Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- [ MAIN APP COMPONENT ] ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('Home'); 
    useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

    return (
        <div className="bg-[#0a0a0a] text-gray-200 font-sans selection:bg-blue-500/30 selection:text-white">
            <Header navigate={setCurrentPage} />
            <main>
                {currentPage === 'Home' && (
                    <>
                        <Hero />
                        <FuelSavingsEstimator />
                        <Products />
                        <TechnicalAdvantages />
                        <DeepDiveLinks navigate={setCurrentPage} />
                        <FAQ />
                        <CTA />
                    </>
                )}
                {currentPage === 'Science' && <ScienceBaseView />}
                {currentPage === 'Credibility' && <CredibilityView />}
            </main>
            <Footer navigate={setCurrentPage} />
        </div>
    );
}
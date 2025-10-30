import React, { useState, useEffect, useRef } from 'react';
import { 
    // Performance Icons
    TrendingUp, 
    Gauge, 
    Fuel, 
    Droplets, 
    Award,
    BarChart3,
    CheckCircle,
    // Science Base Icons
    BookOpen, 
    Clock, 
    ArrowRight, 
    Wrench, 
    Shield,
    Thermometer, // For Heat Management
    Activity,    // For Friction
    Layers,      // For Mending
    // General UI Icons
    ShoppingCart,
    ExternalLink,
    Users,
    FileText,
    Globe,
    Award as AwardIcon,
    X,
    Menu,
    ChevronDown,
    Zap,
    Rocket
} from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// --- Helper Hook for Scroll Animations ---
const useScrollAnimation = () => {
    const controls = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current; // Capture ref value

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [controls]); // Removed ref from dependencies

    return {
        ref,
        variants: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        initial: "hidden",
        animate: controls,
        transition: { duration: 0.6, ease: "easeOut" },
    };
};


// --- shadcn/ui 스타일 재현 ---
const Card = ({ className = '', children, ...props }) => (
    <div
        className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white ${className}`}
        {...props}
    >
        {children}
    </div>
);

const Badge = ({ className = '', children, ...props }) => (
    <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`}
        {...props}
    >
        {children}
    </span>
);

const Button = ({ className = '', children, as = 'button', ...props }) => {
    const Tag = as; // 'a' or 'button'
    return (
        <Tag
            className={`inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50 ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};

const GradientText = ({ children }) => (
    <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-transparent bg-clip-text">
        {children}
    </span>
);

// --- 1. Header Component ---
const Header = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = [
        { name: "Home", page: "Home" },
        { name: "Science Base", page: "Science" }, // 새 페이지 링크
        { name: "Performance", page: "Home", anchor: "#performance" },
        { name: "Products", page: "Home", anchor: "#products" },
        { name: "Credibility", page: "Home", anchor: "#credibility" }, // 'About' -> 'Credibility'
        { name: "FAQ", page: "Home", anchor: "#faq" },
    ];

    const handleNavigate = (page, anchor) => {
        navigate(page);
        if (anchor) {
            // Ensure DOM is updated before scrolling
            setTimeout(() => {
                const element = document.querySelector(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#2a2a2a]">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
                <div className="text-2xl font-black text-white cursor-pointer" onClick={() => handleNavigate('Home')}>
                    Nano<GradientText>Rex</GradientText>
                </div>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {links.map((link) => (
                        <button 
                            key={link.name} 
                            onClick={() => handleNavigate(link.page, link.anchor)}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </button>
                    ))}
                    <Button 
                        as="a" 
                        href="https://www.amazon.com/s?k=nanorex" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black !text-sm !px-4 !py-2"
                    >
                        Buy on Amazon
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0a] border-t border-[#2a2a2a]"
                    >
                        <div className="flex flex-col px-6 py-4 space-y-4">
                            {links.map((link) => (
                                <button 
                                    key={link.name} 
                                    onClick={() => handleNavigate(link.page, link.anchor)}
                                    className="text-gray-300 hover:text-white text-left"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <Button 
                                as="a" 
                                href="https://www.amazon.com/s?k=nanorex" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black w-full"
                            >
                                Buy on Amazon
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// --- 2. Hero Component [MODIFIED] ---
const Hero = ({ navigate }) => {
    const animProps = useScrollAnimation();
    return (
        <section id="home" className="relative text-white pt-20 pb-20 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent z-10"></div>
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3b82f6]/10 rounded-full blur-[200px] z-0" />

            {/* [MODIFIED] Layout changed to flex-col for better image scaling */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center max-w-7xl pt-16 md:pt-24">
                
                {/* [MODIFIED] Text Content - Centered and full-width */}
                <div className="w-full text-center mb-12 md:mb-0">
                    <motion.div {...animProps}>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">
                            Fuel the <GradientText>Difference</GradientText>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                            Experience maximum engine performance and protection with our advanced Nano Carbon Crystal technology. 
                            NanoRex awakens your vehicle.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button 
                                as="a" 
                                href="https://www.amazon.com/s?k=nanorex" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black !text-lg !px-8 !py-4 w-full sm:w-auto"
                            >
                                Buy on Amazon Now
                            </Button>
                            <Button 
                                onClick={() => navigate('Science')}
                                className="bg-transparent hover:bg-[#2a2a2a] text-white border border-[#2a2a2a] !text-lg !px-8 !py-4 w-full sm:w-auto"
                            >
                                See the Science
                            </Button>
                        </div>
                    </motion.div>
                </div>
                
                {/* [MODIFIED] Image Content - Centered, larger, staggered, and .png extension */}
                <div className="flex justify-center items-end w-full mt-16 md:mt-20 space-x-[-12rem] md:space-x-[-16rem]">
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        // Volt is behind (no z-index)
                    >
                        {/* [MODIFIED] Significantly increased size and changed to .png */}
                        <img src="/images/bt_0011_Volt.png" alt="NanoRex Volt Bottle" className="w-[32rem] md:w-[48rem] max-w-none" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="z-10" // Thunder is in front
                    >
                        {/* [MODIFIED] Significantly increased size (larger than Volt) and changed to .png */}
                        <img src="/images/bt_0010_Thunder.png" alt="NanoRex Thunder Bottle" className="w-[36rem] md:w-[56rem] max-w-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- 3. Products Component ---
const Products = () => {
    const products = [
        {
            name: "Volt",
            image: "/images/bx_0011_Volt.jpg", // Path is correct (.jpg)
            title: "For Light Vehicles",
            description: "Optimized for sedans, compacts, and gasoline/hybrid engines. Treats up to 5L of oil.",
            specs: "200ml (6.7 fl oz)"
        },
        {
            name: "Thunder",
            image: "/images/bx_0010_Thunder.jpg", // Path is correct (.jpg)
            title: "For SUVs & Trucks",
            description: "Heavy-duty formula for SUVs, trucks, and diesel engines. Treats up to 8L of oil.",
            specs: "320ml (10.8 fl oz)"
        }
    ];

    return (
        <section id="products" className="py-20 md:py-28 bg-[#0f0f0f]">
            <div className="container mx-auto px-6 text-center max-w-5xl">
                <motion.div {...useScrollAnimation()}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Choose Your <GradientText>Formula</GradientText>
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                        We have two specialized formulas to provide the perfect protection for your vehicle type.
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.div 
                            key={product.name} 
                            {...useScrollAnimation()}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-8 text-center h-full">
                                <img src={product.image} alt={`${product.name} Bottle`} className="h-64 mx-auto mb-6" />
                                <h3 className="text-4xl font-black mb-2">
                                    Nano<GradientText>Rex</GradientText> {product.name}
                                </h3>
                                <p className="text-lg font-bold text-white mb-3">{product.title}</p>
                                <p className="text-gray-400 mb-6">{product.description}</p>
                                <Badge className="bg-[#2a2a2a] text-gray-300 mb-6">{product.specs}</Badge>
                                {/* [MODIFIED] Button color changed to orange/black and icon changed */}
                                <Button 
                                    as="a" 
                                    href="https://www.amazon.com/s?k=nanorex" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-[#ff9900] hover:bg-[#ff9900]/90 text-black w-full"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Find on Amazon
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 4. Gemini AI Calculator Component ---
const AiCalculator = () => {
    const [vehicleType, setVehicleType] = useState('Sedan');
    const [mileage, setMileage] = useState('1000');
    const [mpg, setMpg] = useState('25');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const callGeminiAPI = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResponse('');
        setError('');

        const systemPrompt = `You are an automotive performance expert representing NanoRex engine additives. 
        Your goal is to estimate the potential benefits (fuel savings, recommended product) for a user based on their inputs.
        - NanoRex provides up to 14% fuel efficiency (MPG) improvement. Use a conservative average of 8-10% for your calculation.
        - NanoRex Volt (200ml) is for light vehicles/sedans (up to 5L oil).
        - NanoRex Thunder (320ml) is for SUVs/Trucks (up to 8L oil).
        - Assume an average US gas price of $3.50 per gallon.
        - Provide a concise, friendly, and marketing-oriented response.
        - Start with the recommended product.
        - Then, calculate the estimated monthly and annual fuel savings.
        - Format the response in simple HTML (use <b>, <p>, <ul>, <li>). Do not include \`\`\`html.`;

        const userQuery = `Vehicle: ${vehicleType}, Monthly Miles: ${mileage}, Current MPG: ${mpg}`;
        
        const apiKey = ""; // API key is handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        // Basic validation
        if (!mileage || !mpg || parseInt(mileage) <= 0 || parseInt(mpg) <= 0) {
            setError("Please enter valid positive numbers for mileage and MPG.");
            setIsLoading(false);
            return;
        }


        let retries = 3;
        while (retries > 0) {
            try {
                const payload = {
                    contents: [{ parts: [{ text: userQuery }] }],
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                };

                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    if (res.status === 429 || res.status >= 500) { // Retry on rate limit or server error
                        throw new Error(`API error: ${res.status}`);
                    } else {
                        throw new Error(`API error: ${res.statusText}`); // Don't retry client errors
                    }
                }

                const data = await res.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setResponse(text);
                    setIsLoading(false);
                    return; // Success
                } else {
                   // Check for safety ratings or other reasons for no content
                   if (data.candidates && data.candidates[0].finishReason !== 'STOP') {
                        setError(`Calculation blocked due to: ${data.candidates[0].finishReason}. Please adjust your input.`);
                   } else if (data.promptFeedback && data.promptFeedback.blockReason) {
                        setError(`Calculation blocked due to: ${data.promptFeedback.blockReason}. Please adjust your input.`);
                   } else {
                        throw new Error("No response text from API, but no block reason provided.");
                   }
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.error("API call attempt failed:", err);
                retries--;
                if (retries === 0) {
                    setError(`We couldn't calculate your results after multiple attempts. Please try again later. Details: ${err.message}`);
                    setIsLoading(false);
                } else {
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, (3 - retries) * 1000));
                }
            }
        }
    };

    return (
        <section id="ai-calculator" className="py-20 md:py-28 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Form */}
                    <div className="w-full lg:w-1/2">
                        <motion.div {...useScrollAnimation()}>
                            <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4">
                                AI-POWERED ESTIMATOR
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                See Your Potential <GradientText>Savings</GradientText>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Fill out the form to let our AI estimate your fuel savings and recommend the right product.
                            </p>
                            
                            <form onSubmit={callGeminiAPI} className="space-y-6">
                                <div>
                                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
                                    <select 
                                        id="vehicleType" 
                                        value={vehicleType}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                    >
                                        <option>Sedan</option>
                                        <option>Compact SUV</option>
                                        <option>Full-size SUV</option>
                                        <option>Truck</option>
                                        <option>Hybrid</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-300 mb-2">Average Monthly Miles</label>
                                    <input 
                                        type="number" 
                                        id="mileage"
                                        value={mileage}
                                        onChange={(e) => setMileage(e.target.value)}
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                        placeholder="e.g., 1000"
                                        min="1" // Ensure positive input
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mpg" className="block text-sm font-medium text-gray-300 mb-2">Current Average MPG</label>
                                    <input 
                                        type="number" 
                                        id="mpg"
                                        value={mpg}
                                        onChange={(e) => setMpg(e.target.value)}
                                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                                        placeholder="e.g., 25"
                                        min="1" // Ensure positive input
                                    />
                                </div>

                                <Button 
                                    type="submit"
                                    className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white w-full !text-lg !py-4"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Zap className="w-5 h-5 mr-2" />
                                    )}
                                    {isLoading ? "Calculating..." : "Calculate My Savings"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                    
                    {/* Result */}
                    <div className="w-full lg:w-1/2">
                        <motion.div {...useScrollAnimation()}>
                            <Card className="p-8 min-h-[300px]">
                                <h3 className="text-xl font-bold text-white mb-4">Your AI-Generated Estimate:</h3>
                                {isLoading && (
                                    <div className="flex justify-center items-center h-48">
                                        <svg className="animate-spin h-10 w-10 text-[#3b82f6]" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                                {error && (
                                    <div className="text-red-400">{error}</div>
                                )}
                                {response && !error && ( // Only display response if no error
                                    <div 
                                        className="prose prose-invert text-gray-300 ai-response" // Added class for potential styling
                                        dangerouslySetInnerHTML={{ __html: response }} 
                                    />
                                )}
                                {!isLoading && !response && !error && (
                                    <p className="text-gray-400">Your personalized results will appear here.</p>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- 5. Performance Component ---
const Performance = ({ navigate }) => {
  const stats = [
    {
      icon: Gauge,
      title: "Power Increase",
      value: "Up to 20%",
      description: "Maximum output improvement",
      color: "from-[#3b82f6] to-[#2563eb]"
    },
    {
      icon: Fuel,
      title: "Fuel Efficiency",
      value: "Up to 14%",
      description: "Average MPG improvement",
      color: "from-[#ff9900] to-[#ff7700]"
    },
    {
      icon: TrendingUp,
      title: "Friction Reduction",
      value: "Average 70%",
      description: "Less engine wear",
      color: "from-[#c0c0c0] to-[#a0a0a0]"
    },
    {
      icon: Droplets,
      title: "Emissions Cut",
      value: "Max 87%",
      description: "Cleaner exhaust",
      color: "from-[#3b82f6] to-[#2563eb]"
    }
  ];

  const certifiedResults = [
    {
      title: "Power & Efficiency",
      description: "Increase power max 20% and fuel efficiency 14% (the only product out of engine oil additives achieving this)",
      stat: "+20%"
    },
    {
      title: "Emission Reduction",
      description: "Reduce exhausted emission gas max 87% (especially most effective for worn out vehicles)",
      stat: "-87%"
    },
    {
      title: "Oil Consumption",
      description: "Decrease engine oil consumption up to 90%",
      stat: "-90%"
    },
    {
      title: "Engine Lifespan",
      description: "Increase the life span of engine oil and engine (2-4 times comparing using normal engine oil)",
      stat: "2-4x"
    }
  ];

  const additionalBenefits = [
    "Decrease of noise and vibration",
    "Increase engine efficiency (increase Torque and Horse Power)",
    "Minimize abrasion & gap from piston friction during reciprocating motion",
    "Reduce leak of incomplete combustion gas",
    "Increase exhaust reduction system efficiency",
    "Restrain engine temperature rising effect"
  ];

  return (
    <div id="performance" className="bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...useScrollAnimation()}>
            <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-6 text-sm px-4 py-2">
              CERTIFIED RESULTS
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              Proven <GradientText>Performance</GradientText> Data
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Real-world testing and certified results demonstrate measurable improvements in every key metric
            </p>

            <div className="flex justify-center">
              <BarChart3 className="w-24 h-24 text-[#3b82f6]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                {...useScrollAnimation()}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{stat.title}</h3>
                  <p className="text-gray-400 text-sm">{stat.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Results */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...useScrollAnimation()}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <GradientText>Certified</GradientText> Test Results
            </h2>
            <p className="text-xl text-gray-400">Verified performance improvements</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifiedResults.map((result, index) => (
              <motion.div
                key={result.title}
                {...useScrollAnimation()}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{result.title}</h3>
                    <div className="text-3xl font-black text-[#3b82f6]">{result.stat}</div>
                  </div>
                  <p className="text-gray-400">{result.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...useScrollAnimation()}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Additional <GradientText>Performance</GradientText> Benefits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                {...useScrollAnimation()}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Record Achievement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...useScrollAnimation()}
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#3b82f6]/50 p-8 md:p-12 text-center">
              <Award className="w-20 h-20 text-[#3b82f6] mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                <GradientText>Record-Breaking</GradientText> Performance
              </h2>
              <div className="text-6xl font-black text-[#3b82f6] mb-4">1,309 KM</div>
              <p className="text-2xl text-gray-300 mb-6">
                Driven on highway without engine oil
              </p>
              <p className="text-lg text-gray-400 mb-8">
                In a controlled test witnessed and certified by the Korea Record Institution, 
                an engine treated with Nano Series maintained operation for 1,309 kilometers 
                on a highway after complete engine oil removal. This demonstrates the 
                exceptional protective film created by our nano carbon technology.
              </p>
              <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] text-sm px-6 py-2">
                Certified by Korea Record Institution
              </Badge>

              <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                <p className="text-gray-300 text-sm italic">
                  "Even after removing engine oil, succeeded in driving 1,309km long distance 
                  in presence of Korea Record Institution because of well maintained super 
                  strong lubricating oil film."
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...useScrollAnimation()}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              <GradientText>Technical</GradientText> Advantages
            </h2>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Ball Bearing Effect</h3>
                <p className="text-gray-400">
                  Less friction effect averaging 70% through microscopic ball bearing action 
                  of nano carbon crystals between metal surfaces.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Superior Heat Management</h3>
                <p className="text-gray-400">
                  Higher thermal conductivity of carbon particles rapidly transfers heat away from friction points, 
                  restraining oil temperature rise and preventing degradation.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Strong Sealing Effect</h3>
                <p className="text-gray-400">
                  Thicker lubricating oil film stops leak of incomplete combustion gas and 
                  combustion gas, ensuring maximum engine efficiency.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Eco-Friendly Performance</h3>
                <p className="text-gray-400">
                  Contributes to low-carbon green growth plan through reduced CO2 emissions, 
                  expanded driving mechanism lifetime, and reduced engine oil consumption.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* [NEW LINK SECTION] */}
      <section className="py-20 text-center">
        <motion.div {...useScrollAnimation()}>
          <h3 className="text-3xl font-bold text-white mb-4">
            See the <GradientText>Scientific Proof</GradientText>
          </h3>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            These results aren't just claims. Our technology is backed by scientific research. 
            Explore the data behind the performance.
          </p>
          <Button 
            onClick={() => navigate('Science')}
            className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white !text-lg !px-10 !py-4"
          >
            <BookOpen className="w-6 h-6 mr-3" />
            Explore Our Science Base
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

// --- 6. Credibility (About) Component ---
const Credibility = ({ navigate }) => {
    const animProps = useScrollAnimation();

    const proofPoints = [
        {
            icon: Users,
            category: "Major Domestic Partners",
            title: "SK, GS, Hankook, Hyundai & Kia", // Merged Title
            description: "Supplying NanoRex to Korea's largest service networks: SK Speedmate, GS Auto Oasis, Hankook T-Station, Hyundai Bluehands, and Kia AutoQ.",
            sourceUrl: "https://www.etoday.co.kr/news/view/1696861" // Unique 3rd-party source
        },
        {
            icon: FileText,
            category: "R&D and Patents",
            title: "Joint R&D with KAERI",
            description: "NanoRex was developed through international R&D with the Korea Atomic Energy Research Institute (KAERI) and Russia IBP Institute.",
            sourceUrl: "https://www.djtimes.co.kr/news/articleView.html?idxno=66908" // Updated Source
        },
        {
            icon: Globe,
            category: "Global Exports",
            title: "Exported to USA, Germany, Japan",
            description: "Our technology is proven and exported to major markets including the USA, Japan, Germany, Canada, India, and China.",
            sourceUrl: "https://www.etoday.co.kr/news/view/1696861" // 3rd-party source confirms this
        },
        {
            icon: AwardIcon,
            category: "Official Certification",
            title: "1,309km Drive Without Engine Oil",
            description: "Officially certified by the Korea Record Institution (KRI) for driving 1,309km on a highway after draining the engine oil.",
            sourceUrl: "https://www.korearecords.co.kr/cms/bbs/cms.php?dk_cms=act_01&dk_id=151" // Added KRI Source
        },
        {
            icon: AwardIcon,
            category: "Official Award",
            title: "Ministry of Trade, Industry & Energy Award",
            description: "Awarded by the Minister of Trade, Industry and Energy (2020) for our advanced nano-ceramic dispersion technology.",
            sourceUrl: "https://www.kmunews.co.kr/news/articleView.html?idxno=11544" // Updated Source
        }
    ];

    return (
        <section id="credibility" className="py-20 md:py-28 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 text-center max-w-6xl">
                <motion.div {...animProps}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Proven <GradientText>Credibility</GradientText>
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                        Born from the unique technology of DAT Advanced Materials, NanoRex is a premium additive completed through joint R&D with the Korea Atomic Energy Research Institute (KAERI) and proven by major partners.
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {proofPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            {...useScrollAnimation()}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* [FIXED] Added p-6 padding class to this Card */}
                            <Card className="text-left h-full flex flex-col p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <point.icon className="w-6 h-6 text-[#3b82f6]" />
                                    </div>
                                    <div>
                                        <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] text-xs">
                                            {point.category}
                                        </Badge>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                                <p className="text-gray-400 mb-6 flex-grow">{point.description}</p>
                                
                                {point.sourceUrl ? (
                                    <Button
                                        as="a"
                                        href={point.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-transparent hover:bg-[#2a2a2a] text-white border border-[#2a2a2a] w-full mt-auto" // Added mt-auto
                                    >
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        View Source
                                    </Button>
                                ) : (
                                    <Button
                                        className="bg-transparent text-gray-500 border border-[#2a2a2a] w-full cursor-default mt-auto" // Added mt-auto
                                        disabled
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Certified Fact
                                    </Button>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div {...useScrollAnimation()} className="mt-16">
                       <Button
                            onClick={() => navigate('Science')}
                            className="bg-transparent hover:bg-[#2a2a2a] text-white border border-[#2a2a2a] !text-lg !px-8 !py-4"
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            See the Full Science
                        </Button>
                </motion.div>
            </div>
        </section>
    );
};


// --- 7. FAQ Component ---
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        {
            q: "How do I use NanoRex?",
            a: "Simply add one bottle of NanoRex to your engine's oil crankcase during an oil change or when topping off. Volt (200ml) treats up to 5L of oil, and Thunder (320ml) treats up to 8L."
        },
        {
            q: "Is NanoRex compatible with all engine types?",
            a: "Yes, NanoRex is compatible with all internal combustion engines, including gasoline, diesel, LPG, and CNG. It works with conventional, synthetic-blend, and full synthetic oils."
        },
        {
            q: "Will this void my vehicle's warranty?",
            a: "No. Using a high-quality engine additive like NanoRex will not void your vehicle's warranty."
        },
        {
            q: "How long does one treatment last?",
            a: "One treatment of NanoRex is designed to last for your entire oil change interval (up to 15,000-20,000 km or 10,000-12,000 miles) thanks to its stable nano-particle dispersion."
        },
        {
            q: "What is the 'Ball Bearing Effect'?",
            a: "The spherical nano carbon crystals act like microscopic ball bearings, rolling between metal surfaces. This changes sliding friction to rolling friction, dramatically reducing wear and heat."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-[#0f0f0f]">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div {...useScrollAnimation()} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked <GradientText>Questions</GradientText>
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div 
                            key={index}
                            {...useScrollAnimation()}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden">
                                <button 
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex justify-between items-center"
                                >
                                    <span className="text-lg font-bold text-white">{faq.q}</span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-[#3b82f6] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            <div className="px-6 pb-6 text-gray-400">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 8. CTA Component (from React Code) ---
const CTA = () => {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...useScrollAnimation()}
          >
            <h2 className="text-4xl font-bold mb-6">
              Experience These <GradientText>Results</GradientText> Yourself
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers seeing real, measurable performance improvements
            </p>
            <Button 
                as="a" 
                href="https://www.amazon.com/s?k=nanorex" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl px-10 py-7 bg-[#ff9900] hover:bg-[#ff9900]/90 text-black font-bold shadow-2xl"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Buy Now on Amazon
            </Button>
          </motion.div>
        </div>
      </section>
    );
};

// --- 9. Footer Component ---
const Footer = ({ navigate }) => {
    
    const handleNavigate = (page, anchor) => {
        navigate(page);
        if (anchor) {
            // Ensure DOM is updated before scrolling
            setTimeout(() => {
                const element = document.querySelector(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a]">
            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-black text-white mb-4 md:mb-0">
                        Nano<GradientText>Rex</GradientText>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400">
                        <button onClick={() => handleNavigate('Home')} className="hover:text-white">Home</button>
                        <button onClick={() => handleNavigate('Science')} className="hover:text-white">Science Base</button>
                        <button onClick={() => handleNavigate('Home', '#performance')} className="hover:text-white">Performance</button>
                        <button onClick={() => handleNavigate('Home', '#products')} className="hover:text-white">Products</button>
                        <button onClick={() => handleNavigate('Home', '#credibility')} className="hover:text-white">Credibility</button>
                        <button onClick={() => handleNavigate('Home', '#faq')} className="hover:text-white">FAQ</button>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#2a2a2a] text-center text-gray-500">
                    <p className="text-sm">
                        © {new Date().getFullYear()} DAT Advanced Materials. All rights reserved.
                    </p>
                    <p className="text-xs mt-2">
                        Disclaimer: NanoRex is an engine oil additive designed to enhance performance and protection. Results may vary based on vehicle condition, driving habits, and other factors.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// --- [NEW] HomePage Component ---
// 기존의 모든 섹션을 그룹화합니다.
const HomePage = ({ navigate }) => {
    return (
        <>
            <Hero navigate={navigate} />
            <Performance navigate={navigate} />
            <Products />
            <AiCalculator />
            <Credibility navigate={navigate} />
            <FAQ />
            <CTA />
        </>
    );
};


// --- [NEW] ArticleModal Component ---
// 아티클 상세 내용을 보여줄 모달 컴포N트
const ArticleModal = ({ article, onClose }) => {
    if (!article) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <article.icon className="w-6 h-6 text-[#3b82f6]" />
                                </div>
                                <div>
                                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] text-xs mb-2">
                                        {article.category}
                                    </Badge>
                                    <h2 className="text-2xl font-bold text-white">{article.title}</h2>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div 
                            className="prose prose-invert text-gray-300 max-w-none mb-8"
                            dangerouslySetInnerHTML={{ __html: article.fullDescription }}
                        >
                        </div>

                        <Button
                            as="a"
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white w-full"
                        >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            View Source Publication
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// --- [NEW] ScienceBase Component ---
// 'Blog.jsx' 템플릿을 기반으로 과학적 근거 콘텐츠를 채워넣습니다.
const ScienceBase = ({ navigate }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const articles = [
        {
            icon: Activity,
            category: "Friction Reduction",
            title: "The 'Ball Bearing Effect' of Nano Carbon",
            excerpt: "Spherical nano-particles act as microscopic ball bearings, converting sliding friction into rolling friction, which dramatically reduces wear and heat.",
            readTime: "Source: MDPI",
            featured: true,
            slug: "ball-bearing-effect",
            fullDescription: `
                <p>One of the primary mechanisms of nano-additives is the physical transformation of friction. Traditional liquid lubricants create a film, but under high pressure, metal-to-metal contact can still occur (asperity contact).</p>
                <p>Spherical carbon nanoparticles, including nanodiamonds, get trapped at these contact points. Instead of the metal surfaces grinding against each other, they roll over these "ball bearings." This changes high-resistance sliding friction into much lower-resistance rolling friction.</p>
                <ul>
                    <li><strong>Reduces Wear:</strong> Prevents direct metal contact, measurably decreasing wear scar diameter on engine components.</li>
                    <li><strong>Lowers Heat:</strong> Less friction means less heat generated, which helps maintain oil viscosity and prevent thermal breakdown.</li>
                </ul>
                <p>This "rolling" or "ball bearing" effect is a foundational benefit noted in numerous tribological studies.</p>
            `,
            sourceUrl: "https://www.mdpi.com/2079-4991/12/1/139"
        },
        {
            icon: Shield,
            category: "Engine Protection",
            title: "Surface Mending & Protective Film",
            excerpt: "Nano-particles polish metal surfaces and fill microscopic grooves (mending), creating a durable, low-friction protective film.",
            readTime: "Source: ResearchGate",
            featured: true,
            slug: "surface-mending",
            fullDescription: `
                <p>Engine surfaces are not perfectly smooth; they have microscopic valleys and peaks (asperities). Over time, friction wears these peaks down.</p>
                <p>Carbon nano-additives contribute to protection in two ways:</p>
                <ol>
                    <li><strong>Mending/Polishing Effect:</strong> The nanoparticles gently polish the metal asperities, leading to a smoother surface over time. They also fill in the microscopic valleys.</li>
                    <li><strong>Tribo-Film Formation:</strong> Under the heat and pressure of the engine, the particles adhere to the metal, forming a highly durable, low-friction "tribo-film." This film acts as a sacrificial layer, protecting the base metal from wear, corrosion, and deposits.</li>
                </ol>
                <p>This mending and film-forming capability is what allows NanoRex to achieve such significant reductions in engine wear (up to 78% in some tests) and extend engine life.</p>
            `,
            sourceUrl: "https://www.researchgate.net/publication/395799943_Nano_Oil_Additive_Improves_Internal_Combustion_Engine_Efficiency_and_Life_Expectancy"
        },
        {
            icon: Thermometer,
            category: "Heat Management",
            title: "Superior Thermal Conductivity",
            excerpt: "Carbon nanomaterials are far more conductive than oil. They pull heat away from critical engine parts, preventing oil breakdown and maintaining performance.",
            readTime: "Source: MDPI",
            featured: false,
            slug: "thermal-conductivity",
            fullDescription: `
                <p>Engine oil doesn't just lubricate; it also cools. Piston heads and turbochargers generate extreme heat that the oil must carry away.</p>
                <p>Base oil is a poor conductor of heat. Carbon nanomaterials, especially forms like graphene, are exceptionally conductive (in some cases, 5 times more than copper).</p>
                <p>By dispersing these nano-particles in the oil, the lubricant's overall thermal conductivity is significantly increased. This "nanofluid" can absorb and transfer heat away from hotspots like pistons and bearings much more efficiently.</p>
                <ul>
                    <li><strong>Prevents Oil Breakdown:</strong> Reduces the rate of thermal oxidation, allowing the oil to maintain its protective properties for longer.</li>
                    <li><strong>Protects Components:</strong> Lowers peak temperatures in critical components, reducing the risk of warping or seizure, especially in turbocharged engines.</li>
                </ul>
            `,
            sourceUrl: "https://www.mdpi.com/2075-4442/13/10/427"
        },
        {
            icon: Gauge,
            category: "Performance",
            title: "Improved Efficiency & Power",
            excerpt: "By reducing friction and improving sealing, nano-additives allow the engine to produce more power and waste less fuel.",
            readTime: "Source: JHMTR",
            featured: false,
            slug: "efficiency-power",
            fullDescription: `
                <p>The benefits of friction reduction, mending, and heat management all lead to one final outcome: improved engine efficiency.</p>
                <p><strong>1. Reduced Parasitic Loss:</strong> An engine wastes significant energy (horsepower) just to overcome its own internal friction. By reducing this friction, more of the engine's power can be sent to the wheels. This directly results in improved horsepower and torque (up to 7% in some tests).</p>
                <p><strong>2. Improved Sealing:</strong> The protective tribo-film also enhances the seal between the piston rings and the cylinder wall. This increases compression, stops "blow-by" (gas leakage), and ensures a more complete combustion. This directly translates to increased power and better fuel economy (MPG).</p>
                <p>This combined effect is why studies report significant gains in fuel efficiency (up to 14.9%) and power, while simultaneously cutting harmful emissions.</p>
            `,
            sourceUrl: "https://jhmtr.semnan.ac.ir/article_8875.html"
        },
        {
            icon: Wrench,
            category: "Engine Protection",
            title: "How Nano Additives Reduce Wear",
            excerpt: "Lab tests show up to a 78% decrease in wear compared to base oil. Learn how the protective film and mending effect work.",
            readTime: "Source: MDPI",
            featured: false,
            slug: "wear-reduction-guide",
            fullDescription: `
                <p>This article dives deep into the "anti-wear" (AW) properties of nano-additives. Wear in an engine is primarily caused by metal-to-metal contact during startup (dry friction) and under extreme loads (boundary lubrication).</p>
                <p>NanoRex's carbon particles create a resilient film that clings to metal surfaces even when the engine is off. This provides critical protection during cold starts, which is when most engine wear occurs.</p>
                <p>Block-on-ring tests, a standard for measuring wear, demonstrated up to a 78% decrease in wear scar diameter for oils treated with nano-additives compared to the base oil alone. This directly translates to a longer-lasting engine.</p>
            `,
            sourceUrl: "https://www.mdpi.com/2075-4442/13/10/427"
        },
        {
            icon: Droplets,
            category: "Performance",
            title: "Cutting Emissions with NanoTech",
            excerpt: "The sealing effect of the nano-film improves combustion, leading to a dramatic reduction in CO, NOx, and particulate matter (soot).",
            readTime: "Source: JHMTR",
            featured: false,
            slug: "emissions-reduction",
            fullDescription: `
                <p>Harmful emissions are a direct result of incomplete or inefficient combustion. This is often caused by poor compression and "blow-by" in older or worn engines.</p>
                <p>The "Strong Sealing Effect" created by the nano-particle film restores compression. This ensures the air-fuel mixture burns more completely and efficiently.</p>
                <p>The result is a cleaner burn, which scientific studies have measured as a significant reduction in harmful exhaust gases:</p>
                <ul>
                    <li><strong>CO (Carbon Monoxide):</strong> Reduced by over 20%</li>
                    <li><strong>NOx (Nitrogen Oxides):</strong> Reduced by over 10%</li>
                    <li><strong>Soot/Particulates:</strong> Reduced by up to 91% in some tests.</li>
                </ul>
                <p>This makes NanoRex a powerful tool for reducing a vehicle's environmental impact, especially for older or high-mileage cars.</p>
            `,
            sourceUrl: "https://jhmtr.semnan.ac.ir/article_8875.html"
        }
    ];

    const categories = [
        { name: "All", count: articles.length, color: "text-[#3b82f6]" },
        { name: "Friction Reduction", count: articles.filter(a => a.category === "Friction Reduction").length, color: "text-[#c0c0c0]" },
        { name: "Performance", count: articles.filter(a => a.category === "Performance").length, color: "text-[#ff9900]" },
        { name: "Engine Protection", count: articles.filter(a => a.category === "Engine Protection").length, color: "text-purple-400" }
    ];

    const filteredArticles = selectedCategory === "All"
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <>
            <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

            <div className="bg-[#0a0a0a] min-h-screen">
                {/* Hero */}
                <section className="relative py-12 sm:py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[150px]" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] mb-4 sm:mb-6 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">
                                SCIENCE BASE
                            </Badge>
                            
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
                                The Science Behind <GradientText>NanoRex</GradientText>
                            </h1>
                            
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
                                Explore the research and data that prove the performance of our nano carbon technology.
                            </p>

                            <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-[#3b82f6] mx-auto" />
                        </motion.div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-8 sm:py-12 bg-[#0f0f0f]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-3 sm:px-6 py-2 sm:py-3 bg-[#1a1a1a] border rounded-lg transition-all text-sm sm:text-base ${
                                        selectedCategory === category.name
                                        ? "border-[#3b82f6] shadow-lg shadow-[#3b82f6]/20"
                                        : "border-[#2a2a2a] hover:border-[#3b82f6]/50"
                                    }`}
                                >
                                    <span className={`font-semibold ${category.color}`}>{category.name}</span>
                                    <span className="ml-1 sm:ml-2 text-gray-500 text-xs sm:text-sm">({category.count})</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Articles */}
                <section className="py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8 sm:mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                                <GradientText>Featured</GradientText> Research
                            </h2>
                            <p className="text-sm sm:text-base text-gray-400">Key scientific principles behind NanoRex</p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                            {filteredArticles.filter(a => a.featured).map((article, index) => (
                                <motion.div
                                    key={article.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#3b82f6]/30 p-6 sm:p-8 hover:border-[#3b82f6] transition-all h-full group cursor-pointer">
                                        <button onClick={() => setSelectedArticle(article)} className="w-full text-left">
                                            <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <article.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3b82f6]" />
                                                </div>
                                                <div>
                                                    <Badge className="bg-[#3b82f6]/20 text-[#3b82f6] text-xs mb-2">
                                                        {article.category}
                                                    </Badge>
                                                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                                                        {article.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>{article.readTime}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[#3b82f6] font-semibold text-sm sm:text-base group-hover:gap-3 transition-all">
                                                    <span>Read More</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </button>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* All Articles Grid */}
                        {filteredArticles.filter(a => !a.featured).length > 0 && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-8 sm:mb-12"
                                >
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                                        All <GradientText>Research</GradientText>
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-400">Explore our complete library</p>
                                </motion.div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {filteredArticles.filter(a => !a.featured).map((article, index) => (
                                        <motion.div
                                            key={article.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4 sm:p-6 hover:border-[#3b82f6]/50 transition-all h-full group cursor-pointer">
                                                <button onClick={() => setSelectedArticle(article)} className="w-full text-left h-full flex flex-col">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                                        <article.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                                                    </div>
                                                    <Badge className="bg-[#2a2a2a] text-gray-400 text-xs mb-2 sm:mb-3 self-start">
                                                        {article.category}
                                                    </Badge>
                                                    <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-3 flex-grow">
                                                        {article.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{article.readTime}</span>
                                                        </div>
                                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-[#3b82f6] transition-colors" />
                                                    </div>
                                                </button>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-12 sm:py-20 bg-[#0f0f0f]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-[#3b82f6] mx-auto mb-4 sm:mb-6" />
                            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
                                Convinced by the <GradientText>Data?</GradientText>
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
                                See the real-world results in your own vehicle.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                                <Button 
                                    as="a" 
                                    href="https://www.amazon.com/s?k=nanorex" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#ff9900] hover:bg-[#ff9900]/90 text-black font-bold rounded-lg transition-all text-sm sm:text-base"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Buy NanoRex Now
                                </Button>
                                <Button 
                                    onClick={() => navigate('Home', '#performance')}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-bold rounded-lg border border-[#2a2a2a] transition-all text-sm sm:text-base"
                                >
                                    View Test Results
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}


// --- Main App Component ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('Home'); // 'Home' or 'Science'

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className="bg-[#0a0a0a] text-gray-300">
            <Header navigate={setCurrentPage} />
            <main>
                {currentPage === 'Home' && <HomePage navigate={setCurrentPage} />}
                {currentPage === 'Science' && <ScienceBase navigate={setCurrentPage} />}
            </main>
            <Footer navigate={setCurrentPage} />
        </div>
    );
}


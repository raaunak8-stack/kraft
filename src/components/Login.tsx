import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Check, Sparkles } from "lucide-react";
import { toast, Toaster } from "sonner";
// import { Link } from "react-router-dom";

export default function Login({onLoginSuccess }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsVisible(true);
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  const features = [
    "Get Access and insights about Customer Segments, Campaign performances, and channel effectiveness.",
    "Create and verify your creatives.",
    "Track KPIs - conversions, leads, sales, spend, etc."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { username, password });
    if(username=="rahul_kraft" && password=="rahul_@123"){
     onLoginSuccess();
    }else{
        toast.error("Invalid username or password.");
    }
    
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <Toaster position="top-center" richColors />
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl animate-pulse"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.id * 2}s`
            }}
          />
        ))}
      </div> */}

      {/* Mouse follower gradient */}
      <div 
        className="fixed pointer-events-none z-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
        style={{
          width: '400px',
          height: '400px',
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />

      <div className="relative z-10 min-h-screen flex ">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 scale-125 ">
          <div className={`w-full max-w-md transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Logo/Brand */}
            <div className="text-left mb-8">
              <div className="inline-flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg animate-pulse" />
                  <Sparkles className="h-8 w-8 text-white relative z-10" />
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KRAFT
                </span>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-3">
                Welcome back!
              </h1>
              <p className="text-slate-300 leading-relaxed">
                 KRAFT empower marketing and brand teams to design, orchestrate, and optimize AI-driven campaigns with intelligence and control
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <a 
                
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors cursor-pointer"
              >
                Raise request for access
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Features Panel */}
        <div className="flex-1 relative ">
          {/* Gradient Background - matching left side */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
          
          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/60 border-l border-white/10 top-[4%] right-[2%] rounded-2xl bottom-[4%] " />
          
          {/* Additional glass elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-md border border-white/20 animate-pulse" />
          <div className="absolute bottom-32 right-12 w-24 h-24 bg-white/5 rounded-full backdrop-blur-lg border border-white/10" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/15 rounded-full backdrop-blur-sm border border-white/30 animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Content */}
          <div className={`relative z-10 h-full flex flex-col justify-center p-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="max-w-md bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8">
                KRAFT enables you to:
              </h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-start transition-all duration-500 transform ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`mt-12 pt-8 border-t border-white/20 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`} style={{ transitionDelay: '1000ms' }}>
                <p className="text-white/70 text-xs leading-relaxed">
                  Powered by cutting edge AI reasoning, graph analysis and agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

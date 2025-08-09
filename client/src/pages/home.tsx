import { Cloud, Combine, Settings, Lightbulb, Twitter, Github, Linkedin } from "lucide-react";
import ImageCompressor from "@/components/image-compressor";
import AdSenseBanner from "@/components/adsense-banner";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-glass border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center">
                <Combine className="text-white text-lg" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-gradient">ImageCompress Pro</h1>
                <p className="text-xs text-gray-500">Professional Image Compression</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</a>
              <button className="bg-blue-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
                Get Started
              </button>
            </nav>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-gradient mb-6">
            Compress Images Without<br/>Quality Loss
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Reduce your JPEG image file sizes by up to 80% while maintaining stunning visual quality. Free online compression tool.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Client-Side Processing</span>
            </div>
          </div>
        </section>

        {/* Top Ad Banner */}
        <section className="mb-8">
          <AdSenseBanner 
            adSlot="1234567890"
            adFormat="auto"
            className="text-center"
          />
        </section>

        {/* Image Compressor Component */}
        <ImageCompressor />

        {/* Bottom Ad Banner */}
        <section className="mt-12">
          <AdSenseBanner 
            adSlot="9876543210"
            adFormat="auto"
            className="text-center"
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-blue-100/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center">
                  <Combine className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-gradient">ImageCompress Pro</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The most advanced image compression tool that works entirely in your browser. No uploads, no privacy concerns, just pure performance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200">
                  <Github size={16} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-200">
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Batch Processing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Format Conversion</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Quality Control</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">EXIF Handling</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 ImageCompress Pro. All rights reserved. Built with ❤️ for developers and designers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";
import Link from 'next/link';
import { ShoppingBag, LogIn, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  // Dummy date logic for Bangla Date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const banglaDate = new Date().toLocaleDateString('bn-BD', dateOptions);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2 text-green-600">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xl font-bold">বাজার দর</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">{banglaDate}</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/signin" className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            <LogIn className="w-4 h-4" />
            সাইন ইন
          </Link>
          <Link href="/signup" className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" />
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Category Links Row */}
      <div className="border-t border-gray-50 bg-gray-50/50">
        <div className="container mx-auto px-4 flex items-center gap-6 overflow-x-auto py-3 scrollbar-hide">
          {[
            { name: "সব পণ্য", path: "/" },
            { name: "চাল", path: "/category/chal" },
            { name: "সবজি", path: "/category/vegetable" },
            { name: "মাছ", path: "/category/fish" },
            { name: "মাংস", path: "/category/meat" },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              href={cat.path}
              className={`whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                pathname === cat.path 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Price Ticker */}
      <div className="bg-green-600 text-white overflow-hidden py-1.5 text-xs font-medium">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {/* We'll populate this with real API data later */}
          <span className="flex items-center gap-1">🧅 পেঁয়াজ: ১২০ টাকা/কেজি <span className="text-red-300">▼ ২.৫%</span></span>
          <span className="flex items-center gap-1">🥔 আলু: ৫৫ টাকা/কেজি <span className="text-green-300">▲ ১.২%</span></span>
          <span className="flex items-center gap-1">🥚 ডিম: ১৫০ টাকা/ডজন <span className="text-gray-300">- ০.০%</span></span>
          <span className="flex items-center gap-1">🥩 গরুর মাংস: ৭৫০ টাকা/কেজি <span className="text-red-300">▼ ০.৫%</span></span>
          <span className="flex items-center gap-1">🧅 পেঁয়াজ: ১২০ টাকা/কেজি <span className="text-red-300">▼ ২.৫%</span></span>
          <span className="flex items-center gap-1">🥔 আলু: ৫৫ টাকা/কেজি <span className="text-green-300">▲ ১.২%</span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

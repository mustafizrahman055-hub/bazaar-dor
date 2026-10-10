import Link from "next/link";


// Helper function to convert English numbers to Bengali
export const engToBnNum = (num) => {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (w) => bn[w]);
};

const ProductCard = ({ product }) => {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  
  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
        
        {/* Top section: Icon and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-3xl">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-gray-500 text-sm">
              প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'l' ? 'লিটার' : product.unit === 'dozen' ? 'ডজন' : 'পিস'}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500">আজকের দাম</span>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {engToBnNum(product.today)} <span className="text-sm font-normal text-gray-500">টাকা</span>
              </div>
              
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                isUp ? 'bg-red-50 text-red-600' : 
                isDown ? 'bg-green-50 text-green-600' : 
                'bg-gray-50 text-gray-600'
              }`}>
                <span>{isUp ? '▲' : isDown ? '▼' : '-'}</span>
                <span>{engToBnNum(product.change.pct)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

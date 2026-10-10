import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/api';



export async function GET() {
  try {
    const products = await getAllProducts();
    // Select a few prominent products for the ticker
    const tickerProducts = products.filter(p => 
      ['miniket-chal', 'mosur-dal', 'sorishar-tel', 'broiler-murgi', 'sonali-murgi'].includes(p.slug)
    ).slice(0, 5);
    
    return NextResponse.json(tickerProducts);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

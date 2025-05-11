import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface PrintfulProduct {
  id: string;
  name: string;
  variants: Array<{
    id: string;
    retail_price: string;
    files: Array<{
      preview_url: string;
    }>;
    options: Array<{
      id: string;
      value: string;
    }>;
  }>;
}

interface FormattedProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imageUrls: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: Array<{ name: string; value: string }>;
  inStock: boolean;
  isNew: boolean;
  isLimited: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const printfulApiKey = Deno.env.get('PRINTFUL_API_KEY');
    
    if (!printfulApiKey) {
      throw new Error('Printful API key not configured');
    }

    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${printfulApiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`);
    }

    const data = await response.json();
    const products: PrintfulProduct[] = data.result;

    const formattedProducts: FormattedProduct[] = products.map(product => {
      const mainVariant = product.variants[0];
      const uniqueSizes = [...new Set(product.variants.map(v => 
        v.options.find(o => o.id === 'size')?.value || 'One Size'
      ))];
      
      const uniqueColors = [...new Set(product.variants.map(v => {
        const colorOption = v.options.find(o => o.id === 'color');
        return colorOption ? {
          name: colorOption.value,
          value: colorOption.value.toLowerCase()
        } : null;
      }).filter(Boolean))];

      return {
        id: product.id.toString(),
        name: product.name,
        price: parseFloat(mainVariant.retail_price),
        description: product.name,
        imageUrl: mainVariant.files[0].preview_url,
        imageUrls: product.variants.map(v => v.files[0].preview_url),
        category: 't-shirts',
        tags: ['printful'],
        sizes: uniqueSizes,
        colors: uniqueColors,
        inStock: true,
        isNew: false,
        isLimited: false
      };
    });

    return new Response(
      JSON.stringify(formattedProducts),
      { 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    console.error('Error in products function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
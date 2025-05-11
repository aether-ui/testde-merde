import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';

type ContextType = {
  enterLink: (text?: string) => void;
  leaveLink: () => void;
};

const ProductsPage: React.FC = () => {
  const { enterLink, leaveLink } = useOutletContext<ContextType>();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    prices: string[];
    sizes: string[];
  }>({
    categories: categoryParam ? [categoryParam] : [],
    prices: [],
    sizes: []
  });

  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://vpbdybxshulhawahephb.supabase.co/functions/v1/products");

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeFilters.categories.length > 0) {
      result = result.filter(product =>
        activeFilters.categories.includes(product.category)
      );
    }

    if (activeFilters.prices.length > 0) {
      result = result.filter(product => {
        if (activeFilters.prices.includes('under-50') && product.price < 50) return true;
        if (activeFilters.prices.includes('50-100') && product.price >= 50 && product.price <= 100) return true;
        if (activeFilters.prices.includes('100-150') && product.price > 100 && product.price <= 150) return true;
        if (activeFilters.prices.includes('over-150') && product.price > 150) return true;
        return false;
      });
    }

    if (activeFilters.sizes.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => activeFilters.sizes.includes(size))
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, activeFilters, sortBy]);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handlePriceFilter = (price: string) => {
    setActiveFilters(prev => ({
      ...prev,
      prices: prev.prices.includes(price)
        ? prev.prices.filter(p => p !== price)
        : [...prev.prices, price]
    }));
  };

  const handleSizeFilter = (size: string) => {
    setActiveFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      prices: [],
      sizes: []
    });
  };

  const getCategoryName = (slug: string): string => {
    switch (slug) {
      case 't-shirts':
        return 'T-Shirts';
      case 'hoodies':
        return 'Hoodies';
      case 'pants':
        return 'Pants';
      case 'accessories':
        return 'Accessories';
      case 'new-arrivals':
        return 'New Arrivals';
      case 'best-sellers':
        return 'Best Sellers';
      case 'limited-drops':
        return 'Limited Drops';
      default:
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  };

  const totalActiveFilters =
    activeFilters.categories.length +
    activeFilters.prices.length +
    activeFilters.sizes.length;

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
            onMouseEnter={() => enterLink()}
            onMouseLeave={leaveLink}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Reste du rendu inchangé... */}
        {/* Je ne répète pas tout le rendu HTML ici car il reste identique et ton erreur était uniquement dans la logique fetch */}
      </div>
    </div>
  );
};

export default ProductsPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';
import Logo from './ui/Logo';

interface FooterProps {
  onEnterLink: () => void;
  onLeaveLink: () => void;
}

const Footer: React.FC<FooterProps> = ({ onEnterLink, onLeaveLink }) => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-800 pb-8">
          <div className="col-span-1 lg:col-span-1">
            <div className="bg-white inline-block p-2 mb-4">
              <Logo isScrolled={true} />
            </div>
            <p className="text-gray-400 mt-4 mb-6">
              Streetwear premium inspiré de l'urbain, axé sur la qualité, le design et l'expression culturelle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors" onMouseEnter={onEnterLink} onMouseLeave={onLeaveLink}>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors" onMouseEnter={onEnterLink} onMouseLeave={onLeaveLink}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors" onMouseEnter={onEnterLink} onMouseLeave={onLeaveLink}>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors" onMouseEnter={onEnterLink} onMouseLeave={onLeaveLink}>
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-4">Boutique</h4>
            <ul className="space-y-2">
              {['Nouveautés', 'Meilleures Ventes', 'Éditions Limitées', 'Collections', 'Tous les Produits'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/products`} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                    onMouseEnter={onEnterLink}
                    onMouseLeave={onLeaveLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-4">Informations</h4>
            <ul className="space-y-2">
              {['À Propos', 'Lookbook', 'Magasins', 'Guide des Tailles', 'Livraison', 'Retours', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                    onMouseEnter={onEnterLink}
                    onMouseLeave={onLeaveLink}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Inscrivez-vous pour recevoir nos actualités, accéder à des offres exclusives et plus encore.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-900 border-none text-gray-300 p-3 flex-grow focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <button 
                type="submit"
                className="bg-yellow-400 text-black p-3 hover:bg-yellow-300 transition-colors"
                onMouseEnter={onEnterLink}
                onMouseLeave={onLeaveLink}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} URBANX. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              Politique de Confidentialité
            </Link>
            <Link 
              to="/terms-conditions" 
              className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              Conditions Générales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
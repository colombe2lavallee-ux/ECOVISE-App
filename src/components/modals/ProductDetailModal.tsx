import React from 'react';
import { StoreProduct } from '../../types';

interface ProductDetailModalProps {
  product: StoreProduct | null;
  onClose: () => void;
  onAddToCart: (product: StoreProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-surface-container space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
            {product.energyClass}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-24 h-28 rounded-xl overflow-hidden bg-surface-container shrink-0">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-headline-sm text-body-lg font-bold text-primary">
              {product.name}
            </h3>
            <p className="text-xs text-on-surface-variant">{product.subtitle}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-primary font-mono">{product.price} €</span>
              {product.originalPrice && (
                <span className="text-xs text-outline line-through">{product.originalPrice} €</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <h4 className="font-semibold text-on-surface uppercase tracking-wider text-[11px]">
            Points forts & Écologie
          </h4>
          <ul className="space-y-1.5 text-on-surface-variant">
            {product.features?.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span>{f}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px]">eco</span>
              <span>
                Consommation optimisée : <strong>{product.annualKwh} kWh/an</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px]">
                local_shipping
              </span>
              <span>Livraison premium et reprise de l'ancien équipement incluses</span>
            </li>
          </ul>
        </div>

        <div className="p-3 bg-secondary-fixed/20 rounded-xl flex justify-between items-center text-xs">
          <div>
            <span className="text-on-surface-variant block">Prime d'État déduite :</span>
            <span className="font-bold text-secondary text-[13px]">
              +{product.appliedGrant} € accordés
            </span>
          </div>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary/90 cursor-pointer"
          >
            Commander avec prime
          </button>
        </div>
      </div>
    </div>
  );
};

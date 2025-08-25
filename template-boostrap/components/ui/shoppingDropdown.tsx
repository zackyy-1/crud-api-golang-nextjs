// components/ui/shoppingDropdown.tsx
"use client";

import { X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShoppingCartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    cartButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Lence Camera",
    price: 189.00,
    quantity: 1
  },
  {
    id: 2,
    name: "White Earbuds",
    price: 59.00,
    quantity: 3
  },
  {
    id: 3,
    name: "Branded Black Headeset",
    price: 39.99,
    quantity: 2
  },
  {
    id: 4,
    name: "Glass Decor Item",
    price: 5.99,
    quantity: 5
  },
  {
    id: 5,
    name: "Pink Teddy Bear",
    price: 10.00,
    quantity: 1
  }
];

export default function ShoppingCartDropdown({ isOpen, onClose }: ShoppingCartDropdownProps) {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
        {/* Dropdown - Posisi tepat di bawah ikon keranjang */}
            <div className="fixed top-16 right-20 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between pt-2 pl-3 pr-3 border-b border-gray-200">
                    <h4 className="ts-10 font-semibold text-gray-800 text-sm">Shopping Cart</h4>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors pb-2"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Items Count */}
                <div className="px-3 py-1 bg-gray-50">
                    <p className="mb-0 text-xs text-gray-600 font-medium">Items ({cartItems.length})</p>
                </div>

                {/* Cart Items */}
                <div className="max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pt-2 pl-3 pr-3 pb-3 border-b border-gray-100">
                        <div className="flex-1 min-w-0">
                            <h6 className="font-medium text-gray-800 text-xs truncate">{item.name}</h6>
                            <p className="text-gray-600 text-xs m-0">
                            {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="font-semibold text-gray-800 text-xs">
                            ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
                </div>

                {/* Subtotal and Checkout */}
                <div className="pl-3 pr-3 pt-2 pb-2 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-800 text-sm">Sub Total:</span>
                        <span className="font-bold text-gray-800 text-sm">${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-800 transition-colors text-xs font-medium">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}
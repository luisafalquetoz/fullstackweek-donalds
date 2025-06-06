'use client';

import { formatCurrency } from '@/app/helpers/format-currency';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Prisma } from '@prisma/client';
import {
	ChefHatIcon,
	LucideBluetoothConnected,
	Minus,
	Plus,
} from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart';
import CartSheet from '../../components/cart-sheet';

interface ProductDetailsProps {
	product: Prisma.ProductGetPayload<{
		include: {
			restaurant: {
				select: {
					name: true;
					avatarImageUrl: true;
				};
			};
		};
	}>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const { toggleCart, addProduct } = useContext(CartContext);
	const [quantity, setQuantity] = useState<number>(1);
	const handleDecreaseQuantity = () => {
		setQuantity((prev) => {
			if (prev === 1) {
				return 1;
			}
			return prev - 1;
		});
	};
	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};
	const handleAddToCart = () => {
		addProduct({
			...product,
			quantity,
		})
		toggleCart();
	};

	return (
		<>
			<div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
				<div className="flex-auto overflow-hidden">
					<div className="flex items-center gap-1.5">
						<Image
							src={product.restaurant.avatarImageUrl}
							alt={product.restaurant.name}
							width={18}
							height={18}
							className="rounded-full"
						/>
						<p className="text-xs text-muted-foreground">
							{product.restaurant.name}
						</p>
					</div>
					<h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
					<div className="mt-3 flex items-center justify-between">
						<h3 className="text-xl font-semibold">
							{formatCurrency(product.price)}
						</h3>
						<div className="flex items-center gap-3 text-center">
							<Button
								variant="outline"
								className="h-8 w-8 rounded-xl"
								onClick={handleDecreaseQuantity}
							>
								<Minus />
							</Button>
							<p className="w-4">{quantity}</p>
							<Button
								variant="destructive"
								className="h-8 w-8 rounded-xl"
								onClick={handleIncreaseQuantity}
							>
								<Plus />
							</Button>
						</div>
					</div>

					<ScrollArea className="h-full">
						<div className="mt-6 space-y-3">
							<h4 className="font-semibold">Sobre</h4>
							<p className="text-sm text-muted-foreground">
								{product.description}
							</p>
						</div>
						<div className="mt-6 space-y-3">
							<div className="5 flex items-center gap-1">
								<ChefHatIcon size={18} />
								<h4 className="font-semibold">Ingredientes</h4>
							</div>
							<ul className="list-disc px-5 text-sm text-muted-foreground">
								{product.ingredients.map((ingredient) => (
									<li key={ingredient}>{ingredient}</li>
								))}
							</ul>
						</div>
					</ScrollArea>
				</div>

				<Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
					Adicionar à sacola
				</Button>
			</div>

			<CartSheet />
		</>
	);
};

export default ProductDetails;

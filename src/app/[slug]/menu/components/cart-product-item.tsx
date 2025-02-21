import { formatCurrency } from '@/app/helpers/format-currency';
import { Button } from '@/components/ui/button';
import { Minus, Plus, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext, CartProduct } from '../contexts/cart';

interface CartProductItemProps {
	product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
	const { decreaseProductQuantity, increaseProductQuantity } =
		useContext(CartContext);

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="relative h-20 w-20 rounded-xl bg-gray-100">
					<Image src={product.imageUrl} alt={product.name} fill />
				</div>
				<div className="space-y-1">
					<p className="max-w-[90%] truncate text-ellipsis text-xs">
						{product.name}
					</p>
					<p className="text-sm font-semibold">
						{formatCurrency(product.price)}
					</p>
					<div className="flex items-center gap-1 text-center">
						<Button
							variant="outline"
							className="h-7 w-7 rounded-lg"
							onClick={() => decreaseProductQuantity(product.id)}
						>
							<Minus />
						</Button>
						<p className="w-7 text-xs">{product.quantity}</p>
						<Button
							variant="destructive"
							className="h-7 w-7 rounded-lg"
							onClick={() => increaseProductQuantity(product.id)}
						>
							<Plus />
						</Button>
					</div>
				</div>
			</div>
			<Button className="h-7 w-7 rounded-lg" variant="outline">
				<TrashIcon />
			</Button>
		</div>
	);
};

export default CartProductItem;

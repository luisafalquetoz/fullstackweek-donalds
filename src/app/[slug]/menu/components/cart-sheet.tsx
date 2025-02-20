import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart';

const CartSheet = () => {
	const { isOpen, toggleCart, products } = useContext(CartContext);

	const handleAddToCart = () => {
		toggleCart();
	};

	return (
		<Sheet open={isOpen} onOpenChange={toggleCart}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Title</SheetTitle>
					<SheetDescription>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
						necessitatibus est a sequi aut quidem repellat ratione dignissimos
						molestiae, officiis aliquid magni impedit doloribus praesentium,
						consectetur eveniet ipsum repellendus facere!
					</SheetDescription>
				</SheetHeader>
				{products.map((product) => (
					<h1 key={product.id}>
						{product.name} - {product.quantity}
					</h1>
				))}
			</SheetContent>
		</Sheet>
	);
};

export default CartSheet;

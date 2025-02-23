'use client';

import { Product } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface ProductHeaderProps {
	product: Pick<Product, 'imageUrl' | 'name'>;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
	const { slug } = useParams<{ slug: string }>();
	const router = useRouter();
	const handleBackClic = () => router.back();
	const hadleOrdersClick = () => router.push(`/${slug}/orders`);

	return (
		<div className="relative min-h-[300px] w-full">
			<Button
				variant="secondary"
				size="icon"
				className="absolute top-4 left-4 z-50 rounded-full"
				onClick={handleBackClic}
			>
				<ChevronLeftIcon />
			</Button>
			<Image
				src={product.imageUrl}
				alt={product.name}
				fill
				className="object-contain"
			/>
			<Button
				variant="secondary"
				size="icon"
				className="absolute top-4 right-4 z-50 rounded-full"
				onClick={hadleOrdersClick}
			>
				<ScrollTextIcon />
			</Button>
		</div>
	);
};

export default ProductHeader;

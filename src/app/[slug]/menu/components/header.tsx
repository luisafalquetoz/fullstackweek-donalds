'use client';

import { Button } from '@/components/ui/button';

import { Restaurant } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

interface RestaurantHeaderProps {
	restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
	const { slug } = useParams<{ slug: string }>();
	const router = useRouter();
	const hadleOrdersClick = () => router.push(`/${slug}/orders`);

	return (
		<div className="relative h-[250px] w-full">
			<Button
				variant="secondary"
				size="icon"
				className="absolute top-4 left-4 z-50 rounded-full"
				onClick={() => router.back()}
			>
				<ChevronLeftIcon />
			</Button>
			<Image
				src={restaurant.coverImageUrl}
				alt={restaurant.name}
				fill
				className="object-cover"
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

export default RestaurantHeader;

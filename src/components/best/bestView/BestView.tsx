import CategoryBox from '@/components/common/CategoryBox';
import styles from '@/styles/best/bestView/bestView.module.css';
import Rank from './rank/Rank';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { BestSellerType } from '@/types/bookType';
import Pagination from '@/components/common/Pagination';

interface BestViewProps {
	categoryId: string;
	data: BestSellerType[];
}

export default function BestView({ categoryId, data }: BestViewProps) {
	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<CategoryBox categoryId={categoryId} />
				<Rank data={data} />
				<Pagination dataLength={240} page="best" categoryId={categoryId} />
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}

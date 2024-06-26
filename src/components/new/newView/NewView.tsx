import styles from '@/styles/new/newView/newView.module.css';
import BookItemWrapper from '@/components/common/bookItem/BookItemWrapper';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { NewBookType } from '@/types/bookType';
import CategoryBox from '@/components/common/CategoryBox';
import Pagination from '@/components/common/Pagination';

interface NewViewProps {
	categoryId: string;
	data: NewBookType[];
	dataLength: number;
}

export default async function NewView({
	categoryId,
	data,
	dataLength,
}: NewViewProps) {
	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<CategoryBox categoryId={categoryId} />
				<BookItemWrapper data={data} />
				<Pagination
					dataLength={dataLength}
					page="new"
					categoryId={categoryId}
				/>
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}

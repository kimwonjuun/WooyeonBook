import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/best/best.module.css';
import BestView from '@/components/best/bestView/BestView';

export default async function bestPage({
	searchParams,
}: {
	searchParams: { categoryId: string; pageNum: number };
}) {
	// search params - category id
	const categoryId = searchParams.categoryId;
	// search params - page
	const pageNum = searchParams.pageNum;

	// best page data
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/bestAll?categoryId=${categoryId}&pageNum=${pageNum}`,
		{ next: { revalidate: 3600 } },
	);
	const { data } = await response.json();

	return (
		<div className={styles.container}>
			<PageHeader title="인기" />
			<BestView categoryId={categoryId} data={data} />
		</div>
	);
}

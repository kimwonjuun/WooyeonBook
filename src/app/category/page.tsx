import CategoryBar from '@/components/category/categoryBar/CategoryBar';
import CategoryContents from '@/components/category/categoryContents/CategoryContents';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/category/category.module.css';

export default function categoryPage() {
	return (
		<>
			<PageHeader title="전체" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<CategoryBar />
					<CategoryContents />
				</div>
			</div>
		</>
	);
}

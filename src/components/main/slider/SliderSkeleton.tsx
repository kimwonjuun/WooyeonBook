import styles from '@/styles/main/slider/sliderSkeleton.module.css';

// 스켈레톤 UI 컴포넌트
export const SliderSkeleton = () => (
	<div className={styles.skeletonWrapper}>
		<div className={styles.skeletonItem} />
		<div className={styles.skeletonSecondItem} />
		<div className={styles.skeletonItem} />
	</div>
);

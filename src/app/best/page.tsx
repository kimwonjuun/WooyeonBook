import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/best/best.module.css';

export default function bestPage() {
	const categoryItems = [
		'전체',
		'소설',
		'에세이·시',
		'경제·경영',
		'자기개발',
		'인문',
		'사회·정치',
		'역사',
		'종교',
		'예술·대중문화',
		'자연과학',
		'가정·살림',
		'건강·취미·여행',
		'어린이·유아',
		'청소년',
		'국어·외국어',
		'IT·모바일',
		'대학교재',
		'수험서·자격증',
		'잡지',
		'만화',
		'로맨스',
		'판타지/무협',
	];

	return (
		<>
			<PageHeader title="베스트셀러" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.categoryBox}>
						{categoryItems.map((item) => (
							<div className={styles.categoryItem}>{item}</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

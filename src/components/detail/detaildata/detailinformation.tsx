'use client';
import { AccordionContext } from '@/components/common/AccordionWrapper';
import styles from '@/styles/detail/detaildata/detailinformation.module.css';
import { Book } from '@/types/bookDetailDate';
import { useContext } from 'react';
interface bookDetailProp {
	bookInfo: Book;
}
export default function Detailinformation({ bookInfo }: bookDetailProp) {
	const { active } = useContext(AccordionContext);
	console.log('확인', bookInfo);
	return (
		<div className={styles.accordionContent}>
			<ul className={active.includes(1) ? styles.accordionWrappeActive : ''}>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>출간일</span>
						<span className={styles.bookItem}>{bookInfo.pubDate}</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>출판사</span>
						<span className={styles.bookItem}>{bookInfo.publisher}</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>읽는 순서</span>
						<span className={styles.bookItem}>1</span>
					</li>
				</div>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>ISBN</span>
						<span className={styles.bookItem}>{bookInfo.isbn}</span>
					</li>

					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>크기</span>
						<span className={styles.bookItem}>
							{bookInfo.subInfo.packing.sizeWidth}*
							{bookInfo.subInfo.packing.sizeHeight}mm
						</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>쪽수</span>
						<span className={styles.bookItem}>{bookInfo.subInfo.itemPage}</span>
					</li>
				</div>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>판형</span>
						<span className={styles.bookItem}>
							{bookInfo.subInfo.packing.styleDesc}
						</span>
					</li>
				</div>
			</ul>
		</div>
	);
}

import { book_name } from '@/recoil/atom/bookIdAtom';
import styles from '@/styles/community/post/optionBookBuying.module.css';
import { useRecoilValue } from 'recoil';
import BookSearch from '../BookSearch';

interface OptionBookBuyingProps {
	sellingPrice: {
		value: number;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
}

const OptionBookBuying = ({ sellingPrice }: OptionBookBuyingProps) => {
	const bookName = useRecoilValue(book_name);
	return (
		<div className={styles.buyingSelectContainer}>
			<div className={styles.buyingSelectWrap}>
				<label>책을 선택해주세요.</label>
				<BookSearch />
			</div>
			<div className={styles.buyingSelectWrap}>
				<label>선택한 책</label>
				<div className={styles.selectBookText}>{bookName}</div>
			</div>
			<div className={styles.buyingSelectWrap}>
				<label>구매하고 싶은 가격을 적어주세요.</label>
				<input
					type="text"
					placeholder="가격을 입력해주세요."
					onChange={sellingPrice.onChange}
				/>
			</div>
		</div>
	);
};

export default OptionBookBuying;

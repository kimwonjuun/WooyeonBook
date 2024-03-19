'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useInputState } from '@/hooks/useInputState';
import { useRecoilState } from 'recoil';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { supabase } from '@/utils/supabase/supabase';
import { BookBuyingPostDataType } from '@/types/community/post/data';
import OptionBookBuying from '@/components/community/post/option/OptionBookBuying';
import { useEffect } from 'react';

const EditorComponent = dynamic(
	() => import('@/components/community/common/WysiwygEditor'),
	{
		ssr: false,
		loading: () => (
			<div
				style={{
					width: '1300px',
					height: '601.25px',
					backgroundColor: '#a5a5a5',
					borderRadius: '5px',
				}}></div>
		),
	},
);

const BookBuyingPostPage = () => {
	const router = useRouter();
	const params = usePathname();
	// 뒤로가기, 새로고침 방지
	const preventClose = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue = ''; //Chrome에서 동작하도록; deprecated
	};

	useEffect(() => {
		window.addEventListener('beforeunload', preventClose);
		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, []);

	// 현제 페이지 url
	const page = params.split('/')[4];
	// title
	const title = useInputState('');
	// text / img url arr
	const [content, setContent] = useRecoilState(editorText);
	const [imgArr, setImgArr] = useRecoilState(editorImgArr);
	// 선택한 책 data
	const [selectedBook, setSeletedBook] = useRecoilState(selectBookData);
	// 가격
	const price = useInputState(0);
	const onSubmit = async () => {
		const data: BookBuyingPostDataType = {
			created_at: new Date(),
			created_user: 'ed01405e-d190-4c47-9102-f6846da6404a',
			title: title.value as string,
			content: content,
			content_img_url: imgArr,
			user_name: 'user-name',
			book_id: selectedBook.bookId,
			book_name: selectedBook.bookName,
			book_img_url: selectedBook.bookImgUrl,
			field: page,
			category: 'category',
			view: 0,
			like: 0,
			price: price.value as number,
			state: false,
		};
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase.from(`${page}`).insert([data]);
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// state 초기화
		title.init('');
		setContent('');
		setImgArr([]);
		setSeletedBook({
			bookName: '',
			bookImgUrl: '',
			bookId: '',
		});
		price.init(0);
		// 데이터 삽입후 페이지 이동
		return router.push(`/community/${page}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>중고 책을 구매해보세요.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string | ''}
				onChange={title.onChange}
			/>
			<OptionBookBuying
				sellingPrice={
					price as {
						value: number;
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
					}
				}
			/>

			<div>
				<EditorComponent />
			</div>
			<div className={styles.BtnWrap}>
				<button>취소</button>
				<button onClick={onSubmit}>등록</button>
			</div>
		</div>
	);
};

export default BookBuyingPostPage;

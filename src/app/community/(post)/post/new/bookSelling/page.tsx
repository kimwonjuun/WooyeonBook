'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useInputState } from '@/hooks/useInputState';
import { useRecoilState } from 'recoil';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { BookSellingPostDataType } from '@/types/community/post/data';
import OptionBookSelling from '@/components/community/post/option/OptionBookSelling';
import { useEffect, useState } from 'react';
import { getUser } from '@/apis/community/getUser';
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

const BookSellingPostPage = () => {
	const router = useRouter();
	const params = usePathname();
	const goback = () => router.back();
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
	// 판매 / 나눔
	const [sellingState, setSellingState] = useState<string>('');
	const onchangeSellingState = (e: any) => {
		setSellingState(e.value);
	};
	const onSubmit = async () => {
		const { user_id, user_name } = await getUser();

		const data: BookSellingPostDataType = {
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value as string,
			content: content,
			content_img_url: imgArr,
			user_name: user_name as string,
			book_id: selectedBook.bookId,
			book_name: selectedBook.bookName,
			book_img_url: selectedBook.bookImgUrl,
			field: page,
			category: 'category',
			view: 0,
			like: 0,
			price: price.value as number,
			state: false,
			selling: sellingState === '판매' ? true : false,
		};
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/create/${page}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		).catch((err) => {
			throw new Error('Failed to fetch data');
		});
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
				<span className={styles.headerTitle}>책을 나누고 판매해 보세요.</span>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string | ''}
				onChange={title.onChange}
			/>
			<OptionBookSelling
				sellingPrice={
					price as {
						value: string;
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
					}
				}
				onchangeSellingState={onchangeSellingState}
			/>

			<div>
				<EditorComponent />
			</div>
			<div className={styles.BtnWrap}>
				<button onClick={goback} className={styles.cancelBtn}>
					취소
				</button>
				<button onClick={onSubmit} className={styles.submitBtn}>
					등록
				</button>
			</div>
		</div>
	);
};

export default BookSellingPostPage;

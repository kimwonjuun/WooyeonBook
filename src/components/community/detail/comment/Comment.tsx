'use client';
import {
	isUpdateState,
	updateComment,
} from '@/recoil/atom/communityCommentAtom';
import styles from '@/styles/community/detail/detailPage.module.css';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Comment = ({ id, comment }: { id: string; comment: string }) => {
	const isUpdate = useRecoilValue(isUpdateState);
	const [text, setText] = useRecoilState(updateComment);
	useEffect(() => {
		setText(comment);
	}, []);

	const onChangeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.value.length > 50) {
			alert('50자 이내로 적어주세요.');
		}
		setText(e.target.value);
	};
	return (
		<div className={styles.commentContentWrap}>
			{isUpdate === id ? (
				<input
					type="text"
					value={text}
					onChange={onChangeText}
					className={styles.commnetModifyInput}
				/>
			) : (
				<p>{comment}</p>
			)}
		</div>
	);
};

export default Comment;

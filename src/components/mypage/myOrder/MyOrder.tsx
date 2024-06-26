'use client';
import styles from '@/styles/mypage/order/order.module.css';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { BookOrderList } from '@/types/orderList';
import MyOderList from './MyOderList';

interface userIdProps {
	userId: string;
}
export default function MyOrder({ userId }: userIdProps) {
	const [orderList, setOrderList] = useState<BookOrderList[]>([]);
	const supabase = createClient();

	// 주문 목록 불러오기
	const getOrderList = async () => {
		try {
			const { data, error } = await supabase
				.from('orderList')
				.select('*')
				.eq('user_id', userId)
				.order('created_at', { ascending: false });
			if (error) {
				throw error;
			}
			setOrderList(data);
		} catch (error) {
			console.error('Error fetching orders:', error);
			alert('주문 목록을 불러오는 도중 오류가 발생했습니다.');
		}
	};

	// 주문 삭제
	const handleorderDelete = async (cartId: string) => {
		const yes = confirm('주문을 취소하시겠습니까?');
		if (yes) {
			try {
				const { error } = await supabase
					.from('orderList')
					.delete()
					.match({ cart_id: cartId });

				if (error) {
					throw error;
				}

				alert('주문이 취소되었습니다.');
				getOrderList(); // 주문 목록 갱신
			} catch (error) {
				console.error('주문 취소 중 오류 발생:', error);
				alert('주문 취소 중 오류가 발생했습니다.');
			}
		}
	};

	// 주문 리스트 뿌려주는 useEffect
	useEffect(() => {
		getOrderList();
	}, []);

	return (
		<div>
			{orderList?.map((order, index) => (
				<>
					<div className={styles.orderDateContainer} key={index}>
						<h1 className={styles.orderDate}>
							{new Date(order.created_at).toLocaleDateString('ko-KR', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</h1>
						<button
							className={styles.orderCancleBtn}
							onClick={() => handleorderDelete(order.cart_id)}>
							주문취소
						</button>
					</div>
					<div className={styles.orderAccordionContainer}>
						<div className={styles.orderAccordionWrapper}>
							<ul className={styles.orderNav}>
								<li>상품 정보</li>
								<li>정가</li>
								<li>판매가</li>
								<li>수량</li>
								<li>합계</li>
							</ul>
							{order.cart.map((item, index) => (
								<div key={index}>
									<MyOderList
										item={item}
										getOrderList={getOrderList}
										userId={userId}
									/>
								</div>
							))}
						</div>
					</div>
				</>
			))}
		</div>
	);
}

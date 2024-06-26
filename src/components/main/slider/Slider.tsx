'use client';

import styles from '@/styles/main/slider/slider.module.css';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import thinArrowRightIcon from '@/assets/main/thinArrowRightIcon.png';
import thinArrowLeftIcon from '@/assets/main/thinArrowLeftIcon.png';
import SliderItem from './SliderItem';
import arrowStyles from '@/styles/main/slider/customArrow.module.css';
import { mainBookSlider } from '@/apis/main/silderData';
import { useRouter } from 'next/navigation';
import { SliderSkeleton } from './SliderSkeleton';

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

export default function Slider() {
	// useRouter 호출
	const router = useRouter();

	// 슬라이더 다이나믹 라우팅 적용
	const MainSlider = dynamic(() => import('react-slick'), {
		// 로딩 시 스켈레톤 ui 렌더링
		loading: () => <SliderSkeleton />,
	});

	// 슬라이더 세팅에 스타일링을 위한 좌우 화살표 추가
	const CustomPrevArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowPrev}`}
				onClick={onClick}>
				<Image src={thinArrowRightIcon} alt="prev" width={16} height={16} />
			</div>
		);
	};
	const CustomNextArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowNext}`}
				onClick={onClick}>
				<Image src={thinArrowLeftIcon} alt="next" width={16} height={16} />
			</div>
		);
	};

	// 슬라이더 세팅
	const settings = {
		className: 'center',
		dots: false, // 하단 dot
		infinite: true, // 슬라이더 무한 순환
		speed: 1000, // 전환 속도
		slidesToShow: 1, // 한 번에 보여지는 이미지 수
		slidesToScroll: 1, // 한 번에 넘어가는 이미지 수

		autoplay: true, // 자동으로 넘기기
		autoplaySpeed: 4000, // 자동으로 넘어가는 속도
		centerMode: true, // 현재 슬라이드를 중앙에 위치
		centerPadding: '200px', // 중앙 슬라이드 양 옆의 패딩
		// centerborderradius: '4px' ,

		prevArrow: <CustomPrevArrow />,
		nextArrow: <CustomNextArrow />,
	};

	return (
		<MainSlider {...settings} className={styles.mainSliderWrapper}>
			{mainBookSlider.map((item) => {
				return (
					<div onClick={() => router.push(item.link)} key={item.id}>
						<SliderItem item={item} />
					</div>
				);
			})}
		</MainSlider>
	);
}

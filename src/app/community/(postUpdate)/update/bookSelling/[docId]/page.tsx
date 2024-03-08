import BookSellingUpdate from '@/components/community/update/option/BookSellingUpdate';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`http://localhost:8080/api/community/bookSelling/${params.docId}`,
		{
			cache: 'force-cache',
		},
	).then((res) => res.json());
	console.log(data);

	return (
		<div>
			<BookSellingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdatePage;

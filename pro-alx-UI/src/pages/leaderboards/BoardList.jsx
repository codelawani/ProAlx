import Board from './Board';

const data = [
	{
		rank: 1,
		name: 'John doe',
		hours: 4090.09,
		average: 450.9,
	},
	{
		rank: 2,
		name: 'Jane doe',
		hours: 5090.09,
		average: 350.9
	},
	{
		rank: 3,
		name: 'John smith',
		hours: 2090.094,
		average: 1450.9
	},
	{
		rank: 4,
		name: 'Jane smith',
		hours: 44090.09,
		average: 2450.9
	},
];

const BoardList = () => {
	return (
		<div className=''>
			<h3 className='pb-4 font-semibold text-lg'>Leaderboards</h3>
			<table className='table-auto'>
				<thead className=''>
					<tr className='grid grid-cols-4 content-center'>
						<th className=''>Rank</th>
						<th>Fullname</th>
						<th>Hours</th>
						<th>Average</th>
					</tr>
				</thead>

				<tbody>
					{data.map(item => <Board key={item.rank} {...item}/>)}
				</tbody>
			</table>
			
			
		</div>
	);
};

export default BoardList;

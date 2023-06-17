import dashboard from '../../assets/stats.png';
import Button from '../../components/Button';
import { guides } from './data';

const WakatimeGuide = () => {
	// get client id from .env file
	const { VITE_WAKA_ID: CLIENT_ID, VITE_PROALX: URL } = import.meta.env;
	// wakatime button style
	const style =
		'hover:bg-primary py-2 hover:text-white hover:border-white dark: text-lg uppercase font-mono font-bold text-blue-500 shadow-sm px-1 lg:px-2 shadow-sky-900 self-center w-2/4 bg-yellow';

	// redirect user to wakatime OAuth endpoint for OAuth authorization of the app
	const handleConnect = () => {
		const scope = 'email read_stats read_logged_time';
		const redirectUrl = URL + '/dashboard';
		const query = `response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope}`;
		window.location.assign(`https://wakatime.com/oauth/authorize?${query}`);
	};

	const pStyles = 'py-3 px-2';
	return (
		<div className='mt-5'>
			<h2 className='font-semibold text-2xl uppercase font-mono'>
				why use wakatime?
			</h2>
			<img src={dashboard} alt='wakatime dashboard' />
			<div>
				<p className={pStyles}>
					WakaTime helps you measure and track your learning progress over time.
					By seeing the time you invest in coding and the projects you work on,
					you can visualize your improvement and gain a sense of accomplishment
					as you see yourself becoming more proficient in programming languages
					and technologies.
				</p>
				<p className={pStyles}>
					WakaTime can help you track your coding activity, giving you insights
					into which languages or projects you are spending the most time on.
					This awareness can guide your learning and allow you to focus on areas
					that require improvement.
				</p>
				<p className={pStyles}>
					{' '}
					WakaTime can also help you track how much time you are dedicating to
					coding each day. This information can assist you in setting goals,
					establishing study routines, and ensuring that you allocate enough
					time for learning and practice.
				</p>
				<p className={pStyles}>
					Tracking your coding activity with WakaTime can provide a sense of
					motivation and accountability. Seeing your progress and the time
					you&#39;ve invested in your learning journey can boost your motivation
					and encourage you to stay consistent and committed to your tech
					learning goals.
				</p>
			</div>

			<div className='py-4 flex flex-col justify-center gap-3'>
				<p>
					You can easily setup wakatime using our provided guides for your
					favourite code editor
				</p>
				<div className='flex flex-col'>
					{guides.map(({ id, name, link }) => (
						<a
							href={link}
							target='_blank'
							rel='noreferrer'
							title={`view ${name} guide`}
							key={id}
							className='capitalize hover:underline text-blue-500'
						>{`set up ${name}`}</a>
					))}
				</div>
				<Button
					value='connect wakatime'
					style={style}
					handleClick={handleConnect}
				/>
			</div>
		</div>
	);
};

export default WakatimeGuide;

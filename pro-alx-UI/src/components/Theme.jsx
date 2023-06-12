import Button from './Button';
import { useTheme } from '../hooks/customContexts';

const Theme = () => {
	const { updateTheme, theme } = useTheme();
	const style =
		'w-14 h-7 bg-bar dark:bg-gray-500 flex items-center transition duration-300 focus:outline-none shadow text-black dark:text-white rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-xl border-bar border';
	const value =
		theme === 'dark'
			? 'w-7 h-7 relative rounded-full transition duration-500 transform bg-black -translate-x-0 p-1'
			: 'w-7 h-7 relative rounded-full transition duration-500 transform bg-blue-100 shadow-xl  translate-x-full p-1';

	return (
		<Button
			value={<span className={value} />}
			handleClick={updateTheme}
			style={style}
		/>
	);
};

export default Theme;

import Button from './Button';
import { useTheme } from '../hooks/customContexts';

const Theme = () => {
  const { updateTheme, theme } = useTheme();
  const style =
		'w-10 h-7 rounded-full bg-gray-800 dark:bg-gray-500 flex items-center transition duration-300 focus:outline-none shadow text-black dark:text-white';
  const value =
		theme === 'dark'
		  ? 'w-5 h-7 relative rounded-full transition duration-500 transform bg-black -translate-x-0 p-1'
		  : 'w-5 h-7 relative rounded-full transition duration-500 transform bg-white  translate-x-full p-1';

  return (
    <Button
      value={<span className={value} />}
      handleClick={updateTheme}
      style={style}
    />
  );
};

export default Theme;

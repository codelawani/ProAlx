//import img from '../assets/one.jpeg';
import Button from "../Button";
import styles from "./hero.module.css"

const Hero = () => {
	
	const style = {
		background: 'linear-gradient(50deg, #0f0e17, #ff8906,#e53170)',
		color: '#fffffe',
		border: '1px solid ##ff8906',
		width: '50%',
	};
	return (
		<div className={styles.hero}>
			<div className={styles.content}>
				<h2>
					Teamwork Made Easy: Find Active Partners for Smooth Project
					Collaboration
				</h2>
				{/* <p>
					Discover a dynamic platform where like-minded individuals and talented
					professionals come together, sharing their skills, expertise, and
					passion for collaborative success, helping you find active partners
					who align with your project goals, enabling seamless teamwork,
					fostering innovation, and unlocking the full potential of your
					projects for remarkable achievements
				</p> */}
				<Button style={style} value={'Get Started'}/>
			</div>
		</div>
	);
};

export default Hero;

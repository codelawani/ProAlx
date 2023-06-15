import { Link } from 'react-router-dom';
import { proalx } from '../../data';
import Item from './Item';
import { teamInfo } from './teamData';
import { BsTwitter, BsLinkedin } from 'react-icons/bs';

const Main = () => {
  const iconStyles = 'text-blue-600';
  const headingStyles =
		'font-bold text-xl dark:text-yellow text-bar uppercase py-3';
  const buttonStyles =
		'text-black text-2xl bg-light-blue rounded-lg p-2 cursor-pointer hover:border-light-blue hover:opacity-90 px-3 hover:bg-dark hover:text-white dark:hover:bg-yellow dark:hover:text-dark transform transition ease-out duration-200';

  return (
    <main className='dark:bg-dark dark:text-gray-300 relative z-[0] border dark:border-dark border-body '>
      <section className='flex flex-col justify-center items-center my-10 bg-body dark:bg-dark gap-3 py-6 '>
        <h3 className={headingStyles}>Features</h3>
        {proalx.map(item => (
          <Item key={item.id} {...item} />
        ))}
        <Link to='' className={buttonStyles}>
          view our guide
        </Link>
      </section>

      <section id='about' className=''>
        <div className='flex flex-col items-center px-5 md:px-36 text-justify'>
          <h3 className={headingStyles}>About ProAlx</h3>
          <p className='tracking-wide leading-8'>
            As a result of our collective experiences with inactive partners
            during team projects, we recognized the need for a solution that
            would alleviate this problem and simplify the process of finding the
            right project partner. In response, we embarked on the development
            of an innovative app that aims to address these challenges and
            provide a more seamless and informed partner selection experience.
            <br />
            <br />
            This project holds significant importance for us as it serves as the
            culmination of our journey through the Foundations stage of our
            ALX-SE program. It represents a practical application of the skills
            and knowledge we have acquired thus far, showcasing our growth and
            proficiency in software development.
            <br />
            <br />
            Through this portfolio project, we aim to demonstrate our ability to
            tackle real-world challenges and deliver meaningful solutions. It
            serves as a testament to our dedication, problem-solving
            capabilities, and commitment to excellence in software development.
            We are excited about the opportunity to make a positive impact in
            the realm of project collaboration and look forward to the future
            advancements and potential our app holds.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-5 py-10'>
          <h4 className='font-serif font-semibold dark:text-cyan-200 text-bar-dark'>
            Meet the Team
          </h4>
          <ul className='flex flex-grow flex-wrap md:flex-row items-center justify-center gap-4'>
            {teamInfo.map(({ name, twitter, role, linkedin, id }) => {
						  return (
  <li
    key={id}
    className='flex flex-col items-center justify-center md:border-r last:border-none px-7 shadow-md shadow-cyan-700 bg-white w-5/6 tb:w-fit rounded-md gap-1 bg-gradient-to-t from-black to-cyan-600 py-7 text-body dark:bg-none dark:bg-black '
  >
    <span>{name}</span>
    <span className='block'>{role}</span>
    <span className='flex gap-2'>
      <a
        href={`https://twitter.com/${twitter}`}
        target='_blank'
        rel='noreferrer'
        className={iconStyles}
      >
        <BsTwitter />
      </a>
      <a
        href={`https://linkedin.com/${linkedin}`}
        target='_blank'
        rel='noreferrer'
        className={iconStyles}
      >
        <BsLinkedin />
      </a>
    </span>
  </li>
						  );
            })}
          </ul>
          <a
            href='https://github.com/angelofdeity/ProAlx/'
            className={buttonStyles}
            target='_blank'
            rel='noreferrer'
          >
            view on github
          </a>
        </div>
      </section>
    </main>
  );
};

export default Main;

import Marquee from 'react-fast-marquee';

const Banner = () => {
  return (
    <div className="bg-black dark:text-black dark:bg-secondary h-8 absolute top-0 left-0 right-0 z-50">
      <Marquee gradient={false} speed={20}>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
        <span className="text-xs text-white dark:text-black mx-10">Where Payments Meet Simplicity</span>
      </Marquee>
    </div>
  );
};

export default Banner;
import Styles from './HomeDataCard.module.css'
import CountUp from 'react-countup';

const HomeDataCard = ({
    title,
    description,
    icon,
    count,
}) => {
    return (
        <>
            <div className={`${Styles.backgraound} p-6`}>
                <div className='grid grid-cols-2 h-full w-full'>
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h2 className='text-white text-4xl font-semibold opacity-80'>{title}</h2>
                            <span className='text-white text-sm opacity-60 tracking-wide'>{description}</span>
                        </div>
                        <div className='mb-1'>
                            <span className='text-6xl font-bold text-white opacity-80'>
                                <CountUp end={count} />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <div className={`${Styles.iconBg} rounded-full flex items-center justify-center w-44 h-44`}>
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeDataCard;
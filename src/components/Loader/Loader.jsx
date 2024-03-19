import Lottie from 'react-lottie';
import styles from './Loader.module.scss';
import * as animationData from './anim.json';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
        height={250}
        width={350}
      />

      <div className={styles.title}>Loading...</div>
    </div>
  );
};

export default Loader;

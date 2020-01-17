import classNames from 'classnames';
import styles from './Loader.less';
import PropTypes from "prop-types"

const Loader = ({spinning = false, fullScreen}) => {
  return (
    <div
      className={classNames(styles.loader, { [styles.hidden]: !spinning, [styles.fullScreen]: fullScreen })}
    >
      <div className={styles.wrapper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool
}

export default Loader;

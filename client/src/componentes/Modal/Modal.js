import  { Component } from 'react';
import Portal from './Portal';
import s from './Modal.module.css';

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props;

    return (
      <Portal>
        {active && (
          <div className={s.wrapper}>
            <div className={s.window}>
              <button className={s.closeBtn} onClick={toggle}>
                X
              </button>
              <div className={s.child}>{children}</div>
            </div>
            <div className={s.background} onClick={toggle} />
          </div>
        )}
      </Portal>
    );
  }
}

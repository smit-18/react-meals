import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/card-context';
import { useContext } from 'react';

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);

    const numOfCartItems = cartCtx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
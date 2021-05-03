import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = props => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const numOfCartItems = cartCtx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return;
        }

        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
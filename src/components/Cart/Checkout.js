import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isPostalCode = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isPostalCode(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid,
        });

        const formIsValid =
            enteredCityIsValid &&
            enteredNameIsValid &&
            enteredPostalIsValid &&
            enteredStreetIsValid;

        if (!formIsValid) {
            return;
        }
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div
                className={`${classes.control} ${
                    formInputsValidity.name ? '' : classes.invalid
                }`}>
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" ref={nameInputRef} />
                {!formInputsValidity.name && (
                    <p className={classes['error-text']}>
                        Please enter a valid name.
                    </p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    formInputsValidity.street ? '' : classes.invalid
                }`}>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" ref={streetInputRef} />
                {!formInputsValidity.street && (
                    <p className={classes['error-text']}>
                        Please enter a valid street.
                    </p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    formInputsValidity.postalCode ? '' : classes.invalid
                }`}>
                <label htmlFor="postal">Postal Code</label>
                <input id="postal" type="text" ref={postalInputRef} />
                {!formInputsValidity.postalCode && (
                    <p className={classes['error-text']}>
                        Please enter a valid postal code (6 characters long).
                    </p>
                )}
            </div>
            <div
                className={`${classes.control} ${
                    formInputsValidity.city ? '' : classes.invalid
                }`}>
                <label htmlFor="city">City</label>
                <input id="city" type="text" ref={cityInputRef} />
                {!formInputsValidity.city && (
                    <p className={classes['error-text']}>
                        Please enter a valid city.
                    </p>
                )}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} type="submit">
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;

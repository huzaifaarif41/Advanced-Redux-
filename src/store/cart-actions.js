import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  //this will fetch the cart data which is on the database
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-movieapp-6bb05-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch Cart Data');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData(); //because we get data from firebase through fetch data which make above
      dispatch(cartActions.replaceCart({
          items: cartData.items|| [],
          totalQuantity: cartData.totalQuantity
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Fetching Cart Data Failed',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart Data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-movieapp-6bb05-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }), //if we put cart so changed property also showed in firebase thats why we could create a new objects
        }
      );
      if (!response.ok) {
        throw new Error('Sending Cart Data Failed');
      }
    };

    try {
      await sendRequest(); //async function returns a promise and use to simply handle any errors and if we dont have any errpr so dispatch a success and iff have any error, so dispatch status of error

      dispatch(
        uiActions.showNotification({
          status: 'success', // success becz in notification, we check for success for adjust css classes
          title: 'Success..',
          message: 'Sent Cart Data Successfully',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: 'Sending Cart Data Failed',
        })
      );
    }
  };
}; //its an action creator thunk and its important to make a function outside a slice

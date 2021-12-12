import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {sendCartData, fetchCartData} from './store/cart-actions'
// import { uiActions } from './store/ui-slice';

let isInitial = true; //it is define outside of my component function becz it does not change and its not re-initialized if component renders again but this is initialized when this file parsed for the first time.

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(()=>{
    dispatch(fetchCartData())

  },[dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart))

    // const sendCartData = async () => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending Cart Data',
    //   })
    // );
    // const response = await fetch(
    //   'https://react-http-movieapp-6bb05-default-rtdb.firebaseio.com//cart.json',
    //   {
    //     method: 'PUT',
    //     body: JSON.stringify(cart),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error('Sending Cart Data Failed');
    // }

    // dispatch(
    //   uiActions.showNotification({
    //     status: 'success', // success becz in notification, we check for success for adjust css classes
    //     title: 'Success..',
    //     message: 'Sent Cart Data Successfully',
    //   })
    // );
    // };

    // if (isInitial) {
    //   isInitial=false
    //   return;
    // }

    // sendCartData().catch((error) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'error',
    //     title: 'Error...',
    //     message: 'Sending Cart Data Failed',
    //   })
    // );
    //})
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

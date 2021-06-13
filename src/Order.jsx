import { Button, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import OrderDetails from './OrderDetails';
import styles from './Order.module.css';

const initialValues = { item: '', quantity: 0 };

function Order() {
  const [isRequestingUpdate, setRequestingUpdate] = useState(false);
  const [orderData, setOrderData] = useState(initialValues);
  const [isReplacingOrder, setReplacingOrder] = useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const [isReplacementConfirmed, setReplacementConfirmed] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const resetConfirmation = useCallback(() => {
    setRequestingUpdate(false);
    setConfirming(false);
    setReplacementConfirmed(false);
  }, []);

  const makeUpdate = useCallback(async (data, replaced) => {
    // do something with orderData and isReplacingOrder
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log({ data, replaced });
    resetConfirmation();
    setCompleted(true);
  }, [resetConfirmation]);

  // makeUpdate state machine
  useEffect(() => {
    if (!isRequestingUpdate) {
      return;
    }
    if (isReplacingOrder && !isReplacementConfirmed) {
      setConfirming(true);
      return;
    }
    makeUpdate(orderData, isReplacingOrder);
  }, [isReplacementConfirmed, isReplacingOrder, isRequestingUpdate, makeUpdate, orderData]);

  // completed state machine
  useEffect(() => {
    if (isCompleted) {
      setOrderData({ ...initialValues }); // updates the reference, triggering resetFields in OrderDetails
      setTimeout(() => { setCompleted(false); }, 5000);
    }
  }, [isCompleted]);

  const onSubmit = (values) => {
    setOrderData(values);
    setRequestingUpdate(true);
  };

  const onConfirm = () => {
    setReplacementConfirmed(true);
  }

  const onCancel = () => {
    resetConfirmation();
  }

  return (
    <div className={styles.main}>
      <OrderDetails
        initialValues={orderData}
        onSubmit={onSubmit}
        replace={isReplacingOrder}
        onReplaceChanged={setReplacingOrder}
      />
      <Button
        type="primary"
        loading={isRequestingUpdate}
        disabled={isRequestingUpdate}
        onClick={() => setRequestingUpdate(true)}
      >
        Update Order
      </Button>
      {isCompleted && <span className={styles.confirmation}>Order updated</span>}
      <Modal
        title="Replace Order"
        visible={isConfirming}
        onOk={onConfirm}
        okButtonProps={{
          loading: isReplacementConfirmed,
          disabled: isReplacementConfirmed
        }}
        onCancel={onCancel}
      >
        Are you sure you want to replace your entire order?
      </Modal>
    </div>
  );
}

export default Order;

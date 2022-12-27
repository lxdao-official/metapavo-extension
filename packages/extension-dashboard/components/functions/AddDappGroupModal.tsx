import { Button, Input, Modal, Text } from '@nextui-org/react';
import globalEvent from 'extension-common/src/EventBus';
import { addUserDappCategory } from 'extension-common/src/apis/dapps_api';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function AddDappGroupModal() {
  const [showAddCategory, setshowAddCategory] = useState(false);
  const [addCategoryTitle, setaddCategoryTitle] = useState('');
  const [addCategoryDesc, setaddCategoryDesc] = useState('');
  function closeModalHandler() {
    setshowAddCategory(false);
  }
  function showModal() {
    setshowAddCategory(true);
  }

  async function submitUserCategory() {
    const loading = toast.loading('saveing...');

    if (addCategoryTitle.length > 0) {
      try {
        await addUserDappCategory(addCategoryTitle, addCategoryDesc);
        setshowAddCategory(false);
        setaddCategoryTitle('');
        setaddCategoryDesc('');
        toast.success('saved');
        globalEvent.emit('add_dapp_group_success');
      } catch (e) {
        toast.error('save failed');
      }
    } else {
      toast.error('title is required');
    }
    toast.dismiss(loading);
  }

  useEffect(() => {
    globalEvent.on('add_dapp_group', () => {
      showModal();
    });
    return () => {};
  }, []);
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={showAddCategory}
      onClose={closeModalHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {getLang('add_your_own_dapp_group')}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="title"
          onChange={(e) => {
            setaddCategoryTitle(e.target.value);
          }}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="description"
          onChange={(e) => {
            setaddCategoryDesc(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeModalHandler}>
          {getLang('Cancel')}
        </Button>
        <Button
          auto
          onClick={async () => {
            await submitUserCategory();
            closeModalHandler();
          }}
        >
          {getLang('Submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

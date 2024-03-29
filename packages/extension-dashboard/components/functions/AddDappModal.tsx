import { Button, Checkbox, Input, Modal, Radio, Text } from '@nextui-org/react';
import globalEvent from 'extension-common/src/EventBus';
import { dapps, user_dapps_catogories } from 'extension-common/src/apis';
import {
  fetchUsersCategory,
  installDapp,
} from 'extension-common/src/apis/dapps_api';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { AddDappGroupModal } from './AddDappGroupModal';

export default function AddDappModal(props: {
  onSuccess?: (dapp_id: string, selectedCatId?: string) => void;
}) {
  const [showModalState, setshowModalState] = useState(false);
  const [dapp, setdapp] = useState<dapps>();
  const [user_categories, setuser_categories] = useState<
    user_dapps_catogories[]
  >([]);
  const [selectedCatId, setselectedCatId] = useState<string>();
  const closeModalHandler = () => {
    setshowModalState(false);
  };
  async function loadUsersCategories() {
    const res = await fetchUsersCategory();
    if (res) {
      setuser_categories(res as user_dapps_catogories[]);
    }
  }
  const [saveing, setsaveing] = useState(false);
  async function save() {
    if (dapp) {
      setsaveing(true);
      const res = await installDapp(dapp.id, selectedCatId);
      if (res) {
        toast.success('Dapp installed successfully');
        closeModalHandler();
        props.onSuccess && props.onSuccess(dapp.id, selectedCatId);
      }
      setsaveing(false);
    }
  }
  useEffect(() => {
    if (showModalState) {
      loadUsersCategories();
    }
  }, [showModalState]);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.cmd === 'pick_dapp') {
        setshowModalState(true);
        setdapp(request.data.dapp);
      }
    });
    globalEvent.on('pick_dapp', (dapp: dapps) => {
      setshowModalState(true);
      setdapp(dapp);
    });
    globalEvent.on('add_dapp_group_success', () => {
      loadUsersCategories();
    });
    return () => {};
  }, []);
  function showAddGroupModal() {
    globalEvent.emit('add_dapp_group');
  }
  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showModalState}
        onClose={closeModalHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add DAPP to dashboard
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            orientation="horizontal"
            label={getLang('Please_choose_category')}
            defaultValue="secondary"
            onChange={(value) => {
              setselectedCatId(value);
            }}
          >
            {user_categories.map((item) => (
              <Radio key={item.id} value={item.id} size="sm">
                {item.title}
              </Radio>
            ))}
          </Radio.Group>
          <a
            onClick={showAddGroupModal}
            style={{
              display: 'block',
            }}
          >
            {getLang('add_new_group')}
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeModalHandler}>
            {getLang('Cancel')}
          </Button>
          <Button auto onClick={save}>
            {getLang('Submit')}
          </Button>
        </Modal.Footer>
      </Modal>
      <AddDappGroupModal />
    </>
  );
}

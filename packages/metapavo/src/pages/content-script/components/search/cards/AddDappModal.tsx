import {
  Button,
  Checkbox,
  Input,
  Loading,
  Modal,
  Radio,
  Text,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { dapps, user_dapps_catogories } from '../../../../../utils/apis';
import { getLang } from '../../../../../utils/lang';
import { fetchUsersCategory, installDapp } from '../utils/apis/dapps_api';

export default function AddDappModal(props: {
  onSuccess?: (dapp_id: string, selectedCatId?: string) => void;
  dapp?: dapps;
  showModalState: boolean;
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
  useEffect(() => {
    setshowModalState(props.showModalState);
    setdapp(props.dapp);
  }, [props.showModalState, props.dapp]);
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
      try {
        const res = await installDapp(dapp.id, selectedCatId);
        if (res) {
          toast.success('Dapp installed successfully');
          closeModalHandler();
          props.onSuccess && props.onSuccess(dapp.id, selectedCatId);
        }
      } catch (e: any) {
        toast.error(e.message);
      }

      setsaveing(false);
    }
  }
  useEffect(() => {
    if (showModalState) {
      loadUsersCategories();
    }
  }, [showModalState]);

  return (
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
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeModalHandler}>
          {getLang('Cancel')}
        </Button>
        <Button auto onClick={save} disabled={saveing}>
          {saveing ? (
            <Loading type="spinner" color="currentColor" size="sm" />
          ) : (
            getLang('Submit')
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

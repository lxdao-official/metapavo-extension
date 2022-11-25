import {
  Button,
  Checkbox,
  Input,
  Loading,
  Modal,
  Radio,
  Text,
} from '@nextui-org/react';
import { links, linktags, userlinks } from 'extension-common/src/apis';
import {
  fetchUsersTags,
  installLink,
} from 'extension-common/src/apis/links_api';
import { getLang } from 'extension-common/src/lang';
import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddLinksModal(props: {
  onSuccess?: (dapp_id: string, selectedCatId?: string) => void;
  link?: links;
  showModalState: boolean;
}) {
  const [showModalState, setshowModalState] = useState(false);
  const [dapp, setdapp] = useState<links>();
  const [user_categories, setuser_categories] = useState<linktags[]>([]);
  const [selectedCatId, setselectedCatId] = useState<string>();
  const closeModalHandler = () => {
    setshowModalState(false);
  };
  useEffect(() => {
    setshowModalState(props.showModalState);
    setdapp(props.link);
  }, [props.showModalState, props.link]);
  async function loadUsersCategories() {
    const res = await fetchUsersTags();
    if (res) {
      setuser_categories(res as linktags[]);
    }
  }
  const [saveing, setsaveing] = useState(false);
  async function save() {
    if (dapp) {
      setsaveing(true);
      try {
        const res = await installLink(dapp, selectedCatId);
        toast.success('links add successfully');
        closeModalHandler();
        props.onSuccess && props.onSuccess(res.id, selectedCatId);
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
      css={{
        zIndex: '100000000000000',
      }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Add Link to dashboard
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
          <Radio key={''} value={''} size="sm">
            {getLang('ungrouped')}
          </Radio>
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

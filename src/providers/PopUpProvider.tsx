'use client';

import React from 'react';
import Modal from '@/components/atoms/Modal';
import Typography from '@/components/atoms/Typography';
import { map } from 'lodash';
import Button from '@/components/atoms/Button';
import {
  PopUp, PopUpAction, PopUpContext, PopUpContextType,
} from '@/context/PopUpCtx';

interface PopUpProviderProps {
  children: React.ReactNode;
}

function PopUpProvider({ children }: PopUpProviderProps): React.JSX.Element {
  const [popUp, setPopUp] = React.useState<PopUp>({
    type: 'warning',
    title: undefined,
    message: undefined,
    actions: [],
  });
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const show: PopUpContextType['show'] = React.useCallback(
    (type, title, message, actions) => {
      const defaultAction: PopUpAction = {
        text: 'OK',
        onClick: () => {
          setVisible(false);
          setPopUp({
            type: 'warning',
            title: undefined,
            message: undefined,
            actions: [],
          });
        },
      };
      setPopUp({
        type,
        title,
        message,
        actions: actions || [defaultAction],
      });
      setVisible(true);
    },
    [],
  );

  const hide: PopUpContextType['hide'] = React.useCallback(() => {
    setVisible(false);
    setPopUp({
      type: 'warning',
      title: undefined,
      message: undefined,
      actions: [],
    });
  }, []);

  const handleSetLoading: PopUpContextType['setLoading'] = React.useCallback(
    (val: boolean) => {
      setLoading(val);
    },
    [],
  );

  const value = React.useMemo(() => ({
    show,
    hide,
    setLoading: handleSetLoading,
  }), [show, hide, handleSetLoading]);

  return (
    <PopUpContext.Provider value={value}>
      {children}
      <Modal visible={visible} onClose={hide}>
        <Typography variant="h4" className="font-medium text-center">{popUp.title}</Typography>
        <Typography className="text-center opacity-75 mt-2">{popUp.message}</Typography>
        <div className="flex gap-4 mt-6">
          {map(popUp.actions, (act: PopUpAction) => (
            <div key={`action-${act.text}`} className="flex flex-col w-full">
              <Button
                testID={`action-${act.text}`}
                onClick={act.onClick}
                variant={act.variant}
                className={act.className}
                loading={act.loadingAvailable && loading}
              >
                <Typography>{act.text}</Typography>
              </Button>
            </div>
          ))}
        </div>
      </Modal>
    </PopUpContext.Provider>
  );
}

export default PopUpProvider;

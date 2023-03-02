import { Alert as AlertBootstrap } from "react-bootstrap";
import { useInfo } from '../context';
import { useMemo, useState } from 'react';
import { useHref } from 'react-router-dom';

export const Alert = () => {
  const info = useInfo();
  const href = useHref();

  const show = useMemo(
    () => info?.message?.route === href,
    [info.message]
  );

  return (
    <AlertBootstrap show={show} onClose={info.handleCloseMessage} variant={info?.message?.type} dismissible transition>
      {info?.message?.data}
    </AlertBootstrap>
  );
};

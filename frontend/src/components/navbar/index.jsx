import * as S from './style.js';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

export const Navbar = ({items, exist}) => {
  const [show, setShow] = useState(false);

  if (!exist) return;

  return (
    <>
      <S.Nav show={show}>
        <button onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <FiMenu />}
        </button>
        <section>
        {items.map((item, i) => <Link onClick={() => setShow(false)} key={i} to={item.link}>{item.name}</Link>)}
        </section>
      </S.Nav>
    </>
  )
};

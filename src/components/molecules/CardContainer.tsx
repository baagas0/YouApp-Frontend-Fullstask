'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import InputField from '@/components/molecules/InputField';
import Typography from '@/components/atoms/Typography';
import CircleCheckIcon from '@/components/atoms/icons/CircleCheckIcon';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  classname?: string;
}

function CardContainer(props: Props): React.JSX.Element {
  const {
    children,
    classname,
  } = props;

  const containerClassName = classNames('p-3 bg-[#0e191f] rounded-[14px] mt-6', classname);

  return (
    <div className={containerClassName}>
        {children}
    </div>
  );
}

export default CardContainer;

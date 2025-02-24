import { PropsWithChildren } from 'react';

export type CustomButtonProps = PropsWithChildren & {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}
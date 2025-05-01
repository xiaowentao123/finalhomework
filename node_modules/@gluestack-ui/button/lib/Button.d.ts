import React from 'react';
export declare const Button: <T>(StyledButton: React.ComponentType<T>) => React.ForwardRefExoticComponent<Omit<import("./types").InterfaceButtonProps, "children"> & {
    children?: (({ hovered, pressed, focused, focusVisible, disabled, }: {
        hovered?: boolean;
        pressed?: boolean;
        focused?: boolean;
        focusVisible?: boolean;
        disabled?: boolean;
    }) => React.ReactNode) | React.ReactNode;
} & React.RefAttributes<unknown>>;
